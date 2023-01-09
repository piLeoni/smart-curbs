// import { lineString, lineSliceAlong } from '@turf/turf'

import { cloneDeep } from "lodash";
class GenerateSamples {

    constructor(input) {

        this.baseDataset = input.dataset;
        this.coordinatesArray = input.dataset.features.map((point) => point.geometry.coordinates);
        // this.lineString = null;
        this.map = input.map;
        this.slicedArray = null;
        this.traceIndexStart = 0;
        this.traceIndexEnd = 0;
        this.palette = input.palette;

    }


    updateTrace(input) {
        this.traceIndexEnd += input.increment;
        this.traceIndexStart = this.traceIndexEnd > input.buffer ? this.traceIndexEnd - input.buffer : 0;
        if (this.traceIndexEnd > this.coordinatesArray.length - 1) {
            this.traceIndexEnd = 0;
            this.traceIndexStart = 0;
        }

        this.slicedArray = this.coordinatesArray.slice(this.traceIndexStart, this.traceIndexEnd + 1);
        return this;
    }
    drawTrace() {
        const data = {
            type: "Feature",
            properties: {},
            geometry: {
                coordinates: this.slicedArray,
                type: "LineString",
            }
        };
        this.map.getSource('busLiveTrace').setData(data);
        return this;
    }
    getCurrentSample() {

        const countFields = [
            'countWalkStand',
            'countCar',
            'countVan',
            'countBus',
            'countMotorcycle',
            'countRidingBike',
            'countChildren',
            'countSkateboarder',
            'countQueuing',
            'countSit',
            'countTruck',
            'countRidingScooter'
        ]
        const samples = {};

        const countValues = this.baseDataset.features[this.traceIndexEnd].properties.counts.split(",");
        countFields.forEach((key, index) => {
            samples[key] = parseInt(countValues[index]);
        })
        samples.index = this.traceIndexEnd;
        const localSample = cloneDeep(this.baseDataset.features[this.traceIndexEnd])
            // this.baseDataset.features[this.traceIndexEnd].properties.samples = samples;
        localSample.properties.samples = samples;

        return localSample;
    }


}
export default GenerateSamples;