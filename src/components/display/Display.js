import React from 'react'
import './Display.css'

const Display = ({ value = '0' }) => {
  // Adjusts fontsize based on the length of the display value, so the
  // value fits in the display area. Might not work consistently in
  // all browsers/devices.
  let overflow = String(value).slice(12).length
  let fontSize = `${100 - overflow * (overflow < 11 ? 5 : 4)}%`
  return (
    <section className="Display">
      <div className="Display-value" style={{ fontSize }}>
        {value}
      </div>
    </section>
  )
}

export default Display
