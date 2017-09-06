/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/TangCa/List
4. Description  : Biz Lấy danh sách Tăng Ca theo điều kiện
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.TangCa
{
    /// <summary>
    /// Biz Lấy danh sách Tăng Ca theo điều kiện
    /// </summary>
    /// <remarks>
    /// Luu y: 
    /// -   Vi trong truong hop nay tang biz chi goi 1 dac nen ke
    ///     thua lai tang dac va goi lai ham execute cua tang dac
    ///     
    /// -   Neu biz co xu ly phuc tap, ket hop nhieu dac thi se 
    ///     khoi tao nhieu dac trong ham execute cua biz.
    /// </remarks>
    public class GetListTangCaByCriteriaBiz : SongAn.QLDN.Data.QLNS.TangCa.GetListTangCaByCriteriaDac
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
        public GetListTangCaByCriteriaBiz(ContextDto context) : base(context)
        {

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
            foreach(dynamic item in result)
            {
                var itemLoai = item.Loai;
                if (itemLoai != null)
                {
                    string loai = itemLoai.ToString();

                    switch (loai)
                    {
                        case "l150":
                            item.Loai = "150%";
                            break;
                        case "l200":
                            item.Loai = "200%";
                            break;
                        case "l300":
                            item.Loai = "300%";
                            break;
                    }
                }
            }
            return result;
        }

        #endregion
    }
}
