using api.Dtos.RecurringTransaction;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/recurring-transaction")]
  [ApiController]
  public class RecurringTransactionController : ControllerBase
  {
    private readonly IRecurringTransactionRepository _recurringTransactionRepository;
    private readonly IAccountRepository _accountRepository;

    public RecurringTransactionController(
        IRecurringTransactionRepository recurringTransactionRepository,
        IAccountRepository accountRepository
    )
    {
      _recurringTransactionRepository = recurringTransactionRepository;
      _accountRepository = accountRepository;
    }

    [HttpGet("{recurringTransactionId:int}")]
    [ProducesResponseType(typeof(RecurringTransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int recurringTransactionId)
    {
      var recurringTransaction = await _recurringTransactionRepository.GetAsync(recurringTransactionId);
      if (recurringTransaction == null)
      {
        return NotFound();
      }
      return Ok(recurringTransaction.ToRecurringTransactionModel());
    }

    [HttpDelete("{recurringTransactionId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int recurringTransactionId)
    {
      var deletedRecurringTransaction = await _recurringTransactionRepository.DeleteAsync(recurringTransactionId);
      if (deletedRecurringTransaction == null)
      {
        return NotFound();
      }
      return NoContent();
    }

    [HttpPost("{accountId:int}")]
    public async Task<IActionResult> Create([FromRoute] int accountId, [FromBody] CreateRecurringTransactionDto createRecurringTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isAccountExist = await _accountRepository.IsAccountExist(accountId);
      if (!isAccountExist)
      {
        return BadRequest("Account does not exist!");
      }

      var recurringTransactionModel = createRecurringTransactionDto.CreateReccuringTransactionDtoToReccuringTransactionModel(accountId);
      var recurringTransaction = await _recurringTransactionRepository.CreateAsync(recurringTransactionModel);
      if (recurringTransaction == null)
      {
        return BadRequest("Account was not created");
      }

      return Ok(recurringTransaction.ToRecurringTransactionModel());
    }

    [HttpPut]
    [Route("{recurringTransactionId:int}")]
    [ProducesResponseType(typeof(RecurringTransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int recurringTransactionId, [FromBody] UpdateRecurringTransactionDto updateRecurringTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedRecurringTransaction = await _recurringTransactionRepository.UpdateAsync(recurringTransactionId, updateRecurringTransactionDto);
      if (updatedRecurringTransaction == null)
      {
        return NotFound();
      }

      return Ok(updatedRecurringTransaction.ToRecurringTransactionModel());
    }
  }
}
