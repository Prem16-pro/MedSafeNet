import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const AESExample = () => {
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  // Encryption function using AES
  const encryptData = (dataToEncrypt) => {
    const secretKey = 'your-secret-key'; // Use a secure and unique key
    const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
    setEncryptedData(ciphertext);
  };

  // Decryption function using AES
  const decryptData = (ciphertext) => {
    const secretKey = 'your-secret-key'; // Use the same key used for encryption
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalData = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes back to UTF-8 string
    setDecryptedData(originalData);
  };

  return (
    <div>
      <h1>AES Encryption and Decryption Example</h1>
      <div>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data to encrypt"
        />
        <button onClick={() => encryptData(data)}>Encrypt</button>
      </div>

      <div>
        <h2>Encrypted Data:</h2>
        <p>{encryptedData}</p>
      </div>

      <div>
        <h2>Decrypted Data:</h2>
        <input
          type="text"
          value={encryptedData}
          onChange={(e) => decryptData(e.target.value)}
          placeholder="Enter encrypted data to decrypt"
        />
        <button onClick={() => decryptData(encryptedData)}>Decrypt</button>
        <p>{decryptedData}</p>
      </div>
    </div>
  );
};

export default AESExample;
