import ClientsTable from "../../components/PerfilForm";
import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import "../../Css/Template.css"
import "../../Css/datatables.min.css"
import "../../Css/datatables.css"
import PerfilForm from "../../components/PerfilForm";

const UserPerfil = () => {
    return (
      <>
      <body className="skin-dark">
      <LayoutAdmin/>
        <div className="content-body">
        <PerfilForm/>
        </div>
        <Footer/>
      </body>
      </>
    );
  };
  
  export default UserPerfil;