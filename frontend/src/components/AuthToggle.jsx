import React from "react";

export default function AuthToggle({ isLogin, toggleAuth }) {
    return (
        <button onClick={toggleAuth}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
    );
}
