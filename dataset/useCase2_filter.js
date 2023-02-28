const fs = require("fs");
const _ = require("lodash");
const source = JSON.parse(fs.readFileSync('./useCase2_0309.geojson', 'utf-8'));

// console.log(Object.values(categories))


const sourceFlat = _.cloneDeep(source);

sourceFlat.features.forEach(f => {
    f.geometry.coordinates.forEach(circle => {
        circle.forEach(point3D => {
            point3D.pop();
        })
    })
})


//             { label: 'RECREATION', key: 'RECREATION', max: 3.0229771 },
// { label: 'TRANSPORT', key: 'TRANSPORT', max: 4.7167411 },
// { label: 'RESIDENTIAL', key: 'RESIDENTIA', max: 0.6470588 },
// { label: 'RETAIL', key: 'RETAIL', max: 0.9442124 },


const filtered = [];
sourceFlat.features.forEach((f, index) => {

    let alreadyPresent = false;
    filtered.forEach(sf => {
        if (_.isEqual(sf.geometry, f.geometry)) {
            alreadyPresent = true;
            f.properties.cluster_new === 'RESIDENTIAL' ? sf.properties.residential++ : null;
            f.properties.cluster_new === 'TRANSPORT' ? sf.properties.transport++ : null;
            f.properties.cluster_new === 'RECREATION' ? sf.properties.recreation++ : null;
            f.properties.cluster_new === 'RETAIL' ? sf.properties.retail++ : null;
        }
    })

    if (!alreadyPresent) {
        // "activeScore": 44,
        // "cluster_new": "RESIDENTIAL",
        f.properties.residential = f.properties.cluster_new === 'RESIDENTIAL' ? 1 : 0;
        f.properties.transport = f.properties.cluster_new === 'TRANSPORT' ? 1 : 0;
        f.properties.recreation = f.properties.cluster_new === 'RECREATION' ? 1 : 0;
        f.properties.retail = f.properties.cluster_new === 'RETAIL' ? 1 : 0;

        filtered.push(f)
    }
    console.log(`${Math.round(100 / sourceFlat.features.length * index)}%`)
});

source.features = filtered;
console.log('features', filtered.length)
fs.writeFileSync('useCase2_filtered.geojson', JSON.stringify(source, null, 2))

const categories = {
    residential: { label: 'residential', key: 'residential', max: 0 },
    transport: { label: 'transport', key: 'transport', max: 0 },
    recreation: { label: 'recreation', key: 'recreation', max: 0 },
    retail: { label: 'retail', key: 'retail', max: 0 }
};
source.features.forEach(f => {
    f.properties.residential > categories.residential.max ? categories.residential.max = f.properties.residential : null;
    f.properties.transport > categories.transport.max ? categories.transport.max = f.properties.transport : null;
    f.properties.recreation > categories.recreation.max ? categories.recreation.max = f.properties.recreation : null;
    f.properties.retail > categories.retail.max ? categories.retail.max = f.properties.retail : null;
})

console.log(Object.values(categories))