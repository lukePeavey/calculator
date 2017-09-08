import React from 'react'
import Key from '../key/Key'

const Keypad = ({ keys: keypadRows, handleClick }) => (
  <section className="Keypad">
    {keypadRows.map((keys, index) => (
      <div className="Keypad-row" key={`row${index}`}>
        {keys.map(key => {
          return <Key onClick={event => {}} key={key.id} {...key} />
        })}
      </div>
    ))}
  </section>
)

export default Keypad
