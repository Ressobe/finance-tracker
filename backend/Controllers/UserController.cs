using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Identity;
using api.Dtos.User;
using api.Dtos.Account;
using api.Dtos.Category;
using api.Dtos.SavingGoal;
using api.Dtos.Transaction;
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


    /// <summary>
    /// Login 
    /// </summary>
    /// <param name="loginDto"></param>
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

    /// <summary>
    /// Register 
    /// </summary>
    /// <param name="registerDto"></param>
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

    /// <summary>
    /// Get all accounts for current user
    /// </summary>
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

    /// <summary>
    /// Get all categories for current user
    /// </summary>
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

    /// <summary>
    /// Get all saving goals for current user
    /// </summary>
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

    /// <summary>
    /// Get all transactions for current user
    /// </summary>
    [HttpGet("transactions")]
    [ProducesResponseType(typeof(List<TransactionWithCategoryNameDto>), 200)]
    [Authorize]
    public async Task<IActionResult> GetUserTransactions()
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
      var allTransactions = new List<TransactionWithCategoryNameDto>();

      foreach (var account in accounts)
      {
        var transactions = await _transactionRepository.GetAllByAccountId(account.Id);
        foreach (var transaction in transactions)
        {
          allTransactions.Add(transaction.ToTransactionWithCategoryName());
        }
      }

      allTransactions = allTransactions.OrderByDescending(t => t.CreatedAt).ToList();
      return Ok(allTransactions);
    }

    /// <summary>
    /// Get overview of account for current user
    /// </summary>
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

      decimal totalBalance = 0;
      decimal totalIncome = 0;
      decimal totalExpense = 0;

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

    /// <summary>
    /// Get income by categories for current user
    /// </summary>
    [Authorize]
    [HttpGet("income-by-categories")]
    [ProducesResponseType(typeof(List<CategoryOverviewDto>), 200)]
    public async Task<IActionResult> GetIncomeByCategories()
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
      var incomeResults = new List<CategoryOverviewDto>();

      decimal totalIncome = 0;
      foreach (var category in categories)
      {
        var transactions = await _transactionRepository.GetAllByCategoryId(category.Id);
        decimal incomeSum = transactions
            .Where(t => t.TransactionType == TransactionType.Earning)
            .Sum(t => t.Amount);

        totalIncome += incomeSum;

        if (incomeSum > 0)
        {
          incomeResults.Add(new CategoryOverviewDto
          {
            CategoryId = category.Id,
            CategoryName = category.Name,
            Amount = incomeSum
          });
        }
      }

      var topIncomeCategories = incomeResults
      .OrderByDescending(c => c.Amount)
      .Take(3)
      .Select(c => new CategoryOverviewDto
      {
        CategoryId = c.CategoryId,
        CategoryName = c.CategoryName,
        Amount = c.Amount,
        Percentage = totalIncome > 0 ? Math.Round((c.Amount / totalIncome) * 100, 2) : 0
      })
      .ToList();
      return Ok(topIncomeCategories);
    }

    /// <summary>
    /// Get expense by categories for current user
    /// </summary>
    [Authorize]
    [HttpGet("expense-by-categories")]
    [ProducesResponseType(typeof(List<CategoryOverviewDto>), 200)]
    public async Task<IActionResult> GetExpenseByCategories()
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
      var expenseResults = new List<CategoryOverviewDto>();

      decimal totalExpense = 0;
      foreach (var category in categories)
      {
        var transactions = await _transactionRepository.GetAllByCategoryId(category.Id);
        decimal expenseSum = transactions
            .Where(t => t.TransactionType == TransactionType.Expense)
            .Sum(t => t.Amount);

        totalExpense += expenseSum;

        if (expenseSum > 0)
        {
          expenseResults.Add(new CategoryOverviewDto
          {
            CategoryId = category.Id,
            CategoryName = category.Name,
            Amount = expenseSum
          });
        }
      }

      var topExpenseCategories = expenseResults
          .OrderByDescending(c => c.Amount)
          .Take(3)
          .Select(c => new CategoryOverviewDto
          {
            CategoryId = c.CategoryId,
            CategoryName = c.CategoryName,
            Amount = c.Amount,
            Percentage = totalExpense > 0 ? Math.Round((c.Amount / totalExpense) * 100, 2) : 0
          })
          .ToList();

      return Ok(topExpenseCategories);
    }
  }
}
