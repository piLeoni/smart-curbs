const turf = require("@turf/turf");

const fs = require("fs");

const baseDataset = JSON.parse(fs.readFileSync('bus_lignes.geojson'));
const clippingArea = turf.ellipse([2.3423825, 48.8669678], 3, 3);

const selectedLines = []

turf.featureEach(baseDataset, (feature) => {
    feature.geometry.coordinates.forEach(lineGeometry => {

        const lineFeataure = turf.lineString(lineGeometry);
        const within = turf.booleanWithin(lineFeataure, clippingArea);
        const intersection = turf.booleanCrosses(lineFeataure, clippingArea);

        if ((within || intersection) && turf.length(lineFeataure) > 3) {
            selectedLines.push(lineFeataure);
        }
    });
})


const linesCollection = turf.featureCollection(selectedLines);
fs.writeFileSync('bus_lines_reduced.geojson', JSON.stringify(linesCollection, null, 2))