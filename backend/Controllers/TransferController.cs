using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/account")]
  [ApiController]
  [Authorize]
  public class TransferController : ControllerBase
  {

  }
}
