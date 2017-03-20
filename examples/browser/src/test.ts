// Note: we're not using the double method, so it should be excluded from the bundle
import { power } from 'typescript-starter'

let output = ''

function log (str: string) {
  console.log(str)
  output += str + '\n'
}

log('Output:')

if (power(3,4) === 81) {
  log('✔ power(3,4) === 81')
} else {
  log('The "power" method seems to be broken.')
}

