import React from "react";

function InputField({ type, placeholder, register, error }) {
    return (
        <div>
            <input type={type} placeholder={placeholder} {...register} />
            {error && <p>{error}</p>}
        </div>
    );
}

export default InputField;
