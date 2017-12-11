using Nop.Core.Data;
using Nop.Core.Domain.Banner;
using Nop.Services.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Services.Banner
{

    public partial class BannerService : IBannerService
    {
        #region Fields

        private readonly IRepository<BannerPost> _bannerRepository;
        private readonly IEventPublisher _eventPublisher;

        #endregion

        #region Ctor

        public BannerService(IRepository<BannerPost> bannerRepository,
            IEventPublisher eventPublisher)
        {
            this._bannerRepository = bannerRepository;
            this._eventPublisher = eventPublisher;
        }

        public void Delete(BannerPost  banner)
        {
            _bannerRepository.Delete(banner);
        }

        public List<BannerPost> GetAll()
        {
            return _bannerRepository.Table.ToList();
        }

        public BannerPost GetBannerById(int id)
        {
            return _bannerRepository.GetById(id);
        }

        public void Insert(BannerPost banner)
        {
            _bannerRepository.Insert(banner);
        }

        public void Update(BannerPost  banner)
        {
            _bannerRepository.Update(banner);
        }
        #endregion
    }
}
