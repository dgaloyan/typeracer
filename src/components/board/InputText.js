import React from 'react';

const InputText = ({text, onChange, disabled}) => {

    return (
        <textarea disabled={disabled} onChange={onChange} value={text}>

        </textarea>
    );
};

export default InputText;