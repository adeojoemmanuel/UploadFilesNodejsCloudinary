'use strict'

const { resolve } = require('path');

const messages = {
  ERROR: {
    message: 'An error has ocurred'
  },
  FILE_EXCEEDED_LIMIT: {
    message: 'The file has exceeded the allowed limit'
  },
  SERVER_START: 'Server running in port %s'
}

module.exports = {
  sizeLimit: 23464400,
  port: 3000,
  credentials: require(resolve('./credentials/cloudinary.json')),
  messages
}