const turf = require("@turf/turf")

var bbox = [-95, 30, -85, 40];
var cellSide = 50;
var options = { units: 'miles' };

var squareGrid = turf.squareGrid(bbox, cellSide, options);