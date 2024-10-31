using Microsoft.AspNetCore.Mvc;
using api.Dtos.Account;
using api.Dtos.Transaction;
using api.Interfaces;
using api.Mappers;
using api.Helpers;
using api.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
  [Route("api/account")]
  [ApiController]
  [Authorize]
  public class AccountController : ControllerBase
  {

    private readonly IAccountRepository _accountRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUserRepository _userRepository;

    public AccountController(
        IAccountRepository accountRepository,
        IUserRepository userRepository,
        ITransactionRepository transactionRepository
    )
    {
      _accountRepository = accountRepository;
      _userRepository = userRepository;
      _transactionRepository = transactionRepository;
    }

    [HttpGet("{accountId:int}")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    [ProducesResponseType(typeof(AccountOverviewDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int accountId)
    {
      var account = await _accountRepository.GetAsync(accountId);
      if (account == null)
      {
        return NotFound();
      }

      var transactions = await _transactionRepository.GetAllByAccountId(account.Id);

      long expenseSum = 0;
      long incomeSum = 0;

      foreach (var t in transactions)
      {
        if (t.TransactionType == TransactionType.Earning)
        {
          incomeSum += t.Amount;
        }
        if (t.TransactionType == TransactionType.Expense)
        {
          expenseSum += t.Amount;
        }
      }

      return Ok(account.ToAccountOverview(incomeSum, expenseSum));
    }


    [HttpGet("{accountId:int}/transactions")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    [ProducesResponseType(typeof(List<TransactionDto>), 200)]
    public async Task<IActionResult> GetAccountTransactions([FromRoute] int accountId)
    {
      var isAccountExist = await _accountRepository.IsAccountExist(accountId);
      if (!isAccountExist)
      {
        return BadRequest("User does not exist!");
      }

      var transactions = await _transactionRepository.GetAllByAccountId(accountId);
      var transactionsDtos = transactions.Select(item => item.ToTransactionModel()).ToList();

      return Ok(transactionsDtos);
    }

    [HttpPost]
    [ProducesResponseType(typeof(AccountDto), 200)]
    public async Task<IActionResult> Create([FromBody] CreateAccountDto createAccountDto)
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest("User does not exist!");
      }

      var accountModel = createAccountDto.CreateAccountDtoToAccountModel(userId);
      var account = await _accountRepository.CreateAsync(accountModel);
      if (account == null)
      {
        return BadRequest("Account was not created");
      }

      return Ok(account.ToAccountModel());
    }

    [HttpDelete("{accountId:int}")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    public async Task<IActionResult> Delete([FromRoute] int accountId)
    {
      var deletedAccount = await _accountRepository.DeleteAsync(accountId);
      if (deletedAccount == null)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpPut]
    [Route("{accountId:int}")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    public async Task<IActionResult> Update([FromRoute] int accountId, [FromBody] UpdateAccountDto updateAccountDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedAccount = await _accountRepository.UpdateAsync(accountId, updateAccountDto);
      if (updatedAccount == null)
      {
        return NotFound();
      }

      return Ok(updatedAccount.ToAccountModel());
    }

  }
}
