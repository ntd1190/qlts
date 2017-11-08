﻿using SongAn.QLKD.Biz.Main.PhanQuyen;
using SongAn.QLKD.Data.Main.PhanQuyen;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.Main.Models.PhanQuyen
{
    public class GetListChucNangByVaiTroIdAction
    {
        #region public properties

        /// <summary>
        /// Vai trò Id
        /// </summary>
        public string VaiTroId { get; set; }

        /// <summary>
        /// Mã Vai trò
        /// </summary>


        #endregion

        #region private variable

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetListChucNangByVaiTroIdAction()
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
            if (string.IsNullOrWhiteSpace(VaiTroId)) { throw new FormatException("VaiTroId Empty"); }

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

                var biz = new GetListChucNangByVaiTroIdBiz(context);

                biz.VaiTroId = Protector.Int(VaiTroId);

                var config = await biz.Execute();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, config, null);
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
