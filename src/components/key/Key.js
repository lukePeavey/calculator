import React from 'react'
import './Key.css'

const Key = ({ label, type, handleClick, active, ...props }) => {
  return (
    <button
      className={`Key ${type} ${active ? 'active' : ''}`}
      onClick={event => handleClick(event, { type })}
      {...props}>
      <span className="Key-label" dangerouslySetInnerHTML={{ __html: label }} />
    </button>
  )
}

export default Key
