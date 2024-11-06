namespace api.Models
{

  public class Transfer
  {
    public int Id { get; set; }

    public decimal Amount { get; set; }

    public String Description { get; set; } = String.Empty;

    public int SourceAccountId { get; set; }
    public Account? SourceAccount { get; set; }

    public int DestinationAccountId { get; set; }
    public Account? DestinationAccount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
