const SCHEMA_ERROR_V2 = 'Property does not exist in blockcerts v2 schema'
const OPEN_BADGES_CONTEXT_V2 = 'https://w3id.org/openbadges/v2'
const BLOCKCERTS_CONTEXT_V2 = 'https://w3id.org/blockcerts/v2'
const URN_UUID_PREFIX_V2 = 'urn:uuid:'
const PUBKEY_PREFIX_V2 = 'ecdsa-koblitz-pubkey:'

// TODO
const REQUIRED_CONFIG_FIELDS_V2 = [ 
]

module.exports = {
    V2: {
      OPEN_BADGES_CONTEXT: OPEN_BADGES_CONTEXT_V2,
      BLOCKCERTS_CONTEXT: BLOCKCERTS_CONTEXT_V2,
      URN_UUID_PREFIX: URN_UUID_PREFIX_V2,
      PUBKEY_PREFIX: PUBKEY_PREFIX_V2,
      ERRORS: {
        SCHEMA_ERROR: SCHEMA_ERROR_V2
      },
      REQUIRED_CONFIG_FIELDS: REQUIRED_CONFIG_FIELDS_V2
    }
}
