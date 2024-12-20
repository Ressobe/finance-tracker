using api.Interfaces;
using api.Dtos.SavingGoal;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
  [Route("api/saving-goal")]
  [ApiController]
  [Authorize]
  public class SavingGoalController : ControllerBase
  {
    private readonly ISavingGoalRepository _savingGoalRepository;
    private readonly ISavingTransactionRepository _savingTransactionsRepository;
    private readonly IUserRepository _userRepository;
    private readonly IAccountRepository _accountRepository;

    public SavingGoalController(ISavingGoalRepository savingGoalRepository, IUserRepository userRepository, ISavingTransactionRepository savingTransactionsRepository, IAccountRepository accountRepository)
    {
      _savingGoalRepository = savingGoalRepository;
      _userRepository = userRepository;
      _savingTransactionsRepository = savingTransactionsRepository;
      _accountRepository = accountRepository;
    }

    /// <summary>
    /// Get saving goal by id
    /// </summary>
    /// <param name="savingGoalId"></param>
    [HttpGet("{savingGoalId:int}")]
    [ProducesResponseType(typeof(SavingGoalDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int savingGoalId)
    {
      var savingGoal = await _savingGoalRepository.GetAsync(savingGoalId);
      if (savingGoal == null)
      {
        return NotFound(new { message = "Saving goal not found!" });
      }
      return Ok(savingGoal.ToSavingGoalModel());
    }

    /// <summary>
    /// Delete saving goal by id
    /// </summary>
    /// <param name="savingGoalId"></param>
    [HttpDelete("{savingGoalId:int}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete([FromRoute] int savingGoalId)
    {

      var existingSavingGoal = await _savingGoalRepository.GetAsync(savingGoalId);
      if (existingSavingGoal == null)
      {
        return NotFound(new { message = "Saving goal not found!" });
      }

      var allSavingTransactions = await _savingTransactionsRepository.GetAllByAccountId(savingGoalId);

      foreach (var savingTransaction in allSavingTransactions)
      {
        await _accountRepository.AddIncomeAsync(savingTransaction.AccountId, savingTransaction.Amount);

      }


      var deletedSavingGoal = await _savingGoalRepository.DeleteAsync(savingGoalId);
      if (deletedSavingGoal == null)
      {
        return NotFound(new { message = "Saving goal not found!" });
      }

      return NoContent();
    }

    /// <summary>
    /// Create saving goal
    /// </summary>
    /// <param name="createSavingGoalDto"></param>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSavingGoalDto createSavingGoalDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest(new { message = "User does not exist!" });
      }

      var savingGoalModel = createSavingGoalDto.CreateSavingGoalDtoToSavingGoalModel(userId);
      var savingGoal = await _savingGoalRepository.CreateAsync(savingGoalModel);
      if (savingGoal == null)
      {
        return BadRequest(new { message = "Account was not created" });
      }

      return Ok(savingGoal.ToSavingGoalModel());
    }

    /// <summary>
    /// Update saving goal
    /// </summary>
    /// <param name="savingGoalId"></param>
    /// <param name="updateSavingGoalDto"></param>
    [HttpPut]
    [Route("{savingGoalId:int}")]
    [ProducesResponseType(typeof(SavingGoalDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int savingGoalId, [FromBody] UpdateSavingGoalDto updateSavingGoalDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedSavingGoal = await _savingGoalRepository.UpdateAsync(savingGoalId, updateSavingGoalDto);
      if (updatedSavingGoal == null)
      {
        return NotFound(new { message = "Saving goal not found!" });
      }

      return Ok(updatedSavingGoal.ToSavingGoalModel());
    }
  }

}
