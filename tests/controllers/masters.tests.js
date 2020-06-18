/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { before, afterEach, describe, it } = require('mocha')
const models = require('../../models')
const { mastersList, singleMasters, singleWinner, singleYear } = require('../mocks/masters')
const { getAllMastersWinners, getMastersWinnerByYear, createMastersWinner, createMastersYear } = require('../../controllers/masters')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - masters', () => {
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    stubbedFindOne = sinon.stub(models.Majors, 'findOne')
    stubbedFindAll = sinon.stub(models.Majors, 'findAll')

    stubbedSend = sinon.stub()
    stubbedSendStatus = sinon.stub()
    stubbedStatusSend = sinon.stub()
    stubbedStatus = sinon.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })
  afterEach(() => {
    stubbedFindOne.resetBehavior()
    stubbedSend.resetBehavior()
    stubbedSendStatus.resetBehavior()
    stubbedStatusSend.resetBehavior()
    stubbedStatus.resetBehavior()
  })


  describe('getAllMastersWinners', () => {
    it('creates a list of all Winners of the masters through the Majors model with an id of 1 from the database and uses response.send() with the list ', async () => {
      stubbedFindAll.returns(mastersList)
      const request = { params: { id: 1, major: 'The Masters' } }

      await getAllMastersWinners({}, request, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(mastersList)
    })
    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedFindAll.throws('error')

      await getAllMastersWinners({}, response)

      expect(stubbedFindAll).to.have.been.calledWith(mastersList)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve Golfer, please try again')
    })

    describe('getMastersWinnerByYear', () => {
      it('calls a single winner form a specific year throught the majors model with findOne() and  uses repsonse.send() with the list', async () => {
        stubbedFindOne.returns(singleMasters)
        const request = { params: { id: 1, major: 'The Masters' } }

        await getMastersWinnerByYear(request, response)
        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
        expect(stubbedSend).to.have.been.calledWith(singleMasters)
      })
      it('responds with a 500 status and error message with the database call throws an error', async () => {
        stubbedFindOne.throws('error')

        await getAllMastersWinners({}, response)

        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
        expect(stubbedStatus).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve Golfer, please try again')
      })
    })

    describe('createMastersWinner', () => {
      it('take nameFirst, nameLast and adds a new masters winner returning the saved record with status 201', async () => {
        stubbedStatus.returns({ send: stubbedSend })
        const request = { body: singleWinner }
        const stubbedCreateOrFind = sinon.stub(models.Winners, 'createOrFind').returns(singleWinner)

        await createMastersWinner(request, response)
        expect(stubbedCreateOrFind).to.have.been.calledWith(singleWinner)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleWinner)
      })
    })

    describe('createMastersYear', () => {
      describe('createMastersYear', () => {
        it('takes year, course, score and adds a new masters winner returning the saved record with status 201', async () => {
          stubbedStatus.returns({ send: stubbedSend })
          const request = { body: singleYear }
          const stubbedCreateOrFind = sinon.stub(models.Years, 'createOrFind').returns(singleMasters)

          await createMastersYear(request, response)
          expect(stubbedCreateOrFind).to.have.been.calledWith(singleYear)
          expect(stubbedStatus).to.have.been.calledWith(201)
          expect(stubbedSend).to.have.been.calledWith(singleYear)
        })
      })
    })
  })
})
