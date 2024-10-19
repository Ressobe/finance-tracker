namespace api.Interfaces
{
  public interface IOwnableResourceRepository
  {
    Task<bool> IsOwnerAsync(int resourceId, string userId);
  }
}
