const fs = require("fs");
const input = JSON.parse(fs.readFileSync('activity_potential.geojson'));

input.features.forEach(feature => {
    delete feature.properties.x;
    delete feature.properties.y;
    feature.properties.potential = feature.properties['var1.pred'];
    delete feature.properties['var1.pred'];

});

fs.writeFileSync('activity_potential_reduced.geojson', JSON.stringify(input, null, 2))