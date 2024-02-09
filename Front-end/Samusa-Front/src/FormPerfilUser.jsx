import './FormPerfilUser.css'

export function FormPerfilUser ({children, isOpen, toggle}) {

    const handleClick = () =>{
        toggle(false)
    }
    
        return(
            <>
            {isOpen &&
                <div class="backGroundModal">
                    
                    <section class = "form-regi">
                    <button class = "close" onClick={handleClick}>X</button>
                    <h1 class="title">Perfil de Usuario</h1>
                        {children}
                        
                    </section>
                </div>
            }
            </>  

     )
    }



   