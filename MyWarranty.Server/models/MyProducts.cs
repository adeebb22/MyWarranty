namespace MyWarranty.Server.models
{
    public class MyProducts
    {
        public int  ProductId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string category { get; set; } = string.Empty;
        public string? ModelNumber { get; set; }
        public string? SerialNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public Decimal PurchasePrice { get; set; }
        public string? Store { get; set; }
        public DateTime WarrantyStartDate { get; set; }
        public DateTime WarrantyEndDate { get; set; }
        public string? Notes { get; set; }
        public string? ProductImageUrl { get; set; }
        public string? InvoiceUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        
    }
}
