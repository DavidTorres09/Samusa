import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import RevCTable from "../../components/RevCTable";
import RevCChart from "../../components/RevCChar";

const AdminRevisionContainer = () => {
    return (
        <>
        <LayoutAdmin/>
        <br />
        <br />
        <br />
        <RevCTable/>
        <RevCChart/>
        <Footer/>
        </>
    );
}

export default AdminRevisionContainer;