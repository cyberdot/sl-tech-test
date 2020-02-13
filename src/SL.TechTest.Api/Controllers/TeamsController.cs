using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SL.TechTest.Api.Model;
using SL.TechTest.Api.Repository;

namespace SL.TechTest.Api.Controllers
{
    [ApiController]
    [Route("teams")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamRepository teamRepository;
        private readonly ILogger<TeamsController> logger;

        public TeamsController(
            ITeamRepository teamRepository,
            ILogger<TeamsController> logger)
        {
            this.teamRepository = teamRepository;
            this.logger = logger;
        }

        [HttpGet]
        public IAsyncEnumerable<Team> GetAll()
        {
            return teamRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> Get(int id)
        {
            var team = await teamRepository.GetAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            return team;
        }

        [HttpGet("countries")]
        public IEnumerable<string> Countries()
        {
            return teamRepository.Countries();
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Team team)
        {
            if (team == null)
            {
                return new BadRequestObjectResult("Please provide team information.");
            }

            await teamRepository.UpdateAsync(team);
            return Ok(team);
        }
    }
}
