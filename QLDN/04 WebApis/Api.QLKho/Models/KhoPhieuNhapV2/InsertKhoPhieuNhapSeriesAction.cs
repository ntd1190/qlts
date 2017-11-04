
/*****************************************************************************
1. Create Date  : 2017.10.05
2. Creator      : HOI
3. Function     : QLDNKHO/KHOPHIEUNHAP/LIST
4. Description  : THÊM THÔNG TIN PHIẾU NHAP, update bằng stored sp_KhoPhieuXuat_InsertKhoPhieuNhapSeries
5. History      : 
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Biz.QLKho.KhoPhieuNhapV2;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuNhapV2
{
    public class InsertKhoPhieuNhapSeriesAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhapSeries
    {

        #region PUBLIC
        public string listChiTiet { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhapSeries> _listChiTiet;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {

            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhapSeries>>(listChiTiet);

            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {

        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                string listSeries = "";
                foreach (var item in _listChiTiet)
                {
                    if (item.Series != "")
                    {
                        listSeries = listSeries + item.Series + ",";
                    }
                }

                var biz = new DeleteKhoPhieuNhapSeriesBySoPhieuBiz(context);
                biz.SOPHIEU = _listChiTiet[0].SoPhieu;
                biz.HANGHOAID = _listChiTiet[0].HangHoaId;
                biz.LIST_SERIES = listSeries;
                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }
                else
                {
                    foreach (var item in _listChiTiet)
                    {
                        Id = item.Id;
                        Series = item.Series;
                        SoPhieu = item.SoPhieu;
                        MaHangHoa = item.MaHangHoa;
                        HangHoaId = item.HangHoaId;
                        ThoiGianBaoHanh = item.ThoiGianBaoHanh;
                        NguoiTao = _LoginId;
                        NgayTao = DateTime.Now;
                        XoaYN = "N";
                        CtrVersion = 1;
                        //if (!String.IsNullOrEmpty(Series))      {
                            KhoPhieuNhapSeriesRepository repo = new KhoPhieuNhapSeriesRepository(context);
                            await repo.Insert(this);
                        //}
                    }
                }
                
                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, this, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

    }
}
