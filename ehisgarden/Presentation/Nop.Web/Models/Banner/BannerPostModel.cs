using Nop.Web.Framework.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nop.Web.Models.Banner
{
    public partial class BannerPostModel: BaseNopEntityModel
    {
        public string link { get; set; }
        public string description { get; set; }
        public string PictureThumbnailUrl { get; set; }
        public bool Left { get; set; }
        public bool Top { get; set; }
        public bool Bottom { get; set; }
    }
}