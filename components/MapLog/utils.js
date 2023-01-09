// import { useTheme } from "@mui/material/styles"

function createLayers(map, theme) {

    // const theme = useTheme();
    map.addSource('busSamples', {
        type: 'geojson',
        // lineMetrics: true,
        data: null
    });

    map.addLayer({
        'id': 'busSamples',
        'type': 'circle',
        'source': 'busSamples',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': `red`,
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [12, 2],
                    [22, 35]
                ]
            }
        }
    });


    map.addSource('busLiveTrace', {
        type: 'geojson',
        lineMetrics: true,
        data: null
    });

    map.addLayer({
        id: 'busLiveTrace',
        type: 'line',
        source: 'busLiveTrace',
        paint: {
            'line-width': 5,
            'line-gradient': [
                'interpolate', ['linear'],
                ['line-progress'],
                0,
                `rgba(255,255,255,0)`,
                1,
                theme.palette.secondary.main
            ]
        },
        'layout': {
            'visibility': 'none',
            'line-cap': 'round',
            'line-join': 'round'
        }
    });

    map.addSource('busLine', {
        type: 'geojson',
        data: null
    });
    map.addLayer({
        'id': 'busLine',
        'type': 'fill',
        'source': 'busLine', // reference the data source
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': theme.palette.secondary.main, // blue color fill
            'fill-opacity': 0.85
        }
    });

    map.addSource('busLineHighlight', {
        type: 'geojson',
        data: null
    });
    map.addLayer({
        'id': 'busLineHighlight',
        'type': 'line',
        'source': 'busLineHighlight', // reference the data source

        'paint': {
            'line-color': theme.palette.secondary.main,
            'line-width': 3,
            'line-offset': -5

        }
    });

    map.addSource('busStops', {
        type: 'geojson',
        data: null
    });
    map.addLayer({
        'id': 'busStops',
        'type': 'fill',
        'source': 'busStops', // reference the data source

        'paint': {
            'fill-color': theme.palette.secondary.main, // blue color fill
            'fill-opacity': [
                'match', ['get', 'sampled'],
                'false',
                0,
                'true',
                0.25,
                0
            ]
        }
    });

    map.addSource('pointsAroundStop', {
        type: 'geojson',
        data: null
    });

    map.addLayer({
        'id': 'pointsAroundStop',
        'type': 'circle',
        'source': 'pointsAroundStop',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': theme.palette.secondary.main,
            'circle-opacity': 0.35,
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [12, 2],
                    [22, 10]
                ]
            }
        }
    });

    map.addSource('selectedPointStop', {
        type: 'geojson',
        data: null
    });


    map.addLayer({
        'id': 'selectedPointStop',
        'type': 'line',
        'source': 'selectedPointStop', // reference the data source

        'paint': {
            'line-color': theme.palette.secondary.main,
            'line-width': 3,
            'line-offset': -5
        }
    });

    // map.addLayer({
    //     'id': 'selectedPointStop',
    //     'type': 'circle',
    //     'source': 'selectedPointStop',
    //     'layout': {
    //         'visibility': 'none'
    //     },
    //     'paint': {
    //         'circle-color': theme.palette.secondary.main,
    //         'circle-opacity': 1,
    //         'circle-radius': {
    //             'base': 2,
    //             'stops': [
    //                 [12, 5],
    //                 [22, 35]
    //             ]
    //         }
    //     }
    // });

    // map.addSource('useCase2Afternoon', {
    //     type: 'geojson',
    //     data: null
    // });

    // map.addLayer({
    //     'id': 'useCase2Afternoon',
    //     'type': 'circle',
    //     'source': 'useCase2Afternoon',
    //     'layout': {
    //         'visibility': 'none'
    //     },
    //     'paint': {
    //         'circle-color': `blue`,
    //         'circle-radius': {
    //             'base': 1.75,
    //             'stops': [
    //                 [12, 2],
    //                 [22, 35]
    //             ]
    //         }
    //     }
    // });

    map.addSource('useCase2', {
        type: 'geojson',
        data: null
    });
    map.addLayer({
        'id': 'useCase2',
        'type': 'fill-extrusion',
        'source': 'useCase2', // reference the data source
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': theme.palette.secondary.main,
            'fill-extrusion-height': ['get', 'activeScore'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.7


        }
    });

    map.addSource('useCase2Highlight', {
        type: 'geojson',
        data: null
    });
    map.addLayer({
        'id': 'useCase2Highlight',
        'type': 'line',
        'source': 'useCase2Highlight', // reference the data source

        'paint': {
            'line-color': theme.palette.secondary.main,
            'line-width': 3,
            'line-offset': -5
        }
    });


    map.addSource('useCase3Morning', {
        type: 'geojson',
        data: null
    });
    map.addSource('useCase3Afternoon', {
        type: 'geojson',
        data: null
    });
    map.addSource('useCase3', {
        type: 'geojson',
        data: null
    });


    map.addLayer({
        'id': 'useCase3',
        'type': 'fill',
        'source': 'useCase3', // reference the data source
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'radius'],
                0,
                theme.palette.success.main,
                0.2,
                theme.palette.secondary.main
            ],
            'fill-opacity': 0.5
        }
    });
    map.addSource('useCase3Highlight', {
        type: 'geojson',
        data: null
    });


    map.addLayer({
        'id': 'useCase3Highlight',
        'type': 'line',
        'source': 'useCase3Highlight', // reference the data source
        'paint': {
            'line-color': theme.palette.secondary.main,
            'line-width': 3,
            'line-offset': -5
        }
    });



    // map.addLayer({
    //     'id': 'useCase3',
    //     'type': 'circle',
    //     'source': 'useCase3Morning',
    //     'layout': {
    //         'visibility': 'none'
    //     },
    //     'paint': {
    //         'circle-color': `red`,
    //         'circle-radius': {
    //             'base': 10,
    //             'stops': [
    //                 [12, 2],
    //                 [22, 35]
    //             ]
    //         }
    //     }
    // });


}

async function fetchSource(input) {
    console.log("fetching", `${process.env.NEXT_PUBLIC_BASE_PATH}/dataset/${input.path}`)
    const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/dataset/${input.path}`);
    const data = await raw.json();
    return { source: input.source, data };
}

function fetchAllSources(sources) {
    return new Promise((res, rej) => {
        const all = [];
        sources.forEach(p => all.push(fetchSource(p)))
        Promise.all([...all]).then(values => [
            res(values)
        ])
    })

}

function feedData(sources, map) {
    sources.forEach(s => {
        if (s.source) map.getSource(s.source).setData(s.data);
    })
}
export { createLayers, fetchSource, fetchAllSources, feedData }