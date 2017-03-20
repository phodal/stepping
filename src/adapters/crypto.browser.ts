import hash from 'hash.js'

export function createHash(algorithm: 'sha256') {
  return hash.sha256()
}
