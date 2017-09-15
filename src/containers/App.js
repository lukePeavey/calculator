import React, { Component } from 'react'
import App from '../components/app/App'
import keypads from '../global/keypads'
import { camelCase } from 'lodash'
import Decimal from '../utils/decimal-custom'

class AppContainer extends Component {
  state = {
    /**
     * Display value is the current value shown on the display screen
     * @type {string}
     */
    displayValue: '0',

    /**
     * Current output is the stored value that will used as the first operand
     * in binary operations. When chaining multiple operations together, this
     * will be the result of the previous operation. On the first operation,
     * the displayValue when the operation key is pressed is stored as the
     * current output
     * @type {null|Decimal}
     */
    currentOutput: null,

    /**
     * The active operation. For binary operations, this is set when the
     * operation key is pressed. The user then enters the second input value
     * @type {null|string}
     */
    currentOperation: null,

    /**
     * Determines what to do when a number key is pressed. If this is false,
     * the number will be added to the current display value. When set to true,
     * the next number key press will reset display value and start a new
     * input. This is the case after pressing C, or after pressing an operation
     * key.
     * @type {boolean}
     */
    resetDisplayValueOnNextKeyPress: true,

    /**
     * Sets the mode: 'basic' or 'scientific' (currently only 'basic').
     * This will determine which keypad to use, as well as other mode-specific
     * behavior and styles.
     * @type {string} oneOf(['basic', 'scientific'])
     */
    mode: 'scientific',

    /**
     * Unit of measurement for angles
     * @type {string} oneOf(['deg', 'rad'])
     */
    trigUnit: 'deg',

    /**
     * the stored memory value.
     * @type {null|Decimal}
     */
    memory: null
  }

  // Set mode based on device orientation (only on small screens)
  componentDidMount() {
    const mobilePortrait = window.matchMedia('(max-width: 450px)')
    const mobileLandscape = window.matchMedia(
      '(max-width: 740px) and (max-height: 450px)'
    )
    const landscape = window.matchMedia('(orientation: landscape)')

    const setMode = landscape => {
      if (!(mobilePortrait.matches || mobileLandscape.matches)) return
      this.setState({ mode: landscape.matches ? 'scientific' : 'basic' })
    }
    landscape.addListener(landscape => setMode(landscape))
    setMode(landscape)
  }

  /**
   * Handle Number Key
   * Also handles the decimal key
   */
  handleNumberKey = key => {
    const {
      displayValue: prevDisplayValue,
      resetDisplayValueOnNextKeyPress
    } = this.state

    const number = key.textContent // get the number
    let displayValue = resetDisplayValueOnNextKeyPress ? '' : prevDisplayValue

    // Handle decimal key...
    // if display value already contains a decimal, the key has no effect
    if (key.id === 'decimal' && !displayValue.includes('.')) {
      // A leading 0 is shown when the decimal is added to 0
      displayValue = displayValue ? displayValue + '.' : '0.'
    } else if (key.id !== 'decimal') {
      displayValue += number
    }

    this.setState({
      displayValue: displayValue.replace(/^0+(?!\.)/, ''), // strip leading zeroes
      resetDisplayValueOnNextKeyPress: false
    })
  }

  handleConstantKey = ({ id: constant }) => {
    this.setState({
      displayValue: Decimal[constant].toString(),
      resetDisplayValueOnNextKeyPress: true
    })
  }

  /**
   * Handle Binary Operations (operations with two input values)
   */
  handleBinaryOperationKey = key => {
    const { currentOperation, currentOutput, displayValue } = this.state
    const operation = key.id

    if (currentOperation) {
      // When chaining multiple operations without pressing equals in between.
      // This first calls the equals handler, which processes the last operation,
      // then initiates the operation that was just selected, using the output
      // of the last operation as the first input value.
      // @todo sequential setState calls might be a problem
      this.handleEqualsKey()
    }

    this.setState(prevState => ({
      currentOperation: operation,
      currentOutput: prevState.displayValue,
      resetDisplayValueOnNextKeyPress: true
    }))
  }

  /**
   * Handle unary operations (operations with one input value).
   * Unary operations are performed directly on the display value. The
   * current display value is used as the input (operand), and the result of
   * the operation (output) becomes the new display value.
   */
  handleUnaryOperationKey = key => {
    const { displayValue, trigUnit } = this.state
    const operation = key.id
    let operand = new Decimal(displayValue)

    // Handle conversion between radians and degrees.
    if (/^(sin|cos|tan)$/.test(operation) && trigUnit === 'deg') {
      operand = operand.times(new Decimal(Math.PI).dividedBy(180))
    }

    let output = operand[operation]()

    this.setState({
      displayValue: output.toString(),
      resetDisplayValueOnNextKeyPress: true
    })
  }

  /**
   * Handle equals key
   * @todo support pressing equals multiple times to repeat the previous
   * operation.
   */
  handleEqualsKey = () => {
    const { currentOperation, currentOutput, displayValue } = this.state

    if (!currentOperation) {
      return
    }

    const firstOperand = new Decimal(currentOutput)
    const secondOperand = displayValue
    let output = firstOperand[currentOperation](secondOperand)

    this.setState({
      currentOperation: null,
      currentOutput: output,
      displayValue: output.toString(),
      resetDisplayValueOnNextKeyPress: true
    })
  }

  /**
   * Handle Clear key
   * This resets the app to initial state.
   */
  handleClearKey = key => {
    this.setState({
      currentOperation: null,
      currentOutput: null,
      displayValue: '0',
      resetDisplayValueOnNextKeyPress: true
    })
  }

  handleFunctionKey({ id: functionName }) {
    switch (functionName) {
      case 'trigUnit':
        return this.setState(prevState => ({
          trigUnit: prevState.trigUnit === 'deg' ? 'rad' : 'deg'
        }))

      case 'memoryAdd':
        return this.setState(({ memory, displayValue }) => ({
          memory: memory ? memory.plus(displayValue) : new Decimal(displayValue)
        }))

      case 'memorySubtract':
        return this.setState(({ memory, displayValue }) => ({
          memory: memory ? memory.minus(displayValue) : null
        }))

      case 'memoryClear':
        return this.setState({ memory: null })

      case 'memoryRecall':
        return (
          this.state.memory &&
          this.setState(({ memory }) => ({
            displayValue: memory.toString(),
            resetDisplayValueOnNextKeyPress: true
          }))
        )

      case 'random':
        return this.setState({
          displayValue: new Decimal(Math.random()).toString(),
          resetDisplayValueOnNextKeyPress: true
        })
    }
  }

  /**
   * Handles click event for all calculator keys
   */
  handleClick = (event, { type }) => {
    // Decide which method to call based on key type
    this[camelCase(`handle-${type}-Key`)].call(this, event.currentTarget)
  }

  render() {
    return (
      <App
        keys={keypads[this.state.mode]}
        currentOperation={this.state.currentOperation}
        mode={this.state.mode}
        displayValue={this.state.displayValue}
        trigUnit={this.state.trigUnit}
        memory={this.state.memory}
        handleClick={this.handleClick}
      />
    )
  }
}

export default AppContainer
