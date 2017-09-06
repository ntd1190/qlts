USE [MSSQL_QLDN_QLNS_DEMO]
GO
/****** Object:  StoredProcedure [dbo].[sp_KhoPhieuNhap_GetListKhoPhieuNhapById]    Script Date: 30/06/2017 2:52:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.06.17
2. Creator		: NGUYEN THANH BINH
3. Description	: LẤY THÔNG TIN PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUNHAP/LIST
5. Example		: 
					--∬
					exec [sp_KhoPhieuNhap_GetListKhoPhieuNhapById]  
					  @PHIEU_NHAP_IDS			=	'4|5|6'

6. Precaution	:
7. History		:
				  2017.06.17 (Nguyen Thanh Binh) - TẠO MỚI
				  2017.06.28 (Nguyen Thanh Binh) - BỔ SUNG THÔNG TIN
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_GetListKhoPhieuNhapById]
( 
	  @PHIEU_NHAP_IDS			NVARCHAR(4000)	= null			-- PHIEU_NHAP_ID.
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến

SELECT
				 KPN.*
				,KH.Ten TenKhachHang,KH.DiaChi DiaChi
				,TKC.MaTaiKhoan MaTaiKhoanCo,TKN.MaTaiKhoan MaTaiKhoanNo
				,KHO.TenKho TenKhoNhap,TT.TrangThai
				,(THU_KHO.Ho + ' ' +THU_KHO.ten) TenThuKho
				,(NGUOI_NHAN.Ho + ' ' +NGUOI_NHAN.ten) TenNguoiNhanHang
FROM
				KhoPhieuNhap KPN WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN KhachHang KH WITH(NOLOCK, READUNCOMMITTED) ON KPN.KhachHangId = KH.KhachHangId
				LEFT JOIN TaiKhoan TKC WITH(NOLOCK, READUNCOMMITTED) ON KPN.TaiKhoanCo = TKC.TaiKhoanId
				LEFT JOIN TaiKhoan TKN WITH(NOLOCK, READUNCOMMITTED) ON KPN.TaiKhoanNo = TKN.TaiKhoanId
				LEFT JOIN KhoKhoHang KHO WITH(NOLOCK, READUNCOMMITTED) ON KPN.KhoNhap = KHO.KhoHangId
				LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON KPN.MaTrangThai = TT.MaTrangThai
				LEFT JOIN NhanVien THU_KHO WITH(NOLOCK, READUNCOMMITTED) ON KPN.ThuKho = THU_KHO.NhanVienId
				LEFT JOIN NhanVien NGUOI_NHAN WITH(NOLOCK, READUNCOMMITTED) ON KPN.NguoiNhanHang = NGUOI_NHAN.NhanVienId
WHERE
				KPN.XoaYN = 'N'
				AND CHARINDEX('|' + CAST(KPN.PhieuNhapId AS VARCHAR(20)) + '|', '|' + @PHIEU_NHAP_IDS + '|') > 0
SET NOCOUNT OFF
END