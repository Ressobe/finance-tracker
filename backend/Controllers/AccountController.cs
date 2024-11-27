using Microsoft.AspNetCore.Mvc;
using api.Dtos.Account;
using api.Dtos.Transaction;
using api.Dtos.TransferDto;
using api.Dtos.SavingTransaction;
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
    private readonly ITransferRepository _transferRepository;
    private readonly IUserRepository _userRepository;
    private readonly ISavingTransactionRepository _savingTransactionRepository;

    public AccountController(
        IAccountRepository accountRepository,
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        ITransferRepository transferRepository,
        ISavingTransactionRepository savingTransactionRepository
    )
    {
      _accountRepository = accountRepository;
      _userRepository = userRepository;
      _transactionRepository = transactionRepository;
      _transferRepository = transferRepository;
      _savingTransactionRepository = savingTransactionRepository;
    }


    /// <summary>
    /// Get account by id
    /// </summary>
    /// <param name="accountId"></param>
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

      decimal expenseSum = 0;
      decimal incomeSum = 0;

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

    /// <summary>
    /// Get all account transactions
    /// </summary>
    /// <param name="accountId"></param>
    [HttpGet("{accountId:int}/transactions")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    [ProducesResponseType(typeof(List<TransactionWithCategoryNameDto>), 200)]
    public async Task<IActionResult> GetAccountTransactions([FromRoute] int accountId)
    {
      var isAccountExist = await _accountRepository.IsAccountExist(accountId);
      if (!isAccountExist)
      {
        return BadRequest("Account does not exist!");
      }

      var transactions = await _transactionRepository.GetAllByAccountId(accountId);
      var transactionsDtos = transactions.Select(item => item.ToTransactionWithCategoryName()).ToList();

      return Ok(transactionsDtos);
    }


    /// <summary>
    /// Get all account transfers
    /// </summary>
    /// <param name="accountId"></param>
    [HttpGet("{accountId:int}/transfers")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    [ProducesResponseType(typeof(List<TransferWithDestinationAccountNameDto>), 200)]
    public async Task<IActionResult> GetAccountTransfers([FromRoute] int accountId)
    {

      var isAccountExist = await _accountRepository.IsAccountExist(accountId);
      if (!isAccountExist)
      {
        return BadRequest("Account does not exist!");
      }

      var transfers = await _transferRepository.GetAllByAccountId(accountId);
      var transfersDtos = transfers.Select(item => item.ToTransferWithDestinationAccountName()).ToList();

      return Ok(transfersDtos);
    }

    /// <summary>
    /// Get all account saving transactions
    /// </summary>
    /// <param name="accountId"></param>
    [HttpGet("{accountId:int}/saving-transactions")]
    [ResourceOwner(typeof(IAccountRepository), "accountId")]
    [ProducesResponseType(typeof(List<SavingTransactionWithSavingGoalDto>), 200)]
    public async Task<IActionResult> GetAccountSavingTransactions([FromRoute] int accountId)
    {
      var isAccountExist = await _accountRepository.IsAccountExist(accountId);
      if (!isAccountExist)
      {
        return BadRequest("Account does not exist!");
      }

      var savingTransactions = await _savingTransactionRepository.GetAllByAccountId(accountId);
      var savingTransactionsDtos = savingTransactions.Select(item => item.ToSavingTransactionWithSavingGoalName()).ToList();

      return Ok(savingTransactionsDtos);
    }

    /// <summary>
    /// Create account
    /// </summary>
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

    /// <summary>
    /// Delete account
    /// </summary>
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

    /// <summary>
    /// Update account
    /// </summary>
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
