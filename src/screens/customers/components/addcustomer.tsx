import "../customers.scss";
import firebase from "firebase";
import { useEffect, useState } from "react";
import IPolicy, { PolicySubType, policySubTypes } from "../../../models/policy/ipolicy";
import ICustomer, { CustomerType, customerTypes } from "../../../models/customer/icustomer";
import { BsFillFileEarmarkPdfFill, BsPersonFill, BsTrash, BsWhatsapp } from "react-icons/bs";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import InputA from "../../../components/input/input";
import DropdownA, { DropdownItem, DropdownState } from "../../../components/dropdown/dropdown";
import DatetimeSelector from "../../../components/dateselector/datetimeselector";
import policyNamesTurkhis from "../../../context/policynamesturkhis";
import TrafficPolicy from "../../../models/policy/trafficpolicy";
import KaskoPolicy from "../../../models/policy/kaskopolicy";
import DaskPolicy from "../../../models/policy/daskpolicy";
import insuranceCompanies from "../../../context/insurancecompanies";
import dbModel from "../../../utils/dbModel";

const insuranceDropdownItems: DropdownItem[] = insuranceCompanies.map(insuranceCompany => ({name: insuranceCompany, value: insuranceCompany}));
const policySubtypeDropdownItems: DropdownItem[] = policySubTypes.map(policySubtype => ({value: policySubtype, name: policyNamesTurkhis[policySubtype]}));

const trafficPolicyInitialState: TrafficPolicy = {
    id: "",
    user_id: "",
    name: "",
    model: "",
    brand: "",
    insurance_company: "ak",
    license_plate: "",
    type: "car",
    subtype: "traffic",
    price: 0,
    commission_rate: 10,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    actived_at: firebase.firestore.Timestamp.fromDate(new Date()),
    expired_at: firebase.firestore.Timestamp.fromDate(new Date()),
    updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
}

const kaskoPolicyInitialState: KaskoPolicy = {
    id: "",
    user_id: "",
    name: "",
    model: "",
    brand: "",
    insurance_company: "ak",
    license_plate: "",
    type: "car",
    subtype: "kasko",
    price: 0,
    commission_rate: 10,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    actived_at: firebase.firestore.Timestamp.fromDate(new Date()),
    expired_at: firebase.firestore.Timestamp.fromDate(new Date()),
    updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
}

const daskPolicyInitialState: DaskPolicy = {
    id: "",
    user_id: "",
    name: "",
    insurance_company: "ak",
    type: "dask",
    subtype: "dask",
    price: 0,
    commission_rate: 10,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    actived_at: firebase.firestore.Timestamp.fromDate(new Date()),
    expired_at: firebase.firestore.Timestamp.fromDate(new Date()),
    updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
}

const policyForms: {[key in PolicySubType]: {
    form: ((props: PolicyFormProps) => JSX.Element),
    policy: IPolicy
}} = {
    traffic: {
        form: TrafficPolicyForm,
        policy: trafficPolicyInitialState
    },
    kasko: {
        form: KaskoPolicyForm,
        policy: kaskoPolicyInitialState,
    },
    dask: {
        form: DaskPolicyForm,
        policy: daskPolicyInitialState,
    },
    house: {
        form: DaskPolicyForm,
        policy: daskPolicyInitialState
    },
    "complementary health": {
        form: DaskPolicyForm,
        policy: daskPolicyInitialState,
    },
    "special health": {
        form: DaskPolicyForm,
        policy: daskPolicyInitialState
    }
}

type PolicyFormProps = {
    index: number;
    id?: string;
    policies: {
        element: (props: PolicyFormProps) => JSX.Element;
        policy: IPolicy
        isCompleted: boolean;
    }[];
    setPolicies: React.Dispatch<React.SetStateAction<{
        element: (props: PolicyFormProps) => JSX.Element;
        policy: IPolicy,
        isCompleted: boolean;
    }[]>>;
}

