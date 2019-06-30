const express = require('express');
const add = require('./add');
const getAll = require('./get-all');
const getAllHead = require('./get-all-head');
const update = require('./update');
const deleteContact = require('./delete');
const get = require('./get');
const download = require('./download');
const upload = require('./upload');

const multer = require('multer');
const storage = multer.memoryStorage();
const multerMiddleware = multer({storage, limits: {filesize: 256000}});

module.exports.create = services => {
    const router = express.Router();
    router.head('/', getAllHead(services));
    router.get('/', getAll(services));
    router.get('/download', download(services));
    router.post('/upload', multerMiddleware.single('file'), upload(services));
    router.post('/', add(services));
    router.get('/:id', get(services));
    router.put('/:id', update(services));
    router.delete('/:id', deleteContact(services));
    return router;
};
