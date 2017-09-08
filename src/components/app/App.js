import React from 'react'
import './App.css'
import Keypad from '../keypad/Keypad'
import Display from '../display/Display'

const App = ({ keys, displayValue }) => (
  <div className="App">
    <Display value={displayValue || 0} />
    <Keypad keys={keys} />
  </div>
)

export default App