function TrafficPolicyForm(props: PolicyFormProps): JSX.Element {
    
    const { index, policies, setPolicies } = props; 
    const now = new Date();
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [model, setModel] = useState<string>("");
    // const [brand, setBrand] = useState<string>("");
    const [policyPDF, setPolicyPDF] = useState<File | null>();
    const [price, setPrice] = useState<string>("");
    const [licensePlate, setLicensePlate] = useState<string>("");
    const [insuranceCompany, setInsuranceCompany] = useState<DropdownState>({index: 0, isOpen: false});
    const [commissionRate, setCommissionRate] = useState<string>("10");
    const [activedAt, setActivedAt] = useState<Date>(now);
    const [expiredAt, setExpiredAt] = useState<Date>(future);

    useEffect(() => {
        if(licensePlate && policyPDF && price && commissionRate) {
            setPolicies(prev => {
                prev[index].isCompleted = true;
                return [...prev];
            })
        } else {
            setPolicies(prev => {
                prev[index].isCompleted = false;
                return [...prev];
            })
        }
    }, [licensePlate, policyPDF, price, commissionRate]);
    
    useEffect(() => {
        
        setPolicies(prev => {
            
            
            
            return [...prev];
        })
        
    }, [licensePlate, price, commissionRate, insuranceCompany, activedAt, expiredAt])
    
     
    return (
        <div className="policy car-policy" style={{borderBottom: policies.length !== index + 1 ? isOpen ? "1px solid var(--border-color)" : "none" : "none"}}>
            <header style={{borderBottom: policies.length === index + 1 ? isOpen ? "1px solid var(--border-color)" : "1px solid rgb(255,255,255,0)" : "1px solid var(--border-color)", borderBottomLeftRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px", borderBottomRightRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px"}}>
                <div className="policy-subtype">
                    <span>Trafik</span>
                </div>
                <div className="policy-name">
                    <span style={{color: licensePlate ? "rgb(120,120,120)" : "rgb(200,200,200)"}}>
                        {
                            licensePlate ? ("Trafik" + "-" + licensePlate.toUpperCase() + "-" + activedAt.getFullYear()) : " Yeni poliçe"
                        }
                    </span>
                </div>
                <div className="delete-policy center-all" onClick={() => setPolicies(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                })}>
                    <BsTrash className="icon"/> 
                </div>
                <div className="toggle-form" onClick={() => setIsOpen(prev => !prev)}><MdKeyboardArrowLeft className="icon" style={{transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)"}}/></div>
            </header>
            
            <form style={{maxHeight: isOpen ? "1400px" : "0px", opacity: isOpen ? "1" : "0", zIndex: insuranceCompany.isOpen ? "20" : "1", overflow: insuranceCompany.isOpen ? "visible" : "hidden"}}>
                <div className="form-inputs">
                    <div className="input-wrapper">
                        <InputA type="text" value={licensePlate} setState={setLicensePlate} requiredField={false} placeHolder="Araç plakası"/>
                        <DropdownA title="Sigorta şirketi" items={insuranceDropdownItems} state={insuranceCompany} setState={setInsuranceCompany}/>
                    </div>
                    <div className="input-wrapper">
                        <InputA value={price} setState={setPrice} type="number" requiredField={false} placeHolder="Tutar"/>
                        <InputA value={commissionRate} setState={setCommissionRate} type="number" requiredField={false} placeHolder="Komisyon oranı"/>
                    </div>
                    <div className="daterange">
                        <DatetimeSelector title="Başlangıç tarihi" date={activedAt} setDate={setActivedAt}/>
                        <DatetimeSelector title="Bitiş tarihi" date={expiredAt} setDate={setExpiredAt}/>
                    </div>
                    
                    <div className="pdf-upload-area">
                        <label className="header">Poliçe</label>
                        
                        <label htmlFor="pdf-input" className="upload-area">
                            {
                                policyPDF ? (
                                    <>
                                        <h4>Poliçe yüklendi</h4>
                                        <span style={{fontWeight: 500,  marginTop: "5px"}}>{policyPDF.name}</span>
                                        <div className="center-all" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "5px", marginTop: "10px", backgroundColor: "rgba(255,80,80)", color: "var(--color-white-smooth)", border: "1px solid red"}} onClick={(e) => {
                                            e.preventDefault();
                                            setPolicyPDF(null);
                                        }}>
                                            <BsTrash style={{width: "16px", height: "16px", color: "var(--color-white-smooth)"}}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileEarmarkPdfFill className="icon"/>
                                        <h4>Poliçenin pdf halini yükleyiniz</h4>
                                        <span>Sürükle bırak desteklenmemektedir</span>
                                    </>
                                )
                            }
                        </label>
                        <input type="file" accept="application/pdf" id="pdf-input" style={{display: "none"}} onChange={(e) => setPolicyPDF(e.target.files![0])}/>
                        
                    </div>
                </div>
                
                <footer>
                    <span style={{color: policies[index].isCompleted ? "green" : "rgba(255,0,0,.7)"}}>
                        <b>Durum:</b>
                        {
                            policies[index].isCompleted ? " Tamamlandı" : " Tamamlanmadı"
                        }
                    </span>
                    
                    <span>
                        <b>Kazanç:</b>
                        {
                            price ? " " + Math.round(((Number(price)/100) * Number(commissionRate))) + "TL" : " Fiyat bilgisi girilmedi."
                        }
                    </span>
                </footer>
            </form>
        </div>    
    )
}

