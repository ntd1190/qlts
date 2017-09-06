using System.Threading.Tasks;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;

namespace SongAn.QLDN.Api.QLKho.Models.KhoKiemKe
{
    public class DeleteKhoKiemKeAction
    {
        public int Id { get; set; }
        public async Task<dynamic> Execute(ContextDto context)
        {
            dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new KhoKiemKeRepository(context);
            await repo.Delete(Id);
            result.data = await repo.Delete(Id);
            return result;
        }
    }
}
