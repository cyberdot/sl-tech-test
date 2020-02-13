using System.Collections.Generic;
using System.Threading.Tasks;
using SL.TechTest.Api.Model;

namespace SL.TechTest.Api.Repository
{
    public interface ITeamRepository
    {
        IAsyncEnumerable<Team> GetAllAsync();
        ValueTask<Team> GetAsync(int id);
        Task UpdateAsync(Team team);
        IEnumerable<string> Countries();
    }
}