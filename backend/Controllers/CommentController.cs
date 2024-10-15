using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Mappers;
using api.Dtos.Comment;

namespace api.Controllers
{
  [Route("api/comment")]
  [ApiController]
  public class CommentController : ControllerBase
  {
    private readonly ICommentRepository _commentRepository;
    private readonly IStockRepository _stockRepository;

    public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository)
    {
      _commentRepository = commentRepository;
      _stockRepository = stockRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {

      var comments = await _commentRepository.GetAllAsync();
      var mapComments = comments.Select(item => item.ToCommentDto());

      return Ok(comments);
    }


    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var comment = await _commentRepository.GetByIdAsync(id);
      if (comment == null)
      {
        return NotFound();
      }

      return Ok(comment.ToCommentDto());
    }

    [HttpPost("{stockId:int}")]
    public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDTO commentDto)
    {
      // Check if commentDto is valid (perform data annotations)
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var isStockExist = await _stockRepository.StockExists(stockId);
      if (!isStockExist)
      {
        return BadRequest("Stock does not exist!");
      }

      var commentModel = commentDto.ToCommentCreateDto(stockId);
      await _commentRepository.CreateAsync(commentModel);

      return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var commentModel = await _commentRepository.DeleteAsync(id);
      if (commentModel == null)
      {
        return NotFound();
      }

      // Everything good but we dont return anything
      return NoContent();
    }

  }
}
