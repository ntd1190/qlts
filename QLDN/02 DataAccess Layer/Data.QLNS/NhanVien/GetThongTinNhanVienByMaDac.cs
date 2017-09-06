/*****************************************************************************
1. Create Date  : 2017.04.17
2. Creator      : Nguyen Thanh Binh
3. Function     : QLDNMAIN/NhanVien/List
4. Description  : Goi sp de lay danh sach Nhan vien voi dieu kien
5. History      : 2017.04.17(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.NhanVien
{
    /// <summary>
    /// DAC Lấy danh sách Nhan vien theo điều kiện
    /// </summary>
    public class GetThongTinNhanVienByMaDac : BaseRepositoryAsync
    {
        #region public properties
        /// <summary>
        /// mã nhân viên
        /// </summary>
        public string MA { get; set; }

        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetThongTinNhanVienByMaDac(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            MA = Protector.String(MA, "");
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            if(string.IsNullOrEmpty(MA))
            {
                throw new BaseException("MA chưa có dữ liệu.");
            }
        }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_NhanVien_GetThongTinNhanVienByMa",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
