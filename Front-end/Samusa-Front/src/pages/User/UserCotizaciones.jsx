import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import CotizacionesUser from "../../components/CotizacionesUser";


function UserCotizaciones () {

    return (
        <>
        <body className="fondo">
        <Layout/>
            <div className="content-body fondo">
            <CotizacionesUser/>
            </div>
            <Footer/>
        </body>
        </>   
    );
}

export default UserCotizaciones;