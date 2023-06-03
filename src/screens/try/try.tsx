import { useEffect, useState } from "react";
import "./try.scss";


export default function Try() {

    const now = new Date();
    const initialDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const [date, setDate] = useState<string>(initialDate);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
    
    useEffect(() => {
    
        if(date) {
            console.log(date);
        }
    
    }, [date]);

    return (
       <div className="page noselect">
        
            <input type="date" value={date} onChange={handleDateChange}/>
        
       </div>
    )
}