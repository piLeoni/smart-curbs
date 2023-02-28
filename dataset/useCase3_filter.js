const fs = require('fs');
const morning = JSON.parse(fs.readFileSync('./useCase3_morning_peak.geojson', 'utf8'));
const afternoon = JSON.parse(fs.readFileSync('./useCase3_afternoon_peak.geojson', 'utf8'));


// { "type": "Feature", "properties": { "stopName": "Bac - Saint-Placide", "speed": 10.061914893617017, "vehicle_count": 0.17446808510638298, "active_count": 1.7361702127659575 }, "geometry": { "type": "Point", "coordinates": [ 2.323023663547971, 48.849597306080021 ] } },

// console.log(morning.features.map(e => ({
//     label: e.properties.stopName,
//     key: e.properties.stopName,
//     coordinates: e.geometry.coordinates
// })))

const categories = {
    speed: { label: 'speed', key: 'speed', max: 0 },
    vehicle_count: { label: 'vehicles count', key: 'vehicle_count', max: 0 },
    active_count: { label: 'active count', key: 'active_count', max: 0 }
}

morning.features.forEach(e => {
    if (e.properties.speed > categories.speed.max) categories.speed.max = e.properties.speed;
    if (e.properties.vehicle_count > categories.vehicle_count.max) categories.vehicle_count.max = e.properties.vehicle_count;
    if (e.properties.active_count > categories.active_count.max) categories.active_count.max = e.properties.active_count;

})
afternoon.features.forEach(e => {
    if (e.properties.speed > categories.speed.max) categories.speed.max = e.properties.speed;
    if (e.properties.vehicle_count > categories.vehicle_count.max) categories.vehicle_count.max = e.properties.vehicle_count;
    if (e.properties.active_count > categories.active_count.max) categories.active_count.max = e.properties.active_count;
})

console.log(Object.values(categories));