import React from 'react'

const Key = ({ label, type, ...props }) => {
  return (
    <button className={`Key ${type}`} {...props}>
      <span className="Key-label" dangerouslySetInnerHTML={{ __html: label }} />
    </button>
  )
}

export default Key
