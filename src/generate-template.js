'use strict'

const checkConfigValidity = require('./helpers').checkConfigValidity 
const constants = require('./constants').V2

function createAssertionSection(config) {
  return {
    '@context': [
      constants.OPEN_BADGES_CONTEXT,
      constants.BLOCKCERTS_CONTEXT,
      {
        displayHtml: { '@id': 'schema:description' }
      }
    ],
    type: 'Assertion',
    displayHtml: config.displayHtml,
    issuedOn: "{{certificate.issuedOn}}",
    id: constants.URN_UUID_PREFIX + '{{certificate.uid}}'
  }
}

function createRecipientSection(config) {
  return {
    type: 'email',
    identity: '{{recipient.email}}',
    hashed: config.hashEmails
  }
}

function createRecipientProfileSection() {
  return {
    type: ['RecipientProfile', 'Extension'],
    name: '{{recipient.name}}',
    publicKey: constants.PUBKEY_PREFIX + '{{recipient.pubkey}}'
  }
}

function createBadgeSection(config) {
  const badge = {
    type: 'BadgeClass',
    id: constants.URN_UUID_PREFIX + config.badgeId,
    name: config.certificateTitle,
    description: config.certificateDescription,
    image: config.certImage,
    issuer: {
      id: config.issuerId,
      type: 'Profile',
      name: config.issuerName,
      url: config.issuerUrl,
      email: config.issuerEmail,
      image: config.issuerImage,
      revocationList: config.revocationList
    },
    criteria: {
      narrative: config.criteriaNarrative
    }
  }

  if (config.issuerSignatureLines) {
    const signatureLines = []
    config.issuerSignatureLines.forEach((issuerSignatureLine) => {
      signatureLines.push({
        type: [
          'SignatureLine',
          'Extension'
        ],
        jobTitle: issuerSignatureLine.jobTitle,
        image: issuerSignatureLine.image,
        name: issuerSignatureLine.name       
      })
    })
    badge.signatureLines = signatureLines
  }

  return badge
}

function createVerificationSection(config) {
  return {
    type: ['MerkleProofVerification2017', 'Extension'],
    publicKey: config.issuerPublicKey
  }
}

function generateTemplate(config) {
  // check if config is valid 
  checkConfigValidity(config)

  // create template object
  const template = new Object()

  // add top-level key-value pairs
  const assertion = createAssertionSection(config)
  template['@context'] = assertion['@context']
  template.type = assertion.type
  template.displayHtml = assertion.displayHtml
  template.issuedOn = assertion.issuedOn
  template.id = assertion.id

  template.recipient = createRecipientSection(config)
  template.recipientProfile = createRecipientProfileSection()
  template.badge = createBadgeSection(config)
  template.verification = createVerificationSection(config)

  return template
}

module.exports = generateTemplate
