const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

async function generateCertificate() {
  const attrs = [
    { name: 'commonName', value: 'localhost' }
  ];

  const options = {
    keySize: 2048,
    days: 365,
    algorithm: 'sha256',
    extensions: [
      {
        name: 'subjectAltName',
        altNames: [
          { type: 2, value: 'localhost' },
          { type: 7, ip: '127.0.0.1' }
        ]
      }
    ]
  };

  const certificate = await selfsigned.generate(attrs, options);

  const certDir = path.join(__dirname, 'certificates');

  fs.mkdirSync(certDir, { recursive: true });

  fs.writeFileSync(
    path.join(certDir, 'localhost.key'),
    certificate.private
  );

  fs.writeFileSync(
    path.join(certDir, 'localhost.crt'),
    certificate.cert
  );

  console.log('SSL certificate generated successfully!');
}

generateCertificate().catch(console.error);
