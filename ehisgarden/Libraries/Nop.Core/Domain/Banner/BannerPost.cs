using Nop.Core.Domain.Seo;
using Nop.Core.Domain.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Core.Domain.Banner
{
    public partial class BannerPost : BaseEntity, ISlugSupported
    {
        public int Id { get; set; }
        public int PictureId { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public bool Left { get; set; }
        public bool Top { get; set; }
        public bool Bottom { get; set; }

    
    }
}
