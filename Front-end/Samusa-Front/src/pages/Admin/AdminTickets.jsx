import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import TicketsTable from "../../components/TicketsTable";

const AdminTickets = () => {
  return (
    <>
      <LayoutAdmin/>
      <TicketsTable/>
      <Footer/>
    </>
  );
};

export default AdminTickets;