import Layout from "../Layout";
import Footer from "../../components/Footer";
import "../../css/user/Index.css";


function IndexUser () {

    return (
        <div style={{ marginBottom: '1%' }}>

            <Layout></Layout>
        <section id="inicio" class="split-screen">
        <div class="left-half" id="image-side">
            
        </div>
        <div class="right-half" id="text-side">
            <div class="text-content">
                <h1>Expertos en Servicios Logísticos Aduaneros</h1>
                <p>Exportaciones e importaciones de mercancía y vehículos.</p>
                <div class="buttons">
                    <a href="#servicios" class="btn">Nuestros Servicios</a>
                    <a href="#qa" class="btn">Preguntas Frecuentes</a>
                </div>
            </div>
        </div>
        </section>     

        <section id="quienes-somos">
        <div class="container">
            <h2>Quiénes Somos</h2>
            <p>
                Una empresa centrada en colaborar con nuestros clientes en las labores de logistica de la más alta calidad ante aduanas, navieras, transportistas y demas tramites asi como la documentacion necesaria para el correcto trato de una carga.</p>
        </div>
        </section>

        <section id="servicios">
        <div class="container">
            <h2>Nuestros Servicios</h2>
            <div class="servicios-grid">
                <div class="servicio" id="importaciones">
                    <h3>Importaciones</h3>
                    <p>Facilitamos el proceso de importaciónes de mercancia y vehiculos</p>
                </div>
                <div class="servicio" id="exportaciones">
                    <h3>Exportaciones</h3>
                    <p>Maximizamos el potencial de tus exportaciones con nuestra basta experiencia.</p>
                </div>
                <div class="servicio" id="logistica">
                    <h3>Logística</h3>
                    <p>Optimizamos y generamos la documentacion necesaria para el respectivo pago de impuestos</p>
                </div>
                <div class="servicio" id="paqueteria">
                    <h3>Paquetería</h3>
                    <p>Agilizamos el envío y recepción de paquetes con servicios rápidos y seguros.</p>
                </div>
            </div>
         </div>
         </section>      

         <section id="qa">
         <div class="container">
            <h2>Preguntas Frecuentes</h2>
            <div class="qa-item" tabindex="0">
                <h3>¿Cómo iniciar un proceso de importación o exportación?</h3>
                <p class="respuesta">Para iniciar un proceso de importación o exportación con Samusa, puedes contactarnos a través de nuestro WhatsApp o llamarnos directamente. Nuestro equipo te guiará en cada paso del proceso.</p>
            </div>
            <div class="qa-item" tabindex="0">
                <h3>¿Qué documentación necesito para exportar mercancías?</h3>
                <p class="respuesta">La documentación necesaria para exportar puede variar según el destino y el tipo de mercancía. Sin emabrgo, se requiere una factura comercial o BL, lista de mercancia, informacion de origen y destino, entre otros. Te estaremos asesorando específicamente para tu caso.</p>
            </div>

         </div>
         </section>

         <Footer></Footer>

        </div>
    );
}
/*document.querySelectorAll('.qa-item').forEach(item => { // Interruptor estilo para QA
    item.addEventListener('click', () => {
        const answer = item.querySelector('.respuesta');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

document.addEventListener('DOMContentLoaded', function() { // Animacion del inicio
    const imageSide = document.getElementById('image-side');
    const textSide = document.getElementById('text-side');
    setTimeout(() => {
        imageSide.style.width = '50%';
        textSide.style.width = '50%';
    }, 500);
});
*/
export default IndexUser;