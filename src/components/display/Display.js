import React from 'react'
import scaleDisplayFontSize from '../../utils/scaleDisplayFontSize'
import './Display.css'

const Display = ({ value = '0', trigUnit, mode }) => {
  // scales fontSize based on length of display value
  let fontSize = scaleDisplayFontSize(value, mode)
  return (
    <section className="Display">
      {mode === 'scientific' && <div className="Display-unit">{trigUnit}</div>}
      <div className="Display-value" style={{ fontSize }}>
        {value}
      </div>
    </section>
  )
}

export default Display
