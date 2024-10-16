using Microsoft.AspNetCore.Mvc;
using api.Dtos.Account;
using api.Interfaces;
using api.Mappers;

namespace api.Controllers
{
  [Route("api/account")]
  [ApiController]
  public class AccountController : ControllerBase
  {

    private readonly IAccountRepository _accountRepository;
    private readonly IUserRepository _userRepository;

    public AccountController(IAccountRepository accountRepository, IUserRepository userRepository)
    {
      _accountRepository = accountRepository;
      _userRepository = userRepository;
    }

    [HttpGet("{accountId:int}")]
    public async Task<IActionResult> GetById([FromRoute] int accountId)
    {
      var account = await _accountRepository.GetAsync(accountId);

      if (account == null)
      {
        return NotFound();
      }

      return Ok(account);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserAccounts([FromRoute] string userId)
    {
      var accounts = await _accountRepository.GetAllByUserId(userId);
      return Ok(accounts);
    }


    [HttpPost("{userId}")]
    public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] CreateAccountDto createAccountDto)
    {
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