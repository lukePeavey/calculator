import Decimal from 'decimal.js'

/**
 * Decimal.js is arbitrary-precision decimal library with a robust api.
 */

Decimal.prototype.percent = function percent() {
  var x = new Decimal(this)
  return x.dividedBy(100)
}

Decimal.prototype.square = function square() {
  var x = new Decimal(this)
  return x.toPower(2)
}

Decimal.prototype.cube = function cube() {
  var x = new Decimal(this)
  return x.toPower(3)
}

Decimal.prototype.tenToXPower = function tenToXPower() {
  var x = new Decimal(this)
  var y = new Decimal(10)
  return y.toPower(x)
}

Decimal.prototype.eToXPower = function eToXPower() {
  var x = new Decimal(this)
  var e = new Decimal(Math.E)
  return e.toPower(x)
}

Decimal.prototype.inverse = function inverse() {
  var x = new Decimal(this)
  var y = new Decimal(1)
  return y.dividedBy(x)
}

Decimal.prototype.factorial = function factorial() {
  var x = new Decimal(this)
  var y = new Decimal(x.minus(1))

  if (x.lessThanOrEqualTo(1)) return new Decimal(1)
  for (; y.greaterThanOrEqualTo(1); y = y.minus(1)) x = x.times(y)
  return x
}

export default Decimal
