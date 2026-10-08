using MyWarranty.Server.Models;

namespace MyWarranty.Server.Interfaces
{
    public interface IProductService
    {
        Task<List<MyProduct>> GetAllProductsAsync();

        Task<MyProduct?> GetProductByIdAsync(int id);

        Task<MyProduct> CreateProductAsync(MyProduct product);

        Task<MyProduct?> UpdateProductAsync(MyProduct product);

        Task<bool> DeleteProductAsync(int id);
    }
}