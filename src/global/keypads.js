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
  ],
  scientific: [
    [
      key.openParenthesis,
      key.closeParenthesis,
      key.memoryClear,
      key.memoryAdd,
      key.memorySubtract,
      key.memoryRecall,
      key.clear,
      key.negate,
      key.percent,
      key.divide
    ],[
      key.alt,
      key.square,
      key.cube,
      key.toPower,
      key.eToXPower,
      key.tenToXPower,
      key.seven,
      key.eight,
      key.nine,
      key.multiply
    ], [
      key.inverse,
      key.squareRoot,
      key.cubeRoot,
      key.nthRoot,
      key.naturalLogarithm,
      key.logarithm,
      key.four,
      key.five,
      key.six,
      key.subtract
    ], [
      key.factorial,
      key.sine,
      key.cosine,
      key.tangent,
      key.e,
      key.exponential,
      key.one,
      key.two,
      key.three,
      key.add,
    ], [
      key.trigUnit,
      key.sineH,
      key.cosineH,
      key.tangentH,
      key.pi,
      key.rand,
      key.zero,
      key.decimal,
      key.equals
    ]
  ]
}
export default keypads
