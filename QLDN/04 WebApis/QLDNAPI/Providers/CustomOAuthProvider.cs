using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using SongAn.QLDN.Data.Main;
using SongAn.QLDN.Data.Main.PhanQuyen;
using SongAn.QLDN.Data.Main.PhanQuyen.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN;
using SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLDN.Api.QLDNAPI.Providers
{

    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {


        private string _connectionString = ConfigurationManager.ConnectionStrings["dbMainConnection"].ConnectionString;

        private ContextDto _context;

        public CustomOAuthProvider()
        {
            _context = new ContextDto();
            _context.dbMainConnection = _connectionString;
            _context.User = null;
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            string symmetricKeyAsBase64 = string.Empty;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null)
            {
                context.SetError("invalid_clientId", "client_Id is not set");
                return Task.FromResult<object>(null);
            }

            ClientRepository repo = new ClientRepository(_context);

            Client audience = repo.GetById(context.ClientId);

            if (audience == null)
            {
                context.SetError("invalid_clientId", string.Format("Invalid client_id '{0}'", context.ClientId));
                return Task.FromResult<object>(null);
            }

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            //Dummy check here, you need to do your DB checks against memebrship system http://bit.ly/SPAAuthCode
            //Begin db check user
            string email = context.UserName;

            string password = context.Password;

            NguoiDungRepository repo = new NguoiDungRepository(_context);

            NguoiDung objResult = repo.GetByEmail(email);

            if (objResult == null)
            {
                context.SetError("invalid_grant", "Không tìm thấy Email này trong hệ thống!");
                //return;
                return Task.FromResult<object>(null);
            }

            NguoiDung objNguoiDung = objResult;

            string passwordhash = string.IsNullOrWhiteSpace(password) ? "" : HashHelper.getHashSha256(password);

            //string passwordhash = HashHelper.getHashSha256(password);

            if (!objNguoiDung.PasswordHash.Equals(passwordhash) || passwordhash.Equals(""))
            {
                context.SetError("invalid_grant", "Mật khẩu không chính xác!");
                //return;
                return Task.FromResult<object>(null);
            }

            GetListQuyenTacVuByVaiTroIdDac getListVaiTroDal = new GetListQuyenTacVuByVaiTroIdDac(_context);

            getListVaiTroDal.VAITROID = objNguoiDung.VaiTroId;

            IEnumerable<QuyenTacVuDto> listVaiTro = getListVaiTroDal.Execute();

            listVaiTro = listVaiTro.Where(dieukien => (dieukien.DSQuyenTacVu!=null && dieukien.DSQuyenTacVu.Contains("V")));

            if (listVaiTro.Count() == 0)
            {
                context.SetError("invalid_grant", "Người dùng không có quyền truy cập hệ thống!");
                //return;
                return Task.FromResult<object>(null);
            }

            //End db check user

            var identity = new ClaimsIdentity("JWT");

            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, objNguoiDung.NguoiDungId.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Name, objNguoiDung.HoTen));
            identity.AddClaim(new Claim(ClaimTypes.Email, objNguoiDung.Email));

            identity.AddClaim(new Claim(ClaimTypes.Role, listVaiTro.FirstOrDefault().MaVaiTro));

            var nhanvienid = objNguoiDung.NhanVienId != null ? objNguoiDung.NhanVienId.Value.ToString() : ""; 

            identity.AddClaim(new Claim("NhanVienId", nhanvienid));
            
            foreach(string chucnang in listVaiTro.Select(cot => cot.MaChucNang))
            {
                identity.AddClaim(new Claim("FunctionCode", chucnang));
            }

            identity.AddClaim(new Claim("jti", Guid.NewGuid().ToString()));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                         "audience", (context.ClientId == null) ? string.Empty : context.ClientId
                    }
                });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
            return Task.FromResult<object>(null);
        }
    }
}