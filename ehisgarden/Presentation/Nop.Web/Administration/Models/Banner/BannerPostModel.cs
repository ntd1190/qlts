using FluentValidation.Attributes;
using Nop.Admin.Validators.Banner;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nop.Admin.Models.Banner
{
    [Validator(typeof(BannerValidator))]
    public partial class BannerPostModel : BaseNopEntityModel
    {
        [NopResourceDisplayName("Admin.Banner.Name")]
        [AllowHtml]
        public string Link { get; set; }

        [UIHint("Picture")]
        [NopResourceDisplayName("Admin.Catalog.Categories.Fields.Picture")]
        public int PictureId { get; set; }
        [NopResourceDisplayName("Admin.Catalog.Products.Fields.PictureThumbnailUrl")]
        public string PictureThumbnailUrl { get; set; }
        [NopResourceDisplayName("Admin.Banner.Description")]
        [AllowHtml]
        public string Description { get; set; }
        [NopResourceDisplayName("Admin.Banner.Left")]
        public bool Left { get; set; }
        [NopResourceDisplayName("Admin.Banner.Top")]
        public bool Top { get; set; }
        [NopResourceDisplayName("Admin.Banner.Bottom")]
        public bool Bottom { get; set; }
    }
}