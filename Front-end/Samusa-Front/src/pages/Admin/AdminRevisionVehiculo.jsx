import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import RevVehiculosTable from "../../components/RevVehiculosTable";
import RevVehiculosChart from "../../components/RevVehiculosChart";

const AdminRevisionVehiculo = () => {
  return (
    <>
    <LayoutAdmin/>
    <RevVehiculosTable/>
    <RevVehiculosChart/>
    <Footer/>
    </>
  );
}

export default AdminRevisionVehiculo;