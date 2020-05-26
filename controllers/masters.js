// const models = require('../models')
const getAllMastersWinners = async (request, response) => {
  return response.render('masters')
}

const getWinnerByName = async (request, response) => {
  try {
    const { indentifier } = reques.params
    const winner = await models.masters.findall({
      where: { indentifier }
    })
    return response.render('masters').send(winner)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}

module.exports = { getAllMastersWinners, getWinnerByName }
