import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import "../../css/user/Index.css";
import FrequentlyQuestions from "../../components/FrequentlyQuestions";
import GeneralAlert from "../../components/GeneralAlert";


function USerPreguntasFrecuentes () {

    return (
        <>
        <Layout/>
        <div>
        <GeneralAlert/>
        </div>
        <FrequentlyQuestions/>
        <Footer/>
        </>
    );
}

export default USerPreguntasFrecuentes;