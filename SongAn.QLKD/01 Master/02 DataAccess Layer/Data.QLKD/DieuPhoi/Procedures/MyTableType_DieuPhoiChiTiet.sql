USE [MSSQL_QLDN_QLNS_DEMO]
GO

/****** Object:  UserDefinedTableType [dbo].[MyTableType_DieuPhoiChiTiet]    Script Date: 12/19/2017 10:08:27 AM ******/
CREATE TYPE [dbo].[MyTableType_DieuPhoiChiTiet] AS TABLE(
	[DieuPhoiId] [INT] NULL,
	[HangHoaId] [INT] NULL,
	[NhanVienId] [INT] NULL,
	[KhachHangId] [INT] NULL,
	[DaChuyen] [INT] NULL,
	[NguoiChuyen] [NVARCHAR](100) NULL,
	[DiaChiGui] [NVARCHAR](500) NULL,
	[DiaChiNhan] [NVARCHAR](500) NULL,
	[NguoiNhan] [NVARCHAR](100) NULL,
	[NgayNhan] [DATETIME] NULL,
	[TrangThai] [INT] NULL
)
GO


