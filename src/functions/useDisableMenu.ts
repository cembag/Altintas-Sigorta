import { useEffect } from "react";
import { setMenu } from "../provider/site/site";
import { useAppDispatch, useTypedSelector } from "../provider/store";

export default function useDisableMenu() {
    
    const { dimensions } = useTypedSelector(state => state.site);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(dimensions.width < 750) {
            dispatch(setMenu(false));
        }
    }, [dimensions.width])
    
}