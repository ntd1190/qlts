USE [MSSQL_QLDN_QLNS_DEMO]
GO

/****** Object:  UserDefinedTableType [dbo].[MyTableType_KeHoachChiTiet]    Script Date: 12/19/2017 10:08:43 AM ******/
CREATE TYPE [dbo].[MyTableType_KeHoachChiTiet] AS TABLE(
	[KeHoachId] [INT] NULL,
	[HangHoaId] [INT] NULL,
	[LoaiHangHoa] [INT] NULL,
	[SoLuong] [NUMERIC](18, 4) NULL,
	[DonGia] [NUMERIC](18, 4) NULL,
	[NgayDuKien] [DATETIME] NULL,
	[TrangThai] [INT] NULL,
	[NgayTao] [DATETIME] NULL
)
GO


