import React from 'react'
import Keypad from '../keypad/Keypad'
import Display from '../display/Display'
import './App.css'

const App = ({ displayValue, mode, trigUnit, ...keypadProps }) => (
  <div className="App">
    <div className={`calculator ${mode}`}>
      <Display trigUnit={trigUnit} value={displayValue} mode={mode} />
      <Keypad trigUnit={trigUnit} {...keypadProps} />
    </div>
  </div>
)

export default App
