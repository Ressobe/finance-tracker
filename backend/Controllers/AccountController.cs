using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Identity;
using api.Dtos.Account;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace api.Controllers
{
  [Route("api/account")]
  [ApiController]

  public class AccountController : ControllerBase
  {

    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;

    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
      _userManager = userManager;
      _tokenService = tokenService;
      _signInManager = signInManager;
    }

    [HttpPost("login")]
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
          UserName = user.UserName,
          Email = user.Email,
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
      // check if user with this email already exist
      try
      {
        if (!ModelState.IsValid)
          return BadRequest(ModelState);

        var appUser = new AppUser
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
  }
}
