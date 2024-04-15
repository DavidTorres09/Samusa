import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import TicketCliente from "../../components/TicketsCliente";

const UserTickets = () => {
    return (
        <>
        <body className="fondo">
        <Layout/>
            <div className="content-body fondo">
            <TicketCliente/>
            </div>
            <Footer/>
        </body>
        </>       
    );
}

export default UserTickets;