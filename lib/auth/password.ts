import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const SCRYPT_KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, encoded: string): boolean {
  const [salt, savedHash] = encoded.split(':');
  if (!salt || !savedHash) return false;

  const computedHash = scryptSync(password, salt, SCRYPT_KEYLEN);
  const savedHashBuffer = Buffer.from(savedHash, 'hex');

  if (savedHashBuffer.length !== computedHash.length) {
    return false;
  }

  return timingSafeEqual(savedHashBuffer, computedHash);
}
