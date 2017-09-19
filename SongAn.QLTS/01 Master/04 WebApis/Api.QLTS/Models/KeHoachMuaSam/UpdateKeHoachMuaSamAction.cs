using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSam
{
    public class UpdateKeHoachMuaSamAction
    {
        #region PUBLIC
        public string kehoachmuasam { get; set; }
        public string kehoachmuasamchitiet { get; set; }
        public string NguoiTao { get; set; }
        public string CoSoId { get; set; }
        #endregion
        #region private
        private Entity.QLTS.Entity.KeHoachMuaSam _KeHoachMuaSam;
        private List<ChiTiet> _listChiTiet;
        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                init();
                var repo = new KeHoachMuaSamRepository(context);
                var check = await repo.UpdatePartial(_KeHoachMuaSam,
                    nameof(_KeHoachMuaSam.Nam),
                    nameof(_KeHoachMuaSam.NoiDung)
                     );
                if (!String.IsNullOrEmpty(check.MuaSamId.ToString()))
                {
                    Biz.QLTS.KeHoachMuaSamChiTiet.DeleteKeHoachMuaSamChiTietByIdBiz bizct = new Biz.QLTS.KeHoachMuaSamChiTiet.DeleteKeHoachMuaSamChiTietByIdBiz(context);
                    bizct.MuaSamId = check.MuaSamId.ToString();
                    await bizct.Execute();
                    foreach (var item in _listChiTiet)
                    {
                        var KeHoachMuaSamChiTiet = new SongAn.QLTS.Entity.QLTS.Entity.KeHoachMuaSamChiTiet();
                        KeHoachMuaSamChiTiet.MuaSamId = check.MuaSamId;
                        KeHoachMuaSamChiTiet.TenTaiSan = item.TenTaiSan;
                        KeHoachMuaSamChiTiet.LoaiId = item.LoaiId;
                        KeHoachMuaSamChiTiet.PhuongThucId = item.PhuongThucId;
                        KeHoachMuaSamChiTiet.DonViTinh = item.DonViTinh;
                        KeHoachMuaSamChiTiet.MoTa = item.MoTa;
                        KeHoachMuaSamChiTiet.Ngay = DateTime.ParseExact(item.Ngay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                        KeHoachMuaSamChiTiet.SoLuong = item.SoLuong;
                        KeHoachMuaSamChiTiet.DonGia = item.DonGia;
                        KeHoachMuaSamChiTiet.HinhThucId = item.HinhThucId;
                        KeHoachMuaSamChiTiet.DuToan = item.DuToan;
                        KeHoachMuaSamChiTiet.GhiChu = item.GhiChu;
                        KeHoachMuaSamChiTietRepository repoct = new KeHoachMuaSamChiTietRepository(context);
                        await repoct.Insert(KeHoachMuaSamChiTiet);
                    }


                }
                result.data = _KeHoachMuaSam;
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
            var _id = Protector.Int(_KeHoachMuaSam.MuaSamId);

            if (_id < 1)
            {
                throw new FormatException("MuaSamId is empty");
            }
        }

        private void init()
        {
            kehoachmuasam = Protector.String(kehoachmuasam, "{}");
            var __KeHoachMuaSam = JsonConvert.DeserializeObject<dynamic>(kehoachmuasam);

            kehoachmuasam = JsonConvert.SerializeObject(__KeHoachMuaSam);
            _KeHoachMuaSam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.KeHoachMuaSam>(kehoachmuasam);


            kehoachmuasamchitiet = Protector.String(kehoachmuasamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<ChiTiet>>(kehoachmuasamchitiet);
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
        public class ChiTiet
        {

            public virtual int MuaSamId { get; set; }
            public virtual string TenTaiSan { get; set; }
            public virtual int LoaiId { get; set; }
            public virtual int PhuongThucId { get; set; }
            public virtual string DonViTinh { get; set; }
            public virtual string MoTa { get; set; }
            public virtual string Ngay { get; set; }
            public virtual decimal SoLuong { get; set; }
            public virtual decimal DonGia { get; set; }
            public virtual int HinhThucId { get; set; }
            public virtual decimal DuToan { get; set; }
            public virtual string GhiChu { get; set; }
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
