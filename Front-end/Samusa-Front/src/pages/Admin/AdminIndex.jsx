import LayoutAdmin from "../../components/LayoutAdmin";
import Footer from "../../components/Footer";
import ImportaChart from "../../components/ImportaChart";
import AdminInfoCards from "../../components/AdminIndexInfocards";
import "../../Css/Template.css"

const AdminIndex = () => {
    return (
        <>
        <body className="skin-dark">
        <LayoutAdmin/>
        <div className="content-body">

        <div className="row justify-content-between align-items-center mb-10">
            <div className="col-12 col-lg-auto mb-20">
                <div className="page-heading">
                    <h3>Samusa <span>/ Menú de Admin</span></h3>
                </div>
            </div>
        </div>

        <div>
        <AdminInfoCards/>
        </div>

        </div>
        <Footer/>
        </body>
        </>
    );
    }

export default AdminIndex;