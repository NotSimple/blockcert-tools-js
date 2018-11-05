'use strict'

const expect = require('chai').expect;

const fs = require('fs')
const blockertTools = require('../index.js')
const generateTemplate = blockertTools.generateTemplate
const instantiateBatch = blockertTools.instantiateBatch
const makeValidConfig = require('./make-valid-config.js')

const SCHEMA_ERROR = require('../src/constants').V2.ERRORS.SCHEMA_ERROR


describe('blockcerts schema v2', function() {

  describe('#generateTemplate', function() {
    it('valid config -> should successfully create a template', async function() {
      var conf = await makeValidConfig()
      generateTemplate(conf)
    })

    // TODO: Failing, since checkConfigValidity is not implemented in src/helpers.js
    it('invalid config -> should throw schema violation error', async function() {
      var conf = await makeValidConfig()
      conf.badge = null
      expect(() => generateTemplate(conf)).to.throw(SCHEMA_ERROR)
    })
  })
})
