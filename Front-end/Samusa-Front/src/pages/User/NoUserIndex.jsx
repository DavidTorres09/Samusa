import AboutUsInformation from "../../components/AboutUsInformation";
import FrequentlyQuestions from "../../components/FrequentlyQuestions";
import LayaoutNonAuntenticate from "../../components/LayaoutNonAutenticate";
import Services from "../../components/Services";
import "../../css/user/Index.css";
import Footer from "../../components/Footer";
import GeneralAlert from "../../components/GeneralAlert";

function IndexNonAuntenticate () {

    return (
        <body  className="fondo">
            <div style={{ marginBottom: '1%' }}>
                <LayaoutNonAuntenticate></LayaoutNonAuntenticate>
                <div>
        <GeneralAlert/>
        </div>
                <AboutUsInformation/>
                <Services/>
                <FrequentlyQuestions/>
                <Footer/>
            </div>
        </body>
    );
}

export default IndexNonAuntenticate;