import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import PerfilForm from "../../components/PerfilForm";

const UserProfile = () => {
    return (
        <>
            <body className="skin-dark">
                <Layout/>
                    <div className="content-body">
                    <PerfilForm/>
                    </div>
            </body>
        </>
    )
}

export default UserProfile;
