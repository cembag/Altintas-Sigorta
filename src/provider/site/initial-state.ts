
export type Dimensions = {
    width: number,
    height: number
}

export type SiteData = {
    menu: boolean,
    dimensions: Dimensions,
}

const initialStateSite: SiteData = {
    menu: window.innerWidth > 750,
    dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
    },
}

export default initialStateSite