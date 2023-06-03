import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import initialStateData, { Dimensions, SiteData } from "./initial-state"

export const site = createSlice({
    name: "site",
    initialState: initialStateData,
    reducers: {
        setMenu: (state: SiteData, action: PayloadAction<boolean>) => {
            state.menu = action.payload;
        },
        
        toggleMenu: (state: SiteData) => {
            state.menu = !state.menu;
        },
        
        setDimensions: (state: SiteData, action: PayloadAction<Dimensions>) => {
            state.dimensions = action.payload;
        },
    }
})

export const {setMenu, toggleMenu, setDimensions} = site.actions
export default site.reducer