import React from "react";

function AuthToggle({ isLogin, toggleAuth }) {
    return (
        <button onClick={toggleAuth}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
    );
}

export default AuthToggle;
