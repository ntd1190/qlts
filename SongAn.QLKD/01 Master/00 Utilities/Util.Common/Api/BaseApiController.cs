/*****************************************************************************
1. Create Date : 2017.08.03
2. Creator     : Nguyễn Ngọc Tân
3. Description : Lop nen cho controller chua thong tin user co ban
4. History     : 2017.08.03(Nguyễn Ngọc Tân) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace SongAn.QLKD.Util.Common.Api
{
    public class BaseApiController : ApiController
    {
        protected virtual ContextDto context
        {
            get; set;
        }

        public BaseApiController()
        {
            context = new ContextDto();
            context.dbMainConnection = ConfigurationManager.ConnectionStrings["dbMainConnection"].ConnectionString;
            context.dbQLKDConnection = ConfigurationManager.ConnectionStrings["dbQLKDConnection"].ConnectionString;

            context.User = null;

            var identity = User.Identity as ClaimsIdentity;

            if(identity.Claims.Count() > 0)
            {
                string email = identity.Claims
                        .Where(x => x.Type.Equals(ClaimTypes.Email))
                        .Select(s => s.Value)
                        .FirstOrDefault();

                string userid = identity.Claims
                                .Where(x => x.Type.Equals(ClaimTypes.Name))
                                .Select(s => s.Value)
                                .FirstOrDefault();

                var functioncode = identity.Claims
                        .Where(x => x.Type.Equals("functioncode"))
                        .Select(s => s.Value);

                context.User = new CustomPrincipal(email);

                context.User.UserId = Protector.Int(
                            userid
                        );

                context.User.Name = identity.Claims
                        .Where(x => x.Type.Equals("name"))
                        .Select(s => s.Value)
                        .FirstOrDefault();

                context.User.Email = email;

                context.User.Roles = identity.Claims
                        .Where(x => x.Type.Equals(ClaimTypes.Role))
                        .Select(s => s.Value).ToArray();

                context.User.FunctionCodes = functioncode.ToArray();

            }


        }
    }
}
