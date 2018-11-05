const imageDataURI = require('image-data-uri')

async function makeValidConfig() {
  try {
    const [issuerImage, certImage, issuerSignatureImage] = await Promise.all([
      imageDataURI.encodeFromFile('./test/images/issuer-logo.png'),
      imageDataURI.encodeFromFile('./test/images/certificate-image.png'),
      imageDataURI.encodeFromFile('./test/images/issuer-signature.png')
    ])
  
    // default configuration
    const config = {
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
      issuerSignatureLines: [{jobTitle: 'University Issuer', image: issuerSignatureImage, name: 'Your signature'}],
      issuerPublicKey: 'Cfd720Ada81563D36E53eF2904F5A9E87fD0a29c',
      issuerImage: issuerImage,
  
      // certificate info
      certificateTitle: 'Certificate of Accomplishment',
      certificateDescription: 'Lorem ipsum dolor sit amet, mei docendi concludaturque ad, cu nec partem graece. Est aperiam consetetur cu, expetenda moderatius neglegentur ei nam, suas dolor laudem eam an.',
      criteriaNarrative: 'Nibh iriure ei nam, modo ridens neglegentur mel eu. At his cibo mucius.',
      badgeId: '82a4c9f2-3588-457b-80ea-da645ac1b8cc',
      certImage: certImage
    }
  
    return config

  } catch (err) {
    Promise.reject(err)
  }
}

module.exports = makeValidConfig
