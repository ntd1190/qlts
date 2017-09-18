using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Jose;
using SongAn.QLTS.Entity.QLTS_MAIN.Entity;
using SongAn.QLTS.Data.Repository.QLTS_MAIN;
using System.Configuration;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTSAPI.Formats
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private const string AudiencePropertyKey = "audience";

        private string _connectionString = ConfigurationManager.ConnectionStrings["dbMainConnection"].ConnectionString;

        private ContextDto _context;

        private readonly string _issuer = string.Empty;

        public CustomJwtFormat(string issuer)
        {
            _issuer = issuer;

            _context = new ContextDto();
            _context.dbMainConnection = _connectionString;
            _context.User = null;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("data");
            }

            string audienceId = data.Properties.Dictionary.ContainsKey(AudiencePropertyKey) ? data.Properties.Dictionary[AudiencePropertyKey] : null;

            if (string.IsNullOrWhiteSpace(audienceId)) throw new InvalidOperationException("AuthenticationTicket.Properties does not include audience");


            ClientRepository repo = new ClientRepository(_context);

            Client objResult = repo.GetById(audienceId);

            string symmetricKeyAsBase64 = objResult.Base64Secret;

            var keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);

            var issued = data.Properties.IssuedUtc;
            var expires = data.Properties.ExpiresUtc;
            var secretKey = keyByteArray;

            var payload = new Dictionary<string, object>()
                {

                    //"unique_name" (User Identity) Claim
                    { "unique_name",  data.Identity.Claims
                        .Where(x => x.Type.Equals(ClaimTypes.NameIdentifier))
                        .Select(s => s.Value)
                        .FirstOrDefault()},

                    { "name",  data.Identity.Claims
                        .Where(x => x.Type.Equals(ClaimTypes.Name))
                        .Select(s => s.Value)
                        .FirstOrDefault()},

                    { "email",  data.Identity.Claims
                        .Where(x => x.Type.Equals(ClaimTypes.Email))
                        .Select(s => s.Value)
                        .FirstOrDefault()},

                    //"CoSoId"
                    { "CoSoId",data.Identity.Claims
                        .Where(x => x.Type.Equals("CoSoId"))
                        .Select(s => s.Value)
                        .FirstOrDefault() },

                    //"NhanVienId"
                    { "nhanvienid",data.Identity.Claims
                        .Where(x => x.Type.Equals("NhanVienId"))
                        .Select(s => s.Value)
                        .FirstOrDefault() },

                     //"role" role
                    { "role",data.Identity.Claims
                        .Where(x => x.Type.Equals(ClaimTypes.Role))
                        .Select(s => s.Value) },

                     //"function" role
                    { "functioncode",data.Identity.Claims
                        .Where(x => x.Type.Equals("FunctionCode"))
                        .Select(s => s.Value) },

                    //"iss" (Issuer) Claim
                    { "iss",_issuer },

                    //"aud" (Audience) Claim
                    { "aud", audienceId },

                    //"exp" (Expiration Time) Claim
                    { "exp", expires.Value.ToUnixTimeSeconds()},

                    //"nbf" (Not Before) Claim
                    { "nbf",issued.Value.ToUnixTimeSeconds() },

                    //"iat" (Issued At) Claim
                    { "iat", issued.Value.ToUnixTimeSeconds() },

                    //"jti" (JWT ID) Claim
                    { "jti",  Guid.NewGuid()}
                };

            string jwt = JWT.Encode(payload, secretKey, JwsAlgorithm.HS256);
            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}