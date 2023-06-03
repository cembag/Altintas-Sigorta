import "./sidebar.scss";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { externalSourcesLinksData, screensLinkData } from "../../context/links";
import { useAppDispatch, useTypedSelector } from "../../provider/store";
import { setMenu, toggleMenu } from "../../provider/site/site";
import { useLocation, Link } from "react-router-dom";
import useScrollPosition from "../../hooks/useScrollPosition";

export default function SideBar(): JSX.Element {

    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { menu, dimensions } = useTypedSelector(state => state.site);
    const scrollPosition = useScrollPosition();

    return (
        <nav id="sidebar" style={{
            width: menu ? "256px" : dimensions.width < 750 ? "256px" : "60px",
            overflow: menu ? "hidden" : "visible",
            minWidth: menu ? "256px" : "60px",
            transform: dimensions.width < 750 && !menu ? "translate3d(-256px, 0px, 0px)" : "none",
            transition: dimensions.width < 750 ? "transform .2s" : "width .2s, min-width .2s",
        }}>

            <header className="nav-item noselect" style={{ justifyContent: menu ? "flex-start" : dimensions.width < 750 ? "flex-start" : "center" }}>
                <div className="logo" style={{ marginRight: menu ? "12px" : dimensions.width < 750 ? "12px" : "0px" }}>
                    <div className="logo-bg">
                        <div className="logo-front">
                            <span>Δ</span>
                        </div>
                    </div>
                </div>
                {(menu || dimensions.width < 750) && <h1 className="company-name">Altıntaş Sigorta</h1>}
            </header>

            {(menu || dimensions.width < 750) && <h4 className="nav-header">Ana ekranlar</h4>}

            <div className="links" style={{ padding: menu ? "0px 5px" : dimensions.width < 750 ? "0px 5px" : "5px" }}>
                <ul>
                    {
                        screensLinkData.map((linkData, index) => {
                            return (
                                <Link to={linkData.path} onClick={() => {
                                    if(dimensions.width < 750) {
                                        dispatch(setMenu(false))
                                    }
                                }}>
                                    <li key={index}>
                                        <a style={{ justifyContent: menu ? "flex-start" : dimensions.width < 750 ? "flex-start" : "center" }}>
                                            <linkData.icon className="icon" style={{ marginRight: menu ? "12px" : dimensions.width < 750 ? "12px" : "0px", color: decodeURI(pathname).split("/")[1].toLowerCase() === linkData.name.toLowerCase() ? "#669df6" : "var(--color-grey-smooth)" }} />
                                            {(menu || dimensions.width < 750) && <span style={{ color: decodeURI(pathname).split("/")[1].toLowerCase() === linkData.name.toLowerCase() ? "#669df6" : "var(--color-grey-smooth)" }}>{linkData.name}</span>}
                                        </a>
    
                                        {
                                            (!menu && dimensions.width > 750) && (
                                                <div className="link-description" style={{ pointerEvents: menu ? "none" : "all" }}>
                                                    <span>{linkData.name}</span>
                                                </div>
                                            )
                                        }
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>

            {(menu || dimensions.width < 750) && <h4 className="nav-header">Dış kaynaklar</h4>}

            <div className="links" style={{ borderTop: menu ? "none" : dimensions.width < 750 ? "none" : "1px solid #122d46", padding: menu ? "0px 5px" : dimensions.width < 750 ? "0px 5px" : "5px" }}>
                <ul>
                    {
                        externalSourcesLinksData.map((linkData, index) => {
                            return (
                                <Link to={linkData.path} onClick={() => {
                                    if(dimensions.width < 750) {
                                        dispatch(setMenu(false))
                                    }
                                }}>
                                    <li key={index}>
                                        <a href="#" style={{ justifyContent: menu ? "flex-start" : dimensions.width < 750 ? "flex-start" : "center" }}>
                                            <linkData.icon className="icon" style={{ marginRight: menu ? "12px" : dimensions.width < 750 ? "12px" : "0px", color: decodeURI(pathname).split("/")[1].toLowerCase() === linkData.name.toLowerCase() ? "#669df6" : "var(--color-grey-smooth)" }} />
                                            {(menu || dimensions.width < 750) && <span style={{ color: decodeURI(pathname).split("/")[1].toLowerCase() === linkData.name.toLowerCase() ? "#669df6" : "var(--color-grey-smooth)" }}>{linkData.name}</span>}
                                        </a>

                                        {
                                            (!menu && dimensions.width > 750) && (
                                                <div className="link-description" style={{ pointerEvents: menu ? "none" : "all" }}>
                                                    <span>{linkData.name}</span>
                                                </div>
                                            )
                                        }
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>

            {(menu || dimensions.width < 750) && <div className="space"></div>}

            <div className="nav-end nav-item" style={{ justifyContent: menu ? "flex-end" : dimensions.width < 750 ? "flex-end" : "center" }}>
                <MdKeyboardArrowLeft className="icon" onClick={() => dispatch(toggleMenu())} style={{ transform: menu ? "rotate(0deg)" : "rotate(180deg)" }} />
            </div>

        </nav>
    )
}