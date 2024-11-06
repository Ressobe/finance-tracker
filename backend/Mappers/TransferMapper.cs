using api.Dtos.Transfer;
using api.Models;

namespace api.Mappers
{
  public static class TransferMapper
  {
    public static TransferDto ToTransferModel(this Transfer transfer)
    {
      return new TransferDto
      {
        Id = transfer.Id,
        Amount = transfer.Amount,
        Description = transfer.Description,
        CreatedAt = transfer.CreatedAt,
        SourceAccountId = transfer.SourceAccountId,
        DestinationAccountId = transfer.DestinationAccountId
      };
    }

    public static Transfer CreateTransferDtoToModel(this CreateTransferDto transfer)
    {
      return new Transfer
      {
        DestinationAccountId = transfer.DestinationAccountId,
        SourceAccountId = transfer.SourceAccountId,
        CreatedAt = transfer.CreatedAt,
        Description = transfer.Description,
        Amount = transfer.Amount,
      };
    }
  }
}
