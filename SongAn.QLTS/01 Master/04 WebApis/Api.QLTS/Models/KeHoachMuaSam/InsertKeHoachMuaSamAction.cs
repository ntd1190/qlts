
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Collections.Generic;
using SongAn.QLTS.Util.Common.Helper;
using Newtonsoft.Json;
using System.Globalization;

namespace  SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSam
{
    public class InsertKeHoachMuaSamAction 
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
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();
                init();
    
                KeHoachMuaSamRepository repo = new KeHoachMuaSamRepository(context);
                var check = await repo.Insert(_KeHoachMuaSam);
                if(!String.IsNullOrEmpty(check.MuaSamId.ToString()))
                {
                    foreach(var item in _listChiTiet)
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

                return returnActionResult(HttpStatusCode.OK, _KeHoachMuaSam, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            kehoachmuasam = Protector.String(kehoachmuasam, "{}");
            var __KeHoachMuaSam = JsonConvert.DeserializeObject<dynamic>(kehoachmuasam);

            kehoachmuasam = JsonConvert.SerializeObject(__KeHoachMuaSam);
            _KeHoachMuaSam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.KeHoachMuaSam>(kehoachmuasam);
            _KeHoachMuaSam.CoSoId = int.Parse(CoSoId);
            _KeHoachMuaSam.NguoiTao = int.Parse(NguoiTao);
            _KeHoachMuaSam.NgayTao = DateTime.Now;
            _KeHoachMuaSam.CtrVersion = 1;

            kehoachmuasamchitiet = Protector.String(kehoachmuasamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<ChiTiet>>(kehoachmuasamchitiet);
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
        private void validate() {  }

        #region helpers
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
        #endregion
    }
}
