namespace api.Dtos.Account
{
  public class UpdateAccountDto
  {
    public string Name { get; set; } = String.Empty;
    public long CurrentBalance { get; set; }
  }
}
