import React from 'react'

const InputText = ({text, onChange, disabled}) => {

    return (
        <textarea disabled={disabled} onChange={onChange} value={text} onPaste={(e) => e.preventDefault()}>

        </textarea>
    )
}

export default InputText