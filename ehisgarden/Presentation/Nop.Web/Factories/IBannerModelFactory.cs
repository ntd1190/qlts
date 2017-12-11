using Nop.Core.Domain.Banner;
using Nop.Web.Models.Banner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nop.Web.Factories
{
    public partial interface IBannerModelFactory
    {
        List<BannerPost> PrepareBannerListModel();
        List<BannerPostModel> PrepareBannerModel(List<BannerPost> bannerpost);
    }
}