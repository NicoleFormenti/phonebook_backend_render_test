const mongoose = require('mongoose')
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = "mongodb+srv://nformentipedroia:PhoneBook@cluster0.ztq56g9.mongodb.net/personsEntry?retryWrites=true&w=majority"

mongoose.set('strictQuery',false)
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

const entry = new Entry({
  name: 'Annabelle Belle',
  number: '32482389',
})

Entry.find({}).then(result => {
  result.forEach(entry => {
    console.log(entry)
  })
  mongoose.connection.close()
})