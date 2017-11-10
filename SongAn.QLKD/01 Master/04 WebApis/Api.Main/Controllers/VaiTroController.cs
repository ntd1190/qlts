using SongAn.QLKD.Api.Main.Models.VaiTro;
using SongAn.QLKD.Data.Repository;
using SongAn.QLKD.Data.Repository.QLKD_MAIN;
using SongAn.QLKD.Entity.QLKD_MAIN.Entity;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.Main.Controllers
{
    public class VaiTroController : BaseApiController
    {
        string _connectionString = ConfigurationManager.ConnectionStrings["dbMainConnection"].ConnectionString;

        // Test Controller
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = " + id);
        }

        [HttpGet]
        [Authorize]
        public async Task<IHttpActionResult> GetListVaiTro()
        {
            GetListVaiTroAction action = new GetListVaiTroAction();
            var obj = await action.Execute(_connectionString);
            return Ok(obj);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetVaiTroById(int id)
        {
            var repo = new VaiTroRepository(_connectionString);

            var objResult = await repo.SelectOne(id);

            if (objResult == null)
            {
                //422
                return Content(HttpStatusCode.NoContent, new { Message = "Khong tim thay nguoi dung" });
            }

            return Content(HttpStatusCode.OK, objResult);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetListVaiTroBySearchString(string search)
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);

            var _whereClause = "";
            _whereClause += string.Format("MaVaiTro LIKE '%{0}%' OR ", search);
            _whereClause += string.Format("TenVaiTro LIKE '%{0}%' ", search);

            IEnumerable<VaiTro> listVaiTro = await repo.SelectAllByCriteria(_whereClause, "");

            return Content(HttpStatusCode.OK, listVaiTro);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetListVaiTroByCriteria()
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);

            IEnumerable<VaiTro> listVaiTro = await repo.SelectAllByCriteria("", "");

            return Content(HttpStatusCode.OK, listVaiTro);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetListVaiTroByCriteriaCount()
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);

            int listVaiTro = await repo.SelectAllByCriteriaCount("");

            return Ok(listVaiTro);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetListVaiTroByProjection()
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);

            IEnumerable<dynamic> listVaiTro = await repo.SelectAllByCriteriaProjection("VaiTroId,HoTen", "", "", 1, 2);

            return Ok(listVaiTro);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertVaiTro([FromBody]VaiTro vaitro)
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);
            vaitro.NgayTaoDT = DateTime.Now;
            vaitro.NgaySuaDT = DateTime.Now;

            var result = await repo.Insert(vaitro);

            return Content(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public async Task<IHttpActionResult> updateVaiTro([FromBody]VaiTro vaitro)
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);
            vaitro.NgaySuaDT = DateTime.Now;

            var result = await repo.UpdatePartial(vaitro,
                nameof(VaiTro.MaVaiTro),
                nameof(VaiTro.TenVaiTro),
                nameof(VaiTro.MoTa),
                nameof(VaiTro.KhoaYN),
                nameof(VaiTro.NgaySuaDT)
                 );

            return Content(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public async Task<IHttpActionResult> deleteVaiTro(int Id)
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);
            var result = await repo.Delete(Id);
            return Content(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public async Task<IHttpActionResult> InsertVaiTroTest()
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);

            VaiTro vaitro = new VaiTro();

            vaitro.MaVaiTro = Guid.NewGuid().ToString();
            vaitro.TenVaiTro = Guid.NewGuid().ToString();
            vaitro.KhoaYN = false;
            vaitro.CtrVersion = 1;

            VaiTro objResult = await repo.Insert(vaitro);

            return Ok(objResult);
        }

        [HttpGet]
        public async Task<IHttpActionResult> UpdateVaiTroTest(int id)
        {
            VaiTroRepository repo = new VaiTroRepository(_connectionString);

            VaiTro vaitro = await repo.GetById(id);

            if (vaitro == null)
            {
                return Ok("khong tim thay nguoi dung");
            }

            vaitro.TenVaiTro = Guid.NewGuid().ToString();

            VaiTro objResult = await repo.UpdatePartial(vaitro,
                nameof(VaiTro.TenVaiTro)
                );

            return Ok(objResult);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxVaiTroById([FromBody]GetListcbxVaiTroByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
