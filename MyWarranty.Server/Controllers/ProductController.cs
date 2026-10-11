using Microsoft.AspNetCore.Mvc;
using MyWarranty.Server.DTOs.Product;
using MyWarranty.Server.Interfaces;
using MyWarranty.Server.Models;

namespace MyWarranty.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(
            [FromBody] CreateProductDto dto)
        {
            Console.WriteLine("POST CreateProduct endpoint reached");
            var product = await _productService.CreateProductAsync(dto);

            return CreatedAtAction(
                nameof(GetProductById),
                new { id = product.ProductId },
                product
            );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(
            int id,
            [FromBody] UpdateProductDto dto)
        {
            var product = await _productService.UpdateProductAsync(id, dto);

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deleted = await _productService.DeleteProductAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}