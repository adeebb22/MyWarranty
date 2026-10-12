using System.ComponentModel.DataAnnotations;

namespace MyWarranty.Server.DTOs.Product
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Brand { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; } = string.Empty;

        public string? ModelNumber { get; set; }
        public string? SerialNumber { get; set; }

        public DateTime PurchaseDate { get; set; }
        public decimal? PurchasePrice { get; set; }
        public string? Store { get; set; }

        public DateTime WarrantyStartDate { get; set; }

        [Range(0.5, 100)]
        public decimal WarrantyDuration { get; set; }

        [Required]
        public string WarrantyDurationUnit { get; set; } = string.Empty;

        public string? Notes { get; set; }
        public string? ProductImageUrl { get; set; }
        public string? InvoiceUrl { get; set; }
    }
}
