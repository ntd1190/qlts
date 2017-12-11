using System.Collections.Generic;
using System.Web.Mvc;
using FluentValidation.Attributes;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using Nop.Web.Validators.Common;
using Nop.Web.Models.News;
using Nop.Web.Models.Catalog;
using Nop.Core.Domain.Catalog;
using Nop.Core;

namespace Nop.Web.Models.Common
{
    [Validator(typeof(AddressValidator))]
    public partial class AddressModel : BaseNopEntityModel
    {

        public AddressModel()
        {
            AvailableCountries = new List<SelectListItem>();
            AvailableStates = new List<SelectListItem>();
            CustomAddressAttributes = new List<AddressAttributeModel>();
            List<ProductOverviewModel> producthome = new List<ProductOverviewModel>();
            HomePageNewsItemsModel news = new HomePageNewsItemsModel();
            List<ProductOverviewModel> procate1 = new List<ProductOverviewModel>();
            List<ProductOverviewModel> procate2 = new List<ProductOverviewModel>();
            TopMenuModel menu = new TopMenuModel();
        }

        [NopResourceDisplayName("Address.Fields.FirstName")]
        [AllowHtml]
        public string FirstName { get; set; }
        [NopResourceDisplayName("Address.Fields.LastName")]
        [AllowHtml]
        public string LastName { get; set; }
        [NopResourceDisplayName("Address.Fields.Email")]
        [AllowHtml]
        public string Email { get; set; }


        public bool CompanyEnabled { get; set; }
        public bool CompanyRequired { get; set; }
        [NopResourceDisplayName("Address.Fields.Company")]
        [AllowHtml]
        public string Company { get; set; }

        public bool CountryEnabled { get; set; }
        [NopResourceDisplayName("Address.Fields.Country")]
        public int? CountryId { get; set; }
        [NopResourceDisplayName("Address.Fields.Country")]
        [AllowHtml]
        public string CountryName { get; set; }

        public bool StateProvinceEnabled { get; set; }
        [NopResourceDisplayName("Address.Fields.StateProvince")]
        public int? StateProvinceId { get; set; }
        [NopResourceDisplayName("Address.Fields.StateProvince")]
        [AllowHtml]
        public string StateProvinceName { get; set; }

        public bool CityEnabled { get; set; }
        public bool CityRequired { get; set; }
        [NopResourceDisplayName("Address.Fields.City")]
        [AllowHtml]
        public string City { get; set; }

        public bool StreetAddressEnabled { get; set; }
        public bool StreetAddressRequired { get; set; }
        [NopResourceDisplayName("Address.Fields.Address1")]
        [AllowHtml]
        public string Address1 { get; set; }

        public bool StreetAddress2Enabled { get; set; }
        public bool StreetAddress2Required { get; set; }
        [NopResourceDisplayName("Address.Fields.Address2")]
        [AllowHtml]
        public string Address2 { get; set; }

        public bool ZipPostalCodeEnabled { get; set; }
        public bool ZipPostalCodeRequired { get; set; }
        [NopResourceDisplayName("Address.Fields.ZipPostalCode")]
        [AllowHtml]
        public string ZipPostalCode { get; set; }

        public bool PhoneEnabled { get; set; }
        public bool PhoneRequired { get; set; }
        [NopResourceDisplayName("Address.Fields.PhoneNumber")]
        [AllowHtml]
        public string PhoneNumber { get; set; }

        public bool FaxEnabled { get; set; }
        public bool FaxRequired { get; set; }
        [NopResourceDisplayName("Address.Fields.FaxNumber")]
        [AllowHtml]
        public string FaxNumber { get; set; }

        public IList<SelectListItem> AvailableCountries { get; set; }
        public IList<SelectListItem> AvailableStates { get; set; }

        public List<ProductOverviewModel> producthome { get; set; }
        public List<ProductOverviewModel> procate1 { get; set; }
        public List<ProductOverviewModel> procate2 { get; set; }
        public HomePageNewsItemsModel news { get; set; }
        public TopMenuModel menu { get; set; }
        public string FormattedCustomAddressAttributes { get; set; }

        public IList<AddressAttributeModel> CustomAddressAttributes { get; set; }
    }
}