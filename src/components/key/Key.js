import React from 'react'
import './Key.css'

const Key = ({ type, id, handleClick, active, trigUnit, label, ...props }) => {
  const text = id === 'trigUnit' ? (trigUnit === 'deg' ? 'rad' : 'deg') : label
  return (
    <button
      id={id}
      className={`Key ${type} ${active ? 'active' : ''}`}
      onClick={event => handleClick(event, { type })}
      {...props}>
      <span className="Key-label" dangerouslySetInnerHTML={{ __html: text }} />
    </button>
  )
}

export default Key
