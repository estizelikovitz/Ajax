using Ajax_3_30.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Ajax_3_30.Controllers
{
    public class HomeController : Controller
    {

        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=MyFirstDataBase;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            var repo = new DB(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            var repo = new DB(_connectionString);
            repo.AddPerson(person);
            return Json(person);
        }
        [HttpPost]
        public void Delete(int id)
        {
            var repo = new DB(_connectionString);
            repo.Delete(id);

        }
        [HttpPost]
        public void Edit(Person person)
        {
            var repo = new DB(_connectionString);
            repo.Edit(person);
        }
    }
}
