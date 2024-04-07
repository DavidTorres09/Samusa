using Microsoft.AspNetCore.Mvc;

namespace SamusaBackNew.Interfaces
{
    public interface IRepository<T>
    {
        Task<IActionResult> ObtenerTodos(string procedimientoAlmacenado);
        Task<IActionResult> ObtenerUno(string procedimientoAlmacenado, int id);
        Task<IActionResult> Insertar(string procedimientoAlmacenado, T entity);
        Task<IActionResult> Actualizar(string procedimientoAlmacenado, T entity);
        Task<IActionResult> Eliminar(string procedimientoAlmacenado, int id);

    }
}
