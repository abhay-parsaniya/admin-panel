import React from 'react'
import '../Wrappers/AllWrapper.css'

const ContainerWrapper = (props) => {
  return (
    <>
        <div className='container'>
            {props.children}
        </div>
    </>
  )
}

export default ContainerWrapper