const models = require('../models')

const getAllOpenWinners = async (request, response) => {
  try {
    const getOpenWinners = await models.Winners.findAll()

    return response.send(getOpenWinners)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}


const getOpenWinnerByName = async (request, response) => {
  try {
    const { indentifier } = request.params
    const winner = await models.Winners.findall({
      where: { indentifier }
    })

    return response.render('Open').send(winner)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}

module.exports = { getAllOpenWinners, getOpenWinnerByName }
