using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Main.CaiHinhFormCot
{
    public class GetListCauHinhFormCotByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Danh sách các field cần lấy
        /// </summary>
        public string FieldsField { get; set; }

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string SearchString { get; set; }

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string MaForm { get; set; }

        /// <summary>
        /// Mệnh đề order by
        /// </summary>
        public string OrderClause { get; set; }

        /// <summary>
        /// Số dòng skip (để phân trang)
        /// </summary>
        public int? Skip { get; set; }

        /// <summary>
        /// Số dòng take (để phân trang)
        /// </summary>
        public int? Take { get; set; }

        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListCauHinhFormCotByCriteriaDac(ContextDto context) : base(context.dbMainConnection)
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
            var fieldefault = nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.CauHinhFormCotId);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.MaForm);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.MaCot);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.TenCot);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.TenCotMacDinh);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.HienThiYN);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.ThuTu);
            fieldefault += "," + nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.CtrVersion);
            FieldsField = FieldsField.Equals("") ? fieldefault : FieldsField;

            OrderClause = OrderClause.Equals("") ? nameof(Entity.QLKD_MAIN.Entity.CauHinhFormCot.ThuTu) : OrderClause;

            Skip = Skip != null ? Skip.Value : 0;

            Take = Take != null ? Take.Value : 100;
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
                p.Add("FIELD", FieldsField, DbType.String);
                p.Add("SEARCH_STRING", SearchString, DbType.String);
                p.Add("MA_FORM", MaForm, DbType.String);
                p.Add("ORDER_CLAUSE", OrderClause, DbType.String);
                p.Add("SKIP", Skip, DbType.Int16);
                p.Add("TAKE", Take, DbType.Int16);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_CauHinhFormCot_GetListCauHinhFormCotByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
