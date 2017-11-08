/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : Lop nen cho cac trang View chua thong tin user & quyen co ban
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLKD.Util.Common.Identity
{
    public abstract class BaseViewPage : WebViewPage
    {
        public virtual new CustomPrincipal User
        {
            get { return base.User as CustomPrincipal; }
        }
    }
    public abstract class BaseViewPage<TModel> : WebViewPage<TModel>
    {
        public virtual new CustomPrincipal User
        {
            get { return base.User as CustomPrincipal; }
        }
    }
}