/*****************************************************************************
1. Create Date  : 2017.05.08
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuong/
4. Description  : Action api Update trạng thái Bảng Lương theo id
5. History      : 2017.05.08(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.BangLuong
{
    /// <summary>
    /// Action api Update trạng thái Bảng Lương theo id
    /// </summary>
    public class UpdateTrangThaiBangLuongAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.BangLuong
    {
        #region public properties

        /// <summary>
        /// Trạng thái
        /// </summary>
        public string strTrangThai { get; set; }

        #endregion

        #region private variable

        private int _Id;
        private int _CtrVersion;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateTrangThaiBangLuongAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _Id = Protector.Int(BangLuongId);
            _CtrVersion = Protector.Int(CtrVersion);

            var tempa = Protector.String(strTrangThai, "BL_KN");

            this.MaTrangThai = tempa;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            var _id = Protector.Int(BangLuongId);

            if (_id < 1)
            {
                throw new FormatException("Id is empty");
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

                var repo = new BangLuongRepository(context);

                var entity = new Entity.MSSQL_QLDN_QLNS.Entity.BangLuong();
                entity.BangLuongId = this.BangLuongId;

                entity.MaTrangThai = this.MaTrangThai;

                entity.CtrVersion = _CtrVersion;
                entity = await repo.UpdatePartial(entity,
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.MaTrangThai),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.CtrVersion)
                  );

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "BangLuong", _Id, "Update",entity.NguoiTao);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, entity, null);
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