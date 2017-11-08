using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;

namespace  SongAn.QLKD.Api.QLKD.Models.Phongban
{
    public class DeletePhongBanAction
    {
        public int Id { get; set; }
        public async Task<dynamic> Execute(ContextDto context)
        {
            dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new PhongBanRepository(context);
            await repo.Delete(Id);
            result.data = await repo.Delete(Id); 
            return result;
        }
    }
}
