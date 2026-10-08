using MyWarranty.Server.Interfaces;
using MyWarranty.Server.Models;
using MyWarranty.Server.Repositories;

namespace MyWarranty.Server.Services
{
    public class ProductService : IProductService
    {
        private readonly ProductRepository _repository;

        public ProductService(ProductRepository repository)
        {
            _repository = repository;
        }

        // Get all products
        public async Task<List<MyProduct>> GetAllProductsAsync()
        {
            return await _repository.GetAllProductsAsync();
        }

        // Get product by ID
        public async Task<MyProduct?> GetProductByIdAsync(int id)
        {
            return await _repository.GetProductByIdAsync(id);
        }

        // Create product
        public async Task<MyProduct> CreateProductAsync(MyProduct product)
        {
            // Temporary user ID
            product.UserId = 1;

            return await _repository.CreateProductAsync(product);
        }

        // Update product
        public async Task<MyProduct?> UpdateProductAsync(MyProduct product)
        {
            // Temporary user ID
            product.UserId = 1;

            return await _repository.UpdateProductAsync(product);
        }

        // Delete product
        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _repository.DeleteProductAsync(id);
        }
    }
}