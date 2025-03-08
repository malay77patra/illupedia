import React, { useState } from "react";
import Button from "@components/Button";
import toast from 'react-hot-toast';


export default function Auth() {

    const fetchData = async () => {
        try {
            const response = await fetch("https://illupedia.onrender.com", { credentials: "include" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const restxt = await response.text();
            toast.success(restxt);
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error(`${err.message || "Something went wrong"}`);
        }
    };


    return (
        <div>
            <Button onClick={() => fetchData()}>Check Server</Button>
        </div>
    );
}
