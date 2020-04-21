const express = require('express')
const golfMajors = require('./golfmajors')
const app = express()

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  return response.render('index', { golfMajors })
})
app.get('/masters', (request, response) => {
  return response.render('masters')
})
app.all('*', (request, response) => {
  return response.sendStatus(404)
})
app.listen(7142, () => {
  console.log('Listening on 7142...')
})
