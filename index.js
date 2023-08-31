const express = require('express')
const app = express()
app.use(express.json())
//step 7: adding morgan for logging
const morgan = require('morgan')
app.use(morgan('tiny'))
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
  })
  //step9-10: cross-origins requests
const cors = require('cors')
app.use(cors())
//step11: adding the front-end
app.use(express.static('dist'))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//step1: persons page, showing the hardcoded list of phonebook entries
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//step2: info page showing the information and the date the request was received
app.get('/info', (req, res) => {
    let display =
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
        res.send(display)
})

//step3: displaying the infos for a single phonebook entry
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  
  })

  //step4: implementing the delete functionality
  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id) //we need to turn this into a number otherwise the programm reads 1 === '1' which throws an error
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  })

  //step5: implementing POST, adding a new person
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id)) 
      : 0 
    return maxId + 1
  }
  app.post('/api/persons/', (req, res) => {
    const body = req.body 
  //step6: error thrown if number or name are missing
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } /*else if (persons.name.toLowerCase === person.name) { 
        return res.status(409).json({
            error: 'name must be unique'
        })
    }*/
    
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    persons = persons.concat(person)
    res.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  