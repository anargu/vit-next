import { randomBytes as generateRandomBytes } from 'crypto';

export function debugAssert(
  assertion: boolean,
  message: string
): asserts assertion {
  if (!assertion) {
    throw new Error(message)
  }
}

/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */
export function randomBytes(nBytes: number): Uint8Array {
  debugAssert(nBytes >= 0, `Expecting non-negative nBytes, got: ${nBytes}`);
  return generateRandomBytes(nBytes);
}


export class AutoId {
  static newId(): string {
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // The largest byte value that is a multiple of `char.length`.
    const maxMultiple = Math.floor(256 / chars.length) * chars.length;
    debugAssert(
      0 < maxMultiple && maxMultiple < 256,
      `Expect maxMultiple to be (0, 256), but got ${maxMultiple}`
    );

    let autoId = '';
    const targetLength = 20;
    while (autoId.length < targetLength) {
      const bytes = randomBytes(40);
      for (let i = 0; i < bytes.length; ++i) {
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        if (autoId.length < targetLength && bytes[i] < maxMultiple) {
          autoId += chars.charAt(bytes[i] % chars.length);
        }
      }
    }
    debugAssert(autoId.length === targetLength, 'Invalid auto ID: ' + autoId);

    return autoId;
  }
}
