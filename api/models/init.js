const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb://0.0.0.0:27017")

  .then(() => {
    console.log('Successfully connected to database')
  })

  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
