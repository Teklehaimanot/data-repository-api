const Dataset = require('./dataset.model')

const createOne = async(req, res) => {
    const dataset = new Dataset({
        dataset_name: req.body.dataset_name,
        data_type: req.body.data_type,
        sample_size: req.body.sample_size,
        area_coverage: req.body.area_coverage,
        sex_coverage: req.body.sex_coverage,
        data_collection_start_date: req.body.data_collection_start_date,
        data_collection_end_date: req.body.data_collection_end_date,
        study_type: req.body.study_type,

    })

    try {
        const newDataset = await dataset.save()
        res.status(200).json({
            success: true,
            dataset: newDataset
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const getAll = async(req, res) => {
    console.log(__dirname)
    try {
        const datasets = await Dataset.find()
        res.status(200).json({
            success: true,
            dataset: datasets
        })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }

}

const datasetUpdate = async(req, res) => {
    try {
        const find = await Dataset.findById({ _id: req.params.datasetId })
        if (!find) {
            return res.status(404).json({ error: 'dataset not found' })
        }
        const updateDataset = await Dataset.updateOne({ _id: req.params.datasetId }, {
            $set: {
                dataset_name: req.body.dataset_name,
                data_type: req.body.data_type,
                sample_size: req.body.sample_size,
                area_coverage: req.body.area_coverage,
                sex_coverage: req.body.sex_coverage,
                data_collection_start_date: req.body.data_collection_start_date,
                data_collection_end_date: req.body.data_collection_end_date,
                study_type: req.body.study_type
            }
        })
        res.status(200).json({
            success: true,
            dataset: updateDataset
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const removeDataset = async(req, res) => {
    try {
        const find = await Dataset.findById({ _id: req.params.datasetId })
        if (!find) {
            return res.status(404).json({ error: 'dataset not found' })
        }
        const DeletedDataset = await Dataset.deleteOne({ _id: req.params.datasetId })
        res.status(200).json({
            success: true,
            dataset: DeletedDataset
        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const fileUpload = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ message: 'No file Uploaded' })
    }
    const file = req.files.file
    file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
    res.status(200).json({ fileName: file.name, filePath: `/uploads/${file.name}` })

}

module.exports = {
    createOne,
    getAll,
    datasetUpdate,
    removeDataset,
    fileUpload
}