USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_CongViec_GetListCongViecById]    Script Date: 05/24/2017 10:21:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLDNMAIN/CongViec/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_CongViec_GetListCongViecById]
( 

	 @SEARCH_CONGVIECID	nvarchar(500)	= null
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
	SET @V_WHERE_CLAUSE = N' a.XoaYN = ''N''';



---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.CongViecId,a.TieuDe,a.MoTa,Convert(varchar(10),CONVERT(date,a.NgayBatDau,106),103) AS NgayBatDau,Convert(varchar(10),CONVERT(date,a.NgayThatSuBatDau,106),103) AS NgayThatSuBatDau,Convert(varchar(10),CONVERT(date,a.NgayKetThuc,106),103) AS NgayKetThuc,Convert(varchar(10),CONVERT(date,a.NgayThatSuKetThuc,106),103) AS NgayThatSuKetThuc,a.SoNgay,a.TienDo,a.DuAnId,b.TenDuAn,a.NguoiXuLy,c.Ho,c.Ten,a.MaTrangThai,a.CtrVersion
	FROM CongViec a inner join DuAn b on a.DuAnId=b.DuAnId inner join nhanvien c on a.nguoixuly = c.NhanVienId 
	inner join PhongBan e on c.PhongBanId=e.PhongBanId inner join TrangThai d on a.MaTrangThai=d.MaTrangThai ';

				IF @SEARCH_CONGVIECID<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.CongViecId in(' + @SEARCH_CONGVIECID + ') ' ;
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

