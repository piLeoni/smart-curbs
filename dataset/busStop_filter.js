const fs = require("fs");
const turf = require("@turf/turf");
const source = JSON.parse(fs.readFileSync('./useCase3_morning_peak.geojson', "utf8"));


const selectedStops = [
    "Châtelet - Quai de Gesvres",
    "Saint-André Des Arts",
    "Sèvres - Babylone",
    "Hôpital Des Enfants Malades",
    "Péclet",
    "Place du Docteur Hayem - Radio France",
]

const indexed = [];
source.features.forEach(f => {
    if (selectedStops.includes(f.properties.stopName)) {
        indexed.push({ label: f.properties.stopName, key: f.properties.stopName, coordinates: f.geometry.coordinates })
    }
})

console.log(indexed);
source.features
    .forEach(f => {
        f.properties = { stopName: f.properties.stopName, sampled: selectedStops.includes(f.properties.stopName) ? 'true' : 'false' }
        f.geometry = turf.ellipse(f.geometry.coordinates, 0.05, 0.05).geometry;
    })
    // .filter(f => selectedStops.includes(f.properties.stopName))


fs.writeFileSync('busStops.geojson', JSON.stringify(source, null, 2))