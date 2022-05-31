const mongoose = require('mongoose')

const datasetSchema = {
    dataset_name: {
        type: String,
        required: true
    },
    data_type: {
        type: String,
        required: true
    },
    sample_size: {
        type: Number,
        required: true
    },
    area_coverage: {
        type: String,
        required: true
    },
    sex_coverage: {
        type: String,
        required: true
    },
    data_collection_start_date: {
        type: Date,
        required: true
    },
    data_collection_end_date: {
        type: Date,
        required: true
    },
    study_type: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true,
        unique: true
    }
}

module.exports = mongoose.model('dataset', datasetSchema)