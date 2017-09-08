import React, { Component } from 'react'
import App from '../components/app/App'
import keypads from '../global/keypads'
import { camelCase } from 'lodash'

class AppContainer extends Component {
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

  // Define a separate method to handle each type of key
  handleNumberKey = key => {}
  handleClearKey = key => {}
  handleEqualsKey = key => {}
  handleBinaryOperationKey = key => {}
  handleUnaryOperationKey = key => {}

  /**
   * Handles click event for all calculator keys
   */
  handleClick = (event, { type }) => {
    // Log clicks events for testing
    console.group('Key Pressed')
    console.info(type, event.currentTarget.id)
    // Decide which method to call based on key type
    this[camelCase(`handle-${type}-Key`)](event.currentTarget) // hard to read?
    console.groupEnd()
  }

  render() {
    return (
      <App
        keys={keypads[this.state.mode]}
        displayValue={this.state.displayValue}
        handleClick={this.handleClick}
      />
    )
  }
}

export default AppContainer
