namespace api.Dtos.RecurringTransaction
{
  public class UpdateRecurringTransactionDto
  {
    public int AccountId { get; set; }
    public int CategoryId { get; set; }
    public int Amount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Description { get; set; } = String.Empty;
    public DateTime LastOccurrence { get; set; }
    public DateTime NextOccurrence { get; set; }
    public Boolean IsActive { get; set; }
  }
}
