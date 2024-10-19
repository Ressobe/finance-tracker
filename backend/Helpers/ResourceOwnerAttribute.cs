using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using api.Interfaces;

namespace api.Helpers
{
  public class ResourceOwnerAttribute : Attribute, IAsyncAuthorizationFilter
  {
    private readonly Type _repositoryType;
    private readonly string _resourceIdParamName;

    public ResourceOwnerAttribute(Type repositoryType, string resourceIdParamName)
    {
      _repositoryType = repositoryType;
      _resourceIdParamName = resourceIdParamName;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
      var userId = context.HttpContext.User.FindFirstValue("UserId");

      if (string.IsNullOrEmpty(userId))
      {
        context.Result = new ForbidResult();
        return;
      }

      if (!context.RouteData.Values.TryGetValue(_resourceIdParamName, out var resourceIdObj) ||
          !int.TryParse(resourceIdObj.ToString(), out var resourceId))
      {
        context.Result = new BadRequestObjectResult("Invalid resource ID");
        return;
      }

      var repository = (IOwnableResourceRepository)context.HttpContext.RequestServices.GetService(_repositoryType);

      if (repository == null)
      {
        context.Result = new StatusCodeResult(StatusCodes.Status500InternalServerError);
        return;
      }

      var isOwner = await repository.IsOwnerAsync(resourceId, userId);
      if (!isOwner)
      {
        context.Result = new ForbidResult();
      }
    }
  }
}
