using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;
using System.Globalization;
using SongAn.QLTS.Biz.QLTS.GhiGiamChiTiet;

namespace SongAn.QLTS.Api.QLTS.Models.GhiGiam
{
    public class UpdateGhiGiamAction
    {
        #region PUBLIC
        public string GhiGiam { get; set; }
        public string GhiGiamchitiet { get; set; }
        public string NguoiTao { get; set; }
        public string CoSoId { get; set; }
        public string Check { get; set; }
        #endregion
        #region private
        private Entity.QLTS.Entity.GhiGiam _GhiGiam;
        private List<Entity.QLTS.Entity.GhiGiamChiTiet> _listChiTiet;
        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {


                dynamic result = new System.Dynamic.ExpandoObject();
                init();

                var repo = new GhiGiamRepository(context);
                var check = await repo.UpdatePartial(_GhiGiam,
                     nameof(_GhiGiam.SoChungTu),
                     nameof(_GhiGiam.NgayChungTu),
                     nameof(_GhiGiam.NgayGhiGiam),
                     nameof(_GhiGiam.PhongBanId),
                     nameof(_GhiGiam.NoiDung)
                     );
                if (Check == "1")
                {
                    if (!String.IsNullOrEmpty(check.GhiGiamId.ToString()))
                    {
                        GetGhiGiamChiTietByGhiGiamIdBiz biz = new GetGhiGiamChiTietByGhiGiamIdBiz(context);
                        biz.GhiGiamId = check.GhiGiamId.ToString();
                        IEnumerable<dynamic> GhiGiamChiTiet = await biz.Execute();
                        foreach (var item in GhiGiamChiTiet)
                        {
                            Biz.QLTS.GhiGiamChiTiet.DeleteGhiGiamChiTietBiz bizct = new Biz.QLTS.GhiGiamChiTiet.DeleteGhiGiamChiTietBiz(context);
                            bizct.GhiGiamChiTietId = item.GhiGiamChiTietId;
                            bizct.TaiSanId = item.TaiSanId;
                            bizct.PhongBanId = item.PhongBanId;
                            bizct.NhanVienId = item.NhanVienId;
                            bizct.SoLuong = item.SoLuong;
                            await bizct.Execute();
                        }
                        foreach (var item in _listChiTiet)
                        {
                            Biz.QLTS.GhiGiamChiTiet.UpdateGhiGiamChiTietBiz bizct = new Biz.QLTS.GhiGiamChiTiet.UpdateGhiGiamChiTietBiz(context);
                            bizct.GhiGiamId = check.GhiGiamId;
                            bizct.TaiSanId = item.TaiSanId;
                            bizct.PhongBanId = item.PhongBanId;
                            bizct.NhanVienId = item.NhanVienId;
                            bizct.XuLyId = item.XuLyId;
                            bizct.SoLuong = item.SoLuong;
                            await bizct.Execute();
                        }
                    }
                }

                result.data = _GhiGiam;
                return returnActionResult(HttpStatusCode.OK, result.data, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        private void validate()
        {

            var _id = Protector.Int(_GhiGiam.GhiGiamId);

            if (_id < 1)
            {
                throw new FormatException("GhiGiamId is empty");
            }
        }

        private void init()
        {
            GhiGiam = Protector.String(GhiGiam, "{}");
            var __GhiGiam = JsonConvert.DeserializeObject<dynamic>(GhiGiam);
            __GhiGiam.NgayChungTu = DateTime.ParseExact(__GhiGiam.NgayChungTu.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __GhiGiam.NgayGhiGiam = DateTime.ParseExact(__GhiGiam.NgayGhiGiam.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            GhiGiam = JsonConvert.SerializeObject(__GhiGiam);
            _GhiGiam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.GhiGiam>(GhiGiam);


            GhiGiamchitiet = Protector.String(GhiGiamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.GhiGiamChiTiet>>(GhiGiamchitiet);
        }

        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
    }
}
