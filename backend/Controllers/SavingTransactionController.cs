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
    private readonly IAccountRepository _accountRepository;

    public SavingTransactionController(
        ISavingTransactionRepository savingTransactionRepository,
        ISavingGoalRepository savingGoalRepository,
        IAccountRepository accountRepository
    )
    {
      _savingTransactionRepository = savingTransactionRepository;
      _savingGoalRepository = savingGoalRepository;
      _accountRepository = accountRepository;
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
    [ProducesResponseType(typeof(SavingTransactionDto), 200)]
    public async Task<IActionResult> Create([FromRoute] int savingGoalId, [FromBody] CreateSavingTransactionDto createSavingTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isSavingGoalExist = await _savingGoalRepository.IsSavingGoalExist(savingGoalId);
      if (!isSavingGoalExist)
      {
        return BadRequest(new { message = "Saving goal does not exist!" });
      }

      var savingTransactionModel = createSavingTransactionDto.CreateSavingTransactionDtoToSavingTransactionModel(savingGoalId);

      var isAccountExisting = await _accountRepository.IsAccountExist(savingTransactionModel.AccountId);
      if (!isAccountExisting)
      {
        return BadRequest("Account does not exist!");
      }

      var savingTransaction = await _savingTransactionRepository.CreateAsync(savingTransactionModel);
      if (savingTransaction == null)
      {
        return BadRequest("Saving transaction was not created");
      }

      await _savingGoalRepository.PutAsync(savingGoalId, createSavingTransactionDto.Amount);
      await _accountRepository.AddExpenseAsync(createSavingTransactionDto.AccountId, createSavingTransactionDto.Amount);

      return Ok(savingTransaction.ToSavingTransactionModel());
    }

    [HttpPut]
    [Route("{savingTransactionId:int}")]
    [ProducesResponseType(typeof(SavingTransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int savingTransactionId, [FromBody] UpdateSavingTransactionDto updateSavingTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var existingSavingTransaction = await _savingTransactionRepository.GetAsync(savingTransactionId);
      if (existingSavingTransaction == null)
      {
        return NotFound("Saving transaction not found!");
      }

      await _accountRepository.AddIncomeAsync(existingSavingTransaction.AccountId, existingSavingTransaction.Amount);
      await _savingGoalRepository.TakeAsync(existingSavingTransaction.SavingGoalId, existingSavingTransaction.Amount);

      await _accountRepository.AddExpenseAsync(updateSavingTransactionDto.AccountId, updateSavingTransactionDto.Amount);
      await _savingGoalRepository.PutAsync(existingSavingTransaction.SavingGoalId, updateSavingTransactionDto.Amount);

      var updatedSavingTransaction = await _savingTransactionRepository.UpdateAsync(savingTransactionId, updateSavingTransactionDto);
      if (updatedSavingTransaction == null)
      {
        return NotFound("Saving transaction not found!");
      }

      return Ok(updatedSavingTransaction.ToSavingTransactionModel());
    }
  }
}
