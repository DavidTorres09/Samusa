import AboutUsInformation from "../../components/AboutUsInformation";
import FrequentlyQuestions from "../../components/FrequentlyQuestions";
import Layout from "../../components/Layout";
import Services from "../../components/Services";
import "../../css/user/Index.css";
import Footer from "../../components/Footer";
import GeneralAlert from "../../components/GeneralAlert";

function IndexUser() {
  return (
    <body className="fondo">
      <div style={{ marginBottom: "1%" }}>
        <Layout></Layout>
        <div>
          <GeneralAlert />
        </div>
        <AboutUsInformation />
        <Services />
        <FrequentlyQuestions />
        <Footer />
      </div>
    </body>
  );
}

export default IndexUser;
