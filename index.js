const express = require('express')
const app = express()
// eslint-disable-next-line no-unused-vars
const bodyParser = require('body-parser')
const { getAllMastersWinners, getMastersWinnerByName, createWinner, createYear } = require('./controllers/masters')
const { getAllOpenWinners, getOpenWinnerByName } = require('./controllers/open')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/majors', (request, response) => {
  return response.render('index')
})
app.get('/masters', getAllMastersWinners)
app.get('/masters/:identifier', getMastersWinnerByName)
app.post('/masters', createWinner, createYear)
// app.put('/masters', editWinners, editYears)

app.get('/pga')

app.get('/usopen', (request, response) => {
  return response.render('usopen')
})
app.get('/open', getAllOpenWinners)
app.get('/open/:identifier', getOpenWinnerByName)


app.listen(7142, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on 7142....')
})
