import crypto from 'node:crypto';

export default function generateRandomId() {
  return crypto.randomUUID();
}
