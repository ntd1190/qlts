/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/LoaiNghiPhep/
4. Description  : Action api lay tat ca loai Nghỉ phép
5. History      : 2017.04.19(Tran Quoc Hung) - Tao moi
*****************************************************************************/
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
    /// Action api lay tat ca loai Nghỉ phép
    /// </summary>
    public class GetAllLoaiNghiPhepAction
    {
        #region public properties

        /// <summary>
        /// draw
        /// </summary>
        public string draw { get; set; }

        /// <summary>
        /// start
        /// </summary>
        public string start { get; set; }

        /// <summary>
        /// length
        /// </summary>
        public string length { get; set; }

        /// <summary>
        /// sortName
        /// </summary>
        public string sortName { get; set; }

        /// <summary>
        /// sortDir
        /// </summary>
        public string sortDir { get; set; }

        #endregion

        #region private variable

        private int _draw;

        private int _start;

        private int _length;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetAllLoaiNghiPhepAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _draw = Protector.Int(draw);
            _start = Protector.Int(start);
            _length = Protector.Int(length);
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

                var total = 0;

                var repo = new LoaiNghiPhepRepository(context);
                var loainghiphep = await repo.GetAll();

                total = loainghiphep.Count();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, loainghiphep, _metaData);
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