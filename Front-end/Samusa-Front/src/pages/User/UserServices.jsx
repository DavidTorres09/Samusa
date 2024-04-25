import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import "../../css/user/Index.css";
import GeneralAlert from "../../components/GeneralAlert";


function UserServices () {

    return (
        <>
        <body className="fondo">
        <Layout/>
        <div>
        <GeneralAlert/>
        </div>
            <div className="content-body">
                <p className="text-white">ACA VAN LOS SERVICIOS HAY QUE HACER OTRO COMPONENTE</p>
            </div>
            <Footer/>
        </body>
        </>
    );
}

export default UserServices;