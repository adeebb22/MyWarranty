
namespace MyWarranty.Server.DTOs.Product
{
    public class CreateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;

        public string? ModelNumber { get; set; }
        public string? SerialNumber { get; set; }

        public DateTime PurchaseDate { get; set; }
        public decimal? PurchasePrice { get; set; }
        public string? Store { get; set; }

        public DateTime WarrantyStartDate { get; set; }
        public DateTime WarrantyEndDate { get; set; }

        public string? Notes { get; set; }
        public string? ProductImageUrl { get; set; }
        public string? InvoiceUrl { get; set; }
    }
}
