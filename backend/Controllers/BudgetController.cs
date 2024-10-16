using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Dtos.Budget;
using api.Mappers;


namespace api.Controllers
{
  [Route("api/budget")]
  [ApiController]
  public class BudgetController : ControllerBase
  {
    private readonly IBudgetRepository _budgetRepository;
    private readonly ICategoryRepository _categoryRepository;

    public BudgetController(IBudgetRepository budgetRepository, ICategoryRepository categoryRepository)
    {
      _budgetRepository = budgetRepository;
      _categoryRepository = categoryRepository;
    }

    [HttpGet("{budgetId:int}")]
    public async Task<IActionResult> GetById([FromRoute] int budgetId)
    {
      var budget = await _budgetRepository.GetAsync(budgetId);

      if (budget == null)
      {
        return NotFound();
      }

      return Ok(budget);
    }


    [HttpDelete("{budgetId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int budgetId)
    {
      var deletedBudget = await _budgetRepository.DeleteAsync(budgetId);
      if (deletedBudget == null)
      {
        return NotFound();
      }

      return NoContent();
    }


    [HttpPost("{categoryId:int}")]
    public async Task<IActionResult> Create([FromRoute] int categoryId, [FromBody] CreateBudgetDto createBudgetDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isCategoryExist = await _categoryRepository.IsCategoryExist(categoryId);
      if (!isCategoryExist)
      {
        return BadRequest("Category does not exist!");
      }

      var budgetModel = createBudgetDto.CreateBudgetDtoToBudgetModel(categoryId);
      var budget = await _budgetRepository.CreateAsync(budgetModel);
      if (budget == null)
      {
        return BadRequest("Budget was not created");
      }

      return Ok(budget.ToBudgetModel());
    }


    [HttpPut]
    [Route("{budgetId:int}")]
    public async Task<IActionResult> Update([FromRoute] int budgetId, [FromBody] UpdateBudgetDto updateBudgetDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedBudget = await _budgetRepository.UpdateAsync(budgetId, updateBudgetDto);
      if (updatedBudget == null)
      {
        return NotFound();
      }

      return Ok(updatedBudget.ToBudgetModel());
    }


  }
}
