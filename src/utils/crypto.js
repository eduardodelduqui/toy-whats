import CryptoJS from 'crypto-js';


export const deriveKeyAndIV = (user) => {
  return new Promise((resolve, reject) => {
    const iterations = 10000;
    const keyLength = 32;
    const ivLength = 16;
    
    const password = user.phone
    const salt = user.salt

    const derivedKey = CryptoJS.PBKDF2(password, salt, { keySize: (keyLength + ivLength) / 4, iterations })
    const key = derivedKey.words.slice(0, keyLength / 4);
    const iv = derivedKey.words.slice(keyLength / 4);
    resolve({
      key: CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create(key)),
      iv: CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create(iv))
    });
  });
}

export const encryptMessage = async (message, user) => {
  const { key, iv } = await deriveKeyAndIV(user)
  const cipherText = CryptoJS.AES.encrypt(message, key, { iv }).toString();
  return cipherText;
}

export const decryptMessage = async (cipherText, user) => {
  const { key, iv } = await deriveKeyAndIV(user)
  const bytes = CryptoJS.AES.decrypt(cipherText, key, { iv });
  const originalMessage = await bytes.toString(CryptoJS.enc.Utf8);
  return originalMessage;
}