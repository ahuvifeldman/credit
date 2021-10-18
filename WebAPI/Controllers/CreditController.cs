using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        LocalAppSettings _appSettings;

        public CreditController(IConfiguration configuration, IOptions<LocalAppSettings> configAppSettings)
        {
            _configuration = configuration;
             _appSettings = configAppSettings.Value;
        }

        [HttpPost]
        public JsonResult ChackCredit(Credit credit)
        {
            try
            {
                SHA256 sha256 = SHA256.Create();
                byte[] hashmHashed = sha256.ComputeHash(Encoding.UTF8.GetBytes(credit.CreditNumber));
                string creditCard = BitConverter.ToString(hashmHashed).Replace("-", "");

                if (credit != null && !string.IsNullOrEmpty(creditCard))
                {
                    string query = @"
                    declare @date as datetime = GETDATE()
                    insert into[dbo].[CreditTransactions]([CreditNumber],[Date],[Sum])
                    values('" + creditCard + @"', @date , 0)

                    declare @creditFraud as bit
                    set @creditFraud = (select top 1 1 from[dbo].[CreditBlack] where[CreditNumber] = '" + creditCard + @"')
                    if (@creditFraud is null)
                                            begin
                                            set @creditFraud = (select top 1 1 from[dbo].[CreditTransactions] table1
                                               where[CreditNumber] = '" + creditCard + @"' and([Sum] >" + _appSettings.Sum + @" or
                                             (select COUNT([CreditNumber]) from[dbo].[CreditTransactions] table2 where table2.[Date] between table1.[Date] and DATEADD(MINUTE," + _appSettings.Moments + @",table1.[Date] )) >= " + _appSettings.NumberTransactions + @"))
                    if (@creditFraud is not null)
                                            begin
                                              insert into[dbo].[CreditBlack]([CreditNumber])
                      values('" + creditCard + @"')
                    end
                    end
                    select @creditFraud as fraud, @date as date";


                    DataTable table = new DataTable();
                    string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
                    SqlDataReader myReader;
                    using(SqlConnection myCon = new SqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using(SqlCommand myCommand = new SqlCommand(query, myCon))
                        {
                            myReader = myCommand.ExecuteReader();
                            table.Load(myReader); ;
                            myReader.Close();
                            myCon.Close();
                        }
                    }
                    table.Columns.Add("credit", typeof(string) , credit.CreditNumber.Substring(12, 4));
                    return new JsonResult(table);
                }
                else
                    return new JsonResult(new { kodException = 1002, description = "The credit is null" });
            }
            catch (Exception)
            {
                return new JsonResult(new{ kodException = 1001, description = "The check credit service failed" });
            }
         
        }
    }
}
