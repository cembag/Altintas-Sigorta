import "./navbar.scss";
import { MdNotifications, MdFlashOn } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import { useAppDispatch, useTypedSelector } from "../../provider/store";
import { toggleMenu } from "../../provider/site/site";
import useScrollPosition from "../../hooks/useScrollPosition";

export default function Navbar() {

    const { menu, dimensions} = useTypedSelector(state => state.site);
    const scrollPosition = useScrollPosition();
    const dispatch = useAppDispatch();

    return (
        <nav id="navbar" style={{
            width: (menu && dimensions.width > 750)  ? "calc(100% - 256px)" : (!menu && dimensions.width > 750)  ?  "calc(100% - 60px)" : "100%",
            marginLeft: (menu && dimensions.width > 750)  ? "256px" : (!menu && dimensions.width > 750)  ?  "60px" : "0px",
            boxShadow: scrollPosition > 0 ? "0px 1px 3px 0px #0006" : "none"}}>
        
            {
                dimensions.width < 750 && (
                    <div className="menu">
                        <button onClick={() => dispatch(toggleMenu())}>
                            <CgMenu className="icon"/>
                        </button>
                    </div>
                ) 
            }
            
            <h1 className="company-name">Altıntaş Sigorta</h1>
        
            <div className="space"/>
        
            <div className="links">
                <ul>
                    <li>
                        <a href="">
                            <MdFlashOn className="icon"/>
                        </a>
                    </li>
                    
                    <li>
                        <a href="">
                            <MdNotifications className="icon"/>
                        </a>
                    </li>
                </ul>
            </div>
            
        </nav>
    )
}