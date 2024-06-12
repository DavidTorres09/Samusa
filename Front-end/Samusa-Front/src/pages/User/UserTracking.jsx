import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import MyTrackingPage from "../../components/UserTrackingPage";
import GeneralAlert from "../../components/GeneralAlert";
import "../../css/user/Index.css";

function UserTracking() {
  return (
    <>
      <body className="fondo">
        <Layout />
        <div>
          <GeneralAlert />
        </div>
        <div className="contentbody- tablatracking fondo">
          <MyTrackingPage />
        </div>
      </body>
    </>
  );
}

export default UserTracking;
