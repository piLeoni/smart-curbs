const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const geojson = require("geojson");
const db = new sqlite3.Database('test.db');
const turf = require("turf");
const helpers = require("@turf/helpers")

const topojson = require("topojson-server");

let sql = `SELECT * FROM messages WHERE lat != 'null' AND speed >= 3 ORDER BY sampleTime ASC`;

const features = [];
let index = 0;
let oldPoint = null;
let totalDistance = 0;

let counter = {
    countWalkStand: 0,
    countCar: 0,
    countVan: 0,
    countBus: 0,
    countMotorcycle: 0,
    countRidingBike: 0,
    countChildren: 0,
    countSkateboarder: 0,
    countQueuing: 0,
    countSit: 0,
    countTruck: 0,
    countRidingScooter: 0
}

db.each(sql, [], (err, row) => {
        if (err) {
            throw err;
        }
        row.sampleTime = new Date(row.sampleTime).getTime()
        if (index === 0) {
            row.distance = 0;
            oldPoint = [row.lon, row.lat]

        } else {
            row.distance = parseFloat(turf.distance(oldPoint, [row.lon, row.lat]).toFixed(5))
            totalDistance += row.distance;
        }
        row.totalDistance = parseFloat(totalDistance.toFixed(5));
        row.lat = parseFloat(row.lat.toFixed(6))
        row.lon = parseFloat(row.lon.toFixed(6))

        counter.countWalkStand += row.countWalkStand;
        counter.countCar += row.countCar;
        counter.countVan += row.countVan;
        counter.countBus += row.countBus;
        counter.countMotorcycle += row.countMotorcycle;
        counter.countRidingBike += row.countRidingBike;
        counter.countChildren += row.countChildren;
        counter.countSkateboarder += row.countSkateboarder;
        counter.countQueuing += row.countQueuing;
        counter.countSit += row.countSit;
        counter.countTruck += row.countTruck;
        counter.countRidingScooter += row.countRidingScooter;
        for (let key of Object.keys(counter)) {

            counter[key] += row[key];
        }
        row.counts = Object.values(counter).join(",");


        features.push(geojson.parse(row, {
            Point: ['lat', 'lon'],
            include: [
                'sampleTime',
                'speed',
                'distance',
                'totalDistance',
                'counts',
                // 'countWalkStand',
                // 'countCar',
                // 'countVan',
                // 'countBus',
                // 'countMotorcycle',
                // 'countRidingBike',
                // 'countChildren',
                // 'countSkateboarder',
                // 'countQueuing',
                // 'countSit',
                // 'countTruck',
                // 'countRidingScooter'
            ]
        }));
        oldPoint = [row.lon, row.lat];
        index++;
    },
    () => {
        features.forEach((feature, i) => {
            if (i < features.length - 1) {
                feature.properties.bearing = parseFloat(turf.bearing(feature.geometry.coordinates, features[i + 1].geometry.coordinates).toFixed(3));
            } else {
                feature.properties.bearing = features[i - 1].properties.bearing;
            }
        })
        fs.writeFileSync('baseDataset.geojson', JSON.stringify({ type: 'FeatureCollection', features: features }, null, 2));
        const compressed = topojson.topology(features)
        fs.writeFileSync('baseDataset.topojson', JSON.stringify(compressed, null, 2));
    });