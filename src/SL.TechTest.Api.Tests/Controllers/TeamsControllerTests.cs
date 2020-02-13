using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSubstitute;
using SL.TechTest.Api.Controllers;
using SL.TechTest.Api.Model;
using SL.TechTest.Api.Repository;
using Xunit;

namespace SL.TechTest.Api.Tests.Controllers
{
    public class TeamsControllerTests
    {
        private readonly ITeamRepository repository;
        private readonly ILogger<TeamsController> logger;

        private TeamsController controller;

        public TeamsControllerTests()
        {
            repository = Substitute.For<ITeamRepository>();
            logger = Substitute.For<ILogger<TeamsController>>();
            controller = new TeamsController(repository, logger);
        }

        [Fact]
        public void Should_call_repository_to_get_all_teams()
        {
            controller.GetAll();

            repository.Received(1).GetAllAsync();
        }

        [Fact]
        public async Task Should_call_repository_to_get_team_details()
        {
            const int teamId = 1231;

            await controller.Get(teamId);

            await repository.Received(1).GetAsync(teamId);
        }

        [Fact]
        public async Task Should_return_not_found_result_if_team_does_not_exist()
        {
            repository.GetAsync(Arg.Any<int>()).Returns(default(Team));
            const int teamId = 1231;

            var result = await controller.Get(teamId);

            result.Result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task Should_return_team_details_if_team_exists()
        {
            const int teamId = 1231;
            var team = new Team();
            repository.GetAsync(Arg.Any<int>()).Returns(team);

            var result = await controller.Get(teamId);

            result.Value.Should().Be(team);
        }

        [Fact]
        public void Should_call_repository_to_get_list_of_all_countries()
        {
            controller.Countries();

            repository.Received(1).Countries();
        }

        [Fact]
        public async Task Should_return_bad_request_if_team_argument_is_null()
        {
            var result = await controller.Update(default(Team));

            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task Should_use_repository_to_update_team_details()
        {
            var team = new Team
            {
                Id = 1231,
                Country = "France",
                Name = "Monaco",
                Eliminated = false
            };

            await controller.Update(team);

            await repository.Received(1).UpdateAsync(team);
        }

        [Fact]
        public async Task Should_return_ok_result_on_successful_team_update()
        {
            var team = new Team
            {
                Id = 1231,
                Country = "France",
                Name = "Monaco",
                Eliminated = false
            };

            var result = await controller.Update(team);

            result.Should().BeOfType<OkObjectResult>();
        }
    }
}