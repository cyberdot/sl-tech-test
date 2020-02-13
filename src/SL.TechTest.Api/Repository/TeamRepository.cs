using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SL.TechTest.Api.Data;
using SL.TechTest.Api.Model;

namespace SL.TechTest.Api.Repository
{
    public class TeamRepository : ITeamRepository
    {
        private readonly SQLiteDbContext context;

        public TeamRepository(SQLiteDbContext context)
        {
            this.context = context;
        }

        public IAsyncEnumerable<Team> GetAllAsync()
        {
            return context.Teams.AsAsyncEnumerable();
        }

        public ValueTask<Team> GetAsync(int id)
        {
            return context.Teams.FindAsync(id);
        }

        public async Task UpdateAsync(Team team)
        {
            var entity = await context.Teams.FindAsync(team.Id);
            if (entity != null)
            {
                entity.Country = team.Country;
                entity.Name = team.Name;
                entity.Eliminated = team.Eliminated;

                await context.SaveChangesAsync();
            }
        }

        public IEnumerable<string> Countries()
        {
            return context.Teams.Select(t => t.Country).Distinct().OrderBy(c => c);
        }
    }
}