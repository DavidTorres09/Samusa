const AboutUsInformation = () => {
    return (
        <>
        <section id="inicio" class="split-screen">
        <div class="left-half" id="image-side">
            
        </div>
        <div className="right-half" id="text-side">
            <div className="text-content">
                <h1>Expertos en Servicios Logísticos Aduaneros</h1>
                <p>Exportaciones e importaciones de mercancía y vehículos.</p>
                <div className="buttons">
                    <a href="Services" className="btn">Nuestros Servicios</a>
                    <a href="FrequentlyQuestion" className="btn">Preguntas Frecuentes</a>
                </div>
            </div>
        </div>
        </section> 
        <section id="quienes-somos">
        <div className="container">
            <h2>Quiénes Somos</h2>
            <p>
                Una empresa centrada en colaborar con nuestros clientes en las labores de logistica de la más alta calidad ante aduanas, navieras, transportistas y demas tramites asi como la documentacion necesaria para el correcto trato de una carga.</p>
        </div>
        </section>   
        </>
    );
}

export default AboutUsInformation;