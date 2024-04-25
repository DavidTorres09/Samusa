import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import TrackingSearch from "../../components/TrackingSearchPage";
import "../../css/user/Index.css";
import "../../css/user/Tracking.css";
import GeneralAlert from "../../components/GeneralAlert";


function TrackingSearchPage () {

    return (
        <>
        <div  className="fondo">
        <Layout></Layout>
        <div>
        <GeneralAlert/>
        </div>
        <div className="content-body">
        <TrackingSearch/>
        </div>
        <Footer></Footer>
        </div>
        </>
        
    );
}

export default TrackingSearchPage;