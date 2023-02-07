const crypto = window.crypto || window.msCrypto; // for IE 11

async function encrypt(text, password) {
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const alg = { name: 'AES-GCM', iv: iv };

    const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']);
    const ptUint8 = new TextEncoder().encode(text);
    const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);

    const ctArray = Array.from(new Uint8Array(ctBuffer));
    const ctStr = ctArray.map(byte => String.fromCharCode(byte)).join('');
    const ctBase64 = btoa(ctStr);

    return {
        ciphertext: ctBase64,
        iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('')
    };
}

async function decrypt(encrypted, password, iv) {
    const pwUtf8 = new TextEncoder().encode(password);                              // encode password as UTF-8
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);                 // hash the password
    const alg = { name: 'AES-GCM', iv: new Uint8Array(iv.match(/.{2}/g).map(byte => parseInt(byte, 16))) };                       // specify algorithm to use, and convert iv to Uint8Array
    const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']); // import key using password hash
  
    // decode encrypted data from base64 to string, and split it into an array of characters
    const encryptedArray = atob(encrypted).split('').map(char => char.charCodeAt(0));
    // convert the array of characters to an ArrayBuffer
    const ctUint8 = new Uint8Array(encryptedArray).buffer;
  
    // decrypt the data
    const ptBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);
  
    // convert the decrypted data from an ArrayBuffer to a string
    const ptString = new TextDecoder().decode(ptBuffer);
  
    // parse the decrypted string as JSON and return the resulting object
    return ptString;
}
  async function decryptAES256(ciphertext, password, iv) {
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    
    const alg = { name: 'AES-GCM', iv: new Uint8Array(iv.match(/.{2}/g).map(byte => parseInt(byte, 16))) };
    
    const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']);
    const ctStr = atob(ciphertext);
    const ctUint8 = new Uint8Array(ctStr.match(/./g).map(ch => ch.charCodeAt(0)));
    try {
        console.log(alg, key, ctUint8);
        var ptBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);
    } catch (e) {
        console.error(e);
    }
    
        const ptUtf8 = new TextDecoder().decode(ptBuffer);
        return ptUtf8;
}

/*
--- Exemple ---

const text = 'texte à chiffrer';
const password = 'mot de passe';

encrypt(text, password).then(ciphertext => {
    console.log('Ciphertext:', ciphertext);
    return decrypt(ciphertext.ciphertext, password, ciphertext.iv);
}).then(plaintext => {
    console.log(plaintext)
});

*/

(function(){
    self.modules.set('AES.js', true);
});