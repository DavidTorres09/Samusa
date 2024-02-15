import './FormPerfilUser.css'

export function FormPerfilUser ({children, isOpen, toggle}) {

    const handleClick = () =>{
        toggle(false)
    }
    
        return(
            <>
            {isOpen &&
                <div className="backGroundModal">
                    
                    <section className = "form-regi">
                    <button className = "close" onClick={handleClick}>X</button>
                    <h1 className="title">Perfil de Usuario</h1>
                        {children}
                        
                    </section>
                </div>
            }
            </>  

     )
    }



   