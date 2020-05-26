const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')

const WinnersModel = require('./winners')
const MajorsModel = require('./majors')
const YearsModel = require('./years')
const MajorsWinnersModel = require('./majorWinners')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const {
  username, password, database, host, dialect,
} = allConfigs[environment]

const connection = new Sequelize(database, username, password, { host, dialect })

const Winners = WinnersModel(connection, Sequelize)
const Majors = MajorsModel(connection, Sequelize)
const Years = YearsModel(connection, Sequelize, Winners)
const MajorWinners = MajorsWinnersModel(connection, Sequelize, Majors, Years)

Years.belongsTo(Winners)
Winners.hasMany(Years)

Majors.belongsToMany(Years, { through: MajorWinners })
Years.belongsToMany(Majors, { through: MajorWinners })

module.exports = {
  Winners,
  Majors,
  Years,
  MajorWinners,
  Sequelize
} 
