import ClientsTable from "../../components/ClientsTable";
import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminClientes = () => {
  return (
    <>
    <LayoutAdmin/>
    <br />
    <br />
    <br />
    <section className="Background">
    <ClientsTable/>
    </section>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Footer/>
    </>
  );
};

export default AdminClientes;