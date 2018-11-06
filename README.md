[![Build Status](https://travis-ci.org/NotSimple/blockcert-tools-js.svg?branch=master)](https://travis-ci.org/NotSimple/blockcert-tools-js)
# blockcert-tools-js

A library for generating blockcert certificate templates and instantiating certificate batches

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
  - [Example Config Object](#example-config-object)
  - [Example Roster Object](#example-roster-object)
- [Tests](#tests)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
```
$ npm install blockcert-tools-js
```

## Usage

```js
// import module
const bcTools = require('blockcerts-tools-js')

// generate a blockcert template according to config object
const template = bcTools.generateTemplate(config)

// instantiate unsigned certificates according to a template object and a roster object
const unsignedCerts = bcTools.instantiateBatch(template, roster) 
```

### Example Config Object
```js
config = {
// certificate display
displayHtml: '<h1>Some html code</h1>',

// recipient info
hashEmails: false,

// issuer info
issuerUrl: 'https://www.issuer.org',
issuerEmail: 'contact@issuer.org',
issuerName: 'University of Learning',
issuerId: 'https://www.blockcerts.org/samples/2.0/issuer-testnet.json',
revocationList:  'https://www.blockcerts.org/samples/2.0/revocation-list-testnet.json',
issuerSignatureLines: [{'jobTitle': 'University Issuer','signatureImage': 'default/images/issuer-signature.png','name': 'Your signature'}],
issuerPublicKey: 'Cfd720Ada81563D36E53eF2904F5A9E87fD0a29c',
issuerImage: '',

// certificate info
certificateTitle: 'Certificate of Accomplishment',
certificateDescription: 'Lorem ipsum dolor sit amet, mei docendi concludaturque ad, cu nec partem graece. Est aperiam consetetur cu, expetenda moderatius neglegentur ei nam, suas dolor laudem eam an.',
criteriaNarrative: 'Nibh iriure ei nam, modo ridens neglegentur mel eu. At his cibo mucius.',
badgeId: '82a4c9f2-3588-457b-80ea-da645ac1b8cc',
certImage: ''
}
```

### Generating a Template
with the config object of the previous section:

```js
const template = bcTools.generateTemplate(config)
templateString = JSON.stringify(template, null, 2)
```

This will output the following template:

```json
{
  "@context": [
    "https://w3id.org/openbadges/v2",
    "https://w3id.org/blockcerts/v2",
    {
      "displayHtml": {
        "@id": "schema:description"
      }
    }
  ],
  "type": "Assertion",
  "displayHtml": "<h1>Some html code</h1>",
  "issuedOn": "{{date}}",
  "id": "urn:uuid:{{certuid}}",
  "recipient": {
    "type": "email",
    "identity": "{{email}}",
    "hashed": false
  },
  "recipientProfile": {
    "type": [
      "RecipientProfile",
      "Extension"
    ],
    "name": "{{name}}",
    "publicKey": "ecdsa-koblitz-pubkey:{{pubkey}}"
  },
  "badge": {
    "type": "BadgeClass",
    "id": "urn:uuid:82a4c9f2-3588-457b-80ea-da645ac1b8cc",
    "name": "Certificate of Accomplishment",
    "description": "Lorem ipsum dolor sit amet, mei docendi concludaturque ad, cu nec partem graece. Est aperiam consetetur cu, expetenda moderatius neglegentur ei nam, suas dolor laudem eam an.",
    "image": "",
    "issuer": {
      "id": "https://www.blockcerts.org/samples/2.0/issuer-testnet.json",
      "type": "Profile",
      "name": "University of Learning",
      "url": "https://www.issuer.org",
      "email": "contact@issuer.org",
      "image": "",
      "revocationList": "https://www.blockcerts.org/samples/2.0/revocation-list-testnet.json"
    },
    "criteria": {
      "narrative": "Nibh iriure ei nam, modo ridens neglegentur mel eu. At his cibo mucius."
    }
  },
  "verification": {
    "type": [
      "MerkleProofVerification2017",
      "Extension"
    ],
    "publicKey": "Cfd720Ada81563D36E53eF2904F5A9E87fD0a29c"
  }
}
```

### Example Roster Object
```js
roster = [
  recipient: {
    name: 'Carlos González Videla',
    email: 'cagonzalez@gmail.com',
    pubkey: 'mtr98kany9G1cYNU74pRnfBQmaCg2FZLmc'
  },
  certificate: {
    issuedOn: '2018-07-20T09:33:47.490752+00:00',
    uid: 'urn:uuid:82a4c9f2-3588-457b-80ea-da695571b8fc'
  }
]
```

### Instantiating certificates
Using the previous roster object:

```
batch = bcTools.instantiateBatch(template, roster)
cert = batch[0]
certString = JSON.stringify(exampleTemplate, null, 2)
```

This will output the following unsigned certificate:

```json
{
  "@context": [
    "https://w3id.org/openbadges/v2",
    "https://w3id.org/blockcerts/v2",
    {
      "displayHtml": {
        "@id": "schema:description"
      }
    }
  ],
  "type": "Assertion",
  "displayHtml": "<h1>Some html code</h1>",
  "issuedOn": "2018-07-20T09:33:47.490752+00:00",
  "id": "urn:uuid:urn:uuid:82a4c9f2-3588-457b-80ea-da695571b8fc",
  "recipient": {
    "type": "email",
    "identity": "cagonzalez@gmail.com",
    "hashed": false
  },
  "recipientProfile": {
    "type": [
      "RecipientProfile",
      "Extension"
    ],
    "name": "Carlos González Videla",
    "publicKey": "ecdsa-koblitz-pubkey:mtr98kany9G1cYNU74pRnfBQmaCg2FZLmc"
  },
  "badge": {
    "type": "BadgeClass",
    "id": "urn:uuid:82a4c9f2-3588-457b-80ea-da645ac1b8cc",
    "name": "Certificate of Accomplishment",
    "description": "Lorem ipsum dolor sit amet, mei docendi concludaturque ad, cu nec partem graece. Est aperiam consetetur cu, expetenda moderatius neglegentur ei nam, suas dolor laudem eam an.",
    "image": "",
    "issuer": {
      "id": "https://www.blockcerts.org/samples/2.0/issuer-testnet.json",
      "type": "Profile",
      "name": "University of Learning",
      "url": "https://www.issuer.org",
      "email": "contact@issuer.org",
      "image": "",
      "revocationList": "https://www.blockcerts.org/samples/2.0/revocation-list-testnet.json"
    },
    "criteria": {
      "narrative": "Nibh iriure ei nam, modo ridens neglegentur mel eu. At his cibo mucius."
    }
  },
  "verification": {
    "type": [
      "MerkleProofVerification2017",
      "Extension"
    ],
    "publicKey": "Cfd720Ada81563D36E53eF2904F5A9E87fD0a29c"
  }
}
```



## Tests

  ```
npm test
  ```

This is WIP.

## TODO
- Improve Readme
- Add Configuration validity (check if it is valid unsigned blockcert)
- Create Tests
- Support for multiple blockcert versions
