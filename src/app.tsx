import "./app.scss";
import Navbar from './components/navbar/navbar'
import SideBar from './components/sidebar/sidebar'
import useDisableMenu from "./functions/useDisableMenu";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { setMenu } from "./provider/site/site";
import { useAppDispatch, useTypedSelector } from "./provider/store";
import Router from './router'

export default function App(): JSX.Element {

  useWindowDimensions();
  useDisableMenu();
  
  const { menu, dimensions } = useTypedSelector(state => state.site);
  const dispatch = useAppDispatch();

  return (
    <div id="app">
      <div className="bg-overlay" style={{pointerEvents: (menu && dimensions.width < 750) ? "all" : "none", opacity: (menu && dimensions.width < 750) ? "1" : "0"}} onClick={() => dispatch(setMenu(false))}/>
      <SideBar/>
      <div style={{
        width: (menu && dimensions.width > 750)  ? "calc(100% - 256px)" : (!menu && dimensions.width > 750)  ?  "calc(100% - 60px)" : "100%",
        marginLeft: (menu && dimensions.width > 750)  ? "256px" : (!menu && dimensions.width > 750)  ?  "60px" : "0px",
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        transition: "margin-left .2s"}}>
        <Navbar/>
        <Router/>
      </div>
    </div>
  )
}
