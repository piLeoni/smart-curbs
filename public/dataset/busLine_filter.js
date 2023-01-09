const fs = require("fs");

const source = JSON.parse(fs.readFileSync('./busLine.geojson', 'utf-8'));


const ranges = {...source.features[0].properties };

source.features.forEach(f => {
    Object.keys(f.properties).forEach(k => {
        if (f.properties[k] > ranges[k]) ranges[k] = f.properties[k];
    })
});


// console.log(Object.values(ranges).length)
source.features.forEach(f => {
        Object.values(ranges).forEach(v => {
            if (Number.isNaN(v)) console.log('error')
            if (!v) console.log('error')

        })

    })
    // console.log(Object.keys(ranges).map(k => ({ label: k, key: k, , max: ranges[k] })))