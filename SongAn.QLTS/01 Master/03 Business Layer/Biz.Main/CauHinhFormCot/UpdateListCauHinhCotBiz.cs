using System.Collections.Generic;
using System.Threading.Tasks;
using SongAn.QLTS.Data.Main.CaiHinhFormCot;
using SongAn.QLTS.Util.Common.Dto;
using Newtonsoft.Json;
using System;
using SongAn.QLTS.Data.Repository.QLTS_MAIN;

namespace SongAn.QLTS.Biz.Main.CauHinhFormCot
{
    public class UpdateListCauHinhCotBiz
    {
        #region public properties
        public List<CauHinhFormCotBizModel> listCot { get; set; }
        #endregion

        #region private variable
        private ContextDto _context;

        #endregion

        #region constructor
        public UpdateListCauHinhCotBiz(ContextDto context)
        {
            _context = context;
        }
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
        public async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            if (listCot != null && listCot.Count > 0)
            {
                var repo = new CauHinhFormCotRepository(_context);
                foreach (var cot in listCot)
                {
                    var cotEntity = new Entity.QLTS_MAIN.Entity.CauHinhFormCot();
                    cotEntity.CauHinhFormCotId = cot.CauHinhFormCotId;
                    cotEntity.CtrVersion = cot.CtrVersion;
                    cotEntity.HienThiYN = cot.HienThiYN;
                    cotEntity = await repo.UpdatePartial(cotEntity, nameof(Entity.QLTS_MAIN.Entity.CauHinhFormCot.HienThiYN));
                }
            }
            return listCot;
        }
        #endregion

        #region Models
        public class CauHinhFormCotBizModel
        {
            public int CauHinhFormCotId { get; set; }
            public bool HienThiYN { get; set; }
            public int CtrVersion { get; set; }
        }
        #endregion
    }

}
