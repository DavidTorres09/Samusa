import React from "react";
const AlarmaList = ({ Alarma }) => {
    const handleDelete = (id) => {
        fetch(`https://localhost:7189/api/samusa/Alarma/eliminar/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            if (response.status === 204) {
              return;
            } else {
              return response.json().catch(() => ({}));
            }
          } else {
            return response.json().then(error => {
              throw new Error(error.message || 'Error al eliminar la Alarma');
            });
          }
        })
        .then(() => {
          console.log('Exportacion eliminada exitosamente');
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al eliminar la Exportacion:', error.message);
        });
      };
    return (
    <div class="content">
        <div class="categories">
            <a href="#" class="new">Detalle de la alerta #{Alarma.id}</a>
            </div>
            <h4 class="title"><a href="#">{Alarma.descripcion}</a></h4>
            <ul class="meta">
                <li><i class="zmdi zmdi-time"></i></li>
                <li>Status: <a href="#">Activa</a></li>
                </ul>
                <br />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded" onClick={() => handleDelete(Alarma.id)}>Eliminar</button>
                <br />
                <br />
                </div>
    );
};

export default AlarmaList;