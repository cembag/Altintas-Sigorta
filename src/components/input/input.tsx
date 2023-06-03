import "./input.scss"
import React, { useState } from "react"
import { CgClose } from "react-icons/cg"

type InputAProps = {
    placeHolder: string
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    type: string,
    requiredField: boolean,
}

export default function InputA(inputAProps: InputAProps): JSX.Element {

    const {placeHolder, value, setState, type, requiredField} = inputAProps;
    
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isFocusedBefore, setIsFocusedBefore] = useState<boolean>(false);

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.slice(0, e.target.maxLength)
        setState(e.target.value);
    }

    return (
        <div className="input-container-a form-el">
            <label style={{color: (isFocusedBefore && !value && !isFocused && requiredField) ? "rgb(255, 114, 101)" : isFocused ? "var(--theme-color)" : "rgb(120,120,120)"}}>{placeHolder}</label>
            {(isFocusedBefore && !value && !isFocused && requiredField) && <span className="placeholder">* Bu alan boş bırakılamaz</span>}
            <input autoComplete="off" type={type} onChange={handle} value={value} onFocus={() => setIsFocused(true)} onBlur={() => {
                setIsFocused(false);
                setIsFocusedBefore(true);
            }}
            style={{
            border: (isFocusedBefore && !value && !isFocused && requiredField) ? "1px solid rgba(255, 0, 0, 5)" : "1px solid var(--border-color)",
            background: isFocused ? "white" : "rgb(250,250,250)"}}
            maxLength={type === "number" ? 11 : 50}/>
            
            {
                value && (
                    <div className="clear-button" onClick={() => setState("")}>
                        <CgClose className="clear-icon" style={{color: isFocused ? "var(--theme-color)" : "rgba(0,0,0,.5)"}}/>
                    </div>
                )
            }
        </div>
    )
}