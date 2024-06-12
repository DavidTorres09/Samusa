import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import TicketCliente from "../../components/TicketsCliente";
import GeneralAlert from "../../components/GeneralAlert";

const UserTickets = () => {
  return (
    <>
      <body className="fondo">
        <Layout />
        <div>
          <GeneralAlert />
        </div>
        <div className="content-body fondo">
          <TicketCliente />
        </div>
        <Footer />
      </body>
    </>
  );
};

export default UserTickets;
