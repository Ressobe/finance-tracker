using api.Dtos.SavingGoal;
using api.Models;

namespace api.Mappers
{
  public static class SavingGoalMapper
  {

    public static SavingGoal CreateSavingGoalDtoToSavingGoalModel(this CreateSavingGoalDto savingGoalDto, string userId)
    {
      return new SavingGoal
      {
        UserId = userId,
        Name = savingGoalDto.Name,
        TargetAmount = savingGoalDto.TargetAmount,
        CurrentSaved = savingGoalDto.CurrentSaved,
        Prority = savingGoalDto.Prority,
        StartDate = savingGoalDto.StartDate,
        EndDate = savingGoalDto.EndDate
      };
    }

    public static SavingGoal ToSavingGoalModel(this SavingGoal savingGoal)
    {
      return new SavingGoal
      {
        Id = savingGoal.Id,
        UserId = savingGoal.UserId,
        Name = savingGoal.Name,
        TargetAmount = savingGoal.TargetAmount,
        CurrentSaved = savingGoal.CurrentSaved,
        Prority = savingGoal.Prority,
        StartDate = savingGoal.StartDate,
        EndDate = savingGoal.EndDate
      };
    }
  }
}
