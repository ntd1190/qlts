/*****************************************************************************
1. Create Date  : 2017.06.29
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUXUAT/LIST
4. Description  : THÊM THÔNG TIN PHIẾU XUẤT, update bằng stored sp_KhoPhieuXuat_UpdateInsertKhoPhieuSeries
5. History      : 2017.06.29 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuXuat;
using SongAn.QLDN.Data.QLKho.KhoPhieuXuat;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat
{
    public class UpdateInsertKhoPhieuSeriesAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuSeries
    {

        #region PUBLIC
        public string listChiTiet { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuSeries> _listChiTiet;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {

            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuSeries>>(listChiTiet);

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
                string serialList = "";
              
                foreach (var item in _listChiTiet)
                {
                    var biz = new CheckExistsSeriesBiz(context); // Check the series exists or not
                    biz.IS_NEW = item.Id > 0 ? "N" : "Y"; //Y: insert, N: update
                    biz.ID = item.Id;
                    biz.SO_PHIEU = item.SoPhieu;
                    biz.HANG_HOA_ID = item.HangHoaId;
                    biz.LIST_SERIES = item.Series;
                    var result = await biz.Execute();
                    if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                    {
                        serialList = serialList+ (serialList != "" ? ", " : "") + item.Series ;
                    }
                    else
                    {
                        if (item.Id > 0)
                        {
                            Id = item.Id;
                            Series = item.Series;
                            IsAuto = item.IsAuto;
                            KhoPhieuSeriesRepository repoUpdate = new KhoPhieuSeriesRepository(context);
                            await repoUpdate.UpdatePartial(this, nameof(Series), nameof(IsAuto));
                        }
                        else
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
                            IsAuto = "N";
                            KhoPhieuSeriesRepository repo = new KhoPhieuSeriesRepository(context);
                            await repo.Insert(this);
                        }
                    }
                    
                }
                // }

                if (serialList != "")
                {
                    throw new BaseException("Số series: "+ serialList +" đã tồn tại!" );
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
