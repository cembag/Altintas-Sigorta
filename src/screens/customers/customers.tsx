import "../screen.scss";
import "./customers.scss";
import { useState } from "react";
import AddCustomerSection from "./components/addcustomer";
import CustomersDataSection from "./components/customersdata";


const pageLinks = ["Veriler", "Müşteri Ekle"];

export default function Customers() {

    const [index, setIndex] = useState<number>(0);

    return (
        <div className="page" id="customers">
            <header>
                <h1 className="page-name">Müşterilerim</h1>

                <div className="page-links noselect">
                    <div className="links">
                        {
                            pageLinks.map((link, i) => {
                                return (
                                    <div key={i} className="link" onClick={() => setIndex(i)}>
                                        <span style={{ color: index === i ? "rgb(5,103,210)" : "#476282" }}>{link}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="line">
                        <div className="xd" style={{ left: index === 0 ? "22px" : "103px", width: index === 0 ? "30px" : "50px" }} />
                        <div className="xb" />
                    </div>
                </div>
            </header>

            <div className="page-container">
                { index === 0 ? <CustomersDataSection/> : <AddCustomerSection/> }
                <div className="bottom-space" />
            </div>

        </div>
    )
}