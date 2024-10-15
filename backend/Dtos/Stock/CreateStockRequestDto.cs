using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock
{

  public class CreateStockRequestDTO
  {

    public string Symbol { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [Range(1, 10000)]
    public decimal Purchase { get; set; }
    public decimal LastDiv { get; set; }
    public string Industry { get; set; } = string.Empty;
    public long Marketcap { get; set; }

  }

}
