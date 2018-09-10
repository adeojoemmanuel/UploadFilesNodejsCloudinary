'use strict'

const cloudinary = require('cloudinary')

cloudinary.config(require(`${__dirname}/credentials/cloudinary_storage.json`))

const UploadStorageCloudinary = (files) => {

  let prom = new Promise((resolve, reject) => {

    let arrayFile = []

    if (files.length <= 0)
      reject('Not file')

    files.map((file, index) => {

      let nameFile = `${Date.now()}${index}`

      const resource_type = file.mimetype
        .includes('image') ? 'image' : 'video';

      cloudinary.uploader.upload_stream(

        result => {

          if (JSON.stringify(result).includes('error'))
            reject(result)

          const url = result.secure_url

          arrayFile.push({
            _id: nameFile.toString(),
            url: url,
            type: file.mimetype
          })

          if (arrayFile.length == (files.length))
            resolve(arrayFile)

        }, { resource_type: resource_type }).end(file.buffer)

    })

  })

  return prom

}

exports.AddFile = async (req, res) => {

  try {

    let { files } = req

    if (files.length > 0) {
      const response = await UploadStorageCloudinary(files)
      return res.status(200).send(response)
    }

    return res.status(400).send({
      status: 'File required'
    })

  } catch (error) {

    return res.status(400).send({
      status: 'an error has ocurred'
    })

  }

}