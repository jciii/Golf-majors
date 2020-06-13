import Sequelize from 'sequelize'
import allConfigs from '../config/sequelize'

import WinnersModel from './winners'
import MajorsModel from './majors'
import YearsModel from './years'
import MajorsWinnersModel from './majorWinners'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

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
  Op: Sequelize.Op
}
