using Nop.Web.Framework.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nop.Web.Models.Banner
{
    public partial class BannerListModel : BaseNopModel
    {
        public BannerListModel()
        {
            BannerList = new List<BannerPostModel>();
        }

   
        public IList<BannerPostModel> BannerList { get; set; }
    }
}