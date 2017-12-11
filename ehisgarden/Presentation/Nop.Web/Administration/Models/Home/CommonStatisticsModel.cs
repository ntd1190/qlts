using Nop.Admin.Models.News;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Catalog;
using System.Collections.Generic;

namespace Nop.Admin.Models.Home
{
    public partial class CommonStatisticsModel : BaseNopModel
    {
        public int NumberOfOrders { get; set; }

        public int NumberOfCustomers { get; set; }

        public int NumberOfPendingReturnRequests { get; set; }

        public int NumberOfLowStockProducts { get; set; }
        
    }
}