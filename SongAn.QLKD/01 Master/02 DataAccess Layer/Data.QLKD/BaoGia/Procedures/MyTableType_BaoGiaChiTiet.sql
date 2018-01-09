USE [MSSQL_QLDN_QLNS_DEMO]
GO

/****** Object:  UserDefinedTableType [dbo].[MyTableType_BaoGiaChiTiet]    Script Date: 12/19/2017 10:08:05 AM ******/
CREATE TYPE [dbo].[MyTableType_BaoGiaChiTiet] AS TABLE(
	[BaoGiaId] [INT] NULL,
	[HangHoaId] [INT] NULL,
	[SoLuong] [NUMERIC](18, 4) NULL,
	[DonGia] [NUMERIC](18, 4) NULL,
	[NgayBao] [DATETIME] NULL,
	[NgayNhan] [DATETIME] NULL
)
GO