function KaskoPolicyForm(props: PolicyFormProps): JSX.Element {
    
    const { index, policies, setPolicies } = props; 
    const now = new Date();
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [model, setModel] = useState<string>("");
    // const [brand, setBrand] = useState<string>("");
    const [policyPDF, setPolicyPDF] = useState<File | null>();
    const [price, setPrice] = useState<string>("");
    const [licensePlate, setLicensePlate] = useState<string>("");
    const [insuranceCompany, setInsuranceCompany] = useState<DropdownState>({index: 0, isOpen: false});
    const [commissionRate, setCommissionRate] = useState<string>("10");
    const [activedAt, setActivedAt] = useState<Date>(now);
    const [expiredAt, setExpiredAt] = useState<Date>(future);

    useEffect(() => {
        if(licensePlate && policyPDF && price && commissionRate) {
            setPolicies(prev => {
                prev[index].isCompleted = true;
                return [...prev];
            })
        } else {
            setPolicies(prev => {
                prev[index].isCompleted = false;
                return [...prev];
            })
        }
    }, [licensePlate, policyPDF, price, commissionRate]);
    
     
    return (
        <div className="policy car-policy" style={{borderBottom: policies.length !== index + 1 ? isOpen ? "1px solid var(--border-color)" : "none" : "none"}}>
            <header style={{borderBottom: policies.length === index + 1 ? isOpen ? "1px solid var(--border-color)" : "1px solid rgb(255,255,255,0)" : "1px solid var(--border-color)", borderBottomLeftRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px", borderBottomRightRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px"}}>
                <div className="policy-subtype">
                    <span>Kasko</span>
                </div>
                <div className="policy-name">
                    <span style={{color: licensePlate ? "rgb(120,120,120)" : "rgb(200,200,200)"}}>
                        {
                            licensePlate ? ("Kasko" + "-" + licensePlate.toUpperCase() + "-" + activedAt.getFullYear()) : " Yeni poliçe"
                        }
                    </span>
                </div>
                <div className="delete-policy center-all" onClick={() => setPolicies(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                })}>
                    <BsTrash className="icon"/> 
                </div>
                <div className="toggle-form" onClick={() => setIsOpen(prev => !prev)}><MdKeyboardArrowLeft className="icon" style={{transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)"}}/></div>
            </header>
            
            <form style={{maxHeight: isOpen ? "1400px" : "0px", opacity: isOpen ? "1" : "0", zIndex: insuranceCompany.isOpen ? "20" : "1", overflow: insuranceCompany.isOpen ? "visible" : "hidden"}}>
                <div className="form-inputs">
                    <div className="input-wrapper">
                        <InputA type="text" value={licensePlate} setState={setLicensePlate} requiredField={false} placeHolder="Araç plakası"/>
                        <DropdownA title="Sigorta şirketi" items={insuranceDropdownItems} state={insuranceCompany} setState={setInsuranceCompany}/>
                    </div>
                    <div className="input-wrapper">
                        <InputA value={price} setState={setPrice} type="number" requiredField={false} placeHolder="Tutar"/>
                        <InputA value={commissionRate} setState={setCommissionRate} type="number" requiredField={false} placeHolder="Komisyon oranı"/>
                    </div>
                    <div className="daterange">
                        <DatetimeSelector title="Başlangıç tarihi" date={activedAt} setDate={setActivedAt}/>
                        <DatetimeSelector title="Bitiş tarihi" date={expiredAt} setDate={setExpiredAt}/>
                    </div>
                    
                    <div className="pdf-upload-area">
                        <label className="header">Poliçe</label>
                        
                        <label htmlFor="pdf-input" className="upload-area">
                            {
                                policyPDF ? (
                                    <>
                                        <h4>Poliçe yüklendi</h4>
                                        <span style={{fontWeight: 500,  marginTop: "5px"}}>{policyPDF.name}</span>
                                        <div className="center-all" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "5px", marginTop: "10px", backgroundColor: "rgba(255,80,80)", color: "var(--color-white-smooth)", border: "1px solid red"}} onClick={(e) => {
                                            e.preventDefault();
                                            setPolicyPDF(null);
                                        }}>
                                            <BsTrash style={{width: "16px", height: "16px", color: "var(--color-white-smooth)"}}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileEarmarkPdfFill className="icon"/>
                                        <h4>Poliçenin pdf halini yükleyiniz</h4>
                                        <span>Sürükle bırak desteklenmemektedir</span>
                                    </>
                                )
                            }
                        </label>
                        <input type="file" accept="application/pdf" id="pdf-input" style={{display: "none"}} onChange={(e) => setPolicyPDF(e.target.files![0])}/>
                        
                    </div>
                </div>
                
                <footer>
                    <span style={{color: policies[index].isCompleted ? "green" : "rgba(255,0,0,.7)"}}>
                        <b>Durum:</b>
                        {
                            policies[index].isCompleted ? " Tamamlandı" : " Tamamlanmadı"
                        }
                    </span>
                    
                    <span>
                        <b>Kazanç:</b>
                        {
                            price ? " " + Math.round(((Number(price)/100) * Number(commissionRate))) + "TL" : " Fiyat bilgisi girilmedi."
                        }
                    </span>
                </footer>
            </form>
        </div>    
    )
}

