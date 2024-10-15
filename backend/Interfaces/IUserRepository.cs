using api.Models;

namespace api.Interfaces
{
  public interface IUserRepository
  {
    Task<User?> GetAsync(string userId);
    Task<bool> IsUserExistAsync(string userId);
  }
}
