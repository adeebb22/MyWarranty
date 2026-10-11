
namespace MyWarranty.Server.DTOs.Product
{
    public class ProductResponseDto
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;

        public string? ModelNumber { get; set; }
        public string? SerialNumber { get; set; }

        public string PurchaseDate { get; set; } = string.Empty;
        public decimal? PurchasePrice { get; set; }
        public string? Store { get; set; }

        public string WarrantyStartDate { get; set; } = string.Empty;
        public string WarrantyEndDate { get; set; } = string.Empty;

        public string? Notes { get; set; }
        public string? ProductImageUrl { get; set; }
        public string? InvoiceUrl { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
