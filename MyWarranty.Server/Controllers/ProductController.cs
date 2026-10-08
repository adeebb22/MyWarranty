using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        [Route("CreateProduct")]
        public async Task<IActionResult> CreateProduct(
            [FromBody] MyProduct product)
        {
            var created = await _productService.CreateProductAsync(product);

            return created == null
                ? NotFound("Product creation failed.")
                : Ok(created);
        }

        [HttpPut]
        [Route("UpdateProduct/{productId}")]
        public async Task<IActionResult> UpdateProduct(
            [FromRoute] int productId,
            [FromBody] MyProduct product)
        {
            product.ProductId = productId;

            var updated = await _productService.UpdateProductAsync(product);

            return updated == null
                ? NotFound("Product update failed.")
                : Ok(updated);
        }

        [HttpGet]
        [Route("GetProductById/{productId}")]
        public async Task<IActionResult> GetProductById(
            [FromRoute] int productId)
        {
            var result = await _productService.GetProductByIdAsync(productId);

            return result == null
                ? NotFound("Product not found.")
                : Ok(result);
        }

        [HttpDelete]
        [Route("DeleteProductById/{productId}")]
        public async Task<IActionResult> DeleteProductById(
            [FromRoute] int productId)
        {
            var deleted = await _productService.DeleteProductAsync(productId);

            return deleted
                ? NoContent()
                : NotFound("Product not found.");
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var result = await _productService.GetAllProductsAsync();

            return Ok(result);
        }
    }
}