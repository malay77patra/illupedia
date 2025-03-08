import React from "react";

export default function Button({ type, onClick, children }) {
    return <button className="cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-accent text-white" type={type} onClick={onClick}>{children}</button>;
}
