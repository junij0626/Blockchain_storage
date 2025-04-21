const { create } = require('ipfs-http-client');

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_API_SECRET;
const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

const uploadToIPFS = async (data) => {
  const result = await ipfs.add(encryptedPdfBuffer);

  res.json({ ipfsHash: result.path });
  // 🔗 CID / IPFS Hash
};

module.exports = { uploadToIPFS };
