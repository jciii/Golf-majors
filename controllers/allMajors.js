import models from '../models'

export const getAllMajors = async (request, response) => {
  try {
    const getAllMajors = await models.Majors.findAll(({
      include: [{
        model: models.Years,
        include: [{ model: models.Winners }]
      }]
    }))


    return response.send(getAllMajors)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Stuff, please try again')
  }
}

export const getSingleMajor = async (request, response) => {
  try {
    const { identifier } = request.params

    const getAllMajors = await models.Majors.findAll(({
      where: { id: identifier },
      include: [{
        model: models.Years,
        include: [{ model: models.Winners }]
      }]
    }))


    return response.send(getAllMajors)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Stuff, please try again')
  }
}

