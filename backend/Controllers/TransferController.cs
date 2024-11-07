using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.Transfer;
using api.Interfaces;
using api.Mappers;

namespace api.Controllers
{
  [Route("api/transfer")]
  [ApiController]
  [Authorize]
  public class TransferController : ControllerBase
  {
    private readonly ITransferRepository _transferRepository;
    private readonly IAccountRepository _accountRepository;

    public TransferController(ITransferRepository transferRepository, IAccountRepository accountRepository)
    {
      _transferRepository = transferRepository;
      _accountRepository = accountRepository;
    }

    [HttpPost()]
    [ProducesResponseType(typeof(TransferDto), 200)]
    public async Task<IActionResult> Create([FromBody] CreateTransferDto createTransferDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var transferModel = createTransferDto.CreateTransferDtoToModel();
      var transfer = await _transferRepository.CreateAsync(transferModel);
      if (transfer == null)
      {
        return BadRequest("Transaction was not created");
      }

      await _accountRepository.AddExpenseAsync(transfer.SourceAccountId, transfer.Amount);
      await _accountRepository.AddIncomeAsync(transfer.DestinationAccountId, transfer.Amount);

      return Ok(transfer.ToTransferModel());
    }

    [HttpGet("{transferId:int}")]
    [ProducesResponseType(typeof(TransferDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Get([FromRoute] int transferId)
    {
      var transfer = await _transferRepository.GetAsync(transferId);
      if (transfer == null)
      {
        return NotFound();
      }
      return Ok(transfer.ToTransferModel());
    }

    [HttpDelete("{transferId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int transferId)
    {
      var deletedTransfer = await _transferRepository.DeleteAsync(transferId);
      if (deletedTransfer == null)
      {
        return NotFound();
      }

      await _accountRepository.AddIncomeAsync(deletedTransfer.SourceAccountId, deletedTransfer.Amount);
      await _accountRepository.AddExpenseAsync(deletedTransfer.DestinationAccountId, deletedTransfer.Amount);

      return NoContent();
    }

    [HttpPut]
    [Route("{transferId:int}")]
    [ProducesResponseType(typeof(TransferDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int transferId, [FromBody] UpdateTransferDto updateTransferDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var existingTransfer = await _transferRepository.GetAsync(transferId);
      if (existingTransfer == null)
      {
        return NotFound();
      }

      await _accountRepository.AddIncomeAsync(existingTransfer.SourceAccountId, existingTransfer.Amount);
      await _accountRepository.AddExpenseAsync(existingTransfer.DestinationAccountId, existingTransfer.Amount);

      var updatedTransfer = await _transferRepository.UpdateAsync(transferId, updateTransferDto);
      if (updatedTransfer == null)
      {
        return NotFound();
      }

      return Ok(updatedTransfer.ToTransferModel());
    }
  }
}
