import React from "react";

export default function Button({ type, onClick, children }) {
    return <button className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 active:opacity-[0.9] font-medium rounded-lg text-sm px-5 py-2.5" type={type} onClick={onClick}>{children}</button>;
}
