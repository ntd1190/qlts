/*****************************************************************************
1. Create Date  : 2017.04.17
2. Creator      : Nguyen Ngoc Tan
3. Function     : QLDNMAIN/NgayNghi/NgayNghi
4. Description  : Goi sp de lay danh sach phong ban voi dieu kien
5. History      : 2017.04.17(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.NgayNghi
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class InsertOneNgayNghiDac : BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Danh sách các field cần lấy
        /// </summary>
        public DateTime Ngay { get; set; }

        /// <summary>
        /// Mệnh đề where
        /// </summary>
        public string MoTa { get; set; }

        /// <summary>
        /// Mệnh đề order by
        /// </summary>
        public string NguoiTao { get; set; }

        /// <summary>
        /// Số dòng skip (để phân trang)
        /// </summary>
        public DateTime NgayTao { get; set; }

        /// <summary>
        /// Số dòng take (để phân trang)
        /// </summary>
        public string XoaYN { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertOneNgayNghiDac(ContextDto context) : base(context.dbQLNSConnection)
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
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("Ngay", Ngay, DbType.DateTime);
                p.Add("MoTa", MoTa, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.String);
                p.Add("NgayTao", NgayTao, DbType.DateTime);
                p.Add("XoaYN", XoaYN, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_NgayNghi_InsertOne",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
