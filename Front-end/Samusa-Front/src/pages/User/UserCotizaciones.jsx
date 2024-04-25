import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import CotizacionesUser from "../../components/CotizacionesUser";
import GeneralAlert from "../../components/GeneralAlert";


function UserCotizaciones () {

    return (
        <>
        <div className="fondo">
        <Layout/>
        <div>
        <GeneralAlert/>
        </div>
            <div className="content-body fondo">
            <CotizacionesUser/>
            </div>
            <Footer/>
        </div>
        </>   
    );
}

export default UserCotizaciones;