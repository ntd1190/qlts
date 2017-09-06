using SongAn.QLDN.Biz.QLKho.KhoTongHopXuatNhapTonTheoKy;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTonTheoKy
{
    public class GetListTongHopXuatNhapTonTheoKyByCriteriaAction
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

        public string LoaiBaoCao { get; set; }

        public string LoginId { get; set; }

        #region private variable

        private int _draw;

        private int _start;

        private int _length;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetListTongHopXuatNhapTonTheoKyByCriteriaAction()
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

            _length = _length < 1 ? 10 : _length;
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

                //var _quicksearch = SEARCH_STRING;
                //var orderClause = sortName + " " + sortDir;
                var total = 0;

                GetListTongHopXuatNhapTonTheoKyByCriteriaBiz biz = new GetListTongHopXuatNhapTonTheoKyByCriteriaBiz(context);

                biz.TuNgay = TuNgay;
                biz.DenNgay = DenNgay;
                biz.LoaiBaoCao = getLoaiBaoCao(LoaiBaoCao);
                biz.Skip = _start;
                biz.Take = _length;
                biz.LoginId = LoginId;

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
        private int getLoaiBaoCao(string str)
        {
            if (str.Equals("THANG"))
            {
                return 1;
            }
            else if (str.Equals("QUY"))
            {
                return 2;
            }
            else if (str.Equals("NAM"))
            {
                return 3;
            }
            else
                return 0;
        }
        #endregion
    }
}