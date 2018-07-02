'use strict'

const express = require('express');
const app = express();

const cloudinary = require('cloudinary');
const formidable = require('formidable');
const config = require('./config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

cloudinary.config(config.credentials);

app.post('/uploadfile', (req, res) => {

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {

        const _file = files.file;
        const sizeLimit = config.sizeLimit;

        if (_file == undefined)
            return res.status(200).send(config.messages.ERROR);

        if (_file.size >= sizeLimit || files == {}) {
            return res.status(200).send(config.messages.FILE_EXCEEDED_LIMIT);
        }

        cloudinary.uploader.upload(files.file.path, (result) => {
            res.status(200).send(result);
        })

    })

})

app.listen(config.port, () => {
    console.log(config.messages.SERVER_START, config.port);
})


