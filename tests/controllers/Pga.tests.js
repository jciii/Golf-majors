/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { beforeEach, after, afterEach, describe, it } = require('mocha')
const { PGAList, singlePGA, singleWinner, singleYear } = require('../mocks/Pga')
const { getAllPGAWinners, getPGAWinnerByYearOrCourse, createPGAWinner, createPGAYear } = require('../../controllers/pga')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - PGA', () => {
  let sandbox
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.sinon.stub(models.Majors, 'findOne')
    stubbedFindAll = sandbox.sinon.stub(models.Majors, 'findAll')

    stubbedSend = sinon.stub()
    stubbedSendStatus = sinon.stub()
    stubbedStatusSend = sandbox.sinon.stub()
    stubbedStatus = sinon.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  after(() => {
    sandbox.reset()
  })
  afterEach(() => {
    sandbox.restore()
    stubbedFindOne.resetBehavior()
    stubbedSend.resetBehavior()
    stubbedSendStatus.resetBehavior()
    stubbedStatusSend.resetBehavior()
    stubbedStatus.resetBehavior()
  })


  describe('getAllPGAWinners', () => {
    it('creates a list of all Winners of the PGA through the Majors model with an id of 1 from the database and uses response.send() with the list ', async () => {
      stubbedFindAll.returns(PGAList)
      const request = { params: { id: 3, major: 'The PGA Championship' } }

      await getAllPGAWinners({}, request, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(PGAList)
    })
    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedFindAll.throws('error')

      await getAllPGAWinners({}, response)

      expect(stubbedFindAll).to.have.been.calledWith(PGAList)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve Golfer, please try again')
    })

    describe('getPGAWinnerByYearOrCourse', () => {
      it('calls a single winner form a specific year through the majors model with findOne() and  uses repsonse.send() with the list', async () => {
        stubbedFindOne.returns(singlePGA)
        const request = { params: { id: 1, major: 'The PGA Championship' } }

        await getPGAWinnerByYearOrCourse(request, response)
        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
        expect(stubbedSend).to.have.been.calledWith(singlePGA)
      })
      it('responds with a 500 status and error message with the database call throws an error', async () => {
        stubbedFindOne.throws('error')

        await getAllPGAWinners({}, response)

        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
        expect(stubbedStatus).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve Golfer, please try again')
      })
    })

    describe('createPGAWinner', () => {
      it('take nameFirst, nameLast and adds a new PGA winner returning the saved record with status 201', async () => {
        stubbedStatus.returns({ send: stubbedSend })
        const request = { body: singleWinner }
        const stubbedCreateOrFind = sinon.stub(models.Winners, 'createOrFind').returns(singleWinner)

        await createPGAWinner(request, response)
        expect(stubbedCreateOrFind).to.have.been.calledWith(singleWinner)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleWinner)
      })
    })

    describe('createPGAYear', () => {
      describe('createPGAYear', () => {
        it('takes year, course, score and adds a new PGA winner returning the saved record with status 201', async () => {
          stubbedStatus.returns({ send: stubbedSend })
          const request = { body: singleYear }
          const stubbedCreateOrFind = sinon.stub(models.Years, 'createOrFind').returns(singlePGA)

          await createPGAYear(request, response)
          expect(stubbedCreateOrFind).to.have.been.calledWith(singleYear)
          expect(stubbedStatus).to.have.been.calledWith(201)
          expect(stubbedSend).to.have.been.calledWith(singleYear)
        })
      })
    })
  })
})
