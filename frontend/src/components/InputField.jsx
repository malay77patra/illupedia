import React from "react";

export default function InputField({ type, placeholder, register, error }) {
    return (
        <div>
            <input type={type} placeholder={placeholder} {...register} />
            {error && <p>{error}</p>}
        </div>
    );
}
