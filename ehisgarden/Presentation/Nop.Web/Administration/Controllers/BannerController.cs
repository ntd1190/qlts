using Nop.Admin.Extensions;
using Nop.Admin.Models.Banner;
using Nop.Core.Domain.Banner;
using Nop.Services.Banner;
using Nop.Services.Media;
using Nop.Services.Security;
using Nop.Web.Framework.Controllers;
using Nop.Web.Framework.Kendoui;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nop.Admin.Controllers
{
    public class BannerController : Controller
    {
        #region Fields
        private readonly IPictureService _pictureService;
        private readonly IBannerService _bannerService;


        #endregion

        #region Ctor

        public BannerController(IBannerService bannerService, IPictureService pictureService)
        {
            this._bannerService = bannerService;
            this._pictureService = pictureService;
        }

        #endregion
        // GET: Banner
        public virtual ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public virtual ActionResult List()
        {
            var model = new BannerPostModel();
            return View(model);
        }
        [HttpPost]
        public virtual ActionResult List(DataSourceRequest command, List<BannerPost> model)
        {

            var banner = _bannerService.GetAll();
            var gridModel = new DataSourceResult();
            gridModel.Data = banner.Select(x =>
            {
                var bannerModel = x.ToModel();
                //little performance optimization: ensure that "FullDescription" is not returned
                //picture
                var defaultbannerPicture = _pictureService.GetPictureById(x.PictureId);
                bannerModel.PictureThumbnailUrl = _pictureService.GetPictureUrl(defaultbannerPicture, 75, true);
                return bannerModel;
            });
            gridModel.Total = banner.Count();

            return Json(gridModel);


        }

        #region Create / Edit / Delete

        public virtual ActionResult Create()
        {
            var model = new BannerPostModel();
            return View(model);
        }

        [HttpPost, ParameterBasedOnFormName("save-continue", "continueEditing")]
        public virtual ActionResult Create(BannerPostModel model, bool continueEditing)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageCategories))
            //    return AccessDeniedView();

            if (ModelState.IsValid)
            {
                BannerPost mode = model.ToEntity();
                mode.Description = model.Description;
                mode.Link = model.Link;
                _bannerService.Insert(mode);
                return RedirectToAction("List");
            }


            return View(model);
        }

        public virtual ActionResult Edit(int id)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageCategories))
            //    return AccessDeniedView();

            var model = _bannerService.GetBannerById(id);
            var data = model.ToModel();
            
            if (model == null)
                //No category found with the specified id
                return RedirectToAction("List");
            return View(data);
        }

        [HttpPost, ParameterBasedOnFormName("save-continue", "continueEditing")]
        public virtual ActionResult Edit(BannerPostModel model, bool continueEditing)
        {
            //    if (!_permissionService.Authorize(StandardPermissionProvider.ManageCategories))
            //        return AccessDeniedView();

            var banner = _bannerService.GetBannerById(model.Id);
            if (banner == null)
                //No category found with the specified id
                return RedirectToAction("List");

            if (ModelState.IsValid)
            {
                int prevPictureId = banner.PictureId;
                banner = model.ToEntity(banner);
                _bannerService.Update(banner);
                //delete an old picture (if deleted or updated)
                if (prevPictureId > 0 && prevPictureId != banner.PictureId)
                {
                    var prevPicture = _pictureService.GetPictureById(prevPictureId);
                    if (prevPicture != null)
                        _pictureService.DeletePicture(prevPicture);
                }
                return RedirectToAction("List");
            }

            return View(model);
        }

        [HttpPost]
        public virtual ActionResult Delete(int id)
        {
            //if (!_permissionService.Authorize(StandardPermissionProvider.ManageCategories))
            //    return AccessDeniedView();

            var banner = _bannerService.GetBannerById(id);
            if (banner == null)
                //No category found with the specified id
                return RedirectToAction("List");

            _bannerService.Delete(banner);

            return RedirectToAction("List");
        }


        #endregion
    }
}