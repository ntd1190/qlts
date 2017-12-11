using FluentValidation;
using Nop.Admin.Models.Banner;
using Nop.Core.Domain.Banner;
using Nop.Data;
using Nop.Services.Localization;
using Nop.Web.Framework.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nop.Admin.Validators.Banner
{
    public partial class BannerValidator : BaseNopValidator<BannerPostModel>
    {
        public BannerValidator(ILocalizationService localizationService, IDbContext dbContext)
        {
            SetDatabaseValidationRules<BannerPost>(dbContext);

        }
    }

}