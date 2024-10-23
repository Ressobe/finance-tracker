using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Identity;
using api.Dtos.User;
using api.Dtos.Account;
using api.Dtos.Category;
using api.Dtos.SavingGoal;
using api.Mappers;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace api.Controllers
{
  [Route("api/user")]
  [ApiController]

  public class UserController : ControllerBase
  {
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<User> _signInManager;

    private readonly IAccountRepository _accountRepository;
    private readonly IUserRepository _userRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ISavingGoalRepository _savingGoalRepository;
    private readonly ITransactionRepository _transactionRepository;

    public UserController(
        UserManager<User> userManager,
        ITokenService tokenService,
        SignInManager<User> signInManager,
        IAccountRepository accountRepository,
        IUserRepository userRepository,
        ICategoryRepository categoryRepository,
        ISavingGoalRepository savingGoalRepository,
        ITransactionRepository transactionRepository
    )
    {
      _userManager = userManager;
      _tokenService = tokenService;
      _signInManager = signInManager;
      _accountRepository = accountRepository;
      _userRepository = userRepository;
      _categoryRepository = categoryRepository;
      _savingGoalRepository = savingGoalRepository;
      _transactionRepository = transactionRepository;
    }


    [HttpPost("login")]
    [ProducesResponseType(typeof(NewUserDto), 200)]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
      try
      {
        if (!ModelState.IsValid)
          return BadRequest(ModelState);

        var user = await _userManager.Users.FirstOrDefaultAsync(item => item.Email == loginDto.Email);
        if (user == null)
        {
          return Unauthorized("Invalid email!");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded)
        {
          return Unauthorized("Invalid credentials!");
        }

        return Ok(new NewUserDto
        {
          UserName = user.UserName!,
          Email = user.Email!,
          Token = _tokenService.CreateToken(user)
        });
      }
      catch (Exception e)
      {
        return StatusCode(500, e);
      }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Create([FromBody] RegisterDto registerDto)
    {
      try
      {
        if (!ModelState.IsValid)
          return BadRequest(ModelState);

        var appUser = new User
        {
          UserName = registerDto.Username,
          Email = registerDto.Email
        };


        var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

        if (!createdUser.Succeeded)
        {
          return StatusCode(500, createdUser.Errors);
        }

        var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

        if (!roleResult.Succeeded)
        {
          return StatusCode(500, roleResult.Errors);
        }

        return Ok(new NewUserDto
        {
          UserName = appUser.UserName,
          Email = appUser.Email,
          Token = _tokenService.CreateToken(appUser)
        });
      }
      catch (Exception e)
      {
        return StatusCode(500, e);
      }
    }

    [HttpGet("accounts")]
    [ProducesResponseType(typeof(List<AccountDto>), 200)]
    [Authorize]
    public async Task<IActionResult> GetUserAccounts()
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      var accounts = await _accountRepository.GetAllByUserId(userId);
      var accountDtos = accounts.Select(account => account.ToAccountModel()).ToList();

      return Ok(accounts);
    }

    [HttpGet("categories")]
    [ProducesResponseType(typeof(List<CategoryDto>), 200)]
    [Authorize]
    public async Task<IActionResult> GetUserCategories()
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest("User does not exist!");
      }

      var categories = await _categoryRepository.GetAllByUserId(userId);
      return Ok(categories);
    }

    [HttpGet("saving-goals")]
    [ProducesResponseType(typeof(List<SavingGoalDto>), 200)]
    [Authorize]
    public async Task<IActionResult> GetUserSavingGoals()
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest("User does not exist!");
      }

      var savingGoals = await _savingGoalRepository.GetAllByUserId(userId);
      return Ok(savingGoals);
    }

    [Authorize]
    [HttpGet("overview")]
    [ProducesResponseType(typeof(OverviewDto), 200)]
    public async Task<IActionResult> GetUserOverview()
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest("User does not exist!");
      }

      var accounts = await _accountRepository.GetAllByUserId(userId);

      long totalBalance = 0;
      long totalIncome = 0;
      long totalExpense = 0;

      foreach (var account in accounts)
      {
        totalBalance += account.CurrentBalance;

        var transactions = await _transactionRepository.GetAllByAccountId(account.Id);
        foreach (var transaction in transactions)
        {
          if (transaction.TransactionType == TransactionType.Earning)
          {
            totalIncome += transaction.Amount;
          }
          else if (transaction.TransactionType == TransactionType.Expense)
          {
            totalExpense += transaction.Amount;
          }
        }
      }

      var overview = new
      {
        TotalBalance = totalBalance,
        TotalIncome = totalIncome,
        TotalExpense = totalExpense
      };

      return Ok(overview);
    }
  }
}
