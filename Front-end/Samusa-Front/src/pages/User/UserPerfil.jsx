
import Footer from "../../components/Footer";
import "../../Css/Template.css"
import "../../Css/datatables.min.css"
import "../../Css/datatables.css"
import PerfilForm from "../../components/PerfilForm";
import Layout from "../../components/Layout";

const UserPerfil = () => {
    return (
      <>
      <body className="">
      <Layout/>
        <div className="fondo textperfiluser">
        <div className="content-body">
        <PerfilForm/>
        </div>
        <Footer/>
        </div>
      </body>
      </>
    );
  };
  
  export default UserPerfil;