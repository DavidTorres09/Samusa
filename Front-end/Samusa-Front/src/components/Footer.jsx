import "../Css/Footer.css"

const Footer = () => {

    return(
        <footer>
            <div className="footer-img" id="footer-branding">
            <img src="https://i.postimg.cc/0yr9d941/LOGOsinsombra.png" alt="" srcSet="" />
            </div>

        <div className="footer-S" id="footer-contact">
            <h3>Contacto</h3>
            <p>+(506) XXXX-XXXX</p>
            <p>contacto@samusa.com</p>
        </div>

        <div className="footer-S" id="footer-social">
            <h3>Síguenos</h3>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
        </div>

        </footer>
    );

};
export default Footer;