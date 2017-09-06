/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/
4. Description  : Action api Update Nghỉ phép theo id
5. History      : 2017.04.19(Tran Quoc Hung) - Tao moi
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
    /// Action api Update Nghỉ phép theo id
    /// </summary>
    public class UpdateLoaiNghiPhepAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep
    {
        #region public properties

        #endregion

        #region private variable

        private int _loainghiphepId;
        private int _CtrVersion;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateLoaiNghiPhepAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _loainghiphepId = Protector.Int(LoaiNghiPhepId);
            _CtrVersion = Protector.Int(CtrVersion);            
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            var _id = Protector.Int(LoaiNghiPhepId);

            if (_id < 1)
            {
                throw new FormatException("LoaiNghiPhepId is empty");
            }

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
                loainghiphep.LoaiNghiPhepId = _loainghiphepId;                            
                
                loainghiphep.MaLoaiNghiPhep = this.MaLoaiNghiPhep;                
                loainghiphep.TenLoaiPhep = this.TenLoaiPhep;
                loainghiphep.SoNgay = this.SoNgay;
                loainghiphep.GhiChu = this.GhiChu;
                loainghiphep.CtrVersion = _CtrVersion;

                loainghiphep = await repo.UpdatePartial(loainghiphep,
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.MaLoaiNghiPhep),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.TenLoaiPhep),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.SoNgay),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.GhiChu),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.LoaiNghiPhepId),                 
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.CtrVersion)
                  );

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "LoaiNghiPhep", _loainghiphepId, "Update",NguoiTao);

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