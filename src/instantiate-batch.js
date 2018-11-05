'use strict'

const object = require('json-templater/object')

function instantiateBatch(template, roster) {
  const batch = []
  const rosterLength = roster.length
  for (let i = 0; i < rosterLength; i++) {
    batch[i] = object(template, roster[i])
  }
  return batch
}

module.exports = instantiateBatch
