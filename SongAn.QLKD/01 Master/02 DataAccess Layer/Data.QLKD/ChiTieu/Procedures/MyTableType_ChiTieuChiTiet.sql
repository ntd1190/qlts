USE [MSSQL_QLDN_QLNS_DEMO]
GO

/****** Object:  UserDefinedTableType [dbo].[MyTableType_ChiTieuChiTiet]    Script Date: 12/19/2017 10:08:18 AM ******/
CREATE TYPE [dbo].[MyTableType_ChiTieuChiTiet] AS TABLE(
	[ChiTieuId] [INT] NULL,
	[NhanVienId] [INT] NULL,
	[Thang1] [NUMERIC](18, 4) NULL,
	[Thang2] [NUMERIC](18, 4) NULL,
	[Thang3] [NUMERIC](18, 4) NULL,
	[Thang4] [NUMERIC](18, 4) NULL,
	[Thang5] [NUMERIC](18, 4) NULL,
	[Thang6] [NUMERIC](18, 4) NULL,
	[Thang7] [NUMERIC](18, 4) NULL,
	[Thang8] [NUMERIC](18, 4) NULL,
	[Thang9] [NUMERIC](18, 4) NULL,
	[Thang10] [NUMERIC](18, 4) NULL,
	[Thang11] [NUMERIC](18, 4) NULL,
	[Thang12] [NUMERIC](18, 4) NULL,
	[NgayCapNhat] [DATETIME] NULL
)
GO


