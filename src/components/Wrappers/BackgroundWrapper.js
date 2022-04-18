import React from 'react'
import './AllWrapper.css'

const BackgroundWrapper = (props) => {
  return (
    <>
        <div className='main_div'>
            {props.children}
        </div>
    </>
  )
}

export default BackgroundWrapper