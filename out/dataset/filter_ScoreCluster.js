const fs = require("fs");
const geojson = require("geojson");

const input = JSON.parse(fs.readFileSync('grid_scores_cluster_fixed.geojson'));

// "id": 10268,
//         "grid_area": 10002.68,
//         "unique_id": 10267,
//         "curb_lengt": 0,
//         "curb_parki": 0,
//         "builtarea": 0,
//         "height_ave": 0,
//         "road_area": 0,
//         "terrace_ar": 0,
//         "tree_count": 0,
//         "tree": 0,
//         "road": 0,
//         "sky": 0,
//         "sidewalk": 0,
//         "poi_var": 0,
//         "poi_count": 0,
//         "bikelane_l": 0,
//         "bus_st_cou": 0,
//         "bike_st_co": 0,
//         "ward_clust": 0,
//         "cluster": 0,
//         "activity_a": 0,
//         "connected_nodes": 1,
//         "urban_hotspots": 0,
//         "calm_street": 0,
//         "open_corridor": 0,
//         "green_zones": 0,
//         "multimodal_hubs": 0

function emptyFeature(input) {
    let output = true;

    const noParse = ['id', 'grid_area', "unique_id", "connected_nodes", "activity_a"]

    Object.keys(input).forEach(key => {
        if (input[key] > 0 && !noParse.includes(key)) {
            output = false
        }
    })
    return output;
}

console.log("before", input.features.length)
input.features = input.features.filter(feature => !emptyFeature(feature.properties))
console.log("before", input.features.length)

// console.log(input)
const categories = [
    "connected_nodes",
    "urban_hotspots",
    "calm_street",
    "open_corridor",
    "green_zones",
    "multimodal_hubs"
];



input.features.map(feature => {
    const expanded_ward_clust = {};
    categories.forEach((category, index) => {
        expanded_ward_clust[category] = feature.properties.ward_clust === index ? 1 : 0;
    })
    feature.properties = {...feature.properties, ...expanded_ward_clust };
})



const categoriesRanges = [
    ...Object.keys(input.features[0].properties)
    .map(property => {
        return {
            key: property,
            label: property.split('_').join(' '),
            min: 0,
            max: 0
        }
    })
];

input.features.forEach(feature => {
    for (property in feature.properties) {
        const accumulator = categoriesRanges.find(el => el.key === property);
        if (feature.properties[property] > accumulator.max) accumulator.max = Math.ceil(feature.properties[property])
        if (feature.properties[property] < accumulator.min) accumulator.min = Math.ceil(feature.properties[property])
    }
})





fs.writeFileSync('grid_scores_ranges.geojson', JSON.stringify(categoriesRanges, null, 2));
fs.writeFileSync('grid_scores_filtered_updated.geojson', JSON.stringify(input, null, 2));