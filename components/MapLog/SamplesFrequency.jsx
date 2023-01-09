import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import ResizeObserver from 'react-resize-observer';

function SamplesFrequency(props) {


    const dataset = useRef(null);
    const [currentSample, setCurrentSample] = useState(null);
    const dimensions = useRef(null);
    const d3Element = useRef(null);
    const container = useRef(null);
    const svg = useRef(null);
    const width = useRef(null);
    const height = useRef(null);
    const scaleXLinear = useRef(null);
    const scaleXTime = useRef(null);
    const theme = useTheme();


    useEffect(() => {
        if (!dataset.current) {
            createDataset();
            createChart();
            updateChart();


        }

    }, [])

    useEffect(() => {
        updateChart();
    }, [props.currentSample])

    function createDataset() {
        const input = props.values;
        const times = d3
            .scaleTime()
            .domain([
                new Date(input.features[0].properties.sampleTime),
                new Date(
                    input.features[input.features.length - 1].properties.sampleTime
                ),
            ])
            .ticks(d3.timeHour.every(3))
            .map((d) => d.toISOString().slice(0, 16));

        const nested = new Map();
        times.forEach((d) => {
            nested.set(d, 0);
        });

        input.features.forEach((data) => {
            const index =
                new Date(data.properties.sampleTime).toISOString().slice(0, 13) + ":00";
            if (nested.has(index)) nested.set(index, nested.get(index) + 1);
        });
        dataset.current =
            Array.from(nested.keys(), (key) => {
                return { key, value: nested.get(key) };
            })
    }

    function createChart() {
        container.current = d3.select(d3Element.current).classed("dataContainer", true);
        updateDimensions();

        svg.current =
            container
                .current
                .append("svg")
                .attr("width", dimensions.current.width)
                .attr("height", dimensions.current.height)
                .classed("svgCanvas", true);

        svg
            .current
            .append("g")
            .attr("id", "bars")
            .attr(
                "transform",
                "translate(" +
                dimensions.current.margin.left +
                "," +
                dimensions.current.margin.top +
                ")"
            );
        svg.current.append("g").attr("id", "bottomAxis");
        svg.current.append("g").attr("id", "topAxis");

        // .attr("transform", "translate(0," + dimensions.value.height + ")")
        // .call(d3.axisBottom(x));
        //   container.append(svg);
    };

    function updateDimensions() {

        dimensions.current = {
            width: 0,
            height: 0,
            margin: {
                top: 20,
                bottom: 50,
                left: 20,
                right: 20,
            },
        };

        dimensions.current.width = d3Element.current.offsetWidth;
        dimensions.current.height = d3Element.current.offsetHeight;
    }

    const updateChart = () => {
        //   const t = container.transition().duration(750);

        width.current =
            dimensions.current.width -
            dimensions.current.margin.left -
            dimensions.current.margin.right;
        height.current =
            dimensions.current.height -
            dimensions.current.margin.top -
            dimensions.current.margin.bottom;

        scaleXLinear.current = d3
            .scaleBand()
            .range([0, width.current])
            .domain(d3.range(dataset.current.length))
            .round(false);

        scaleXTime.current = d3
            .scaleTime()
            .domain([
                new Date(dataset.current[0].key),
                new Date(dataset.current[dataset.current.length - 1].key),
            ])
            .range([0, width.current]);

        // const scaleY = d3
        //   .scaleLinear()
        //   .domain([0, d3.max(dataset.value.map((d) => d.value))])
        //   .range([0, height]);

        const myColor = d3
            .scaleLinear()
            .domain([0, d3.max(dataset.current.map((d) => d.value))])
            .range([theme.palette.grey['100'], theme.palette.secondary.main]);

        const bars = svg.current
            .select("#bars")
            .selectAll(".bar")
            .data(dataset.current, (d) => d.key)
            .join(
                (enter) => {
                    enter
                        .append("rect")
                        .classed("bar", true)
                        .attr("width", scaleXLinear.current.bandwidth())
                        .attr("x", (data, i) => scaleXLinear.current(i))
                        .attr("height", 50)
                        .attr("y", height.current - 50)
                        .attr("fill", (data) => myColor(data.value));
                },
                (update) => {
                    update
                        .attr("width", scaleXLinear.current.bandwidth())
                        .attr("x", (data, i) => scaleXLinear.current(i))
                        .attr("height", 50)
                        .attr("y", height.current - 50)
                        .attr("fill", (data) => myColor(data.value));
                },

                (exit) => exit.remove()
            );

        svg
            .current
            .select("#bottomAxis")
            .attr(
                "transform",
                `translate(${dimensions.current.margin.left}, ${dimensions.current.height - dimensions.current.margin.bottom
                })`
            )
            .call(
                d3
                    .axisBottom(scaleXTime.current)
                    .ticks(d3.timeDay.every(1))
                    .tickFormat((d, i) => {
                        const formatDay = d3.timeFormat("%a %d");
                        const formatMonth = d3.timeFormat("%B");
                        if (new Date(d).getDate() === 1) return formatMonth(d).toUpperCase();
                        else return formatDay(d);
                    })
            )
            .attr("class", "axisBottom")
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-family", "RobotoMono")
            .attr("fill", (d) => {
                if (new Date(d).getDay() === 0 || new Date(d).getDay() === 6)
                    return theme.palette.secondary.main;
                else return theme.palette.primary.main;
            })
            .attr("transform", "rotate(-65)");

        if (props.currentSample) {
            svg
                .current
                .select("#topAxis")
                .attr(
                    "transform",
                    `translate(${dimensions.current.margin.left}, ${dimensions.current.height - dimensions.current.margin.bottom - 50
                    })`
                )
                .call(
                    d3
                        .axisTop(scaleXTime.current)
                        .tickValues([new Date(props.currentSample.properties.sampleTime)])
                        .tickFormat((d) => {
                            // const format = d3.timeFormat("%a %d");
                            // return format(d);

                            return parseInt(props.currentSample.properties.totalDistance) + "km"
                        })
                )
                .attr("class", "axisBottom")
                .selectAll("text")
                .attr("font-family", "RobotoMono")
                .attr("fill", theme.palette.primary.main);
            svg
                .current
                .select("#topAxis")
                .selectAll("line")
                .attr("stroke-width", 2)
                .attr("stroke", theme.palette.primary.main);
            svg
                .current.select("#topAxis").selectAll(".domain").attr("stroke", "none");
        }
        svg
            .current
            .select("#bottomAxis")
            .selectAll("line")
            .attr("stroke", theme.palette.primary.main);
        svg
            .current
            .select("#bottomAxis")
            .selectAll(".domain")
            .attr("stroke", theme.palette.primary.main);
    };


    return (<>
        <ResizeObserver onResize={() => { if (d3Element.current) updateDimensions() }} />
        <Box ref={d3Element} sx={{ height: 120 }}></Box>
    </>);
}

export default SamplesFrequency;