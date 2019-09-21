var mongoose = require("mongoose");
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

var DataSchema = mongoose.Schema({

    X: { type: Array, required: true },
    Y: { type: Array, required: true },
    XX: { type: Array, required: true },
    YY: { type: Array, required: true },
    XY: { type: Array, required: true },

    sumX: { type: SchemaTypes.Double, required: true },
    sumY: { type: SchemaTypes.Double, required: true },
    sumXX: { type: SchemaTypes.Double, required: true },
    sumYY: { type: SchemaTypes.Double, required: true },
    sumXY: { type: SchemaTypes.Double, required: true },

    avgX: { type: SchemaTypes.Double, required: true },
    avgY: { type: SchemaTypes.Double, required: true },
    avgXX: { type: SchemaTypes.Double, required: true },
    avgYY: { type: SchemaTypes.Double, required: true },
    avgXY: { type: SchemaTypes.Double, required: true },

    length: { type: Number, required: true },

    r: { type: SchemaTypes.Double, required: true },
    date: {
        type: Date,
        default: new Date()
    }
});

var DATA = mongoose.model('DATA', DataSchema, 'data');
module.exports = DATA;