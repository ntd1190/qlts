using System.Collections.Generic;
using Nop.Web.Framework.Mvc;
using Nop.Core.Domain.Catalog;
using Nop.Web.Models.Catalog;

namespace Nop.Web.Models.News
{
    public partial class NewsItemListModel : BaseNopModel
    {
        public NewsItemListModel()
        {
            PagingFilteringContext = new NewsPagingFilteringModel();
            NewsItems = new List<NewsItemModel>();
            product = new List<ProductOverviewModel>();
            probycate = new ProductTag();
        }
        public List<ProductOverviewModel> product { get; set; }
        public ProductTag probycate { get; set; }
        public int WorkingLanguageId { get; set; }
        public NewsPagingFilteringModel PagingFilteringContext { get; set; }
        public IList<NewsItemModel> NewsItems { get; set; }
    }
}