using System.Collections.Generic;
using System.Threading.Tasks;
using SongAn.QLKD.Data.Main.CaiHinhFormCot;
using SongAn.QLKD.Util.Common.Dto;

namespace SongAn.QLKD.Biz.Main.CauHinhFormCot
{
    public class GetListCauHinhCotByCriteriaBiz : GetListCauHinhFormCotByCriteriaDac
    {
        #region public properties
        #endregion

        #region private variable
        #endregion

        #region constructor
        public GetListCauHinhCotByCriteriaBiz(ContextDto context) : base(context) { }
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
