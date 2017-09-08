import React from 'react'
import './App.css'
import Keypad from '../keypad/Keypad'
import Display from '../display/Display'

const App = ({ displayValue, ...keypadProps }) => (
  <div className="App">
    <div className="calculator">
      <Display value={displayValue || 0} />
      <Keypad {...keypadProps} />
    </div>
  </div>
)

export default App
