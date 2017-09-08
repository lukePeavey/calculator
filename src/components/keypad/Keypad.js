import React from 'react'
import Key from '../key/Key'
import './Keypad.css'

const Keypad = ({ keys: keypadRows, handleClick, currentOperation }) => (
  <section className="Keypad">
    {keypadRows.map((keys, index) => (
      <div className="Keypad-row" key={`row${index}`}>
        {keys.map(({ id, ...keyProps }) => {
          // @todo - Rename keys and keypad something else.
          // Just noticed this is very confusing with React's key prop.
          return (
            <Key
              key={id}
              id={id}
              handleClick={handleClick}
              active={currentOperation === id}
              {...keyProps}
            />
          )
        })}
      </div>
    ))}
  </section>
)

export default Keypad
