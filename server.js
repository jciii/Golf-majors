import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {
  getAllMastersWinners, getMastersWinnerByYear, createMastersWinner, createMastersYear, editWinner
} from './controllers/masters'
import {
  getAllOpenWinners, getOpenWinnerByYearOrCourse, createOpenWinner, createOpenYear
} from './controllers/open'
import {
  getAllUsOpenWinners, getUsOpenWinnerByYearOrCourse, createUsOpenWinner, createUsOpenYear
} from './controllers/us'
import {
  getAllPGAWinners, getPGAWinnerByYearOrCourse, createPGAWinner, createPGAYear,
} from './controllers/pga'
import { getSingleMajor, getAllMajors } from './controllers/allMajors'
const app = express()

app.use(express.static('public'))

app.get('/api/majors', getAllMajors)
app.get('/api/majors/:identifier', getSingleMajor)


app.get('/api/masters/:identifier', getAllMastersWinners)
app.get('/api/masters/:identifier', getMastersWinnerByYear)
app.post('/api/masters/winnerAdd', bodyParser.json(), createMastersWinner)
app.post('/api/masters/yearsAdd', bodyParser.json(), createMastersYear)

app.get('/api/pga', getAllPGAWinners)
app.get('/api/pga/:identifier', getPGAWinnerByYearOrCourse)
app.post('/api/pga/winnerAdd', bodyParser.json(), createPGAWinner)
app.post('/api/pga/yearsAdd', bodyParser.json(), createPGAYear)

app.get('/api/usopen', getAllUsOpenWinners)
app.get('/api/usopen/:identifier', getUsOpenWinnerByYearOrCourse)
app.post('/api/usopen/winnerAdd', bodyParser.json(), createUsOpenWinner)
app.post('/api/usopen/yearsAdd', bodyParser.json(), createUsOpenYear)

app.get('/api/open/:identifier', getAllOpenWinners)
app.get('/api/open/:identifier', getOpenWinnerByYearOrCourse)
app.post('/api/open/winnerAdd', bodyParser.json(), createOpenWinner)
app.post('/api/open/yearsAdd', bodyParser.json(), createOpenYear)

app.put('/api/masters/:editKey', bodyParser(), editWinner)
app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))
app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on 1337....')
})
