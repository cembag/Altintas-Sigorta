import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FirebaseAuthContext } from "./utils/authProvider"
import Panel from "./screens/panel/panel";
import Customers from "./screens/customers/customers";
import Customer from "./screens/customer/customer";
import Policies from "./screens/policies/policies";
import Settings from "./screens/settings/settings";
import Whatsapp from "./screens/whatsapp/whatsapp";
import Try from "./screens/try/try";

const ProtectedRoute = ({children}: {children: JSX.Element}): JSX.Element => {
    const authUser = useContext(FirebaseAuthContext)
    console.log(authUser)
    if(!authUser) {
      
        return (
            <Navigate to={"/"}></Navigate>
        )
    }

    return children
}

export default function Router(): JSX.Element {

    return (
        <Routes>
            <Route path="/kontrol paneli/*" element={<Panel/>}/>
            <Route path="/müşterilerim" element={<Customers/>}/>
            <Route path="/müşterilerim/*" element={<Customer/>}/>
            <Route path="/poliçelerim/*" element={<Policies/>}/>
            <Route path="/ayarlar/*" element={<Settings/>}/>
            <Route path="/whatsapp/*" element={<Whatsapp/>}/>
            <Route path="/try" element={<Try />}/>
            
        </Routes>
    )
}