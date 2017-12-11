using Nop.Core.Domain.Banner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Services.Banner
{
    public partial interface IBannerService
    {
        void Insert(BannerPost userMaster);

        void Update(BannerPost userMaster);

        BannerPost GetBannerById(int userId);
        List<BannerPost> GetAll();
        void Delete(BannerPost userMaster);
    }
}
