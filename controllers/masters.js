const models = require('../models')

const getAllMastersWinners = async (request, response) => {
  // try {
  const getMastersWinners = await models.MajorWinners.findAll()

  return response.send(getMastersWinners)
  // } catch (error) {
  //   return response.status(500).send('Unable to retrieve Golfer, please try again')
  // }
}

const getMastersWinnerByName = async (request, response) => {
  try {
    const { indentifier } = request.params
    const winner = await models.Winners.findall({
      where: {
        [models.Sequelize.Op.or]: [
          { id: indentifier },
          { nameFirst: { [models.Sequelize.op.like]: `${indentifier}%` } },
          { nameLast: { [models.Sequelize.op.like]: `${indentifier}%` } },
        ]
      },
      include: [{
        models: models.Years,
        include: [{ model: models.MajorWinners }]
      }]
    })

    return response.render('masters').send(winner)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}

const createWinner = async (request, response) => {
  try {
    const { nameFirst, nameLast } = request.body

    if (!nameFirst || !nameLast) {
      return response.status(400).send('The following attributes are required: nameFirst, nameLast')
    }
    const newWinner = await models.Winners.create({ nameFirst, nameLast })

    return response.status(201).send(newWinner)
  } catch (error) {
    return response.status(500).send('Unable to create Winner, please try again')
  }
}
const createYear = async (request, response) => {
  try {
    const { year, course, score, winnerId } = request.body

    if (!year || !course || !score || !winnerId) {
      return response.status(400).send('The following attributes are required: year, course, score, winnerId')
    }
    const newYear = await models.Years.createorfind({ year, course, score, winnerId })

    return response.status(201).send(newYear)
  } catch (error) {
    return response.status(500).send('Unable to create Winner, please try again')
  }
}



module.exports = { getAllMastersWinners, getMastersWinnerByName, createWinner, createYear }
