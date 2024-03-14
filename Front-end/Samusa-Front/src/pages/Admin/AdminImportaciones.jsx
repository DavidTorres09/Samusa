import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import ImportaTable from "../../components/ImportaTable";
import ImportaChart from "../../components/ImportaChart";

const AdminImportaciones = () => {
    return (
        <>
        <LayoutAdmin/>
        <ImportaTable/>
        <ImportaChart/>
        <Footer/>
        </>
    );
}

export default AdminImportaciones;