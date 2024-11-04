using api.Models;
using api.Dtos.Transaction;

namespace api.Mappers
{
  public static class TransactionMapper
  {
    public static Transaction CreateTransactionDtoToTransactionModel(this CreateTransactionDto createTransactionDto, int accountId)
    {
      return new Transaction
      {
        AccountId = accountId,
        Amount = createTransactionDto.Amount,
        CategoryId = createTransactionDto.CategoryId,
        Description = createTransactionDto.Description,
        TransactionType = createTransactionDto.TransactionType,
        CreatedAt = createTransactionDto.CreatedAt,
      };
    }

    public static TransactionDto ToTransactionModel(this Transaction transactionDto)
    {
      return new TransactionDto
      {
        Id = transactionDto.Id,
        Amount = transactionDto.Amount,
        TransactionType = transactionDto.TransactionType,
        AccountId = transactionDto.AccountId,
        CategoryId = transactionDto.CategoryId,
        Description = transactionDto.Description,
        CreatedAt = transactionDto.CreatedAt,
      };
    }

    public static TransactionWithCategoryNameDto ToTransactionWithCategoryName(this Transaction transactionDto)
    {
      return new TransactionWithCategoryNameDto
      {
        Id = transactionDto.Id,
        Amount = transactionDto.Amount,
        TransactionType = transactionDto.TransactionType,
        AccountId = transactionDto.AccountId,
        CategoryId = transactionDto.CategoryId,
        Description = transactionDto.Description,
        CreatedAt = transactionDto.CreatedAt,
        CategoryName = transactionDto.Category?.Name ?? ""
      };
    }


  }
}
