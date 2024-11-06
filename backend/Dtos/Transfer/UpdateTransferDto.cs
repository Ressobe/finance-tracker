namespace api.Dtos.Transfer
{
  public class UpdateTransferDto
  {
    public decimal Amount { get; set; }
    public String Description { get; set; } = String.Empty;

    public int SourceAccountId { get; set; }
    public int DestinationAccountId { get; set; }
  }
}
