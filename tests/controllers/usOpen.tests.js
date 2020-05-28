/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { beforeEach, after, afterEach, describe, it } = require('mocha')
const { UsOpenList, singleUsOpen, singleWinner, singleYear } = require('../mocks/UsOpen')
const { getAllUsOpenWinners, getUsOpenWinnerByYearOrCourse, createUsOpenWinner, createUsOpenYear } = require('../../controllers/us')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - us', () => {
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


  describe('getAllUsOpenWinners', () => {
    it('creates a list of all Winners of the US Open through the Majors model with an id of 1 from the database and uses response.send() with the list ', async () => {
      stubbedFindAll.returns(UsOpenList)
      const request = { params: { id: 4, major: 'The US Open' } }

      await getAllUsOpenWinners({}, request, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(UsOpenList)
    })
    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedFindAll.throws('error')

      await getAllUsOpenWinners({}, response)

      expect(stubbedFindAll).to.have.been.calledWith(UsOpenList)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve Golfer, please try again')
    })

    describe('getUsOpenWinnerByYearOrCourse', () => {
      it('calls a single winner form a specific year through the majors model with findOne() and  uses repsonse.send() with the list', async () => {
        stubbedFindOne.returns(singleUsOpen)
        const request = { params: { id: 1, major: 'The UsOpen' } }

        await getUsOpenWinnerByYearOrCourse(request, response)
        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
        expect(stubbedSend).to.have.been.calledWith(singleUsOpen)
      })
      it('responds with a 500 status and error message with the database call throws an error', async () => {
        stubbedFindOne.throws('error')

        await getAllUsOpenWinners({}, response)

        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
        expect(stubbedStatus).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve Golfer, please try again')
      })
    })

    describe('createUsOpenWinner', () => {
      it('take nameFirst, nameLast and adds a new US Open winner returning the saved record with status 201', async () => {
        stubbedStatus.returns({ send: stubbedSend })
        const request = { body: singleWinner }
        const stubbedCreateOrFind = sinon.stub(models.Winners, 'createOrFind').returns(singleWinner)

        await createUsOpenWinner(request, response)
        expect(stubbedCreateOrFind).to.have.been.calledWith(singleWinner)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleWinner)
      })
    })

    describe('createUsOpenYear', () => {
      describe('createUsOpenYear', () => {
        it('takes year, course, score and adds a new US Open winner returning the saved record with status 201', async () => {
          stubbedStatus.returns({ send: stubbedSend })
          const request = { body: singleYear }
          const stubbedCreateOrFind = sinon.stub(models.Years, 'createOrFind').returns(singleUsOpen)

          await createUsOpenYear(request, response)
          expect(stubbedCreateOrFind).to.have.been.calledWith(singleYear)
          expect(stubbedStatus).to.have.been.calledWith(201)
          expect(stubbedSend).to.have.been.calledWith(singleYear)
        })
      })
    })
  })
})
