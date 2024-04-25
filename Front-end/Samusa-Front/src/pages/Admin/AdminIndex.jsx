import LayoutAdmin from "../../components/LayoutAdmin";
import Footer from "../../components/Footer";
import ImportaChart from "../../components/ImportaChart";
import AdminInfoCards from "../../components/AdminIndexInfocards";
import AdminIndexCharts from "../../components/AdminIndexCharts";
import AdminAlertsandbuttons from "../../components/AdminIndexAlarmasybotones";
import GeneralAlert from "../../components/GeneralAlert";
import Calendar from "../../components/Calendar";
import "../../Css/Template.css"

const AdminIndex = () => {
    return (
        <>
        <body className="skin-dark">
        <LayoutAdmin/>
        <div>
        <GeneralAlert/>
        </div>
        <div className="content-body">

        <div className="row justify-content-between align-items-center mb-10">
            <div className="col-12 col-lg-auto mb-10">
                <div className="page-heading">
                    <h3>Samusa <span>/ Menú de Admin</span></h3>
                </div>
            </div>
        </div>

        <div>
        <AdminInfoCards/>
        </div>
        <br />
        <div>
        <AdminIndexCharts/>
        </div>
        <br />
        <div>
        <AdminAlertsandbuttons/>
        </div>
        <br />
        <br />
        
        </div>
        <Footer/>
        </body>
        </>
    );
    }

export default AdminIndex;