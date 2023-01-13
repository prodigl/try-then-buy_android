import React from 'react'
import { MiscellaneousProvider } from 'providers/Miscellaneous.js';

const PositionIssue = ({children}) => {
  const { isSliderActive } = MiscellaneousProvider();
  return (
    <div style={isSliderActive ? { position:'fixed', top:'0', left:'0', right:'0' } : {display: 'block' }}>
      {children}
    </div>
  )
}

export default PositionIssue;