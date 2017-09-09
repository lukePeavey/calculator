import React from 'react'
import Keypad from '../keypad/Keypad'
import Display from '../display/Display'
import './App.css'

const App = ({ displayValue, mode, ...keypadProps }) => (
  <div className="App">
    <div className={`calculator ${mode}`}>
      <Display value={displayValue || 0} />
      <Keypad {...keypadProps} />
    </div>
  </div>
)

export default App
