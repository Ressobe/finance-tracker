using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Identity;
using api.Dtos.User;
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

    public UserController(
        UserManager<User> userManager,
        ITokenService tokenService,
        SignInManager<User> signInManager,
        IAccountRepository accountRepository,
        IUserRepository userRepository,
        ICategoryRepository categoryRepository,
        ISavingGoalRepository savingGoalRepository
    )
    {
      _userManager = userManager;
      _tokenService = tokenService;
      _signInManager = signInManager;
      _accountRepository = accountRepository;
      _userRepository = userRepository;
      _categoryRepository = categoryRepository;
      _savingGoalRepository = savingGoalRepository;
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

    [HttpGet("/accounts")]
    [Authorize]
    public async Task<IActionResult> GetUserAccounts()
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      var accounts = await _accountRepository.GetAllByUserId(userId);
      return Ok(accounts);
    }

    [HttpGet("/categories")]
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

  }
}
