import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import "../../css/user/Index.css";
import AboutUsUser from "../../components/AboutsUsUser";
import GeneralAlert from "../../components/GeneralAlert";


function AboutUs () {

    return (
        <>
        <body className="fondo">
        <Layout/>
        <div>
        <GeneralAlert/>
        </div>
            <div className="content-body">
            <AboutUsUser/>
            </div>
            <Footer/>
        </body>
        </>
    );
}

export default AboutUs;