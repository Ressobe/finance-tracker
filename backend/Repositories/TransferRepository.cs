using api.Models;
using api.Dtos.TransferDto;
using api.Interfaces;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class TransferRepository : ITransferRepository
  {

    private readonly ApplicationDBContext _context;

    public TransferRepository(ApplicationDBContext applicationDBContext)
    {
      _context = applicationDBContext;
    }

    public async Task<Transfer?> GetAsync(int id)
    {
      return await _context.Transfers.FindAsync(id);
    }

    public async Task<Transfer?> CreateAsync(Transfer model)
    {
      await _context.Transfers.AddAsync(model);
      await _context.SaveChangesAsync();
      return model;
    }

    public async Task<List<Transfer>> GetAllByAccountId(int accountId)
    {
      var transfers = await _context.Transfers
        .Where(item => item.SourceAccountId == accountId)
        .Include(t => t.DestinationAccount)
        .ToListAsync();
      return transfers;
    }

    public async Task<Transfer?> DeleteAsync(int id)
    {
      var transferModel = await _context.Transfers.FirstOrDefaultAsync(item => item.Id == id);
      if (transferModel == null)
      {
        return null;
      }
      _context.Transfers.Remove(transferModel);
      await _context.SaveChangesAsync();

      return transferModel;
    }

    public async Task<bool> IsExist(int id)
    {
      return await _context.Transfers.AnyAsync(item => item.Id == id);
    }

    public async Task<Transfer?> UpdateAsync(int id, UpdateTransferDto model)
    {
      var existingTransfer = await this.GetAsync(id);
      if (existingTransfer == null)
      {
        return null;
      }

      existingTransfer.SourceAccountId = model.SourceAccountId;
      existingTransfer.DestinationAccountId = model.DestinationAccountId;
      existingTransfer.Amount = model.Amount;
      existingTransfer.Description = model.Description;


      await _context.SaveChangesAsync();
      return existingTransfer;
    }
  }
}