function ComplementaryHealthPolicyForm(props: PolicyFormProps): JSX.Element {

    const { index, id, policies, setPolicies } = props; 
    const now = new Date();
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const [policyPDF, setPolicyPDF] = useState<File | null>();
    const [price, setPrice] = useState<string>("");
    const [insuranceCompany, setInsuranceCompany] = useState<DropdownState>({index: 0, isOpen: false});
    const [commissionRate, setCommissionRate] = useState<string>("10");
    const [activedAt, setActivedAt] = useState<Date>(now);
    const [expiredAt, setExpiredAt] = useState<Date>(future);
    
    useEffect(() => {
        if( policyPDF && price && commissionRate) {
            setPolicies(prev => {
                prev[index].isCompleted = true;
                return [...prev];
            })
        } else {
            setPolicies(prev => {
                prev[index].isCompleted = false;
                return [...prev];
            })
        }
    }, [ policyPDF, price, commissionRate]);
    
     
    return (
        <div className="policy complementary-health-policy" style={{borderBottom: policies.length !== index + 1 ? isOpen ? "1px solid var(--border-color)" : "none" : "none"}}>
            <header style={{borderBottom: policies.length === index + 1 ? isOpen ? "1px solid var(--border-color)" : "1px solid rgb(255,255,255,0)" : "1px solid var(--border-color)", borderBottomLeftRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px", borderBottomRightRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px"}}>
                <div className="policy-subtype">
                    <span>Tam. sağlık</span>
                </div>
                <div className="policy-name">
                    <span style={{color: id ? "rgb(120,120,120)" : "rgb(200,200,200)"}}>
                        {
                            id ? ("TAMSAGLIK" + "-" + id + "-" + activedAt.getFullYear()) : " Yeni poliçe"
                        }
                    </span>
                </div>
                <div className="delete-policy center-all" onClick={() => setPolicies(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                })}>
                    <BsTrash className="icon"/> 
                </div>
                <div className="toggle-form" onClick={() => setIsOpen(prev => !prev)}><MdKeyboardArrowLeft className="icon" style={{transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)"}}/></div>
            </header>
            
            <form style={{maxHeight: isOpen ? "1400px" : "0px", opacity: isOpen ? "1" : "0", zIndex: insuranceCompany.isOpen ? "20" : "1", overflow: insuranceCompany.isOpen ? "visible" : "hidden"}}>
                <div className="form-inputs">
                    <div className="input-wrapper">
                        <DropdownA title="Sigorta şirketi" items={insuranceDropdownItems} state={insuranceCompany} setState={setInsuranceCompany}/>
                    </div>
                    <div className="input-wrapper">
                        <InputA value={price} setState={setPrice} type="number" requiredField={false} placeHolder="Tutar"/>
                        <InputA value={commissionRate} setState={setCommissionRate} type="number" requiredField={false} placeHolder="Komisyon oranı"/>
                    </div>
                    <div className="daterange">
                        <DatetimeSelector title="Başlangıç tarihi" date={activedAt} setDate={setActivedAt}/>
                        <DatetimeSelector title="Bitiş tarihi" date={expiredAt} setDate={setExpiredAt}/>
                    </div>
                    
                    <div className="pdf-upload-area">
                        <label className="header">Poliçe</label>
                        
                        <label htmlFor="pdf-input" className="upload-area">
                            {
                                policyPDF ? (
                                    <>
                                        <h4>Poliçe yüklendi</h4>
                                        <span style={{fontWeight: 500,  marginTop: "5px"}}>{policyPDF.name}</span>
                                        <div className="center-all" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "5px", marginTop: "10px", backgroundColor: "rgba(255,80,80)", color: "var(--color-white-smooth)", border: "1px solid red"}} onClick={(e) => {
                                            e.preventDefault();
                                            setPolicyPDF(null);
                                        }}>
                                            <BsTrash style={{width: "16px", height: "16px", color: "var(--color-white-smooth)"}}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileEarmarkPdfFill className="icon"/>
                                        <h4>Poliçenin pdf halini yükleyiniz</h4>
                                        <span>Sürükle bırak desteklenmemektedir</span>
                                    </>
                                )
                            }
                        </label>
                        <input type="file" accept="application/pdf" id="pdf-input" style={{display: "none"}} onChange={(e) => setPolicyPDF(e.target.files![0])}/>
                        
                    </div>
                </div>
                
                <footer>
                    <span style={{color: policies[index].isCompleted ? "green" : "rgba(255,0,0,.7)"}}>
                        <b>Durum:</b>
                        {
                            policies[index].isCompleted ? " Tamamlandı" : " Tamamlanmadı"
                        }
                    </span>
                    
                    <span>
                        <b>Kazanç:</b>
                        {
                            price ? " " + Math.round(((Number(price)/100) * Number(commissionRate))) + "TL" : " Fiyat bilgisi girilmedi."
                        }
                    </span>
                </footer>
            </form>
        </div>    
    )
}

