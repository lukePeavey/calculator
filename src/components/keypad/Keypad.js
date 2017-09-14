import React from 'react'
import Key from '../key/Key'
import './Keypad.css'

const Keypad = ({ keys: rows, handleClick, currentOperation, trigUnit }) => (
  <section className="Keypad">
    {rows.map((keys, index) => (
      <div className="Keypad-row" key={`row${index}`}>
        {keys.map(keyProps => (
          <Key
            key={keyProps.id}
            handleClick={handleClick}
            active={currentOperation === keyProps.id}
            trigUnit={trigUnit}
            {...keyProps}
          />
        ))}
      </div>
    ))}
  </section>
)

export default Keypad
