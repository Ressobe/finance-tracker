using api.Interfaces;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class CommentRepository : ICommentRepository
  {
    private readonly ApplicationDBContext _context;

    public CommentRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<List<Comment>> GetAllAsync()
    {
      return await _context.Comments.ToListAsync();
    }

    public async Task<Comment?> GetByIdAsync(int id)
    {
      return await _context.Comments.FindAsync(id);
    }

    public async Task<Comment> CreateAsync(Comment commentModel)
    {
      await _context.Comments.AddAsync(commentModel);
      await _context.SaveChangesAsync();
      return commentModel;
    }

    public async Task<Comment?> DeleteAsync(int id)
    {
      var commentModel = await _context.Comments.FirstOrDefaultAsync(item => item.Id == id);
      if (commentModel == null)
      {
        return null;
      }

      _context.Comments.Remove(commentModel);
      await _context.SaveChangesAsync();

      return commentModel;
    }
  }
}
