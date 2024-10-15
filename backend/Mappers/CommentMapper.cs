using api.Dtos.Comment;
using api.Models;

namespace api.Mappers
{
  public static class CommentMappers
  {

    public static CommentDto ToCommentDto(this Comment commentModel)
    {

      return new CommentDto
      {
        Id = commentModel.Id,
        Title = commentModel.Title,
        Content = commentModel.Content,
        StockId = commentModel.StockId,
        CreatedOn = commentModel.CreatedOn,
      };

    }

    public static Comment ToCommentCreateDto(this CreateCommentRequestDTO commentDto, int stockId)
    {
      return new Comment
      {
        Title = commentDto.Title,
        Content = commentDto.Content,
        CreatedOn = commentDto.CreatedOn,
        StockId = stockId,
      };
    }
  }
}


