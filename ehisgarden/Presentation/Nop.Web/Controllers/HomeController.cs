using System.Web.Mvc;
using Nop.Services.Catalog;
using Nop.Web.Factories;
using Nop.Services.Security;
using Nop.Core.Domain.Catalog;
using Nop.Services.Stores;
using System.Linq;
using Nop.Services.News;
using Nop.Core.Domain.News;
using Nop.Web.Models.Common;
using Nop.Core;
using Nop.Core.Domain.Media;
using Nop.Services.Banner;

using Nop.Services.Media;
using Nop.Web.Infrastructure.Cache;
using Nop.Core.Caching;
using Nop.Services.Orders;
using System.Net;
using Newtonsoft.Json;
using Nop.Services.Customers;

namespace Nop.Web.Controllers
{
    public partial class HomeController : BasePublicController
    {
        #region Fields
        private readonly ICategoryService _categoryService;
        private readonly ICacheManager _cacheManager;
        private readonly IProductModelFactory _productModelFactory;
        private readonly IProductService _productService;
        private readonly INewsModelFactory _newsModelFactory;
        private readonly INewsService _newsService;
        private readonly IAclService _aclService;
        private readonly IStoreMappingService _storeMappingService;
        private readonly NewsSettings _newsSettings;
        private readonly ICatalogModelFactory _catalogModelFactory;
        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly IBannerService _bannerservice;
        private readonly MediaSettings _mediaSettings;
        private readonly CatalogSettings _catalogSettings;
        private readonly IPictureService _pictureService;
        private readonly IBannerModelFactory _bannerModelFactory;
        private readonly IOrderReportService _orderReportService;
        private readonly ICustomerService _CustomerService;
        private readonly IOrderService _orderService;
        #endregion
        #region Constructors

        public HomeController(
            ICategoryService CategoryService,
            IOrderService OrderService,
            ICustomerService CustomerService,
            IProductModelFactory productModelFactory,
            IProductService productService,
            INewsService newsService,
            INewsModelFactory newsModelFactory,
            IAclService alcservice,
            IStoreMappingService storeMappingService,
            ICatalogModelFactory catalogModelFactory,
            IProductTagService productTagService,
            IWorkContext workContex,
            IStoreContext storeContext,
             IBannerService bannerservice,
             IPictureService pictureService,
            MediaSettings mediaSettings,
            CatalogSettings catalogSettings,
            IBannerModelFactory bannerModelFactory,
            NewsSettings newsSettings,
            ICacheManager cacheManager,
            IOrderReportService orderReportService

            )
        {
            this._categoryService = CategoryService;
            this._CustomerService = CustomerService;
            this._orderService = OrderService;
            this._pictureService = pictureService;
            this._productModelFactory = productModelFactory;
            this._productService = productService;
            this._aclService = alcservice;
            this._newsModelFactory = newsModelFactory;
            this._newsService = newsService;
            this._newsSettings = newsSettings;
            this._storeMappingService = storeMappingService;
            this._catalogModelFactory = catalogModelFactory;
            this._productModelFactory = productModelFactory;
            this._storeContext = storeContext;
            this._workContext = workContex;
            this._catalogSettings = catalogSettings;
            this._mediaSettings = mediaSettings;
            this._bannerservice = bannerservice;
            this._bannerModelFactory = bannerModelFactory;
            this._cacheManager = cacheManager;
            this._orderReportService = orderReportService;
        }

        #endregion

        public virtual ActionResult Index(int? productThumbPictureSize)
        {
            AddressModel home = new AddressModel();
            home.news = _newsModelFactory.PrepareHomePageNewsItemsModel();
            var pr = _productService.GetAllProductsDisplayedOnHomePage();
            var cate1 = pr.Where(t => t.MarkAsHot).Take(6).ToList();
            var cate2 = pr.Where(t => t.ProductCategories.Where(a => a.CategoryId == 6).Select(a => a.CategoryId).Contains(6)).Take(12).ToList();
            home.procate1 = _productModelFactory.PrepareProductOverviewModels(cate1, true, true, productThumbPictureSize).Take(6).ToList();
            home.procate2 = _productModelFactory.PrepareProductOverviewModels(cate2, true, true, productThumbPictureSize).Take(12).ToList();
            return View(home);
        }
        public virtual ActionResult Menu()
        {
            var model = _catalogModelFactory.PrepareTopMenuModel();
            return PartialView(model);
        }
        public ActionResult BaoHanh()
        {
            var cus = _CustomerService.GetCustomerByEmail("hongquan@ehisgarden.vn");
            var orders = _orderService.SearchOrders(customerId: cus.Id);
            return View();
        }
        public ActionResult getlink(string link)
        {
            using (var client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json; charset=UTF-8";
                var json = client.UploadString(link, JsonConvert.SerializeObject(new { License = "1CALLCC871KC", Ubi = "", IrlVilationId = "", IsSecured = "" }));


                return Json(json, JsonRequestBehavior.AllowGet);
            }

        }
        public virtual ActionResult Slider()
        {
            var model = _bannerservice.GetAll();
            var data = _bannerModelFactory.PrepareBannerModel(model);
            return PartialView(data);
        }
        [ChildActionOnly]
        public virtual ActionResult HomepageBestSellers(int? productThumbPictureSize)
        {
            if (_catalogSettings.NumberOfBestsellersOnHomepage == 0)
                return Content("");

            //load and cache report
            var report = _cacheManager.Get(string.Format(ModelCacheEventConsumer.HOMEPAGE_BESTSELLERS_IDS_KEY, _storeContext.CurrentStore.Id),
                () => _orderReportService.BestSellersReport(
                    storeId: _storeContext.CurrentStore.Id,
                    pageSize: _catalogSettings.NumberOfBestsellersOnHomepage)
                    .ToList());


            //load products
            var products = _productService.GetProductsByIds(report.Select(x => x.ProductId).ToArray());
            //ACL and store mapping
            products = products.Where(p => _aclService.Authorize(p) && _storeMappingService.Authorize(p)).ToList();
            //availability dates
            products = products.Where(p => p.IsAvailable()).ToList();

            if (!products.Any())
                return Content("");

            //prepare model
            var model = _productModelFactory.PrepareProductOverviewModels(products, true, true, productThumbPictureSize).ToList();
            return PartialView(model);
        }

        [ChildActionOnly]
        public virtual ActionResult HomepageProduct(int? productThumbPictureSize)
        {
            var products = _productService.GetAllProductsDisplayedOnHomePage();
            //ACL and store mapping
            products = products.Where(p => _aclService.Authorize(p) && _storeMappingService.Authorize(p)).ToList();
            //availability dates
            products = products.Where(p => p.IsAvailable() && p.MarkAsNew).ToList();
            if (!products.Any())
                return Content("");
            var model = _productModelFactory.PrepareProductOverviewModels(products, true, true, productThumbPictureSize).ToList();
            return PartialView(model);
        }
    }
}
