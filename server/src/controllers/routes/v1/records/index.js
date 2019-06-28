const express = require('express');
const addRecord = require('./add-record');
const getAllRecord = require('./get-all-record');
const updateRecord = require('./update-record');
const deleteRecord = require('./delete-record');
const getRecord = require('./get-record');
const downloadRecord = require('./download-record');
const uploadRecord = require('./upload-record');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage, limits: {filesize: 256000}});

module.exports.create = services => {
    const router = express.Router();
    router.get('/', getAllRecord(services));
    router.get('/download', downloadRecord(services));
    router.post('/upload', upload.single('file'), uploadRecord(services));
    router.post('/', addRecord(services));
    router.get('/:id', getRecord(services));
    router.put('/:id', updateRecord(services));
    router.delete('/:id', deleteRecord(services));
    return router;
};
