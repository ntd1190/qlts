/*****************************************************************************
1. Create Date : 2017.04.08
2. Creator     : Nguyen Ngoc Tan
3. Description : Client API
4. History     : 2017.04.08(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Microsoft.Owin.Security.DataHandler.Encoder;
using SongAn.QLTS.Data.Repository.QLTS_MAIN;
using SongAn.QLTS.Entity.QLTS_MAIN.Entity;
using SongAn.QLTS.Util.Common.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Web.Http;

namespace SongAn.QLTS.Api.Main.Controllers
{
    [Authorize]
    public class ClientController : BaseApiController
    {
        public ClientController(): 
            base()
        {

        }

        [HttpGet]
        public IHttpActionResult GetClientById(string id)
        {
            ClientRepository repo = new ClientRepository(context);

            Client objResult = repo.GetById(id);

            if (objResult == null)
            {
                //422
                return Content(HttpStatusCode.NoContent, new { Message = "Khong tim thay Client" });
            }

            return Content(HttpStatusCode.OK, objResult);
        }

        [HttpGet]
        public IHttpActionResult InsertClient(string name)
        {
            ClientRepository repo = new ClientRepository(context);

            var ClientId = Guid.NewGuid().ToString("N");

            var key = new byte[32];
            RNGCryptoServiceProvider.Create().GetBytes(key);
            var base64Secret = TextEncodings.Base64Url.Encode(key);

            Client newClient = new Client { ClientId = ClientId, Base64Secret = base64Secret, Name = name };

            newClient.CtrVersion = 1;

            Client objResult = repo.Insert(newClient);

            return Ok(objResult);
        }

        [HttpGet]
        public IEnumerable<object> Get()
        {
            var identity = User.Identity as ClaimsIdentity;

            return identity.Claims.Select(c => new
            {
                Type = c.Type,
                Value = c.Value
            });
        }

        [HttpGet]
        public dynamic GetUser()
        {
            if (context.User != null)
            {
                return new
                {
                    context.User.UserId,
                    context.User.Name,
                    context.User.Email,
                    context.User.Roles,
                    context.User.FunctionCodes,
                    context.User.ApiToken
                };
            }

            return "context.User == null";
        }


    }
}
