﻿/*****************************************************************************
1. Create Date  : 2017.05.25
2. Creator      : Van Phu Hoi
3. Function     : QLDNMAIN/chucvu/List
4. Description  : Goi sp thong tin chuc vu
5. History      : 2017.05.25(Van Phu Hoi) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;


namespace SongAn.QLDN.Data.QLNS.ChucVu
    {
        /// <summary>
        /// DAC Lấy danh sách Nghỉ phép theo điều kiện
        /// </summary>
        public class GetChucVuByIdDac : BaseRepositoryAsync
        {
            #region public properties
            public string CHUC_VU_ID { get; set; }
            /// <summary>
            /// Mệnh đề order by
            /// </summary>
            public string LOGIN_ID { get; set; }

         
            #endregion

            #region private variable

            ContextDto _context;

            #endregion

            #region constructor
            /// <summary>
            /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
            /// </summary>
            /// <param name="context"></param>
            public GetChucVuByIdDac(ContextDto context) : base(context.dbQLNSConnection)
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
                    var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_ChucVu_GetChucVuById",
                        param: this,
                        commandType: CommandType.StoredProcedure);

                    return objResult;
                });
            }

            #endregion

        }
    }