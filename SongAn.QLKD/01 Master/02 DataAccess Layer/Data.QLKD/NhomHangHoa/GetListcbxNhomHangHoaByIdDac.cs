using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;

namespace SongAn.QLKD.Data.QLKD.NhomHangHoa
{
    public class GetListcbxNhomHangHoaByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public string UserId { get; set; }
        public string NhanVienId { get; set; }
        public string FunctionCode { get; set; }
        public string Search { get; set; }
        public int NhomHangHoaId { get; set; }
        public string MaNhomHangHoa { get; set; }



        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListcbxNhomHangHoaByIdDac(ContextDto context) : base(context.dbQLKDConnection)
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
                p.Add("UserId", UserId, DbType.String);
                p.Add("NhanVienId", NhanVienId, DbType.String);
                p.Add("FunctionCode", FunctionCode, DbType.String);
                p.Add("Search", Search, DbType.String);
                p.Add("NhomHangHoaId", NhomHangHoaId, DbType.Int32);
                p.Add("MaNhomHangHoa", MaNhomHangHoa, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KD_NhomHangHoa_cbxNhomHangHoaById",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
