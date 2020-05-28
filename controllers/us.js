const models = require('../models')

const getAllUsOpenWinners = async (request, response) => {
  try {
    const getAllUsOpenWinners = await models.Majors.findAll({
      where: { id: 4 },
      include: [{
        model: models.Years,
        include: [{ model: models.Winners }]
      }]
    })

    return response.send(getAllUsOpenWinners)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}

const getUsOpenWinnerByYearOrCourse = async (request, response) => {
  try {
    const { identifier } = request.params

    const yearOrCourse = await models.Majors.findAll({
      where: {
        id: 4
      },
      include:
        [{
          model: models.Years,
          where: {
            [models.Op.or]: [
              { year: { [models.Op.like]: `%${identifier}%` } },
              { course: { [models.Op.like]: `%${identifier}%` } }
            ]
          },
          include: [{ model: models.Winners }]
        }]
    })

    return response.send(yearOrCourse)
  } catch (error) {
    return response.status(500).send('Unable to Find Year Winner, please try again')
  }
}

const createUsOpenWinner = async (request, response) => {
  try {
    const { nameFirst, nameLast } = request.body

    if (!nameFirst || !nameLast) {
      return response.status(400).send('The following attributes are required: nameFirst, nameLast')
    }
    const newWinner = await models.Winners.create({ nameFirst, nameLast })

    return response.status(201).send(newWinner)
  } catch (error) {
    return response.status(500).send('Unable to create year, course or score please try again')
  }
}
const createUsOpenYear = async (request, response) => {
  try {
    const { year, course, score, winnerId } = request.body

    if (!year || !course || !score || !winnerId) {
      return response.status(400).send('The following attributes are required: year, course, score, winnerId')
    }
    const newYear = await models.Years.createorfind({ year, course, score, winnerId })

    return response.status(201).send(newYear)
  } catch (error) {
    return response.status(500).send('Unable to create year, course, score, please try again')
  }
}


module.exports = {
  getAllUsOpenWinners,
  getUsOpenWinnerByYearOrCourse,
  createUsOpenWinner,
  createUsOpenYear
}
