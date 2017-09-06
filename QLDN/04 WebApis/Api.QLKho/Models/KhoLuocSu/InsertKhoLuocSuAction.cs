using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using SongAn.QLDN.Util.Common.Helper;
using System.Globalization;

namespace SongAn.QLDN.Api.QLNS.Models.KhoLuocSu
{
    public class InsertKhoLuocSuAction
    {
        public void InsertKhoLuocSu(ContextDto context, string ChucNang, int DoiTuongId, string Sukien, int NguoiTao)
        {
            try
            {
                var ls = new Entity.MSSQL_QLDN_QLNS.Entity.KhoLuocSu();
                ls.ChucNang = ChucNang;
                ls.DoiTuongId = DoiTuongId;
                ls.Ngay = DateTime.Now;
                ls.NguoiDung = NguoiTao;
                ls.SuKien = Sukien;
                KhoLuocSuRepository repo = new KhoLuocSuRepository(context);
                repo.Insert(ls);
            }
            catch { }
        }
    }
}
