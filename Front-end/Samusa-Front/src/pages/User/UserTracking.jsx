import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import TrackingPage from "../../components/UserTrackingPage";
import TrackPage from "../../components/TrackingPage";
import "../../css/user/Index.css";
import "../../css/user/Tracking.css";


function UserTracking () {

    return (
        <>
        <body>
        <Layout></Layout>
        <div className="content-body trackmain">
        <TrackPage/>
        </div>
        <Footer></Footer>
        </body>
        </>
        
    );
}

export default UserTracking;