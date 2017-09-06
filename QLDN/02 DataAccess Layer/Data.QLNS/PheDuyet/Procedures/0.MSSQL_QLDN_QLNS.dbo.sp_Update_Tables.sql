USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_Update_Tables]    Script Date: 05/24/2017 10:13:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_Update_Tables]
( 

	 @FIELD		     	nvarchar(500)	= null
	, @TABLE			nvarchar(500)	= null
	, @WHERE			nvarchar(500)	= null

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	 DECLARE @RowCount INTEGER

SET @V_SQL =  N'UPDATE '+ @TABLE +' SET '+ @FIELD +' WHERE '+ @WHERE +'';
---- Thực thi câu SQL
	print(@V_SQL)
	EXEC(@V_SQL);
	SELECT @RowCount = @@ROWCOUNT;

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END
