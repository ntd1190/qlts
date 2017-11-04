/*****************************************************************************
1. Create Date  : 2017.09.18
2. Creator      : HOI
3. Function     : 
4. Description  : 
5. History      : 
*****************************************************************************/

using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using System;
using System.Linq;
using System.Text;
using SongAn.QLDN.Data.QLKho.KhoCongNoNCC;

namespace SongAn.QLDN.Biz.QLKho.KhoCongNoNCC
{
    public class GetListReportKhoCongNoNCCByProjectionBiz : GetListReportKhoCongNoNCCByProjectionDac
    {
        #region public properties
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListReportKhoCongNoNCCByProjectionBiz(ContextDto context) : base(context)
        {
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

        public override DataSet Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            // goi lai ham execute cua tang dac
            var result = base.Execute();

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return
            return result;
        }
        #endregion
    }
}
