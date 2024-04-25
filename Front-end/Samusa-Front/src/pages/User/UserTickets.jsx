import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import TicketCliente from "../../components/TicketsCliente";
import GeneralAlert from "../../components/GeneralAlert";

const UserTickets = () => {
    return (
        <>
        <div className="fondo">
        <Layout/>
        <div>
        <GeneralAlert/>
        </div>
            <div className="content-body fondo">
            <TicketCliente/>
            </div>
            <Footer/>
        </div>
        </>       
    );
}

export default UserTickets;