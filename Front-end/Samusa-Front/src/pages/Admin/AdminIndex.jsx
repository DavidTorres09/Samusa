import LayoutAdmin from "../../components/LayoutAdmin";
import Footer from "../../components/Footer";
import ImportaChart from "../../components/ImportaChart";

const AdminIndex = () => {
    return (
        <>
        <LayoutAdmin/>
        <section id="dashboard">
            <h1>Bienvenido a tu Dashboard</h1>
            <div class="cards-container">
                <div class="card left-card hvr-bubble-float-left">
                <ImportaChart/>
                </div>
                <div class="card left-card hvr-bubble-float-left">
                <ImportaChart/>
                </div>
                <div class="shadow-pop-br card right-card hvr-bubble-float-left">
                <ImportaChart/>
                </div>
            </div>
        </section> 
        <Footer/>
        </>
    );
    }

export default AdminIndex;