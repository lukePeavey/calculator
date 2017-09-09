import React, { Component } from 'react'
import App from '../components/app/App'
import keypads from '../global/keypads'
import { camelCase } from 'lodash'
import Decimal from 'decimal.js'

class AppContainer extends Component {
  componentDidMount() {
    window.Decimal = Decimal
  }
  state = {
    /**
     * Display value is the current value shown on the display screen
     */
    displayValue: '0',

    /**
     * Current output is the stored value that will used as the first operand
     * in binary operations. When chaining multiple operations together, this
     * will be the result of the previous operation. On the first operation,
     * the displayValue when the operation key is pressed is stored as the
     * current output
     */
    currentOutput: null,

    /**
     * The active operation. For binary operations, this is set when the
     * operation key is pressed. The user then enters the second input value
     */
    currentOperation: null,

    /**
     * Determines what to do when a number key is pressed. If this is false,
     * the number will be added to the current display value. When set to true,
     * the next number key press will reset display value and start a new
     * input. This is the case after pressing C, or after pressing an operation
     * key.
     */
    resetDisplayValueOnNextKeyPress: true,

    /**
     * Sets the mode: 'basic' or 'scientific' (currently only 'basic').
     * This will determine which keypad to use, as well as other mode-specific
     * behavior and styles.
     */
    mode: 'basic'
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

  /**
   * Handle Clear key
   * This resets the app to initial state.
   */
  handleClearKey = key => {
    this.setState({
      currentOperation: null,
      currentOutput: null,
      displayValue: 0,
      resetDisplayValueOnNextKeyPress: true
    })
  }

  /**
   * Handle Binary Operations
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
   * Handle equals key
   * @todo support pressing equals multiple times to repeat the previous
   * operation. Test Apple's calculator to see what the expected behavior is.
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
   * Handle unary operations (operations with one input value).
   *
   * Unary operations are performed directly on the display value. The
   * current display value is used as the input (operand), and the result of
   * the operation (output) becomes the new display value.
   */
  handleUnaryOperationKey = key => {
    const operation = key.id
    const operand = new Decimal(this.state.displayValue)
    let output = undefined

    // Handle special keys that dont have a corresponding method
    if (operation === 'percent') {
      output = operand.dividedBy(100)
    } else {
      output = operand[operation]()
    }

    this.setState({ displayValue: output.toString() })
  }

  /**
   * Handles click event for all calculator keys
   */
  handleClick = (event, { type }) => {
    // Log clicks events for testing
    console.group('Key Pressed')
    console.info(type, event.currentTarget.id)
    // Decide which method to call based on key type
    this[camelCase(`handle-${type}-Key`)].call(this, event.currentTarget)
    console.groupEnd()
  }

  render() {
    return (
      <App
        keys={keypads[this.state.mode]}
        currentOperation={this.state.currentOperation}
        displayValue={this.state.displayValue}
        handleClick={this.handleClick}
      />
    )
  }
}

export default AppContainer
