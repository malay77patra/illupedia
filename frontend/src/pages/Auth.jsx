import React, { useState } from "react";
import Button from "@components/Button";
import toast from 'react-hot-toast';

const Test = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("https://illupedia.onrender.com", {
                credentials: 'include'
            });
            const result = await response.text();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <Button onClick={fetchData}>Fetch Data</Button>
            {data && <pre>{data}</pre>}
        </div>
    );
};

export default function Auth() {
    return (
        <div>
            <Button onClick={() => toast.success('Successfully notified!')}>Notify</Button>
            <Test />
        </div>
    );
}
