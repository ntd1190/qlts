using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using SongAn.QLDN.Biz.QLKho.KhoTongHopXuatNhapTonTheoKy;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTonTheoKy
{
    public class GetTongHopXuatNhapTonTheoKyByIdAction
    {
        #region public properties

        /// <summary>
        /// id
        /// </summary>
        public string id { get; set; }

        #endregion

        #region private variable

        int _id;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetTongHopXuatNhapTonTheoKyByIdAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _id = Protector.Int(id);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            if (_id < 1) { throw new FormatException("Id Empty"); }

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
            var _result = new ActionResultDto();
            try
            {
                Init();
                Validate();

                //var repo = new KhoXuatNhapTonTheoKyRepository(context);
                //var obj = await repo.GetById(_id);

                //if (obj == null)
                //{
                //    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy Id '{0}'", _id));
                //}

                //return ActionHelper.returnActionResult(HttpStatusCode.OK, obj, null);

                GetListTongHopXuatNhapTonTheoKyByCriteriaBiz biz = new GetListTongHopXuatNhapTonTheoKyByCriteriaBiz(context);
                biz.KyId = _id;
                var KyXem = await biz.Execute();

                if (KyXem == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy KhachHangId '{0}'", _id));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KyXem
                };

                return _result;
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

        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }
        #endregion
    }
}
