using Microsoft.EntityFrameworkCore;
using MyWarranty.Server.Data;
using MyWarranty.Server.Models;

namespace MyWarranty.Server.Repositories
{
    public class ProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        // Get All Products
        public async Task<List<MyProduct>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        // Get Product by ID
        public async Task<MyProduct?> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        // Create Product
        public async Task<MyProduct> CreateProductAsync(MyProduct product)
        {
            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return product;
        }

        // Update Product
        public async Task<MyProduct?> UpdateProductAsync(MyProduct product)
        {
            var existingProduct =
                await _context.Products.FindAsync(product.ProductId);

            if (existingProduct == null)
            {
                return null;
            }

            _context.Entry(existingProduct)
                     .CurrentValues
                     .SetValues(product);

            await _context.SaveChangesAsync();

            return existingProduct;
        }

        // Delete Product
        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}