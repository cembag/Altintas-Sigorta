import firebase from "firebase";
import { useEffect } from "react";
import { useAppDispatch } from "../../provider/store";
import "../screen.scss";
import "./panel.scss";

const customers = [
  {"id":"5302461420","name":"Zarah","phone":39,"tax_id":49,"created_at":"7/22/2022","updated_at":"6/2/2022"},
  {"id":"2934497518","name":"Hortensia","phone":62,"tax_id":26,"created_at":"1/1/2023","updated_at":"2/18/2023"},
  {"id":"2625371447","name":"Tades","phone":55,"tax_id":93,"created_at":"2/21/2023","updated_at":"12/22/2022"},
  {"id":"6299627220","name":"Marwin","phone":93,"tax_id":91,"created_at":"9/6/2022","updated_at":"4/29/2023"},
  {"id":"7417077706","name":"Andria","phone":7,"tax_id":42,"created_at":"11/16/2022","updated_at":"10/30/2022"},
  {"id":"1520800649","name":"Marmaduke","phone":97,"tax_id":83,"created_at":"2/15/2023","updated_at":"11/25/2022"},
  {"id":"7684589326","name":"Darrelle","phone":24,"tax_id":95,"created_at":"8/6/2022","updated_at":"5/4/2023"},
  {"id":"5856539486","name":"Sella","phone":3,"tax_id":37,"created_at":"11/27/2022","updated_at":"8/3/2022"},
  {"id":"2336992884","name":"Marcela","phone":85,"tax_id":85,"created_at":"1/4/2023","updated_at":"10/19/2022"},
  {"id":"0747593566","name":"Ermin","phone":77,"tax_id":42,"created_at":"5/2/2023","updated_at":"3/24/2023"},
  {"id":"6072424643","name":"Irene","phone":32,"tax_id":20,"created_at":"6/6/2022","updated_at":"8/10/2022"},
  {"id":"2927738858","name":"Kimberly","phone":19,"tax_id":58,"created_at":"4/1/2023","updated_at":"9/26/2022"},
  {"id":"8984276782","name":"Allsun","phone":18,"tax_id":37,"created_at":"9/3/2022","updated_at":"1/2/2023"},
  {"id":"4568336953","name":"Dede","phone":69,"tax_id":53,"created_at":"2/6/2023","updated_at":"5/20/2022"},
  {"id":"3050979852","name":"Haleigh","phone":61,"tax_id":15,"created_at":"8/13/2022","updated_at":"9/19/2022"},
  {"id":"7487760928","name":"Caitlin","phone":50,"tax_id":23,"created_at":"4/26/2023","updated_at":"11/10/2022"},
  {"id":"5748806835","name":"Alejandra","phone":84,"tax_id":86,"created_at":"11/8/2022","updated_at":"5/9/2022"},
  {"id":"1194996744","name":"Yves","phone":73,"tax_id":36,"created_at":"5/12/2022","updated_at":"5/11/2022"},
  {"id":"7147251180","name":"Jordain","phone":26,"tax_id":25,"created_at":"9/28/2022","updated_at":"5/12/2022"},
  {"id":"6023043933","name":"Samaria","phone":45,"tax_id":47,"created_at":"4/2/2023","updated_at":"6/16/2022"},
  {"id":"4717006356","name":"Skye","phone":98,"tax_id":80,"created_at":"11/2/2022","updated_at":"11/20/2022"},
  {"id":"9565225365","name":"Rey","phone":60,"tax_id":5,"created_at":"3/2/2023","updated_at":"9/11/2022"},
  {"id":"8314872490","name":"Ardenia","phone":13,"tax_id":1,"created_at":"1/5/2023","updated_at":"6/17/2022"},
  {"id":"3060473021","name":"Elberta","phone":48,"tax_id":94,"created_at":"12/17/2022","updated_at":"2/14/2023"},
  {"id":"1894142470","name":"Welch","phone":19,"tax_id":6,"created_at":"10/14/2022","updated_at":"11/13/2022"},
  {"id":"3565516887","name":"Lizette","phone":99,"tax_id":91,"created_at":"2/26/2023","updated_at":"5/1/2023"},
  {"id":"1439354537","name":"Sidonnie","phone":37,"tax_id":38,"created_at":"5/17/2022","updated_at":"8/30/2022"},
  {"id":"5813204644","name":"Grady","phone":39,"tax_id":99,"created_at":"4/13/2023","updated_at":"7/20/2022"},
  {"id":"2102596354","name":"Kizzee","phone":50,"tax_id":96,"created_at":"7/5/2022","updated_at":"7/31/2022"},
  {"id":"9252878769","name":"Roscoe","phone":53,"tax_id":61,"created_at":"2/22/2023","updated_at":"9/11/2022"},
  {"id":"0956528678","name":"Alvira","phone":51,"tax_id":4,"created_at":"11/23/2022","updated_at":"1/30/2023"},
  {"id":"5366402514","name":"Bea","phone":39,"tax_id":44,"created_at":"7/22/2022","updated_at":"12/26/2022"},
  {"id":"8323494630","name":"Ambrosio","phone":70,"tax_id":48,"created_at":"3/22/2023","updated_at":"9/9/2022"},
  {"id":"1728874157","name":"Arlen","phone":26,"tax_id":44,"created_at":"1/13/2023","updated_at":"12/9/2022"},
  {"id":"6480908554","name":"Doretta","phone":52,"tax_id":37,"created_at":"5/18/2022","updated_at":"7/4/2022"},
]

export default function Panel(): JSX.Element {

  //const dispatch = useAppDispatch();

  useEffect(() => {
    customers.forEach((customer) => {
      //firebase.firestore().collection("customers").add(customer).then(() => console.log("customer added: ", customer.name));
    })    
  }, [])

  return (
    <div className="page" id="panel">
      <header>
        <div id="path"></div>
        <h1 className="page-name">Kontrol Paneli</h1>
      </header>

      <div className="page-container">

      </div>
    </div>
  )
}
