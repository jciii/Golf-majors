const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/majors', (request, response) => {
  return response.render('index')
})
app.get('/masters', (request, response) => {
  return response.render('masters')
})
app.get('/pga', (request, response) => {
  return response.render('pga')
})
app.get('/usopen', (request, response) => {
  return response.render('usopen')
})
app.get('/open', (request, response) => {
  return response.render('open')
})
app.all('*', (request, response) => {
  return response.sendStatus(404)
})
app.listen(7142, () => {
  console.log('Listening on 7142...')
})
