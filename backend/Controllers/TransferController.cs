using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.TransferDto;
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

    /// <summary>
    /// Create transfer
    /// </summary>
    /// <param name="createTransferDto"></param>
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
        return BadRequest(new { message = "Transaction was not created!" });
      }

      await _accountRepository.AddExpenseAsync(transfer.SourceAccountId, transfer.Amount);
      await _accountRepository.AddIncomeAsync(transfer.DestinationAccountId, transfer.Amount);

      return Ok(transfer.ToTransferModel());
    }

    /// <summary>
    /// Get transfer by id
    /// </summary>
    /// <param name="transferId"></param>
    [HttpGet("{transferId:int}")]
    [ProducesResponseType(typeof(TransferDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Get([FromRoute] int transferId)
    {
      var transfer = await _transferRepository.GetAsync(transferId);
      if (transfer == null)
      {
        return NotFound(new { message = "Transfer not found!" });
      }
      return Ok(transfer.ToTransferModel());
    }

    /// <summary>
    /// Delete transfer by id
    /// </summary>
    /// <param name="transferId"></param>
    [HttpDelete("{transferId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int transferId)
    {
      var existingTransfer = await _transferRepository.GetAsync(transferId);
      if (existingTransfer == null)
      {
        return NotFound(new { message = "Transfer not found!" });
      }

      await _accountRepository.AddIncomeAsync(existingTransfer.SourceAccountId, existingTransfer.Amount);
      await _accountRepository.AddExpenseAsync(existingTransfer.DestinationAccountId, existingTransfer.Amount);

      var deletedTransfer = await _transferRepository.DeleteAsync(transferId);
      if (deletedTransfer == null)
      {
        return NotFound(new { message = "Transfer not found!" });
      }

      return NoContent();
    }

    /// <summary>
    /// Update transfer
    /// </summary>
    /// <param name="transferId"></param>
    /// <param name="updateTransferDto"></param>
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
        return NotFound(new { message = "Transfer not found!" });
      }

      await _accountRepository.AddExpenseAsync(existingTransfer.DestinationAccountId, existingTransfer.Amount);
      await _accountRepository.AddIncomeAsync(existingTransfer.SourceAccountId, existingTransfer.Amount);

      await _accountRepository.AddExpenseAsync(updateTransferDto.SourceAccountId, updateTransferDto.Amount);
      await _accountRepository.AddIncomeAsync(updateTransferDto.DestinationAccountId, updateTransferDto.Amount);

      var updatedTransfer = await _transferRepository.UpdateAsync(transferId, updateTransferDto);
      if (updatedTransfer == null)
      {
        return NotFound(new { message = "Transfer not found!" });
      }

      return Ok(updatedTransfer.ToTransferModel());
    }
  }
}
