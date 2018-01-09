USE [MSSQL_QLDN_QLNS_DEMO]
GO

/****** Object:  UserDefinedTableType [dbo].[MyTableType_DonHangChiTiet]    Script Date: 12/19/2017 10:08:35 AM ******/
CREATE TYPE [dbo].[MyTableType_DonHangChiTiet] AS TABLE(
	[DonHangId] [INT] NULL,
	[HangHoaId] [INT] NULL,
	[SoLuong] [NUMERIC](18, 4) NULL,
	[DonGia] [NUMERIC](18, 4) NULL,
	[NgayYeuCau] [DATETIME] NULL,
	[NgayNhanHang] [DATETIME] NULL
)
GO


