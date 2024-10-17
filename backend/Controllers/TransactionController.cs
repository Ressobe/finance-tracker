using api.Interfaces;
using api.Dtos.Transaction;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/transaction")]
  [ApiController]
  public class TransactionController : ControllerBase
  {
    private readonly ITransactionRepository _transactionRepository;
    private readonly IAccountRepository _accountRepository;

    public TransactionController(ITransactionRepository transactionRepository, IAccountRepository accountRepository)
    {
      _transactionRepository = transactionRepository;
      _accountRepository = accountRepository;
    }

    [HttpGet("{transactionId:int}")]
    [ProducesResponseType(typeof(TransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int transactionId)
    {
      var transaction = await _transactionRepository.GetAsync(transactionId);

      if (transaction == null)
      {
        return NotFound();
      }

      return Ok(transaction.ToTransactionModel());
    }

    [HttpDelete("{transactionId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int transactionId)
    {
      var deletedTransaction = await _transactionRepository.DeleteAsync(transactionId);
      if (deletedTransaction == null)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpPost("{accountId:int}")]
    public async Task<IActionResult> Create([FromRoute] int accountId, [FromBody] CreateTransactionDto createTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isAccountExist = await _accountRepository.IsAccountExist(accountId);
      if (!isAccountExist)
      {
        return BadRequest("User does not exist!");
      }

      var transactionModel = createTransactionDto.CreateTransactionDtoToTransactionModel(accountId);
      var transaction = await _transactionRepository.CreateAsync(transactionModel);
      if (transaction == null)
      {
        return BadRequest("Transaction was not created");
      }

      return Ok(transaction.ToTransactionModel());
    }

    [HttpPut]
    [Route("{transactionId:int}")]
    [ProducesResponseType(typeof(TransactionDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int transactionId, [FromBody] UpdateTransactionDto updateTransactionDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedTransaction = await _transactionRepository.UpdateAsync(transactionId, updateTransactionDto);
      if (updatedTransaction == null)
      {
        return NotFound();
      }

      return Ok(updatedTransaction.ToTransactionModel());
    }

  }
}
