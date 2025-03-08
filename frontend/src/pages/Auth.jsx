import React from "react"
import Button from "@components/Button"
import toast from 'react-hot-toast';


export default function Auth() {
    return (
        <div>
            <Button onClick={() => toast.success('Successfully notified!')}>Notify</Button>
        </div>
    )
}
