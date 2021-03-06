const express = require('express')
const datasetController = require('./dataset.controller')
const datasetRouter = express.Router()

/*
// @params none
// method post
//auth private
//All many  items
*/
datasetRouter.post('/', datasetController.createOne)

/*
// @params none
// method get
//auth private
// get all items
 */
datasetRouter.get('/', datasetController.getAll)


/*
// @params datasetId
// method put
//auth private
// get all items
 */
datasetRouter.put('/:datasetId', datasetController.datasetUpdate)



/*
// @params datasetId
// method delete
//auth private
// get all items
 */
datasetRouter.delete('/:datasetId', datasetController.removeDataset)

/*
// @params none
// method post
//auth private
// upload file
 */
datasetRouter.post('/upload', datasetController.fileUpload)

/*
// @params none
// method get
//auth private
// download file
 */
datasetRouter.post('/download', datasetController.downloadFile)

module.exports = datasetRouter