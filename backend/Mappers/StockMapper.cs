using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
  public static class StockMappers
  {
    public static StockDto ToStockDto(this Stock stockModel)
    {
      return new StockDto
      {

        Id = stockModel.Id,
        Symbol = stockModel.Symbol,
        CompanyName = stockModel.CompanyName,
        Purchase = stockModel.Purchase,
        LastDiv = stockModel.LastDiv,
        Industry = stockModel.Industry,
        Marketcap = stockModel.Marketcap,
        Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
      };
    }
    public static Stock ToStockFromCreateDTO(this CreateStockRequestDTO stockDto)
    {
      return new Stock
      {
        Symbol = stockDto.Symbol,
        CompanyName = stockDto.CompanyName,
        Marketcap = stockDto.Marketcap,
        Industry = stockDto.Industry,
        LastDiv = stockDto.LastDiv,
        Purchase = stockDto.Purchase
      };
    }
  }
}
