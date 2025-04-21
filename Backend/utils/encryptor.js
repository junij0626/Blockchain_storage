const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const secretKey = process.env.AES_SECRET_KEY;   // Must be 32 bytes
const ivLength = 16; // 16 bytes for AES-256-CBC

// Encrypt Data
const encryptData = (buffer) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  
  // Add IV with Encrypted Data
  return Buffer.concat([iv, encrypted]);
};

// Decrypt Data
const decryptData = (buffer) => {
  const iv = buffer.slice(0, ivLength);
  const encryptedData = buffer.slice(ivLength);
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  
  return decrypted;
};

module.exports = { encryptData, decryptData };
