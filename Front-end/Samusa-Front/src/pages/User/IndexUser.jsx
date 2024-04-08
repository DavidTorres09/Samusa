import AboutUsInformation from "../../components/AboutUsInformation";
import FrequentlyQuestions from "../../components/FrequentlyQuestions";
import Layout from "../../components/Layout";
import Services from "../../components/Services";
import "../../css/user/Index.css";
import Footer from "../../components/Footer";

function IndexUser () {

    return (
        <body>
            <div style={{ marginBottom: '1%' }}>
                <Layout></Layout>
                <AboutUsInformation/>
                <Services/>
                <FrequentlyQuestions/>
                <Footer/>
            </div>
        </body>
    );
}

export default IndexUser;