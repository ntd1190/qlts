/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : Dto chua quyen tac vu tu db
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Main.PhanQuyen.Dto
{
    public class QuyenTacVuDto
    {
        public int VaiTroId { get; set; }
        public string MaVaiTro { get; set; }
        public string MaChucNang { get; set; }
        public string DSQuyenTacVu { get; set; }
    }
}
