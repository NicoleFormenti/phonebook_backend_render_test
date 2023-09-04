const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
//It's not a good idea to hardcode the address of the database into the code, so instead the address of the database is passed to the application via the MONGODB_URI environment variable.
const url = process.env.MONGODB_URI

console.log('connecting to', url)

//extracting the Mongoose-specific code into its own module

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
  },
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', entrySchema)