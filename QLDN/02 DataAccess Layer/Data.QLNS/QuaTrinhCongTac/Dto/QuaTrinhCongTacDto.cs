/*****************************************************************************
1. Create Date  : 2017.05.17
2. Creator      : Nguyễn Thanh Bình
3. Function     : 
4. Description  : GetListQuaTrinhCongTacByNhanVienIdDac
5. History      : 2017.05.17(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.QuaTrinhCongTac.Dto
{
    public class QuaTrinhCongTacDto : Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac
    {
        #region THÔNG TIN KHÓA NGOẠI
        public string TenChucVu { get; set; }
        public string HoNhanVien { get; set; }
        public string TenNhanVien { get; set; }
        #endregion

        #region CỘT HỆ THỐNG DÙNG CHO CODE
        public int MAXCNT { get; set; }
        public int QTCT_CTRVERSION { get; set; }
        public int QTCT_ID { get; set; }
        #endregion

        #region Helpers
        public Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac ToEntity(Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac entity)
        {
            if (entity == null)
            {
                entity = new Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac();
            }

            entity.TuNgay = TuNgay;
            entity.DenNgay = DenNgay;
            entity.CongViecChinh = CongViecChinh;
            entity.Hinh = Hinh;
            entity.ThanhTuu = ThanhTuu;

            entity.QuaTrinhCongTacId = QuaTrinhCongTacId > 0 ? QuaTrinhCongTacId : QTCT_ID;
            entity.CtrVersion = CtrVersion > 0 ? CtrVersion : QTCT_CTRVERSION;
            entity.NhanVienId = NhanVienId;
            entity.ChucVuId = ChucVuId;

            return entity;
        }

        public Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac ToEntity()
        {
            return ToEntity(null);
        }

        public QuaTrinhCongTacDto FromEntity(Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac entity)
        {
            if (entity == null)
            {
                entity = new Entity.MSSQL_QLDN_QLNS.Entity.QuaTrinhCongTac();
            }

            TuNgay = entity.TuNgay;
            DenNgay = entity.DenNgay;
            CongViecChinh = entity.CongViecChinh;
            Hinh = entity.Hinh;
            ThanhTuu = entity.ThanhTuu;

            QuaTrinhCongTacId = entity.QuaTrinhCongTacId;
            CtrVersion = entity.CtrVersion;
            NhanVienId = entity.NhanVienId;
            ChucVuId = entity.ChucVuId;

            MAXCNT = 1;
            QTCT_ID = QuaTrinhCongTacId;
            QTCT_CTRVERSION = CtrVersion;

            return this;
        }

        public QuaTrinhCongTacDto FromEntity()
        {
            return FromEntity(null);
        }
        #endregion
    }
}
