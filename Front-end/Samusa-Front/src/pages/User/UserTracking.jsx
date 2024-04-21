import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import TrackingPage from "../../components/UserTrackingPage";
import TrackPage from "../../components/TrackingPage";
import "../../css/user/Index.css";
import "../../css/user/Tracking.css";
import GeneralAlert from "../../components/GeneralAlert";


function UserTracking () {

    return (
        <>
        <body  className="fondo">
        <Layout></Layout>
        <div>
        <GeneralAlert/>
        </div>
        <div className="content-body trackmain">
        <TrackPage/>
        </div>
        <Footer></Footer>
        </body>
        </>
        
    );
}

export default UserTracking;