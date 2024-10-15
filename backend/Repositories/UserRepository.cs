using api.Interfaces;
using api.Data;
using api.Models;

namespace api.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly ApplicationDBContext _context;

    public UserRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<User?> GetAsync(string userId)
    {
      return await _context.Users.FindAsync(userId);
    }

    public async Task<bool> IsUserExistAsync(string userId)
    {
      var user = await this.GetAsync(userId);
      if (user == null)
      {
        return false;
      }
      return true;
    }
  }

}
