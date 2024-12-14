using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Dtos.Category;
using api.Services;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using api.Helpers;

namespace api.Controllers
{
  [Route("api/category")]
  [ApiController]
  [Authorize]
  public class CategoryController : ControllerBase
  {
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUserRepository _userRepository;
    private readonly CategoryService _categoryService;

    public CategoryController(ICategoryRepository categoryRepository, IUserRepository userRepository, CategoryService categoryService)
    {
      _categoryRepository = categoryRepository;
      _userRepository = userRepository;
      _categoryService = categoryService;
    }

    /// <summary>
    /// Get category by id
    /// </summary>
    /// <param name="categoryId"></param>
    [HttpGet("{categoryId:int}")]
    [ProducesResponseType(typeof(CategoryDto), 200)]
    [ResourceOwner(typeof(ICategoryRepository), "categoryId")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int categoryId)
    {
      var category = await _categoryService.Get(categoryId);
      if (category == null)
      {
        return NotFound(new { message = "Category not found!" });
      }

      return Ok(category.ToCategoryModel());
    }

    /// <summary>
    /// Create category
    /// </summary>
    /// <param name="createCategoryDto"></param>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoryDto createCategoryDto)
    {
      var userId = User.FindFirstValue("UserId");
      if (userId == null)
      {
        return Forbid();
      }

      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest(new { message = "User does not exist!" });
      }

      var categoryModel = createCategoryDto.CreateCategorDtoToCategoryModel(userId);
      var category = await _categoryRepository.CreateAsync(categoryModel);
      if (category == null)
      {
        return BadRequest(new { message = "Account was not created" });
      }

      return Ok(category.ToCategoryModel());
    }

    /// <summary>
    /// Delete category by id
    /// </summary>
    /// <param name="categoryId"></param>
    [HttpDelete("{categoryId:int}")]
    [ResourceOwner(typeof(ICategoryRepository), "categoryId")]
    public async Task<IActionResult> Delete([FromRoute] int categoryId)
    {
      var deletedCategory = await _categoryRepository.DeleteAsync(categoryId);
      if (deletedCategory == null)
      {
        return NotFound(new { message = "Category not found!" });
      }

      return NoContent();
    }

    /// <summary>
    /// Update category
    /// </summary>
    /// <param name="categoryId"></param>
    /// <param name="updateCategoryDto"></param>
    [HttpPut]
    [Route("{categoryId:int}")]
    [ResourceOwner(typeof(ICategoryRepository), "categoryId")]
    [ProducesResponseType(typeof(CategoryDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int categoryId, [FromBody] UpdateCategoryDto updateCategoryDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedCategory = await _categoryService.Update(categoryId, updateCategoryDto);
      if (updatedCategory is null)
      {
        return NotFound(new { message = "Category not found!" });
      }

      return Ok(updatedCategory);
    }
  }
}
