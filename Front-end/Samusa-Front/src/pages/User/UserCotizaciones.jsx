import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import CotizacionesUser from "../../components/CotizacionesUser";
import GeneralAlert from "../../components/GeneralAlert";
import "../../css/user/Cotizaciones.css";

function UserCotizaciones() {
  return (
    <>
      <body className="fondo">
        <Layout />
        <div>
          <GeneralAlert />
        </div>
        <div className="content-body fondo">
          <CotizacionesUser />
        </div>
        <br />
        <br />
        <Footer />
      </body>
    </>
  );
}

export default UserCotizaciones;
