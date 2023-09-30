export const encryptMessage = async (text, user) => {
  const key = await generateKeyFromPassword(user);
  const iv = await generateIVFromPassword(user);

  return encryptStringWithAESGCM(text, key, iv);
}

export const decryptMessage = async (text, user) => {
  const key = await generateKeyFromPassword(user);
  const iv = await generateIVFromPassword(user);

  return decryptStringWithAESGCM(text, key, iv)
}

async function generateIVFromPassword(user) {
  const iterations = 10000; // Número de iterações (padrão para PBKDF2)
  const keyLength = 16; // Tamanho da chave (em bytes, para AES-GCM)
  const password = `${user.name}${user.phone}`
  const salt = user.salt
  // Converte a senha e o sal para ArrayBuffer
  const passwordBuffer = new TextEncoder().encode(password);
  const saltBuffer = new TextEncoder().encode(salt);

  // Deriva a chave usando PBKDF2
  const derivedKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  return await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: iterations,
      hash: 'SHA-256'
    },
    derivedKey,
    keyLength * 8
  );
}

async function generateKeyFromPassword(user) {
  const iterations = 10000; // Número de iterações (padrão para PBKDF2)
  const keyLength = 256; // Tamanho da chave (em bits, para AES-GCM)
  const password = `${user.phone}`
  const salt = user.salt
  // Converte a senha e o sal para ArrayBuffer
  const passwordBuffer = new TextEncoder().encode(password);
  const saltBuffer = new TextEncoder().encode(salt);

  // Deriva a chave usando PBKDF2
  const derivedKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const keyBytes = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: iterations,
      hash: 'SHA-256'
    },
    derivedKey,
    keyLength
  );

  // Converte os bytes da chave em uma chave CryptoKey do tipo AES-GCM
  return await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptStringWithAESGCM(text, key, iv) {
  
  const encodedText = new TextEncoder().encode(text);

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encodedText
  );

  // Converte o resultado em um array de bytes
  const encryptedBytes = new Uint8Array(encryptedData);

  // Retorna o resultado como uma string hexadecimal
  return Array.prototype.map.call(encryptedBytes, byte => ('00' + byte.toString(16)).slice(-2)).join('');
}

async function decryptStringWithAESGCM(encryptedText, key, iv) {
  // Converte a string hexadecimal de volta para um array de bytes
  const encryptedBytes = new Uint8Array(encryptedText.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encryptedBytes
  );

  // Converte o resultado em uma string usando TextDecoder
  const decryptedText = new TextDecoder().decode(decryptedData);

  return decryptedText;
}
