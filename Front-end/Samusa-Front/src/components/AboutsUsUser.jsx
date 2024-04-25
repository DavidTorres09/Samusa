import "../Css/User/AboutUs.css";

const AboutUsUser = () => {
    return (
        <>
         <section className="container my-5 Abtitle">
            <div className="row">
            <div className="col-12 mb-4">                   
                </div>
                <div className="col-md-6">
                    <h1 className="mb-4"> Sobre Nosotros</h1>
                    <p className="lead animate__animated animate__fadeIn">
                    Con mas de 13 años de experiencia tanto en la logistica tras las importaciones a territorio nacional como en las exportaciones hacia fuera de nuestras fornteras. Samusa ofrece el conocimiento y asesoria que necesitas para que tus tramites sean efectuados de manera exitosa y sin contratiempos.
                    </p>
                </div>
                <div className="col-md-6 images">
                <img src="https://i.postimg.cc/15Ww09G6/Banner.png" alt="Banner" className="img-fluid animate__animated animate__fadeInRight" />
            </div>
            </div>
         </section>

         <section className="container my-5 Abtitle">
        <div className="row">
            <div className="col-12">
                <h2 className="text-center mb-4">Porque Elegirnos</h2>
                <ul className="timeline">
                    <li className="animate__animated animate__fadeInLeft">✮ Brindamos una atención rápida y personalizada.</li>
                    <li className="animate__animated animate__fadeInRight">✮ Te mantenemos contantemente informado de los avances de tu tramite por medio de nuestros mensajes automatizados.</li>
                    <li className="animate__animated animate__fadeInLeft">✮ No solicitamos adelantos del pago de impuestos, te daremos todos los detalles del tramite una vez este finalizado y listo para que lo retires en almacén. </li>
                </ul>
            </div>
        </div>
    </section>
    <br />
    <section className="container my-10 Abtitle">
        <div className="row">
            <div className="col-md-7 order-md-2">
                <h3 className="mb-4">Contactanos</h3>
                <div className="banner-image">
                <div className="">
                <img src="https://i.postimg.cc/vBdfQyxN/contactanos.png" alt="Banner" className="img-fluid animate__animated animate__fadeInRight" />
                </div>
                </div>
            </div>
            <br />
        </div>
    </section>
    <br />
        </>
    );
}

export default AboutUsUser;