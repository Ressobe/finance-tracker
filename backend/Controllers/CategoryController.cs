using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Dtos.Category;
using api.Mappers;

namespace api.Controllers
{
  [Route("api/category")]
  [ApiController]
  public class CategoryController : ControllerBase
  {
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUserRepository _userRepository;

    public CategoryController(ICategoryRepository categoryRepository, IUserRepository userRepository)
    {
      _categoryRepository = categoryRepository;
      _userRepository = userRepository;
    }

    [HttpGet("{categoryId:int}")]
    [ProducesResponseType(typeof(CategoryDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById([FromRoute] int categoryId)
    {
      var category = await _categoryRepository.GetAsync(categoryId);

      if (category == null)
      {
        return NotFound();
      }

      return Ok(category.ToCategoryModel());
    }


    [HttpPost("{userId}")]
    public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] CreateCategoryDto createCategoryDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isUserExist = await _userRepository.IsUserExistAsync(userId);
      if (!isUserExist)
      {
        return BadRequest("User does not exist!");
      }

      var categoryModel = createCategoryDto.CreateCategorDtoToCategoryModel(userId);
      var category = await _categoryRepository.CreateAsync(categoryModel);
      if (category == null)
      {
        return BadRequest("Account was not created");
      }

      return Ok(category.ToCategoryModel());
    }

    [HttpDelete("{categoryId:int}")]
    public async Task<IActionResult> Delete([FromRoute] int categoryId)
    {
      var deletedCategory = await _categoryRepository.DeleteAsync(categoryId);
      if (deletedCategory == null)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpPut]
    [Route("{categoryId:int}")]
    [ProducesResponseType(typeof(CategoryDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update([FromRoute] int categoryId, [FromBody] UpdateCategoryDto updateCategoryDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var updatedCategory = await _categoryRepository.UpdateAsync(categoryId, updateCategoryDto);
      if (updatedCategory == null)
      {
        return NotFound();
      }

      return Ok(updatedCategory.ToCategoryModel());
    }

  }
}
