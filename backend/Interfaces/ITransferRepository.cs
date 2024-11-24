using api.Models;
using api.Dtos.TransferDto;

namespace api.Interfaces
{
  public interface ITransferRepository
  {
    Task<Transfer?> GetAsync(int id);
    Task<Transfer?> CreateAsync(Transfer model);
    Task<List<Transfer>> GetAllByAccountId(int accountId);
    Task<Transfer?> DeleteAsync(int id);
    Task<bool> IsExist(int id);
    Task<Transfer?> UpdateAsync(int id, UpdateTransferDto model);
  }
}
