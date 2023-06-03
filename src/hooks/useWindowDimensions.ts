import { useState, useLayoutEffect } from "react"
import { setDimensions } from "../provider/site/site";
import { useAppDispatch } from "../provider/store";

export default function useWindowDimensions() {

    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        function handleResize() {
            dispatch(setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            }))
        }
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

}