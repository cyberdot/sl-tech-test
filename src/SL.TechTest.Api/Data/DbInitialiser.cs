using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using SL.TechTest.Api.Model;

namespace SL.TechTest.Api.Data
{
    public class DbInitialiser
    {
        private readonly SQLiteDbContext context;

        public DbInitialiser(SQLiteDbContext context)
        {
            this.context = context;
        }
        public void Initialise()
        {
            context.Database.EnsureCreated();
            if (!context.Teams.Any())
            {
                var seedData = ReadData();
                context.Teams.AddRange(seedData);
                context.SaveChanges();
            }
        }

        private static IEnumerable<Team> ReadData()
        {
            using var reader = new StreamReader("Database/teams.csv");
            using var csvReader = new CsvReader(reader, CultureInfo.CurrentCulture);
            csvReader.Configuration.PrepareHeaderForMatch = (string header, int index) => header.ToUpperInvariant();
            return csvReader.GetRecords<Team>().ToList();
        }
    }
}