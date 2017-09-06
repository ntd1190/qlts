using SongAn.QLDN.Biz.QLKho.KhoTonKho;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTonKho
{
    public class GetListKhoTonKhoByCriteriaAction
    {
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

        public string TuNgay { get; set; }

        public string DenNgay { get; set; }

        public string KhoHangId { get; set; }
        public string LoginId { get; set; }

        #region private variable

        private int _draw;

        private int _start;

        private int _length;

        private DateTime _tuNgay;
        private DateTime _denNgay;
        private string _khoHangId;
        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetListKhoTonKhoByCriteriaAction()
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
            //_tuNgay = DateTime.ParseExact(TuNgay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
            //_denNgay = DateTime.ParseExact(DenNgay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
            _tuNgay = DateTime.ParseExact(TuNgay, "yyyyMMdd", CultureInfo.GetCultureInfo("fr-FR"));
            _denNgay = DateTime.ParseExact(DenNgay, "yyyyMMdd", CultureInfo.GetCultureInfo("fr-FR"));
            _length = _length < 1 ? 10 : _length;
            _khoHangId = Protector.String(KhoHangId);
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

                GetListKhoTonKhoByCriteriaBiz biz = new GetListKhoTonKhoByCriteriaBiz(context);

                biz.TU_NGAY = _tuNgay;
                biz.DEN_NGAY = _denNgay;
                biz.KHO_HANG_ID = _khoHangId;
                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.LOGIN_ID = LoginId;

                IEnumerable<dynamic> list = await biz.Execute();
                if (list.Count() > 0)
                {
                    var obj = list.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
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
