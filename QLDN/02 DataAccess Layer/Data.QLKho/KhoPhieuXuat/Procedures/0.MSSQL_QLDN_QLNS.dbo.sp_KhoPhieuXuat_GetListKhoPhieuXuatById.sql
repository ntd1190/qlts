USE [MSSQL_QLDN_QLNS_DEMO]
GO
/****** Object:  StoredProcedure [dbo].[sp_KhoPhieuXuat_GetListKhoPhieuXuatById]    Script Date: 30/06/2017 2:49:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.06.29
2. Creator		: NGUYEN THANH BINH
3. Description	: LẤY THÔNG TIN PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUXUAT/LIST
5. Example		: 
					--∬
					exec [sp_KhoPhieuXuat_GetListKhoPhieuXuatById]  
					  @PHIEU_XUAT_IDS			=	'4|5|6'

6. Precaution	:
7. History		:
				  2017.06.29 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_GetListKhoPhieuXuatById]
( 
	  @PHIEU_XUAT_IDS			NVARCHAR(4000)	= null			-- @PHIEU_XUAT_IDS
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến

SELECT
				 KPX.*
				,KH.Ten TenKhachHang,KH.DiaChi DiaChi
				,TKC.MaTaiKhoan MaTaiKhoanCo,TKN.MaTaiKhoan MaTaiKhoanNo
				,KHO.TenKho TenKhoXuat,TT.TrangThai
				,(THU_KHO.Ho + ' ' +THU_KHO.ten) TenThuKho
				,(NGUOI_GIAO.Ho + ' ' + NGUOI_GIAO.ten) TenNguoiGiaoHang
FROM
				KhoPhieuXuat KPX WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN KhachHang KH WITH(NOLOCK, READUNCOMMITTED) ON KPX.KhachHangId = KH.KhachHangId
				LEFT JOIN TaiKhoan TKC WITH(NOLOCK, READUNCOMMITTED) ON KPX.TaiKhoanCo = TKC.TaiKhoanId
				LEFT JOIN TaiKhoan TKN WITH(NOLOCK, READUNCOMMITTED) ON KPX.TaiKhoanNo = TKN.TaiKhoanId
				LEFT JOIN KhoKhoHang KHO WITH(NOLOCK, READUNCOMMITTED) ON KPX.KhoXuat = KHO.KhoHangId
				LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON KPX.MaTrangThai = TT.MaTrangThai
				LEFT JOIN NhanVien THU_KHO WITH(NOLOCK, READUNCOMMITTED) ON KPX.ThuKho = THU_KHO.NhanVienId
				LEFT JOIN NhanVien NGUOI_GIAO WITH(NOLOCK, READUNCOMMITTED) ON KPX.NguoiGiaoHang = NGUOI_GIAO.NhanVienId
WHERE
				KPX.XoaYN = 'N'
				AND CHARINDEX('|' + CAST(KPX.PhieuXuatId AS VARCHAR(20)) + '|', '|' + @PHIEU_XUAT_IDS + '|') > 0
SET NOCOUNT OFF
END