function SpecialHealthPolicyForm(props: PolicyFormProps): JSX.Element {

    const { index, id, policies, setPolicies } = props; 
    const now = new Date();
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const [policyPDF, setPolicyPDF] = useState<File | null>();
    const [price, setPrice] = useState<string>("");
    const [insuranceCompany, setInsuranceCompany] = useState<DropdownState>({index: 0, isOpen: false});
    const [commissionRate, setCommissionRate] = useState<string>("10");
    const [activedAt, setActivedAt] = useState<Date>(now);
    const [expiredAt, setExpiredAt] = useState<Date>(future);
    
    useEffect(() => {
        if( policyPDF && price && commissionRate) {
            setPolicies(prev => {
                prev[index].isCompleted = true;
                return [...prev];
            })
        } else {
            setPolicies(prev => {
                prev[index].isCompleted = false;
                return [...prev];
            })
        }
    }, [ policyPDF, price, commissionRate]);
    
     
    return (
        <div className="policy complementary-health-policy" style={{borderBottom: policies.length !== index + 1 ? isOpen ? "1px solid var(--border-color)" : "none" : "none"}}>
            <header style={{borderBottom: policies.length === index + 1 ? isOpen ? "1px solid var(--border-color)" : "1px solid rgb(255,255,255,0)" : "1px solid var(--border-color)", borderBottomLeftRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px", borderBottomRightRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px"}}>
                <div className="policy-subtype">
                    <span>Özel. sağlık</span>
                </div>
                <div className="policy-name">
                    <span style={{color: id ? "rgb(120,120,120)" : "rgb(200,200,200)"}}>
                        {
                            id ? ("TAMSAGLIK" + "-" + id + "-" + activedAt.getFullYear()) : " Yeni poliçe"
                        }
                    </span>
                </div>
                <div className="delete-policy center-all" onClick={() => setPolicies(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                })}>
                    <BsTrash className="icon"/> 
                </div>
                <div className="toggle-form" onClick={() => setIsOpen(prev => !prev)}><MdKeyboardArrowLeft className="icon" style={{transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)"}}/></div>
            </header>
            
            <form style={{maxHeight: isOpen ? "1400px" : "0px", opacity: isOpen ? "1" : "0", zIndex: insuranceCompany.isOpen ? "20" : "1", overflow: insuranceCompany.isOpen ? "visible" : "hidden"}}>
                <div className="form-inputs">
                    <div className="input-wrapper">
                        <DropdownA title="Sigorta şirketi" items={insuranceDropdownItems} state={insuranceCompany} setState={setInsuranceCompany}/>
                    </div>
                    <div className="input-wrapper">
                        <InputA value={price} setState={setPrice} type="number" requiredField={false} placeHolder="Tutar"/>
                        <InputA value={commissionRate} setState={setCommissionRate} type="number" requiredField={false} placeHolder="Komisyon oranı"/>
                    </div>
                    <div className="daterange">
                        <DatetimeSelector title="Başlangıç tarihi" date={activedAt} setDate={setActivedAt}/>
                        <DatetimeSelector title="Bitiş tarihi" date={expiredAt} setDate={setExpiredAt}/>
                    </div>
                    
                    <div className="pdf-upload-area">
                        <label className="header">Poliçe</label>
                        
                        <label htmlFor="pdf-input" className="upload-area">
                            {
                                policyPDF ? (
                                    <>
                                        <h4>Poliçe yüklendi</h4>
                                        <span style={{fontWeight: 500,  marginTop: "5px"}}>{policyPDF.name}</span>
                                        <div className="center-all" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "5px", marginTop: "10px", backgroundColor: "rgba(255,80,80)", color: "var(--color-white-smooth)", border: "1px solid red"}} onClick={(e) => {
                                            e.preventDefault();
                                            setPolicyPDF(null);
                                        }}>
                                            <BsTrash style={{width: "16px", height: "16px", color: "var(--color-white-smooth)"}}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileEarmarkPdfFill className="icon"/>
                                        <h4>Poliçenin pdf halini yükleyiniz</h4>
                                        <span>Sürükle bırak desteklenmemektedir</span>
                                    </>
                                )
                            }
                        </label>
                        <input type="file" accept="application/pdf" id="pdf-input" style={{display: "none"}} onChange={(e) => setPolicyPDF(e.target.files![0])}/>
                        
                    </div>
                </div>
                
                <footer>
                    <span style={{color: policies[index].isCompleted ? "green" : "rgba(255,0,0,.7)"}}>
                        <b>Durum:</b>
                        {
                            policies[index].isCompleted ? " Tamamlandı" : " Tamamlanmadı"
                        }
                    </span>
                    
                    <span>
                        <b>Kazanç:</b>
                        {
                            price ? " " + Math.round(((Number(price)/100) * Number(commissionRate))) + "TL" : " Fiyat bilgisi girilmedi."
                        }
                    </span>
                </footer>
            </form>
        </div>    
    )
}

