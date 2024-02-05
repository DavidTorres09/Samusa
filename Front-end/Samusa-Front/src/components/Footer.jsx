import "../Css/Footer.css"

const Footer = () => {

    return(
        <footer>
            <div class="footer-section" id="footer-branding">
            <img src="https://i.postimg.cc/0yr9d941/LOGOsinsombra.png" alt="" srcset="" />
        </div>
        <div class="footer-section" id="footer-contact">
            <h3>Contacto</h3>
            <p>+(506) XXXX-XXXX</p>
            <p>contacto@samusa.com</p>
        </div>
        <div class="footer-section" id="footer-social">
            <h3>Síguenos</h3>
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">LinkedIn</a>
        </div>
        </footer>
    );

};
export default Footer;