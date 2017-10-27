using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhoTonKho;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using System.Data;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.KhoTonKho
{
    public class InsertKhoTonKhoAction
    {
        public string KhoTonKho { get; set; }

        #region private
        private KhoTonKhoEntity _KhoTonKho;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                if (_KhoTonKho.KhoTonKhoId > 0)
                {
                    KhoTonKhoChiTietRepository rpct = new KhoTonKhoChiTietRepository(context);
                    var KhoTonKhoChiTiet = new SongAn.QLTS.Entity.QLTS.Entity.KhoTonKhoChiTiet();
                    KhoTonKhoChiTiet.KhoTonKhoId = _KhoTonKho.KhoTonKhoId;
                    KhoTonKhoChiTiet.TaiSanId = _KhoTonKho.TaiSanId;
                    KhoTonKhoChiTiet.DonGia = _KhoTonKho.DonGia;
                    KhoTonKhoChiTiet.GiaMua = _KhoTonKho.GiaMua;
                    KhoTonKhoChiTiet.GiaBan = _KhoTonKho.GiaBan;
                    KhoTonKhoChiTiet.TonDau = _KhoTonKho.TonDau;
                    KhoTonKhoChiTiet.SLNhap = _KhoTonKho.SLNhap;
                    KhoTonKhoChiTiet.SLXuat = _KhoTonKho.SLXuat;
                    KhoTonKhoChiTiet.NguonNganSachId = _KhoTonKho.NguonNganSachId;
                    KhoTonKhoChiTiet.NhaCungCapId = _KhoTonKho.NhaCungCapId;
                    KhoTonKhoChiTiet.HanDung = _KhoTonKho.HanDung;
                    KhoTonKhoChiTiet.LoSanXuat = _KhoTonKho.LoSanXuat;
                    await rpct.Insert(KhoTonKhoChiTiet);
                }
                else {
                    KhoTonKhoRepository rp = new KhoTonKhoRepository(context);
                    var KhoTonKho = new SongAn.QLTS.Entity.QLTS.Entity.KhoTonKho();
                    KhoTonKho.KhoTaiSanId = _KhoTonKho.KhoTaiSanId;
                    KhoTonKho.CoSoId = _KhoTonKho.CoSoId;
                    KhoTonKho.ThangNam = _KhoTonKho.ThangNam;
                    KhoTonKho.TrangThai = 0;
                    KhoTonKho.NguoiTao = _KhoTonKho.NguoiTao;
                    KhoTonKho.NgayTao = DateTime.Now;
                    KhoTonKho.CtrVersion = 1;
                    await rp.Insert(KhoTonKho);
                    KhoTonKhoChiTietRepository rpct = new KhoTonKhoChiTietRepository(context);
                    var KhoTonKhoChiTiet = new SongAn.QLTS.Entity.QLTS.Entity.KhoTonKhoChiTiet();
                    KhoTonKhoChiTiet.KhoTonKhoId = KhoTonKho.KhoTonKhoId;
                    KhoTonKhoChiTiet.TaiSanId = _KhoTonKho.TaiSanId;
                    KhoTonKhoChiTiet.DonGia = _KhoTonKho.DonGia;
                    KhoTonKhoChiTiet.GiaMua = _KhoTonKho.GiaMua;
                    KhoTonKhoChiTiet.GiaBan = _KhoTonKho.GiaBan;
                    KhoTonKhoChiTiet.TonDau = _KhoTonKho.TonDau;
                    KhoTonKhoChiTiet.SLNhap = _KhoTonKho.SLNhap;
                    KhoTonKhoChiTiet.SLXuat = _KhoTonKho.SLXuat;
                    KhoTonKhoChiTiet.NguonNganSachId = _KhoTonKho.NguonNganSachId;
                    KhoTonKhoChiTiet.NhaCungCapId = _KhoTonKho.NhaCungCapId;
                    KhoTonKhoChiTiet.HanDung = _KhoTonKho.HanDung;
                    KhoTonKhoChiTiet.LoSanXuat = _KhoTonKho.LoSanXuat;
                    await rpct.Insert(KhoTonKhoChiTiet);
                }
               // var result;
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, _KhoTonKho, _metaData);
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
            var __KhoTonKho = JsonConvert.DeserializeObject<dynamic>(KhoTonKho);

            KhoTonKho = JsonConvert.SerializeObject(__KhoTonKho);
            _KhoTonKho = JsonConvert.DeserializeObject<KhoTonKhoEntity>(KhoTonKho);

            
        }
        public class KhoTonKhoEntity
        {
            public virtual int KhoTonKhoId { get; set; }
            public virtual int KhoTaiSanId { get; set; }
            public virtual int CoSoId { get; set; }
            public virtual string ThangNam { get; set; }
            public virtual int NguoiTao { get; set; }
            public virtual int TaiSanId { get; set; }
            public virtual decimal DonGia { get; set; }
            public virtual decimal GiaMua { get; set; }
            public virtual decimal GiaBan { get; set; }
            public virtual decimal TonDau { get; set; }
            public virtual decimal SLNhap { get; set; }
            public virtual decimal SLXuat { get; set; }
            public virtual int NguonNganSachId { get; set; }
            public virtual int NhaCungCapId { get; set; }
            public virtual string HanDung { get; set; }
            public virtual string LoSanXuat { get; set; }


        }
        private void validate()
        {

        }

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
