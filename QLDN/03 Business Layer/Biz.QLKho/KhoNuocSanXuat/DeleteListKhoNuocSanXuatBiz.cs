using SongAn.QLDN.Data.QLKho.KhoNuocSanXuat;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLKho.KhoNuocSanXuat
{
    public class DeleteListKhoNuocSanXuatBiz : DeleteListKhoNuocSanXuatbyKhoIdDac
    {
        #region public properties

        #endregion

        #region private variable

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public DeleteListKhoNuocSanXuatBiz(ContextDto context) : base(context) { }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init() { }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate() { }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public override async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            // goi lai ham execute cua tang dac
            var result = await base.Execute();

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return
            return result;
        }

        #endregion
    }
}
