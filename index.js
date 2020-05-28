const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {
  getAllMastersWinners, getMastersWinnerByYear, createMastersWinner, createMastersYear, editWinner
} = require('./controllers/masters')
const {
  getAllOpenWinners, getOpenWinnerByYearOrCourse, createOpenWinner, createOpenYear
} = require('./controllers/open')
const {
  getAllUsOpenWinners, getUsOpenWinnerByYearOrCourse, createUsOpenWinner, createUsOpenYear
} = require('./controllers/us')
const {
  getAllPGAWinners, getPGAWinnerByYearOrCourse, createPGAWinner, createPGAYear,
} = require('./controllers/pga')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/majors', (request, response) => {
  return response.render('index')
})

app.get('/masters', getAllMastersWinners)
app.get('/masters/:identifier', getMastersWinnerByYear)
app.post('/masters/winnerAdd', bodyParser.json(), createMastersWinner)
app.post('/masters/yearsAdd', bodyParser.json(), createMastersYear)

app.get('/pga', getAllPGAWinners)
app.get('/pga/:identifier', getPGAWinnerByYearOrCourse)
app.post('/pga/winnerAdd', bodyParser.json(), createPGAWinner)
app.post('/pga/yearsAdd', bodyParser.json(), createPGAYear)

app.get('/usopen', getAllUsOpenWinners)
app.get('/usopen/:identifier', getUsOpenWinnerByYearOrCourse)
app.post('/usopen/winnerAdd', bodyParser.json(), createUsOpenWinner)
app.post('/usopen/yearsAdd', bodyParser.json(), createUsOpenYear)

app.get('/open', getAllOpenWinners)
app.get('/open/:identifier', getOpenWinnerByYearOrCourse)
app.post('/open/winnerAdd', bodyParser.json(), createOpenWinner)
app.post('/open/yearsAdd', bodyParser.json(), createOpenYear)

app.put('/masters/:editKey', bodyParser(), editWinner)

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on 1337....')
})
