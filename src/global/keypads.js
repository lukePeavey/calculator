import * as key from './keys'
// This determines the layout of keys on the keypad.
const keypads = {

  // Basic keypad
  basic: [
    [key.clear, key.negate, key.percent, key.divide],
    [key.seven, key.eight, key.nine, key.multiply],
    [key.four, key.five, key.six, key.subtract],
    [key.one, key.two, key.three, key.add],
    [key.zero, key.decimal, key.equals]
  ]
}
export default keypads
