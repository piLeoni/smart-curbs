// import { lineString, lineSliceAlong } from '@turf/turf'
// const EventEmitter = require('events');

class GenerateGrid
// extends EventEmitter

{

    constructor(input) {
        // super();

        this.baseDataset = null;
        this.map = input.map;
        this.colorMax = input.colorMax;
        this.colorMin = input.colorMin;
        this.highlightCallback = input.highlightCallback;
        this.selectCallback = input.selectCallback;
        this.highlightFeature = null;
        this.selectedFeature = null;

        this.highlightFeatureMarker = null;

        this.theme = input.theme;

        try {
            this.map.addSource('gridSource', {
                type: 'geojson',
                // lineMetrics: true,
                data: null
            });

            this.map.addLayer({
                'id': 'gridLayer',
                'type': 'fill',
                'source': 'gridSource', // reference the data source
                'layout': {},
                'paint': {
                    // 'fill-color': '#0080ff', // blue color fill
                    // 'fill-color': {
                    //     property: 'connected_nodes',
                    //     stops: [
                    //         [0, this.colorMin],
                    //         [1, this.colorMax]
                    //     ]
                    // },
                    "fill-color-transition": {
                        'duration': 2000
                    },
                    'fill-opacity': 0.5
                }
            });

            this.map.addSource('gridCursor', {
                type: 'geojson',
                data: null
            });


            this.map.addLayer({
                'id': 'gridCursor',
                'type': 'line',
                'source': 'gridCursor',
                'layout': {},
                'paint': {
                    'line-color': this.theme.palette.secondary.main,
                    'line-width': 3,
                    'line-offset': -5

                }
            });
        } catch (e) {}


    }

    highlightCategory(input) {
        this.map.setPaintProperty("gridLayer", 'fill-color', {
            property: input.category.key,
            stops: [
                [input.category.min, this.colorMin],
                [input.category.max, this.colorMax]
            ]
        });
    }
    loadSet(input) {
        fetch(input)
            .then((res) => res.json())
            .then((data) => {
                this.baseDataset = data;
                this.map.getSource("gridSource").setData(this.baseDataset);
            })

        return this;
    }

    setData(input) {
        this.baseDataset = input;
        this.map.getSource("gridSource").setData(this.baseDataset);
        return this;
    }
    setHighlightCallback(cb) {
        this.highlightCallback = cb;
    }
    setVisibility(input) {
        this.map.setLayoutProperty(
            "gridLayer",
            "visibility",
            input ? "visible" : "none"
        )
    }




}
export default GenerateGrid;