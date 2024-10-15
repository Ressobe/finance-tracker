using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Mappers;
using api.Dtos.Stock;
using api.Interfaces;
using api.Helpers;

namespace api.Controllers
{
  [Route("api/stock")]
  [ApiController]
  public class StockController : ControllerBase
  {
    private readonly IStockRepository _stockRepository;

    public StockController(IStockRepository stockRepository)
    {
      _stockRepository = stockRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject queryObject)
    {
      var stocks = await _stockRepository.GetAllAsync(queryObject);
      var mapStocks = stocks.Select(s => s.ToStockDto()).ToList();

      return Ok(mapStocks);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var stock = await _stockRepository.GetByIdAsync(id);
      if (stock == null)
      {
        return NotFound();
      }

      return Ok(stock.ToStockDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStockRequestDTO stockDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var stockModel = stockDto.ToStockFromCreateDTO();

      await _stockRepository.CreateAsync(stockModel);

      return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDTO updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var stockModel = await _stockRepository.UpdateAsync(id, updateDto);
      if (stockModel == null)
      {
        return NotFound();
      }

      return Ok(stockModel.ToStockDto());
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var stockModel = await _stockRepository.DeleteAsync(id);
      if (stockModel == null)
      {
        return NotFound();
      }

      // Everything good but we dont return anything
      return NoContent();
    }

  }

}
