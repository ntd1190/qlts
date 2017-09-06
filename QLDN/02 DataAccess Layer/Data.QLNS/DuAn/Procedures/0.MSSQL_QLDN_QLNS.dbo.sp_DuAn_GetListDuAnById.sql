USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DuAn_GetListDuAnById]    Script Date: 05/24/2017 10:17:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.04.26
2. Creator		: Nguyen Ngoc Tan
3. Description	: Lấy danh sách Khen Thuong theo điều kiện
4. Function		: QLDNMAIN/DuAn/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.26(Nguyen Ngoc Tan) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_DuAn_GetListDuAnById]
( 

	@DUANID	nvarchar(500)	= null	
	, @LOGIN_ID			varchar (20)	= null

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) =''
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) =''
	-- Chuẩn bị biến @FIELD


	----------

    
	---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	
	SET @V_SQL = N'SELECT distinct da.DuAnId, da.TenDuAn,da.MoTa,da.MaTrangThai ,da.PhongBan,e.TenPhongBan,da.QuanLy,c.Ho,c.Ten,da.NgayBatDau,da.NgayThatSuBatDau,da.NgayKetThuc,da.NgayThatSuKetThuc,da.CtrVersion,da.XoaYN,
 SUBSTRING(( SELECT ''|''+ CONVERT(nvarchar(255), nvda.NhanVienId)    AS  [text()]  
            FROM NhanVienDuAn nvda, NhanVien nv
            WHERE nvda.DuAnId = da.DuAnId and nv.NhanVienId=nvda.NhanVienId
            ORDER BY nvda.DuAnId
            FOR XML PATH ('''')
        ),2,1000 ) as NhanVienDa,
		SUBSTRING(( SELECT ''|''+ CONVERT(nvarchar(255), nv.Ho)    AS  [text()] 
            FROM NhanVienDuAn nvda, NhanVien nv
            WHERE nvda.DuAnId = da.DuAnId and nv.NhanVienId=nvda.NhanVienId
            ORDER BY nvda.DuAnId
            FOR XML PATH ('''')
        ),2,1000 ) as HoDa,
		SUBSTRING(( SELECT ''|''+ CONVERT(nvarchar(255), nv.Ten)    AS  [text()] 
            FROM NhanVienDuAn nvda, NhanVien nv
            WHERE nvda.DuAnId = da.DuAnId and nv.NhanVienId=nvda.NhanVienId
            ORDER BY nvda.DuAnId
            FOR XML PATH ('''')
        ),2,1000 ) as TenDa
FROM duan da left join NhanVienDuAn b on da.DuAnId=b.DuAnId inner join NhanVien c on da.QuanLy=c.NhanVienId 
	inner JOIN TrangThai d ON da.MaTrangThai = d.MaTrangThai
	left join PhongBan e on da.PhongBan=e.PhongBanId '
	-- Build Where clause
	-- Where clause Quick search
	

	IF @DUANID <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' da.DuAnId in(' + @DUANID + ') ' ;
	END

	IF @V_WHERE_CLAUSE <> ''
		SET @V_SQL = @V_SQL + ' WHERE  ' + @V_WHERE_CLAUSE + ' AND da.XoaYN = ''N'' ';
	ELSE 
		SET @V_SQL = @V_SQL + ' WHERE  ' + @V_WHERE_CLAUSE + ' da.XoaYN = ''N'' ';


---- Thực thi câu SQL
    print(@V_SQL)
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

