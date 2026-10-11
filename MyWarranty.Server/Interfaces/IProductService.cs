using MyWarranty.Server.DTOs.Product;

namespace MyWarranty.Server.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductResponseDto>> GetAllProductsAsync();

        Task<ProductResponseDto?> GetProductByIdAsync(int id);

        Task<ProductResponseDto> CreateProductAsync(
            CreateProductDto dto);

        Task<ProductResponseDto?> UpdateProductAsync(
            int id,
            UpdateProductDto dto);

        Task<bool> DeleteProductAsync(int id);
    }
}