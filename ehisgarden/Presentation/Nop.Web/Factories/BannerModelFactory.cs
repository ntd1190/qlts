using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nop.Services.Banner;
using Nop.Core.Domain.Banner;
using Nop.Web.Models.Banner;
using Nop.Services.Media;

namespace Nop.Web.Factories
{
    public class BannerModelFactory : IBannerModelFactory
    {
        private readonly IBannerService _bannerService;
        private readonly IPictureService _pictureService;
        public BannerModelFactory(IBannerService bannerService, IPictureService pictureService)
        {
            this._bannerService = bannerService;
            this._pictureService = pictureService;
        }
        public List<BannerPost> PrepareBannerListModel()
        {
            return _bannerService.GetAll();
        }

        public List<BannerPostModel> PrepareBannerModel(List<BannerPost> bannerpost)
        {
            List<BannerPostModel> data = bannerpost.Select(t => new BannerPostModel
            {
                link = t.Link,
                PictureThumbnailUrl = _pictureService.GetPictureUrl(_pictureService.GetPictureById(t.PictureId)),
                description = t.Description,
                Top = t.Top,
                Bottom = t.Bottom,
                Left = t.Left
            }).ToList();
            
            return data;
        }
    }
}