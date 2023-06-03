import "../customers.scss";
import firebase from "firebase";
import { useState, useEffect, useCallback, useRef } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { HiOfficeBuilding, HiOutlineIdentification } from "react-icons/hi";
import { AiOutlineSearch, AiOutlinePhone } from "react-icons/ai";
import { RxReload } from "react-icons/rx";
import { TbSignature } from "react-icons/tb";
import { Rings } from "react-loader-spinner";
import { ReactComponent as NoDataImg } from "../../../assets/images/no-data.svg";
import { IconType } from "react-icons";
import ICustomer from "../../../models/customer/icustomer";
import dbModel from "../../../utils/dbModel";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

const plugin = {

    id: "increase-legend-spacing",
    beforeInit(chart: any) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit;

        // Override the fit function
        chart.legend.fit = function fit() {
            // Call original function and bind scope in order to use `this` correctly inside it
            originalFit.bind(chart.legend)();
            // Change the height as suggested in another answers
            this.height += 20;
        }
    }
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    plugin
);

const chartOptions = {
    responsive: true,
    layout: {
        padding: 20
    },
    scales: {
        x: {
            display: false
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
            title: {
                color: "white"
            },
            labels: {
                color: "rgb(80,80,80)",
                boxHeight: 14,
                boxWidth: 14,
            }
        },
    },
};

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Bireysel',
            data: [40, 30, 30, 50, 45, 20, 100, 120, 80, 80, 60, 90],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Kurumsal',
            data: [10, 20, 30, 40, 40, 50, 60, 70, 80, 80, 70, 90],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Toplam',
            data: [50, 50, 60, 90, 85, 70, 160, 190, 160, 160, 130, 180],
            borderColor: 'rgb(53, 235, 165)',
            backgroundColor: 'rgba(53, 235, 165, 0.5)',
        },
    ],
};

const dataPie = {
    labels: ['Bireysel', 'Kurumsal'],
    datasets: [
        {
            label: 'Müşteri sayısı',
            data: [40, 20],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],

            borderWidth: 2,
        },
    ],
};

const customerFilters = ["phone", "tc_vk", "name"] as const;

type CustomerFilter = typeof customerFilters[number];

type CustomerState = {
    fetching: boolean
    fetched: boolean,
    filtered: boolean,
    filter: CustomerFilter,
    filterMenu: boolean,
    startAfter: null | firebase.firestore.QueryDocumentSnapshot<ICustomer>,
    endBefore: null | firebase.firestore.QueryDocumentSnapshot<ICustomer>,
    customers: ICustomer[],
    customersLength: number,
    pageIndex: number,
    pages: number,
}

const customerInitialState: CustomerState = {
    fetching: false,
    fetched: false,
    filtered: false,
    filter: "phone",
    filterMenu: false,
    startAfter: null,
    endBefore: null,
    customers: [],
    customersLength: 12,
    pageIndex: 1,
    pages: 2
}

type inputState = { value: any, isFocused: boolean };

const inputInitialState = { value: "", isFocused: false };

const rowsPerPage: number = 8;

const filterOptions: { value: CustomerFilter, icon: IconType }[] = [
    {
        icon: TbSignature,
        value: "name"
    },
    {
        icon: HiOutlineIdentification,
        value: "tc_vk"
    },
    {
        icon: AiOutlinePhone,
        value: "phone"
    }
];

