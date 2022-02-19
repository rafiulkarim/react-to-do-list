import React, { useEffect } from 'react'
import {type} from "@testing-library/user-event/dist/type";

const Alert = (props) => {
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            props.removeAlter();
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [props.list]);

    return <p className={`alert alert-${props.type}`}>{props.msg}</p>
}

export default Alert