function HousePolicyForm(props: PolicyFormProps): JSX.Element {

    const { index, id, policies, setPolicies } = props; 
    const now = new Date();
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [policyPDF, setPolicyPDF] = useState<File | null>();
    const [price, setPrice] = useState<string>("");
    const [insuranceCompany, setInsuranceCompany] = useState<DropdownState>({index: 0, isOpen: false});
    const [commissionRate, setCommissionRate] = useState<string>("10");
    const [activedAt, setActivedAt] = useState<Date>(now);
    const [expiredAt, setExpiredAt] = useState<Date>(future);
    
    useEffect(() => {
        if( policyPDF && price && commissionRate) {
            setPolicies(prev => {
                prev[index].isCompleted = true;
                return [...prev];
            })
        } else {
            setPolicies(prev => {
                prev[index].isCompleted = false;
                return [...prev];
            })
        }
    }, [policyPDF, price, commissionRate]);

     
    return (
        <div className="policy house-policy" style={{borderBottom: policies.length !== index + 1 ? isOpen ? "1px solid var(--border-color)" : "none" : "none"}}>
            <header style={{borderBottom: policies.length === index + 1 ? isOpen ? "1px solid var(--border-color)" : "1px solid rgb(255,255,255,0)" : "1px solid var(--border-color)", borderBottomLeftRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px", borderBottomRightRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px"}}>
                <div className="policy-subtype">
                    <span>Konut</span>
                </div>
                <div className="policy-name">
                    <span style={{color: id ? "rgb(120,120,120)" : "rgb(200,200,200)"}}>
                        {
                            id ? ("dask" + "-" + id + "-" + activedAt.getFullYear()) : " Yeni poliçe"
                        }
                    </span>
                </div>
                <div className="delete-policy center-all" onClick={() => setPolicies(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                })}>
                    <BsTrash className="icon"/> 
                </div>
                <div className="toggle-form" onClick={() => setIsOpen(prev => !prev)}><MdKeyboardArrowLeft className="icon" style={{transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)"}}/></div>
            </header>
            
            <form style={{maxHeight: isOpen ? "1400px" : "0px", opacity: isOpen ? "1" : "0", zIndex: insuranceCompany.isOpen ? "20" : "1", overflow: insuranceCompany.isOpen ? "visible" : "hidden"}}>
                <div className="form-inputs">
                    <div className="input-wrapper">
                        <DropdownA title="Sigorta şirketi" items={insuranceDropdownItems} state={insuranceCompany} setState={setInsuranceCompany}/>
                    </div>
                    <div className="input-wrapper">
                        <InputA value={price} setState={setPrice} type="number" requiredField={false} placeHolder="Tutar"/>
                        <InputA value={commissionRate} setState={setCommissionRate} type="number" requiredField={false} placeHolder="Komisyon oranı"/>
                    </div>
                    <div className="daterange">
                        <DatetimeSelector title="Başlangıç tarihi" date={activedAt} setDate={setActivedAt}/>
                        <DatetimeSelector title="Bitiş tarihi" date={expiredAt} setDate={setExpiredAt}/>
                    </div>
                    
                    <div className="pdf-upload-area">
                        <label className="header">Poliçe</label>
                        
                        <label htmlFor="pdf-input" className="upload-area">
                            {
                                policyPDF ? (
                                    <>
                                        <h4>Poliçe yüklendi</h4>
                                        <span style={{fontWeight: 500,  marginTop: "5px"}}>{policyPDF.name}</span>
                                        <div className="center-all" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "5px", marginTop: "10px", backgroundColor: "rgba(255,80,80)", color: "var(--color-white-smooth)", border: "1px solid red"}} onClick={(e) => {
                                            e.preventDefault();
                                            setPolicyPDF(null);
                                        }}>
                                            <BsTrash style={{width: "16px", height: "16px", color: "var(--color-white-smooth)"}}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileEarmarkPdfFill className="icon"/>
                                        <h4>Poliçenin pdf halini yükleyiniz</h4>
                                        <span>Sürükle bırak desteklenmemektedir</span>
                                    </>
                                )
                            }
                        </label>
                        <input type="file" accept="application/pdf" id="pdf-input" style={{display: "none"}} onChange={(e) => setPolicyPDF(e.target.files![0])}/>
                        
                    </div>
                </div>
                
                <footer>
                    <span style={{color: policies[index].isCompleted ? "green" : "rgba(255,0,0,.7)"}}>
                        <b>Durum:</b>
                        {
                            policies[index].isCompleted ? " Tamamlandı" : " Tamamlanmadı"
                        }
                    </span>
                    
                    <span>
                        <b>Kazanç:</b>
                        {
                            price ? " " + Math.round(((Number(price)/100) * Number(commissionRate))) + "TL" : " Fiyat bilgisi girilmedi."
                        }
                    </span>
                </footer>
            </form>
        </div>    
    )
}

