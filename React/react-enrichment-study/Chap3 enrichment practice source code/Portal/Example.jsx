import React from 'react'
import {createPortal} from "react-dom"
import ThankDialog from './ThanksDialog'

const Portal = (props) => {
    return createPortal(props.children, document.getElementById("portal"));
}

export default function Example() {
    return (
        <div onClick={() => console.log('div')}>
            <Portal>
                <ThankDialog />
            </Portal>

            <div style={{ position: "absolute"}}>
                <button>overlapped button</button>
            </div>
        </div>
    )
}
