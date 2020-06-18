import models from '../models'

export const getAllMastersWinners = async (request, response) => {
  try {
    const getMastersWinners = await models.Majors.findAll({
      where: { id: 1 },
      include: [{
        model: models.Years,
        include: [{ model: models.Winners }],
      }],
    })

    return response.send(getMastersWinners)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}

export const getMastersWinnerByYear = async (request, response) => {
  try {
    const { identifier } = request.params

    const winner = await models.Years.findOne({
      where: {
        year:
          { [models.Op.like]: `%${identifier}%` },
      },
      include: [{ model: models.Winners }],
    })

    return response.send(winner)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Golfer, please try again')
  }
}
export const createMastersWinner = async (request, response) => {
  try {
    const { nameFirst, nameLast } = request.body

    if (!nameFirst || !nameLast) {
      return response.status(400).send('The following attributes are required: nameFirst, nameLast')
    }
    const newWinner = await models.Winners.createOrFind({ nameFirst, nameLast })

    return response.status(201).send(newWinner)
  } catch (error) {
    return response.status(500).send('Unable to create Winner, please try again')
  }
}
export const createMastersYear = async (request, response) => {
  try {
    const { year, course, score, winnerId } = request.body

    if (!year || !course || !score || !winnerId) {
      return response.status(400).send('The following attributes are required: year, course, score, winnerId')
    }
    const newYear = await models.Years.createOrFind({ year, course, score, winnerId })

    return response.status(201).send(newYear)
  } catch (error) {
    return response.status(500).send('Unable to create year, course, score, please try again')
  }
}

export const editWinner = async (request, response) => {
  try {
    const { editKey } = request.params

    const edit = models.Winners.update({
      where: {
        [models.Op.or]: [
          { nameFirst: { [models.Op.like]: `%${editKey}%` } },
          { nameLast: { [models.Op.like]: `%${editKey}%` } },
        ],
      },
    })

    return response.send(edit)
  } catch (error) {
    return response.status(500)
      .send('Unable to edit Winner, because I\'m unsure how to do it. Please try again, even though this won\'t work')
  }
}
