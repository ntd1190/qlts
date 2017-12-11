using Nop.Core.Domain.Banner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Data.Mapping.Banner
{

    public partial class BannerPostMap : NopEntityTypeConfiguration<BannerPost>
    {
        public BannerPostMap()
        {
            this.ToTable("Banner");
            this.HasKey(bp => bp.Id);
            this.Property(bp => bp.PictureId);
            this.Property(bp => bp.Link);
            this.Property(bp => bp.Description);
            this.Property(bp => bp.Left);
            this.Property(bp => bp.Top);
            this.Property(bp => bp.Bottom);
        }
    }
}
