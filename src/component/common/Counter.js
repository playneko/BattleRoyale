import React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Counter = (moveCheck, reload) => {
    let history = useHistory();
    const [count, setCount] = React.useState(10);

    useEffect(() => {
        let id = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(id);
    });

    useEffect(() => {
        setCount(900);
    }, [moveCheck, reload]);

    if (count != null && count < 1) {
        history.push("/home");
    }
}

export default Counter;