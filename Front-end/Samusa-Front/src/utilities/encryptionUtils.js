const secretKey = "azJOV2fKTadpsQHGP7zrCapO7kDYMS6vfeCLzcKADFw";
const iv = new Uint8Array(16);

async function Encriptar(texto) {
  const encodedKey = await DerivarClave(secretKey, 32);
  const key = await crypto.subtle.importKey("raw", encodedKey, "AES-CBC", false, ["encrypt"]);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, new TextEncoder().encode(texto));
  const array = new Uint8Array(encrypted);
  return btoa(String.fromCharCode.apply(null, array));
}

async function Desencriptar(texto) {
  const buffer = new Uint8Array(atob(texto).split("").map(char => char.charCodeAt(0)));
  const decodedKey = await DerivarClave(secretKey, 32);
  const key = await crypto.subtle.importKey("raw", decodedKey, "AES-CBC", false, ["decrypt"]);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, buffer);
  return new TextDecoder().decode(decrypted);
}

async function DerivarClave(clave, keySizeInBytes) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(clave));
  return new Uint8Array(hash.slice(0, keySizeInBytes));
}

export default { Encriptar, Desencriptar };