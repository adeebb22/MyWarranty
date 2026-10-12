
using MyWarranty.Server.DTOs.Product;
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
        private static DateTime CalculateWarrantyEndDate(
    DateTime startDate,
    decimal duration,
    string unit)
        {
            startDate = startDate.Date;

            if (duration <= 0 || duration > 100)
            {
                throw new ArgumentException(
                    "Warranty duration must be greater than zero and no more than 100.");
            }

            switch (unit.Trim().ToLowerInvariant())
            {
                case "years":
                    // Only whole and half years are supported.
                    if (duration * 2 != decimal.Truncate(duration * 2))
                    {
                        throw new ArgumentException(
                            "Warranty duration in years must use increments of 0.5.");
                    }

                    return startDate.AddMonths(
                        decimal.ToInt32(duration * 12));

                case "months":
                    if (duration != decimal.Truncate(duration))
                    {
                        throw new ArgumentException(
                            "Warranty duration in months must be a whole number.");
                    }

                    return startDate.AddMonths(
                        decimal.ToInt32(duration));

                case "days":
                    if (duration != decimal.Truncate(duration))
                    {
                        throw new ArgumentException(
                            "Warranty duration in days must be a whole number.");
                    }

                    return startDate.AddDays(
                        decimal.ToInt32(duration));

                default:
                    throw new ArgumentException(
                        "Warranty duration unit must be Years, Months, or Days.");
            }
        }

        // Get all products
        public async Task<List<ProductResponseDto>> GetAllProductsAsync()
        {
            var products = await _repository.GetAllProductsAsync();

            return products.Select(MapToResponse).ToList();
        }

        // Get product by ID
        public async Task<ProductResponseDto?> GetProductByIdAsync(int id)
        {
            var product = await _repository.GetProductByIdAsync(id);

            if (product == null)
                return null;

            return MapToResponse(product);
        }

        // Create product
        public async Task<ProductResponseDto> CreateProductAsync(
            CreateProductDto dto)
        {
            var product = new MyProduct
            {
                UserId = 1, // Temporary user ID

                Name = dto.Name,
                Brand = dto.Brand,
                Category = dto.Category,
                ModelNumber = dto.ModelNumber,
                SerialNumber = dto.SerialNumber,

                PurchaseDate = dto.PurchaseDate,
                PurchasePrice = dto.PurchasePrice,
                Store = dto.Store,

                WarrantyStartDate = dto.WarrantyStartDate.Date,
                WarrantyEndDate = CalculateWarrantyEndDate(
                                            dto.WarrantyStartDate,
                                            dto.WarrantyDuration,
                                            dto.WarrantyDurationUnit),

                Notes = dto.Notes,
                ProductImageUrl = dto.ProductImageUrl,
                InvoiceUrl = dto.InvoiceUrl,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = null
            };

            var savedProduct =
                await _repository.CreateProductAsync(product);

            return MapToResponse(savedProduct);
        }

        // Update product
        public async Task<ProductResponseDto?> UpdateProductAsync(
            int id,
            UpdateProductDto dto)
        {
            var product = await _repository.GetProductByIdAsync(id);

            if (product == null)
                return null;

            // Update only editable properties
            product.Name = dto.Name;
            product.Brand = dto.Brand;
            product.Category = dto.Category;
            product.ModelNumber = dto.ModelNumber;
            product.SerialNumber = dto.SerialNumber;

            product.PurchaseDate = dto.PurchaseDate;
            product.PurchasePrice = dto.PurchasePrice;
            product.Store = dto.Store;

            product.WarrantyStartDate = dto.WarrantyStartDate.Date;
            product.WarrantyEndDate = CalculateWarrantyEndDate(
                dto.WarrantyStartDate,
                dto.WarrantyDuration,
                dto.WarrantyDurationUnit);

            product.Notes = dto.Notes;
            product.ProductImageUrl = dto.ProductImageUrl;
            product.InvoiceUrl = dto.InvoiceUrl;

            product.UpdatedAt = DateTime.UtcNow;

            var updatedProduct =
                await _repository.UpdateProductAsync(product);

            if (updatedProduct == null)
                return null;

            return MapToResponse(updatedProduct);
        }

        // Delete product
        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _repository.DeleteProductAsync(id);
        }

        // Convert entity to response DTO
        private ProductResponseDto MapToResponse(MyProduct product)
        {
            return new ProductResponseDto
            {
                ProductId = product.ProductId,
                UserId = product.UserId,

                Name = product.Name,
                Brand = product.Brand,
                Category = product.Category,
                ModelNumber = product.ModelNumber,
                SerialNumber = product.SerialNumber,

                PurchaseDate = product.PurchaseDate.ToString("yyyy-MM-dd"),
                PurchasePrice = product.PurchasePrice,
                Store = product.Store,

                WarrantyStartDate =
                    product.WarrantyStartDate.ToString("yyyy-MM-dd"),

                WarrantyEndDate =
                    product.WarrantyEndDate.ToString("yyyy-MM-dd"),

                Notes = product.Notes,
                ProductImageUrl = product.ProductImageUrl,
                InvoiceUrl = product.InvoiceUrl,

                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt
            };
        }
    }
}
