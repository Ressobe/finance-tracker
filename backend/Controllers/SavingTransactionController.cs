using api.Interfaces;
using api.Dtos.SavingTransaction;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/saving-transaction")]
  [ApiController]
  public class SavingTransactionController : ControllerBase
  {
    private readonly ISavingTransactionRepository _savingTransactionRepository;
    private readonly ISavingGoalRepository _savingGoalRepository;

    public SavingTransactionController(
        ISavingTransactionRepository savingTransactionRepository,
        ISavingGoalRepository savingGoalRepository
    )
    {
      _savingTransactionRepository = savingTransactionRepository;
      _savingGoalRepository = savingGoalRepository;
    }

    [HttpGet("{savingTransactionId:int}")]
    [ProducesResponseType(typeof(SavingTransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int savingTransactionId)
    {
      var savingTransaction = await _savingTransactionRepository.GetAsync(savingTransactionId);
      if (savingTransaction == null)
      {
        return NotFound();
      }
      return Ok(savingTransaction.ToSavingTransactionModel());
    }

    [HttpDelete("{savingTransactionId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int savingTransactionId)
    {
      var deletedSavingTransaction = await _savingTransactionRepository.DeleteAsync(savingTransactionId);
      if (deletedSavingTransaction == null)
      {
        return NotFound();
      }
      return NoContent();
    }

    [HttpPost("{savingGoalId:int}")]
    public async Task<IActionResult> Create([FromRoute] int savingGoalId, [FromBody] CreateSavingTransactionDto createSavingTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isSavingGoalExist = await _savingGoalRepository.IsSavingGoalExist(savingGoalId);
      if (!isSavingGoalExist)
      {
        return BadRequest("Saving goal does not exist!");
      }

      var savingTransactionModel = createSavingTransactionDto.CreateSavingTransactionDtoToSavingTransactionModel(savingGoalId);
      var savingTransaction = await _savingTransactionRepository.CreateAsync(savingTransactionModel);
      if (savingTransaction == null)
      {
        return BadRequest("Account was not created");
      }

      return Ok(savingTransaction.ToSavingTransactionModel());
    }

    [HttpPut]
    [Route("{savingGoalId:int}")]
    [ProducesResponseType(typeof(SavingTransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int savingGoalId, [FromBody] UpdateSavingTransactionDto updateSavingTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedSavingTransaction = await _savingTransactionRepository.UpdateAsync(savingGoalId, updateSavingTransactionDto);
      if (updatedSavingTransaction == null)
      {
        return NotFound();
      }

      return Ok(updatedSavingTransaction.ToSavingTransactionModel());
    }
  }
}
