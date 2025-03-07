import React from "react"
import Button from "@components/Button"
import toast from 'react-hot-toast';


export default function Auth() {
    return (
        <div>
            <h1 className="text-accent">Login</h1>
            <Button onClick={() => toast.success('Successfully toasted!')}>Info</Button>
        </div>
    )
}