export default function CustomersDataSection(): JSX.Element {

    const pageIndex = useRef(1);

    const [searchInputState, setSearchInputState] = useState<inputState>(inputInitialState);
    const [customersState, setCustomersState] = useState<CustomerState>(customerInitialState);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInputState(prev => ({ ...prev, value: e.target.value }));

    const getCustomers = useCallback(async () => {
        setCustomersState(prev => ({ ...prev, fetching: true, filtered: false, fetched: false }));
        const customersSnapshot = await dbModel.customer.orderBy("created_at", "asc").limit(rowsPerPage).get();
        const customers = customersSnapshot.docs.map((customer, index) => {
            if (index === 0) {
                setCustomersState(prev => ({ ...prev, endBefore: customer }));
            }
            if (index === customersSnapshot.docs.length - 1) {
                setCustomersState(prev => ({ ...prev, startAfter: customer }));
            }
            return customer.data();
        });
        setCustomersState(prev => ({ ...prev, fetching: false, fetched: true, customers: customers, customersLength: 100, pageIndex: 1, pages: 2 }));
    }, []);

    useEffect(() => {
        getCustomers();
    }, []);

    useEffect(() => {

        async function getFilteredCustomers() {
            console.warn("FILTERED CUSTOMERS");
            setCustomersState(prev => ({ ...prev, fetching: true, fetched: false }));
            let query = dbModel.customer.orderBy("created_at", "asc");
            if (customersState.filter === "name") {
                query = dbModel.customer.where("name", "==", searchInputState.value);
            }
            if (customersState.filter === "tc_vk") {
                query = dbModel.customer.where("tax_id", "==", searchInputState.value);
            }
            if (customersState.filter === "phone") {
                query = dbModel.customer.where("phone", "==", searchInputState.value);
            }
            const customersSnapshot = await query.get();
            const customers = customersSnapshot.docs.map(customer => customer.data());
            console.log(customers);
            setCustomersState(prev => ({ ...prev, fetching: false, fetched: true, filtered: true, customers: customers, customersLength: customers.length, pageIndex: 1, pages: (customers.length % rowsPerPage) === 0 ? customers.length / rowsPerPage : (customers.length / rowsPerPage) + 1 }));
        }


        if (!searchInputState.isFocused && searchInputState.value.length > 2) {
            getFilteredCustomers();
        }
        else if (!searchInputState.isFocused && searchInputState.value.length < 3 && customersState.filtered) {
            getCustomers();
        }
    }, [searchInputState.isFocused, searchInputState.value, customersState.filter]);

    useEffect(() => {

        async function getCustomersWithStartAfter() {
            setCustomersState(prev => ({ ...prev, fetching: true, fetched: false }));
            const customersSnapshot = await dbModel.customer.orderBy("created_at", "asc").startAfter(customersState.startAfter).limit(rowsPerPage).get();
            const customers = customersSnapshot.docs.map((customer, index) => {
                if (index === 0) {
                    setCustomersState(prev => ({ ...prev, endBefore: customer }));
                }
                if (index === customersSnapshot.docs.length - 1) {
                    setCustomersState(prev => ({ ...prev, startAfter: customer }));
                }
                return customer.data() as unknown as ICustomer;
            });
            setCustomersState(prev => ({ ...prev, fetching: false, fetched: true, customers: customers }));
        }

        async function getCustomersWithEndBefore() {
            setCustomersState(prev => ({ ...prev, fetching: true, fetched: false }));
            const customersSnapshot = await dbModel.customer.orderBy("created_at", "asc").endBefore(customersState.endBefore).limit(rowsPerPage).get();
            const customers = customersSnapshot.docs.map((customer, index) => {
                if (index === 0) {
                    setCustomersState(prev => ({ ...prev, endBefore: customer }));
                }
                if (index === customersSnapshot.docs.length - 1) {
                    setCustomersState(prev => ({ ...prev, startAfter: customer }));
                }
                return customer.data() as unknown as ICustomer;
            });
            setCustomersState(prev => ({ ...prev, fetching: false, fetched: true, customers: customers }));
        }

        function getNonFilteredCustomers() {
            if (customersState.pageIndex > pageIndex.current) {
                if (customersState.startAfter) {
                    getCustomersWithStartAfter().then(() => console.log(customersState));
                }
            } else {
                if (customersState.endBefore) {
                    getCustomersWithEndBefore().then(() => console.log(customersState));
                }
            }
        }

        if (!customersState.filtered) {
            getNonFilteredCustomers();
        } else {

        }

        pageIndex.current = customersState.pageIndex;

    }, [customersState.pageIndex]);

    return (
        <div className="page-content customers-data">
            <section id="customer-search">

                <div className="table customers-table">
                    <div className="tools">

                        <div className="input-container">
                            <AiOutlineSearch className="icon" style={{ color: searchInputState.value && !searchInputState.isFocused ? "rgb(5,103,210)" : "rgb(100,100,100)" }} />
                            <input type="text" id="customer-filter-input" value={searchInputState.value} onChange={handleSearchInput} onFocus={() => setSearchInputState(prev => ({ ...prev, isFocused: true }))} onBlur={() => setSearchInputState(prev => ({ ...prev, isFocused: false }))} placeholder="İsim ile TC/VK no ile ya da iletişim numarası ile arayın."
                                style={{
                                    backgroundColor: searchInputState.value && !searchInputState.isFocused ? "rgba(25,103,210, .1)" : searchInputState.isFocused ? "white" : "rgb(220,220,220)",
                                    border: searchInputState.value && !searchInputState.isFocused ? "2px solid rgba(25,103,210, .1)" : searchInputState.isFocused ? "2px solid rgb(25,103,210)" : "2px solid rgb(220,220,220)",
                                    color: searchInputState.value && !searchInputState.isFocused ? "rgb(5,103,210)" : "var(--color-black-smooth)"
                                }} />

                        </div>

                        <div className="filter-container">
                            <div className="selected-filter" onClick={() => setCustomersState(prev => ({ ...prev, filterMenu: !prev.filterMenu }))}>
                                {customersState.filter === "name" && <TbSignature className="icon" />}
                                {customersState.filter === "tc_vk" && <HiOutlineIdentification className="icon" />}
                                {customersState.filter === "phone" && <AiOutlinePhone className="icon" />}
                            </div>

                            <div className="filters" style={{ display: customersState.filterMenu ? "flex" : "none" }}>
                                {
                                    filterOptions.map((option, index) => {
                                        return (
                                            <div key={index} className="option" onClick={() => setCustomersState(prev => ({ ...prev, filter: option.value, filterMenu: !prev.filterMenu }))}>
                                                <option.icon className="icon" style={{ color: option.value === customersState.filter ? "rgb(20, 120, 220)" : "rgb(100, 100, 100)" }} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="bg-overlay" style={{ display: customersState.filterMenu ? "block" : "none" }} onClick={() => setCustomersState(prev => ({ ...prev, filterMenu: !prev.filterMenu }))} />
                        </div>

                        <RxReload className="reload-icon" />
                    </div>

                    <div className="table-wrapper">
                        <div className="properties">
                            <div className="property type">
                                <h4>TİP</h4>
                            </div>

                            <div className="property name">
                                <h4>İSİM</h4>
                            </div>

                            <div className="property id">
                                <h4>TC/VK</h4>
                            </div>

                            <div className="property phone">
                                <h4>İLETİŞİM</h4>
                            </div>
                        </div>

                        <div className="data">

                            {
                                customersState.customers.length > 0 && customersState.customers.map((customer, index) => {

                                    return (
                                        <div className="customer" key={index} style={{ borderBottom: index === rowsPerPage - 1 ? "none" : "1px solid rgb(230, 230, 230)" }}>
                                            <div className="property type">
                                                {customer.type === "individual" ? <BsPersonFill className="icon" /> : <HiOfficeBuilding className="icon" />}
                                            </div>

                                            <div className="property name">
                                                <span>{customer.name}</span>
                                            </div>

                                            <div className="property id">
                                                <span>{customer.tax_id}</span>
                                            </div>

                                            <div className="property phone">
                                                <span>{customer.phone}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {
                                customersState.fetching && (
                                    <div className="state-container loading">
                                        <Rings color="rgb(20, 120, 220)" />
                                    </div>
                                )
                            }

                            {
                                customersState.fetched && customersState.customersLength === 0 && (
                                    <div className="state-container no-data">
                                        <NoDataImg className="img" />
                                    </div>
                                )
                            }

                        </div>

                        <div className="rb">
                            <span className="result">
                                {!customersState.filtered && "3200 müşteri içinde gösteriliyor."}
                                {customersState.fetching && customersState.filtered && "3200 müşteri içinde aranıyor..."}
                                {(customersState.fetched && customersState.filtered) && (customersState.customersLength === 0 ? "Müşteri bulunamadı." : customersState.customersLength + " müşteri bulundu.")}
                            </span>
                            <div className="space" />
                            <div className="index-controller noselect">
                                <MdKeyboardArrowLeft className="icon" style={{ opacity: customersState.pageIndex === 1 ? ".2" : "1", pointerEvents: customersState.pageIndex === 1 ? "none" : "all" }} onClick={() => setCustomersState(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))} />
                                <span>{customersState.pageIndex}</span>
                                <MdKeyboardArrowLeft className="icon" style={{ transform: "rotate(180deg)", opacity: customersState.pageIndex === customersState.pages ? ".2" : "1", pointerEvents: customersState.pageIndex === customersState.pages ? "none" : "all" }} onClick={() => setCustomersState(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="charts">
                <div className="pie-chart chart">
                    <Pie options={chartOptions} data={dataPie} />
                </div>

                <div className="line-chart chart">
                    <Line options={chartOptions} data={data} />
                </div>
            </div>
        </div>
    )
}