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
  }
}
