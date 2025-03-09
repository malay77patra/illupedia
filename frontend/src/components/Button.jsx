import React from "react";

export default function Button({ children, ...props }) {
    return <button className="cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-accent active:opacity-active disabled:opacity-disabled text-white" {...props}>{children}</button>;
}