function DaskPolicyForm(props: PolicyFormProps): JSX.Element {

    const { index, id, policies, setPolicies } = props; 
    const now = new Date();
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [policyPDF, setPolicyPDF] = useState<File | null>();
    const [price, setPrice] = useState<string>("");
    const [insuranceCompany, setInsuranceCompany] = useState<DropdownState>({index: 0, isOpen: false});
    const [commissionRate, setCommissionRate] = useState<string>("10");
    const [activedAt, setActivedAt] = useState<Date>(now);
    const [expiredAt, setExpiredAt] = useState<Date>(future);
  
    useEffect(() => {
        if(policyPDF && price && commissionRate) {
            setPolicies(prev => {
                prev[index].isCompleted = true;
                return [...prev];
            })
        } else {
            setPolicies(prev => {
                prev[index].isCompleted = false;
                return [...prev];
            })
        }
    }, [policyPDF, price, commissionRate]);
     
    return (
        <div className="policy dask-policy" style={{borderBottom: policies.length !== index + 1 ? isOpen ? "1px solid var(--border-color)" : "none" : "none"}}>
            <header style={{borderBottom: policies.length === index + 1 ? isOpen ? "1px solid var(--border-color)" : "1px solid rgb(255,255,255,0)" : "1px solid var(--border-color)", borderBottomLeftRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px", borderBottomRightRadius: policies.length === index + 1 ? isOpen ? "0px" : "7px" : "0px"}}>
                <div className="policy-subtype">
                    <span>Dask</span>
                </div>
                <div className="policy-name">
                    <span style={{color: id ? "rgb(120,120,120)" : "rgb(200,200,200)"}}>
                        {
                            id ? ("DASK" + "-" + id + "-" + activedAt.getFullYear()) : " Yeni poliçe"
                        }
                    </span>
                </div>
                <div className="delete-policy center-all" onClick={() => setPolicies(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                })}>
                    <BsTrash className="icon"/> 
                </div>
                <div className="toggle-form" onClick={() => setIsOpen(prev => !prev)}><MdKeyboardArrowLeft className="icon" style={{transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)"}}/></div>
            </header>
            
            <form style={{maxHeight: isOpen ? "1400px" : "0px", opacity: isOpen ? "1" : "0", zIndex: insuranceCompany.isOpen ? "20" : "1", overflow: insuranceCompany.isOpen ? "visible" : "hidden"}}>
                <div className="form-inputs">
                    <div className="input-wrapper">
                        <DropdownA title="Sigorta şirketi" items={insuranceDropdownItems} state={insuranceCompany} setState={setInsuranceCompany}/>
                    </div>
                    <div className="input-wrapper">
                        <InputA value={price} setState={setPrice} type="number" requiredField={false} placeHolder="Tutar"/>
                        <InputA value={commissionRate} setState={setCommissionRate} type="number" requiredField={false} placeHolder="Komisyon oranı"/>
                    </div>
                    <div className="daterange">
                        <DatetimeSelector title="Başlangıç tarihi" date={activedAt} setDate={setActivedAt}/>
                        <DatetimeSelector title="Bitiş tarihi" date={expiredAt} setDate={setExpiredAt}/>
                    </div>
                    
                    <div className="pdf-upload-area">
                        <label className="header">Poliçe</label>
                        
                        <label htmlFor="pdf-input" className="upload-area">
                            {
                                policyPDF ? (
                                    <>
                                        <h4>Poliçe yüklendi</h4>
                                        <span style={{fontWeight: 500,  marginTop: "5px"}}>{policyPDF.name}</span>
                                        <div className="center-all" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "5px", marginTop: "10px", backgroundColor: "rgba(255,80,80)", color: "var(--color-white-smooth)", border: "1px solid red"}} onClick={(e) => {
                                            e.preventDefault();
                                            setPolicyPDF(null);
                                        }}>
                                            <BsTrash style={{width: "16px", height: "16px", color: "var(--color-white-smooth)"}}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileEarmarkPdfFill className="icon"/>
                                        <h4>Poliçenin pdf halini yükleyiniz</h4>
                                        <span>Sürükle bırak desteklenmemektedir</span>
                                    </>
                                )
                            }
                        </label>
                        <input type="file" accept="application/pdf" id="pdf-input" style={{display: "none"}} onChange={(e) => setPolicyPDF(e.target.files![0])}/>
                        
                    </div>
                </div>
                
                <footer>
                    <span style={{color: policies[index].isCompleted ? "green" : "rgba(255,0,0,.7)"}}>
                        <b>Durum:</b>
                        {
                            policies[index].isCompleted ? " Tamamlandı" : " Tamamlanmadı"
                        }
                    </span>
                    
                    <span>
                        <b>Kazanç:</b>
                        {
                            price ? " " + Math.round(((Number(price)/100) * Number(commissionRate))) + "TL" : " Fiyat bilgisi girilmedi."
                        }
                    </span>
                </footer>
            </form>
        </div>    
    )
}

