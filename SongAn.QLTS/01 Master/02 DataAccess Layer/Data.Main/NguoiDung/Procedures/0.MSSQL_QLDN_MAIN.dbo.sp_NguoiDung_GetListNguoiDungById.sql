USE [QLTS_MAIN]
GO
/****** Object:  StoredProcedure [dbo].[sp_NguoiDung_GetListNguoiDungById]    Script Date: 05/25/2017 02:31:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách theo điều kiện
4. Function		: QLTSMAIN/NguoiDung/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_NguoiDung_GetListNguoiDungById]
( 

	 @SEARCH_NguoiDungID	nvarchar(500)	= null
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) 

	-- Chuẩn bị biến @MA_FORM

	----------


	-- Chuẩn bị biến @V_WHERE_CLAUSE
	SET @V_WHERE_CLAUSE = '';



---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.MaNguoiDung,a.NguoiDungId,a.HoTen,a.NhanVienId,a.Email,a.DienThoai,a.VaiTroId,b.Ho,b.Ten,c.TenVaiTro,a.CtrVersion
	FROM NguoiDung a left join [QLTS_QLTS].[DBO].NhanVien b on a.NhanVienId = b.NhanVienId 
	left join VaiTro c on c.VaiTroId=a.VaiTroId ';

				IF @SEARCH_NguoiDungID<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.NguoiDungId in(' + @SEARCH_NguoiDungID + ') ' ;
	END

	-- Build Where clause

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
					

---- Thực thi câu SQL
	print(@V_SQL)
	EXEC(@V_SQL);

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

