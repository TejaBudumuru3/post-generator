import React from 'react'

const InputField = () => {
  return (
      <div className='input-box'>
        <div className="input-wrapper">
            <input type='text' className='input-field' placeholder='Post anything' />
            <button className='input-button'>&uarr;</button>
        </div>
    </div>
  )
}

export default InputField