export default function AddCustomerSection() {

    const [customerType, setCustomerType] = useState<CustomerType>("individual");
    const [policieSubtypeState, setPolicieSubtypeState] = useState<{isOpen: boolean, value: PolicySubType }>({isOpen: false, value: "traffic"});
    const [policies, setPolicies] = useState<{element: (props: PolicyFormProps) => JSX.Element, isCompleted: boolean, policy: IPolicy}[]>([]);

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [taxId, setTaxId] = useState<string>("");

    function clearPersonalFields() {
        setName("");
        setPhone("");
        setTaxId("");
    };
    
    const addCustomer = async () => {
    
        dbModel.customer.get().then((docs) => {
            docs.docs.forEach(async doc => {
                if(!doc.data().id) {
                    await dbModel.customer.doc(doc.id).delete();
                }
            })
        })
    
        // const customer: ICustomer = {
        //     id: "",
        //     name: name,
        //     phone: phone,
        //     tax_id: taxId,
        //     type: customerType,
        //     created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        // }
        
        // const trafficPolicy: TrafficPolicy = {
        //     id: "",
        //     user_id: "",
        //     name: "TRAFIK-34BF4348-2023",
        //     model: "2020",
        //     brand: "Fiat",
        //     insurance_company: "ak",
        //     license_plate: "34BF4348",
        //     type: "car",
        //     subtype: "traffic",
        //     price: 2600,
        //     commission_rate: 10,
        //     created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        //     actived_at: firebase.firestore.Timestamp.fromDate(new Date()),
        //     expired_at: firebase.firestore.Timestamp.fromDate(new Date()),
        //     updated_at: firebase.firestore.Timestamp.fromDate(new Date()),
        // };
    
        // try {
        //     await dbModel.customer.add(customer).then(async (customer) => {
        //         const customerId = customer.id;
        //         trafficPolicy.user_id = customerId;
                
        //         await dbModel.policies.add(trafficPolicy).then(async (doc) => {
        //             await dbModel.policies.doc(doc.id).update({id: doc.id});
        //             trafficPolicy.id = doc.id;
        //             await dbModel.customerPolicies(customerId).doc(doc.id).set(trafficPolicy);    
        //         });
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <div className="page-content add-customers">
            <div className="sublinks noselect">
                {
                    customerTypes.map((type, index) => {
                        return (
                            <div key={index} className="link" style={{ backgroundColor: customerType === type ? "rgba(5,103,210, .05)" : "rgba(255,255,255,0)" }} onClick={() => setCustomerType(type)}>
                                <span style={{ color: customerType === type ? "rgb(5,103,210)" : "#476282" }}>{type === "individual" ? "Bireysel" : "Kurumsal"}</span>
                            </div>
                        )
                    })
                }
            </div>

            <div className="form-container">

                <div className="form-actions noselect">
                    <div className="action add-action" onClick={addCustomer}>Ekle</div>
                    <div className="action clear-action" onClick={clearPersonalFields}>Temizle</div>
                </div>

                <div className="forms">

                    <div id="personal-form" className="form">

                        <header>
                            <BsPersonFill className="icon" />
                            <h2>Kişisel bilgiler</h2>
                        </header>

                        <div className="form-content">
                            <InputA placeHolder={customerType === "individual" ? "İsim ve soyisim" : "Şirket ismi"} value={name} setState={setName} type="name" requiredField={true} />
                            <InputA placeHolder={customerType === "individual" ? "Telefon numarası" : "İletişim numarası"} value={phone} setState={setPhone} type="number" requiredField={true} />
                            <InputA placeHolder={customerType === "individual" ? "TC kimlik numarası" : "Vergi kimlik numarası"} value={taxId} setState={setTaxId} type="number" requiredField={true} />
                        </div>
                        
                    </div>
                    
                    <div id="automessage-settings-form" className="form">

                        <header>
                            <BsWhatsapp className="icon" />
                            <h2>Otomatik mesaj ayarları</h2>
                        </header>

                        <div className="form-content">
                        </div>
                    </div>
                    
                    <div id="policy-form" className="form">

                        <header>
                            <BsFillFileEarmarkPdfFill className="icon" />
                            <h2>Poliçe bilgileri</h2>
                        </header>
                        
                        <div className="form-content">
                            <div id="add-policy" className="noselect">
                                <div id="policy-type-container">
                                    <div id="policy-type" onClick={() => setPolicieSubtypeState(prev => ({ ...prev, isOpen: !prev.isOpen }))}>
                                        <span>{policyNamesTurkhis[policieSubtypeState.value]}</span>
                                    </div>
                                    {policieSubtypeState.isOpen && <div className="overlay" onClick={() => setPolicieSubtypeState(prev => ({...prev, isOpen: false}))}/>}
                                    <div id="policies-dropdown" className="dropdown" style={{display: policieSubtypeState.isOpen ? "flex" : "none"}}>
                                        {
                                            policySubTypes.map((policieSubType, index) => {
                                                return (
                                                    <div key={index} className="policy-item center-all" onClick={() => setPolicieSubtypeState({ value: policieSubType, isOpen: false })}>
                                                        <span style={{color: policieSubType === policieSubtypeState.value ? "var(--theme-color)" : "rgb(120, 120, 120)"}}>{policyNamesTurkhis[policieSubType]}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div id="button-add-policy" onClick={() => setPolicies(prev => ([...prev, {element: policyForms[policieSubtypeState.value].form, isCompleted: false, policy: policyForms[policieSubtypeState.value].policy}]))}>
                                    <MdAdd className="icon" />
                                    <span>Poliçe bilgisi ekle</span>
                                </div>
                            </div>
                            
                            {
                                policies.length > 0 && (
                                    <div id="customer-policies">
                                        {
                                            policies.map((policy, index) => {
                                                return (
                                                    <policy.element key={index} index={index} id={taxId} policies={policies} setPolicies={setPolicies}/>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}



