/*****************************************************************************
1. Create Date  : 2017.05.09
2. Creator      : Van Phu Hoi
3. Function     : QLDNMAIN/LoaiNghiPhep/
4. Description  : Action api insert Loai Nghỉ phép
5. History      : 
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLDN.Api.QLNS.Models.LoaiNghiPhep
{
    /// <summary>
    /// Action api insert Nghỉ phép
    /// </summary>
    public class InsertLoaiNghiPhepAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep
    {
        #region public properties

        #endregion

        #region private variable

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public InsertLoaiNghiPhepAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {

        }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                Init();
                Validate();

                var repo = new LoaiNghiPhepRepository(context);

                var loainghiphep = new Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep();

                loainghiphep.NguoiTao = this.NguoiTao == 0 ? 1 : this.NguoiTao;
                loainghiphep.NgayTao = DateTime.Now;
                
                loainghiphep.MaLoaiNghiPhep = this.MaLoaiNghiPhep;
                loainghiphep.TenLoaiPhep = this.TenLoaiPhep;
                loainghiphep.SoNgay = this.SoNgay;
                loainghiphep.GhiChu = this.GhiChu;
                loainghiphep.XoaYN = "N";
                loainghiphep.CtrVersion = 1;

                await repo.Insert(loainghiphep);

                if (loainghiphep.LoaiNghiPhepId == 0)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, "Không thể thêm Nghỉ phép.");
                }

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "LoaiNghiPhep", loainghiphep.LoaiNghiPhepId, "Insert", loainghiphep.NguoiTao);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, loainghiphep, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
        #endregion
    }
}