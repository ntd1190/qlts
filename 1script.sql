USE [master]
GO
/****** Object:  Database [QLTS]    Script Date: 9/28/2017 4:46:01 PM ******/
CREATE DATABASE [QLTS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLTS', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QLTS.mdf' , SIZE = 7168KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QLTS_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QLTS_log.ldf' , SIZE = 47616KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [QLTS] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QLTS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QLTS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QLTS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QLTS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QLTS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QLTS] SET ARITHABORT OFF 
GO
ALTER DATABASE [QLTS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QLTS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QLTS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QLTS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QLTS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QLTS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QLTS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QLTS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QLTS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QLTS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QLTS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QLTS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QLTS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QLTS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QLTS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QLTS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QLTS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QLTS] SET RECOVERY FULL 
GO
ALTER DATABASE [QLTS] SET  MULTI_USER 
GO
ALTER DATABASE [QLTS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QLTS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QLTS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QLTS] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [QLTS] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'QLTS', N'ON'
GO
USE [QLTS]
GO
/****** Object:  UserDefinedTableType [dbo].[MyTableType_BanKiemKe]    Script Date: 9/28/2017 4:46:01 PM ******/
CREATE TYPE [dbo].[MyTableType_BanKiemKe] AS TABLE(
	[BienBanKiemKeId] [int] NULL,
	[NguoiKiemKe] [nvarchar](100) NULL,
	[ChucVu] [nvarchar](100) NULL,
	[DaiDien] [nvarchar](100) NULL,
	[VaiTro] [nvarchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[MyTableType_BienBanKiemKeChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
CREATE TYPE [dbo].[MyTableType_BienBanKiemKeChiTiet] AS TABLE(
	[BienBanKiemKeId] [int] NULL,
	[TaiSanId] [int] NULL,
	[SoLuong] [numeric](18, 0) NULL,
	[SoLuongKiemKe] [numeric](18, 0) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[NguyenGiaType]    Script Date: 9/28/2017 4:46:01 PM ******/
CREATE TYPE [dbo].[NguyenGiaType] AS TABLE(
	[TaiSanId] [int] NULL,
	[NguonNganSachId] [int] NULL,
	[GiaTri] [numeric](18, 4) NULL
)
GO
/****** Object:  Table [dbo].[BanKiemKe]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BanKiemKe](
	[BanKiemKeId] [int] IDENTITY(1,1) NOT NULL,
	[BienBanKiemKeId] [int] NOT NULL,
	[NguoiKiemKe] [nvarchar](100) NULL,
	[ChucVu] [nvarchar](100) NULL,
	[DaiDien] [nvarchar](100) NULL,
	[VaiTro] [nvarchar](100) NULL,
 CONSTRAINT [PK_BanKiemKe] PRIMARY KEY CLUSTERED 
(
	[BanKiemKeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BaoDuong]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaoDuong](
	[BaoDuongId] [int] IDENTITY(1,1) NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanId] [int] NULL,
	[NhanVienId] [int] NULL,
	[NgayBaoDuong] [datetime] NULL,
	[NgayDuKien] [datetime] NOT NULL,
	[DuToan] [numeric](18, 4) NOT NULL,
	[LoaiBaoDuongId] [int] NOT NULL,
	[MoTa] [nvarchar](500) NULL,
	[DuyetId] [int] NULL,
	[NguoiDuyet] [int] NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_BaoDuong] PRIMARY KEY CLUSTERED 
(
	[BaoDuongId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BienBanKiemKe]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BienBanKiemKe](
	[BienBanKiemKeId] [int] IDENTITY(1,1) NOT NULL,
	[SoChungTu] [nchar](20) NOT NULL,
	[NgayChungTu] [datetime] NOT NULL,
	[NgayKiemKe] [datetime] NOT NULL,
	[PhongBanId] [int] NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_BienBanKiemKe] PRIMARY KEY CLUSTERED 
(
	[BienBanKiemKeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BienBanKiemKeChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BienBanKiemKeChiTiet](
	[BienBanKiemKeChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[BienBanKiemKeId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[SoLuong] [numeric](18, 0) NOT NULL,
	[SoLuongKiemKe] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_BienBanKiemKeChiTiet] PRIMARY KEY CLUSTERED 
(
	[BienBanKiemKeChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BoTriSuDung]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BoTriSuDung](
	[BoTriSuDungId] [int] NOT NULL,
	[NoiDung] [nvarchar](50) NULL,
 CONSTRAINT [PK_SuDung] PRIMARY KEY CLUSTERED 
(
	[BoTriSuDungId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CoSo]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CoSo](
	[CoSoId] [int] IDENTITY(1,1) NOT NULL,
	[MaCoSo] [varchar](50) NOT NULL,
	[LoaiCoSoId] [int] NOT NULL,
	[TrucThuoc] [int] NULL,
	[TenCoSo] [nvarchar](200) NOT NULL,
	[DienThoai] [varchar](15) NULL,
	[DiaChi] [nvarchar](500) NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_CoSo] PRIMARY KEY CLUSTERED 
(
	[CoSoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DanhGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhGia](
	[DanhGiaId] [int] IDENTITY(1,1) NOT NULL,
	[SoChungTu] [nchar](20) NOT NULL,
	[NgayChungTu] [datetime] NOT NULL,
	[NgayDanhGia] [datetime] NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanId] [int] NOT NULL,
	[NhanVienId] [int] NOT NULL,
	[HaoMonLuyKeCu] [numeric](18, 4) NULL,
	[SoNamSuDungCu] [int] NULL,
	[TyLeHaoMonCu] [numeric](5, 2) NULL,
	[SLTonCu] [numeric](18, 4) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
 CONSTRAINT [PK_DanhGia] PRIMARY KEY CLUSTERED 
(
	[DanhGiaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DanhGia_NguyenGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhGia_NguyenGia](
	[DanhGiaId] [int] NOT NULL,
	[NguonNganSachId] [int] NOT NULL,
	[GiaTriCu] [numeric](18, 4) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DeNghiTrangCap]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeNghiTrangCap](
	[DeNghiId] [int] IDENTITY(1,1) NOT NULL,
	[Ngay] [datetime] NOT NULL,
	[SoPhieu] [nchar](20) NOT NULL,
	[PhanLoaiId] [int] NULL,
	[PhongBanId] [int] NULL,
	[NoiDung] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[DuyetId] [int] NULL,
	[GuiCapTren] [int] NULL,
	[NgayDuyet] [datetime] NULL,
	[NoiDungDuyet] [nvarchar](500) NULL,
	[NguoiDuyet] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_DeNghiTrangCap] PRIMARY KEY CLUSTERED 
(
	[DeNghiId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DeNghiTrangCapChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeNghiTrangCapChiTiet](
	[DeNghiChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[DeNghiId] [int] NOT NULL,
	[TenTaiSan] [nvarchar](200) NOT NULL,
	[MoTa] [nvarchar](500) NULL,
	[LoaiId] [int] NOT NULL,
	[SoLuong] [numeric](4, 0) NOT NULL,
	[DonViTinh] [nvarchar](50) NOT NULL,
	[PhuongThucId] [int] NOT NULL,
	[NgayDeNghi] [datetime] NOT NULL,
	[DuToan] [numeric](18, 4) NULL,
	[DuToanDuocDuyet] [numeric](18, 4) NULL,
	[GhiChu] [nvarchar](500) NULL,
	[DuyetId] [int] NULL CONSTRAINT [DF_DeNghiTrangCapChiTiet_DuyetId]  DEFAULT ((0)),
 CONSTRAINT [PK_DeNghiTrangCapChiTiet] PRIMARY KEY CLUSTERED 
(
	[DeNghiChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DieuChuyen]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DieuChuyen](
	[DieuChuyenId] [int] IDENTITY(1,1) NOT NULL,
	[SoChungTu] [varchar](50) NOT NULL,
	[NgayChungTu] [datetime] NOT NULL,
	[NgayDieuChuyen] [datetime] NOT NULL,
	[GhiChu] [nvarchar](1000) NULL,
	[DuyetId] [int] NULL,
	[NguoiDuyet] [int] NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_DieuChuyen] PRIMARY KEY CLUSTERED 
(
	[DieuChuyenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DieuChuyenChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DieuChuyenChiTiet](
	[DieuChuyenChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[DieuChuyenId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanSuDung] [int] NOT NULL,
	[NhanVienSuDung] [int] NOT NULL,
	[PhongBanChuyenDen] [int] NOT NULL,
	[NhanVienTiepNhan] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
	[LyDo] [nvarchar](500) NULL,
 CONSTRAINT [PK_DieuChuyenChiTiet] PRIMARY KEY CLUSTERED 
(
	[DieuChuyenChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DuAn]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DuAn](
	[DuAnId] [int] IDENTITY(1,1) NOT NULL,
	[MaDuAn] [varchar](10) NOT NULL,
	[TenDuAn] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NgungTheoDoi] [int] NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_DuAn] PRIMARY KEY CLUSTERED 
(
	[DuAnId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Duyet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Duyet](
	[DuyetId] [int] NOT NULL,
	[TrangThai] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Duyet] PRIMARY KEY CLUSTERED 
(
	[DuyetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[GhiGiam]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[GhiGiam](
	[GhiGiamId] [int] IDENTITY(1,1) NOT NULL,
	[SoChungTu] [varchar](20) NOT NULL,
	[NgayChungTu] [datetime] NOT NULL,
	[NgayGhiGiam] [datetime] NOT NULL,
	[PhongBanId] [int] NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[DuyetId] [int] NULL,
	[NguoiDuyet] [int] NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_GhiGiam] PRIMARY KEY CLUSTERED 
(
	[GhiGiamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[GhiGiamChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GhiGiamChiTiet](
	[GhiGiamChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[GhiGiamId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanId] [int] NOT NULL,
	[NhanVienId] [int] NOT NULL,
	[XuLyId] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
 CONSTRAINT [PK_GhiGiamChiTiet] PRIMARY KEY CLUSTERED 
(
	[GhiGiamChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[GhiTang]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[GhiTang](
	[GhiTangId] [int] IDENTITY(1,1) NOT NULL,
	[SoChungTu] [varchar](20) NOT NULL,
	[NgayChungTu] [datetime] NOT NULL,
	[NgayGhiTang] [datetime] NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[DuyetId] [int] NULL,
	[NguoiDuyet] [int] NULL,
	[CoSoId] [int] NOT NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_GhiTang] PRIMARY KEY CLUSTERED 
(
	[GhiTangId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[GhiTangChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GhiTangChiTiet](
	[GhiTangChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[GhiTangId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[NgayBatDauSuDung] [datetime] NOT NULL,
	[PhongBanId] [int] NOT NULL,
	[NhanVienId] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
 CONSTRAINT [PK_GhiTangChiTiet] PRIMARY KEY CLUSTERED 
(
	[GhiTangChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HangSanXuat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[HangSanXuat](
	[HangSanXuatId] [int] IDENTITY(1,1) NOT NULL,
	[MaHangSanXuat] [varchar](50) NOT NULL,
	[TenHangSanXuat] [nvarchar](100) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_HangSanXuat] PRIMARY KEY CLUSTERED 
(
	[HangSanXuatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[HaoMon]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HaoMon](
	[HaoMonId] [int] IDENTITY(1,1) NOT NULL,
	[KyTinh] [nchar](10) NOT NULL,
	[SoChungTu] [nchar](20) NOT NULL,
	[NgayChungTu] [datetime] NOT NULL,
	[NgayHaoMon] [datetime] NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_HaoMon] PRIMARY KEY CLUSTERED 
(
	[HaoMonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HaoMonChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HaoMonChiTiet](
	[HaoMonChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[HaoMonId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[TyLeHaoMonCu] [numeric](2, 2) NOT NULL,
 CONSTRAINT [PK_HaoMonChiTiet] PRIMARY KEY CLUSTERED 
(
	[HaoMonChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HienTrangSuDung]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HienTrangSuDung](
	[HienTrangSuDungId] [int] IDENTITY(1,1) NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
 CONSTRAINT [PK_HienTrangSuDung] PRIMARY KEY CLUSTERED 
(
	[HienTrangSuDungId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HinhThuc]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhThuc](
	[HinhThucId] [int] NOT NULL,
	[TenHinhThuc] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_HinhThuc] PRIMARY KEY CLUSTERED 
(
	[HinhThucId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KeHoachMuaSam]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KeHoachMuaSam](
	[MuaSamId] [int] IDENTITY(1,1) NOT NULL,
	[Nam] [numeric](4, 0) NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[DuyetId] [int] NULL,
	[NgayDuyet] [datetime] NULL,
	[NoiDungDuyet] [nvarchar](500) NULL,
	[NguoiDuyet] [int] NULL,
	[CoSoId] [int] NOT NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KeHoachMuaSam] PRIMARY KEY CLUSTERED 
(
	[MuaSamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KeHoachMuaSamChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KeHoachMuaSamChiTiet](
	[MuaSamChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[MuaSamId] [int] NOT NULL,
	[TenTaiSan] [nvarchar](500) NOT NULL,
	[LoaiId] [int] NOT NULL,
	[PhuongThucId] [int] NOT NULL,
	[DonViTinh] [nvarchar](10) NOT NULL,
	[MoTa] [nvarchar](200) NULL,
	[Ngay] [datetime] NOT NULL,
	[SoLuong] [numeric](4, 0) NOT NULL,
	[DonGia] [numeric](18, 4) NOT NULL,
	[HinhThucId] [int] NOT NULL,
	[DuToan] [numeric](18, 4) NULL,
	[GhiChu] [nvarchar](500) NULL,
	[DuyetId] [int] NULL CONSTRAINT [DF_KeHoachMuaSamChiTiet_DuyetId]  DEFAULT ((0)),
 CONSTRAINT [PK_KeHoachMuaSamChiTiet] PRIMARY KEY CLUSTERED 
(
	[MuaSamChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhachHang](
	[KhachHangId] [int] IDENTITY(1,1) NOT NULL,
	[MaKhachHang] [varchar](10) NOT NULL,
	[TenKhachHang] [nvarchar](200) NOT NULL,
	[DienThoai] [varchar](15) NULL,
	[DiDong] [varchar](15) NULL,
	[MaSoThue] [varchar](25) NULL,
	[TKNganHang] [varchar](25) NULL,
	[TenNganHang] [nvarchar](200) NULL,
	[DiaChi] [nvarchar](500) NULL,
	[GhiChu] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KhachHangNCC] PRIMARY KEY CLUSTERED 
(
	[KhachHangId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhaiThac]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhaiThac](
	[KhaiThacId] [int] IDENTITY(1,1) NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanId] [int] NULL,
	[NhanVienId] [int] NULL,
	[KhachHangNCCId] [int] NOT NULL,
	[SoChungTu] [varchar](50) NOT NULL,
	[SoLuongKhaiThac] [numeric](18, 0) NOT NULL,
	[DonGiaKhaiThac] [numeric](18, 4) NOT NULL,
	[ThoiGianBatDau] [datetime] NOT NULL,
	[ThoiGianKetThuc] [datetime] NOT NULL,
	[TienThu] [numeric](18, 4) NULL,
	[NopNganSach] [numeric](18, 4) NULL,
	[DonVi] [numeric](18, 4) NULL,
	[GhiChu] [nchar](10) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KhaiThac] PRIMARY KEY CLUSTERED 
(
	[KhaiThacId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoaSoLieu]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhoaSoLieu](
	[KhoaSoLieuId] [int] IDENTITY(1,1) NOT NULL,
	[ThangNam] [nchar](4) NOT NULL,
	[TrangThai] [nchar](1) NOT NULL,
 CONSTRAINT [PK_KhoaSoLieu] PRIMARY KEY CLUSTERED 
(
	[KhoaSoLieuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KhoPhieuNhap]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoPhieuNhap](
	[KhoPhieuNhapId] [int] IDENTITY(1,1) NOT NULL,
	[KhoTaiSanId] [int] NOT NULL,
	[NguonNganSachId] [int] NOT NULL,
	[NhaCungCapId] [int] NOT NULL,
	[NgayNhap] [datetime] NOT NULL,
	[SoPhieu] [varchar](50) NOT NULL,
	[Seri] [varchar](50) NULL,
	[SoHoaDon] [varchar](50) NULL,
	[NgayHD] [datetime] NULL,
	[BBKiem] [varchar](50) NULL,
	[ChietKhau] [int] NULL,
	[NguoiGiao] [nvarchar](100) NULL,
	[Loai] [varchar](10) NULL,
	[TaiKhoanNo] [varchar](20) NULL,
	[TaiKhoanCo] [varchar](20) NULL,
	[NoiDung] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KhoNhapKho] PRIMARY KEY CLUSTERED 
(
	[KhoPhieuNhapId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoPhieuNhapChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoPhieuNhapChiTiet](
	[KhoPhieuNhapChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[KhoPhieuNhapId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
	[DonGia] [numeric](18, 4) NOT NULL,
	[GiaMua] [numeric](18, 4) NULL,
	[GiaBan] [numeric](18, 4) NULL,
	[VAT] [numeric](2, 2) NULL,
	[HangDung] [varchar](10) NULL,
	[LoSanXuat] [varchar](10) NULL,
 CONSTRAINT [PK_KhoNhapKhoChiTiet] PRIMARY KEY CLUSTERED 
(
	[KhoPhieuNhapChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoPhieuXuat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoPhieuXuat](
	[KhoPhieuXuatId] [int] IDENTITY(1,1) NOT NULL,
	[SoPhieu] [varchar](20) NOT NULL,
	[NgayXuat] [datetime] NOT NULL,
	[Loai] [varchar](10) NOT NULL,
	[KhoXuatId] [int] NOT NULL,
	[KhoNhanId] [int] NULL,
	[NguoiNhanHang] [nvarchar](100) NULL,
	[LyDo] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KhoPhieuXuat] PRIMARY KEY CLUSTERED 
(
	[KhoPhieuXuatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoPhieuXuatChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoPhieuXuatChiTiet](
	[KhoPhieuXuatChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[KhoPhieuXuatId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NULL,
	[DonGia] [numeric](18, 4) NULL,
	[GiaMua] [numeric](18, 4) NULL,
	[GiaBan] [numeric](18, 4) NULL,
	[NguonNganSachId] [int] NULL,
	[NhaCungCapId] [int] NULL,
	[HangDung] [varchar](10) NULL,
	[LoSanXuat] [varchar](10) NULL,
 CONSTRAINT [PK_KhoPhieuXuatChiTiet] PRIMARY KEY CLUSTERED 
(
	[KhoPhieuXuatChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoTaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoTaiSan](
	[KhoTaiSanId] [int] IDENTITY(1,1) NOT NULL,
	[CoSoId] [int] NOT NULL,
	[MaKhoTaiSan] [varchar](50) NOT NULL,
	[TenKhoTaiSan] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KhoTaiSan] PRIMARY KEY CLUSTERED 
(
	[KhoTaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoTonKho]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoTonKho](
	[KhoTonKhoId] [int] IDENTITY(1,1) NOT NULL,
	[KhoTaiSanId] [int] NOT NULL,
	[CoSoId] [int] NOT NULL,
	[ThangNam] [varchar](4) NOT NULL,
	[TrangThai] [int] NOT NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_KhoTonKho] PRIMARY KEY CLUSTERED 
(
	[KhoTonKhoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[KhoTonKhoChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhoTonKhoChiTiet](
	[KhoTonKhoChiTiet] [int] NOT NULL,
	[KhoTonKhoId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[DonGia] [numeric](18, 4) NOT NULL,
	[GiaMua] [numeric](18, 4) NULL,
	[GiaBan] [numeric](18, 4) NULL,
	[TonDau] [numeric](18, 4) NULL,
	[SLNhap] [numeric](18, 4) NULL,
	[SLXuat] [numeric](18, 4) NULL,
	[NguonNganSachId] [int] NULL,
	[NhaCungCapId] [int] NULL,
	[HangDung] [varchar](10) NULL,
	[LoSanXuat] [varchar](10) NULL,
 CONSTRAINT [PK_KhoTonKhoChiTiet] PRIMARY KEY CLUSTERED 
(
	[KhoTonKhoChiTiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LoaiCoSo]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiCoSo](
	[LoaiCoSoId] [int] IDENTITY(1,1) NOT NULL,
	[MaLoaiCoSo] [nchar](10) NOT NULL,
	[TenLoaiCoSo] [nvarchar](100) NOT NULL,
	[QuanHe] [nchar](100) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_LoaiCoSo] PRIMARY KEY CLUSTERED 
(
	[LoaiCoSoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoaiTaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LoaiTaiSan](
	[LoaiId] [int] IDENTITY(1,1) NOT NULL,
	[NhomId] [int] NOT NULL,
	[MaLoai] [varchar](50) NOT NULL,
	[TenLoai] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_LoaiTaiSan] PRIMARY KEY CLUSTERED 
(
	[LoaiId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LogData]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LogData](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[Ngay] [datetime] NULL,
	[MaChucNang] [varchar](50) NULL,
	[DoiTuongId] [int] NULL,
	[SuKien] [nvarchar](50) NULL,
	[NoiDung] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
 CONSTRAINT [PK_Lock] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NguonNganSach]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NguonNganSach](
	[NguonNganSachId] [int] IDENTITY(1,1) NOT NULL,
	[MaNguonNganSach] [varchar](50) NOT NULL,
	[TenNguonNganSach] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_NguonNganSach] PRIMARY KEY CLUSTERED 
(
	[NguonNganSachId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NguyenGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguyenGia](
	[TaiSanId] [int] NOT NULL,
	[NguonNganSachId] [int] NOT NULL,
	[GiaTri] [numeric](18, 4) NULL,
 CONSTRAINT [PK_NguyenGia] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC,
	[NguonNganSachId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NhaCungCap]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NhaCungCap](
	[NhaCungCapId] [int] IDENTITY(1,1) NOT NULL,
	[MaNhaCungCap] [varchar](50) NOT NULL,
	[TenNhaCungCap] [nvarchar](200) NOT NULL,
	[Nhom] [varchar](3) NULL,
	[DienThoai] [varchar](15) NULL,
	[DiDong] [varchar](15) NULL,
	[MaSoThue] [varchar](25) NULL,
	[TKNganHang] [varchar](25) NULL,
	[TenNganHang] [nvarchar](100) NULL,
	[DaiDien] [nvarchar](100) NULL,
	[DiaChi] [nvarchar](50) NULL,
	[GhiChu] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_NhaCungCap] PRIMARY KEY CLUSTERED 
(
	[NhaCungCapId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NhanVien](
	[NhanVienId] [int] IDENTITY(1,1) NOT NULL,
	[PhongBanId] [int] NOT NULL,
	[MaNhanVien] [varchar](50) NOT NULL,
	[TenNhanVien] [nvarchar](200) NOT NULL,
	[ChucDanh] [nvarchar](200) NULL,
	[DienThoai] [varchar](15) NULL,
	[Email] [varchar](100) NULL,
	[DiaChi] [nvarchar](500) NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_NhanVien] PRIMARY KEY CLUSTERED 
(
	[NhanVienId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NhomTaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NhomTaiSan](
	[NhomId] [int] IDENTITY(1,1) NOT NULL,
	[MaNhom] [varchar](50) NOT NULL,
	[TenNhom] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_NhomTaiSan] PRIMARY KEY CLUSTERED 
(
	[NhomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NuocSanXuat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NuocSanXuat](
	[NuocSanXuatId] [int] IDENTITY(1,1) NOT NULL,
	[MaNuocSanXuat] [varchar](50) NOT NULL,
	[TenNuocSanXuat] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_NuocSanXuat] PRIMARY KEY CLUSTERED 
(
	[NuocSanXuatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PhanLoai]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanLoai](
	[PhanLoaiId] [int] IDENTITY(1,1) NOT NULL,
	[TenPhanLoai] [nvarchar](50) NULL,
 CONSTRAINT [PK_PhanLoai] PRIMARY KEY CLUSTERED 
(
	[PhanLoaiId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PhongBan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PhongBan](
	[PhongBanId] [int] IDENTITY(1,1) NOT NULL,
	[CoSoId] [int] NOT NULL,
	[MaPhongBan] [varchar](50) NOT NULL,
	[TenPhongBan] [nvarchar](200) NOT NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_PhongBan] PRIMARY KEY CLUSTERED 
(
	[PhongBanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PhuongThuc]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhuongThuc](
	[PhuongThucId] [int] NOT NULL,
	[TenPhuongThuc] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_PhuongThuc] PRIMARY KEY CLUSTERED 
(
	[PhuongThucId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SuaChua]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SuaChua](
	[SuaChuaId] [int] IDENTITY(1,1) NOT NULL,
	[BaoDuongId] [int] NOT NULL,
	[TenBoPhan] [nvarchar](100) NULL,
	[NgayBatDau] [datetime] NULL,
	[NgayKetThuc] [datetime] NULL,
	[ChiPhi] [numeric](18, 4) NULL,
	[NoiDung] [nvarchar](500) NULL,
	[NoiSua] [nvarchar](500) NULL,
	[KetQua] [nvarchar](500) NULL,
 CONSTRAINT [PK_SuaChua] PRIMARY KEY CLUSTERED 
(
	[SuaChuaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SuDung]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SuDung](
	[SuDungId] [int] IDENTITY(1,1) NOT NULL,
	[KyLap] [int] NOT NULL,
	[Nam] [numeric](4, 0) NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_SuDung_1] PRIMARY KEY CLUSTERED 
(
	[SuDungId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SuDungChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SuDungChiTiet](
	[SuDungChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[SuDungId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanId] [int] NULL,
	[NhanVienId] [int] NULL,
	[SoSanPhamPhucVu] [numeric](18, 4) NULL,
	[DonViTinhSanPham] [nvarchar](50) NULL,
	[SoNguyenLieuSuDung] [numeric](18, 4) NULL,
	[DonViTinhNguyenLieu] [nvarchar](50) NULL,
	[GhiChu] [nvarchar](500) NULL,
 CONSTRAINT [PK_SuDungChiTiet] PRIMARY KEY CLUSTERED 
(
	[SuDungChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TaiSan](
	[TaiSanId] [int] IDENTITY(1,1) NOT NULL,
	[MaTaiSan] [varchar](20) NOT NULL,
	[TenTaiSan] [nvarchar](200) NOT NULL,
	[DonViTinh] [nvarchar](100) NULL,
	[LoaiId] [int] NOT NULL,
	[PhuongThucId] [int] NULL,
	[NamSanXuat] [numeric](4, 0) NULL,
	[NuocSanXuatId] [int] NOT NULL,
	[HangSanXuatId] [int] NULL,
	[SoQDTC] [varchar](50) NULL,
	[NhanHieu] [nvarchar](100) NULL,
	[DuAnId] [int] NULL,
	[NgayMua] [datetime] NOT NULL,
	[NgayBDHaoMon] [datetime] NULL,
	[SoNamSuDung] [int] NULL,
	[TyLeHaoMon] [numeric](5, 2) NULL,
	[HaoMonLuyKe] [numeric](18, 4) NULL,
	[NgayBDKhauHao] [datetime] NULL,
	[KyTinhKhauHao] [nvarchar](10) NULL,
	[GiaTriKhauHao] [numeric](18, 4) NULL,
	[SoKyKhauHao] [numeric](5, 0) NULL,
	[TyLeKhauHao] [numeric](5, 2) NULL,
	[KhauHaoLuyKe] [numeric](18, 4) NULL,
	[LoaiKeKhai] [int] NOT NULL,
	[CoSoId] [int] NOT NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_TaiSan] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ThayDoiThongTin]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin](
	[ThayDoiThongTinId] [int] IDENTITY(1,1) NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[Ngay] [datetime] NOT NULL,
	[TenTaiSanCu] [nvarchar](200) NULL,
	[LyDo] [nvarchar](500) NULL,
	[DuyetId] [int] NULL,
	[NguoiDuyet] [int] NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NULL,
 CONSTRAINT [PK_ThayDoiThongTin] PRIMARY KEY CLUSTERED 
(
	[ThayDoiThongTinId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Dat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Dat](
	[ThayDoiThongTinId] [int] NOT NULL,
	[DiaChiCu] [nvarchar](500) NULL,
	[GiayToCu] [nvarchar](500) NULL,
	[DienTichCu] [numeric](18, 4) NULL,
	[LamTruSoCu] [numeric](18, 4) NULL,
	[CoSoHDSuNghiepCu] [numeric](18, 4) NULL,
	[NhaOCu] [numeric](18, 4) NULL,
	[ChoThueCu] [numeric](18, 4) NULL,
	[BoTrongCu] [numeric](18, 4) NULL,
	[BiLanChiemCu] [numeric](18, 4) NULL,
	[SuDungKhacCu] [numeric](18, 4) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Nha]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Nha](
	[ThayDoiThongTinId] [int] NOT NULL,
	[DiaChiCu] [nvarchar](500) NULL,
	[GiayToCu] [nvarchar](500) NULL,
	[CapHangCu] [int] NULL,
	[SoTangCu] [int] NULL,
	[NamSuDungCu] [numeric](4, 0) NULL,
	[DienTichCu] [numeric](18, 4) NULL,
	[TongDienTichSanCu] [numeric](18, 4) NULL,
	[LamTruSoCu] [numeric](18, 4) NULL,
	[CoSoHDSuNghiepCu] [numeric](18, 4) NULL,
	[NhaOCu] [numeric](18, 4) NULL,
	[ChoThueCu] [numeric](18, 4) NULL,
	[BoTrongCu] [numeric](18, 4) NULL,
	[BiLanChiemCu] [numeric](18, 4) NULL,
	[SuDungKhacCu] [numeric](18, 4) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Oto]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Oto](
	[ThayDoiThongTinId] [int] NOT NULL,
	[NhanHieuCu] [nvarchar](500) NULL,
	[BienKiemSoatCu] [nvarchar](20) NULL,
	[CongSuatXeCu] [numeric](4, 0) NULL,
	[TrongTaiCu] [numeric](4, 0) NULL,
	[ChucDanhCu] [nvarchar](100) NULL,
	[NguonGocXeCu] [nvarchar](500) NULL,
	[LoaiXeCu] [int] NULL,
	[HienTrangSuDungCu] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Tren500]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Tren500](
	[ThayDoiThongTinId] [int] NOT NULL,
	[KyHieuCu] [nvarchar](500) NULL,
	[HienTrangSuDungCu] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TheoDoi]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TheoDoi](
	[TaiSanId] [int] NOT NULL,
	[NgayGhiTang] [datetime] NULL,
	[NgayTrangCap] [datetime] NULL,
	[NgayBatDauSuDung] [datetime] NULL,
	[PhongBanId] [int] NOT NULL,
	[NhanVienId] [int] NOT NULL,
	[SLTon] [numeric](18, 4) NULL,
	[SLTang] [numeric](18, 4) NULL,
	[SLGiam] [numeric](18, 4) NULL,
 CONSTRAINT [PK_TheoDoi_1] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC,
	[PhongBanId] ASC,
	[NhanVienId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongSo]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongSo](
	[ThongSoId] [int] NOT NULL,
	[Loai] [nvarchar](500) NULL,
	[Ten] [nvarchar](500) NULL,
 CONSTRAINT [PK_ThongSo] PRIMARY KEY CLUSTERED 
(
	[ThongSoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinCongKhai]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinCongKhai](
	[TaiSanId] [int] NOT NULL,
	[MoTa] [nvarchar](1000) NULL,
	[MucDich] [nvarchar](1000) NULL,
	[HienTrangSuDungId] [int] NULL,
	[DonGia] [numeric](18, 4) NULL,
	[NopNganSach] [numeric](18, 4) NULL,
	[DeLaiDonVi] [numeric](18, 4) NULL,
	[HHCK] [numeric](18, 4) NULL,
	[NhaCungCapId] [int] NULL,
 CONSTRAINT [PK_ThongTinCongKhai] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinKeKhai_Dat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinKeKhai_Dat](
	[TaiSanId] [int] NOT NULL,
	[DiaChi] [nvarchar](500) NOT NULL,
	[GiayTo] [nvarchar](500) NULL,
	[DienTich] [numeric](18, 4) NOT NULL,
	[LamTruSo] [numeric](18, 4) NOT NULL,
	[CoSoHDSuNghiep] [numeric](18, 4) NOT NULL,
	[NhaO] [numeric](18, 4) NOT NULL,
	[ChoThue] [numeric](18, 4) NOT NULL,
	[BoTrong] [numeric](18, 4) NOT NULL,
	[BiLanChiem] [numeric](18, 4) NOT NULL,
	[SuDungKhac] [numeric](18, 4) NOT NULL,
 CONSTRAINT [PK_ThongTinKeKhai_Dat] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinKeKhai_Nha]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinKeKhai_Nha](
	[TaiSanId] [int] NOT NULL,
	[DiaChi] [nvarchar](500) NOT NULL,
	[GiayTo] [nvarchar](500) NULL,
	[CapHang] [int] NOT NULL,
	[SoTang] [int] NOT NULL,
	[NamSuDung] [numeric](4, 0) NOT NULL,
	[DienTich] [numeric](18, 4) NOT NULL,
	[TongDienTichSan] [numeric](18, 4) NOT NULL,
	[LamTruSo] [numeric](18, 4) NOT NULL,
	[CoSoHDSuNghiep] [numeric](18, 4) NOT NULL,
	[NhaO] [numeric](18, 4) NOT NULL,
	[ChoThue] [numeric](18, 4) NOT NULL,
	[BoTrong] [numeric](18, 4) NOT NULL,
	[BiLanChiem] [numeric](18, 4) NOT NULL,
	[SuDungKhac] [numeric](18, 4) NOT NULL,
 CONSTRAINT [PK_ThongTinKeKhai_Nha] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinKeKhai_Oto]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinKeKhai_Oto](
	[TaiSanId] [int] NOT NULL,
	[NhanHieu] [nvarchar](500) NOT NULL,
	[BienKiemSoat] [nvarchar](20) NOT NULL,
	[CongSuatXe] [numeric](4, 0) NOT NULL,
	[TrongTai] [numeric](4, 0) NOT NULL,
	[ChucDanh] [nvarchar](100) NULL,
	[NguonGocXe] [nvarchar](500) NULL,
	[LoaiXe] [int] NOT NULL,
	[HienTrangSuDung] [int] NOT NULL,
 CONSTRAINT [PK_ThongTinKeKhai_Oto] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinKeKhai_Tren500]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinKeKhai_Tren500](
	[TaiSanId] [int] NOT NULL,
	[KyHieu] [nvarchar](500) NOT NULL,
	[HienTrangSuDung] [int] NOT NULL,
 CONSTRAINT [PK_ThongTinKeKhai_Tren500] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[XuLy]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XuLy](
	[XuLyId] [int] NOT NULL,
	[TenXuLy] [nvarchar](500) NULL,
 CONSTRAINT [PK_XuLy] PRIMARY KEY CLUSTERED 
(
	[XuLyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  UserDefinedFunction [dbo].[DelimitedSplit8K]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[DelimitedSplit8K]
--===== Define I/O parameters
        (@pString VARCHAR(8000), @pDelimiter CHAR(1))
--WARNING!!! DO NOT USE MAX DATA-TYPES HERE!  IT WILL KILL PERFORMANCE!
RETURNS TABLE WITH SCHEMABINDING AS
 RETURN
--===== "Inline" CTE Driven "Tally Table" produces values from 1 up to 10,000...
     -- enough to cover VARCHAR(8000)
  WITH E1(N) AS (
                 SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1 UNION ALL
                 SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1 UNION ALL
                 SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1
                ),                          --10E+1 or 10 rows
       E2(N) AS (SELECT 1 FROM E1 a, E1 b), --10E+2 or 100 rows
       E4(N) AS (SELECT 1 FROM E2 a, E2 b), --10E+4 or 10,000 rows max
 cteTally(N) AS (--==== This provides the "base" CTE and limits the number of rows right up front
                     -- for both a performance gain and prevention of accidental "overruns"
                 SELECT TOP (ISNULL(DATALENGTH(@pString),0)) ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) FROM E4
                ),
cteStart(N1) AS (--==== This returns N+1 (starting position of each "element" just once for each delimiter)
                 SELECT 1 UNION ALL
                 SELECT t.N+1 FROM cteTally t WHERE SUBSTRING(@pString,t.N,1) = @pDelimiter
                ),
cteLen(N1,L1) AS(--==== Return start and length (for use in substring)
                 SELECT s.N1,
                        ISNULL(NULLIF(CHARINDEX(@pDelimiter,@pString,s.N1),0)-s.N1,8000)
                   FROM cteStart s
                )
--===== Do the actual split. The ISNULL/NULLIF combo handles the length for the final element when no delimiter is found.
 SELECT ItemNumber = ROW_NUMBER() OVER(ORDER BY l.N1),
        Item       = SUBSTRING(@pString, l.N1, l.L1)
   FROM cteLen l


GO
SET IDENTITY_INSERT [dbo].[BanKiemKe] ON 

INSERT [dbo].[BanKiemKe] ([BanKiemKeId], [BienBanKiemKeId], [NguoiKiemKe], [ChucVu], [DaiDien], [VaiTro]) VALUES (1012, 2, N'Tép', N'DEV', N'Bộ phận nhà tép', N'Trưởng ban')
INSERT [dbo].[BanKiemKe] ([BanKiemKeId], [BienBanKiemKeId], [NguoiKiemKe], [ChucVu], [DaiDien], [VaiTro]) VALUES (1013, 2, N'Tôm', N'Giám đốc', N'Bộ phận nhà tôm', N'Thành viên')
INSERT [dbo].[BanKiemKe] ([BanKiemKeId], [BienBanKiemKeId], [NguoiKiemKe], [ChucVu], [DaiDien], [VaiTro]) VALUES (1017, 3, N'tôm', N'dev1', N'tép', N'Trưởng ban')
INSERT [dbo].[BanKiemKe] ([BanKiemKeId], [BienBanKiemKeId], [NguoiKiemKe], [ChucVu], [DaiDien], [VaiTro]) VALUES (1018, 3, N'Nguyen Van Tep', N'dev', N'Ban phòng chống', N'Ủy viên')
INSERT [dbo].[BanKiemKe] ([BanKiemKeId], [BienBanKiemKeId], [NguoiKiemKe], [ChucVu], [DaiDien], [VaiTro]) VALUES (1019, 3, N'Nguyen Van Cua', N'dev', N'Phòng hành chính', N'Ủy viên')
SET IDENTITY_INSERT [dbo].[BanKiemKe] OFF
SET IDENTITY_INSERT [dbo].[BaoDuong] ON 

INSERT [dbo].[BaoDuong] ([BaoDuongId], [TaiSanId], [PhongBanId], [NhanVienId], [NgayBaoDuong], [NgayDuKien], [DuToan], [LoaiBaoDuongId], [MoTa], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, 27, 5, 3, CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(40000.0000 AS Numeric(18, 4)), 1, N'mô tả này rất là dài', 0, 0, 1, 7, CAST(N'2017-09-09 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[BaoDuong] ([BaoDuongId], [TaiSanId], [PhongBanId], [NhanVienId], [NgayBaoDuong], [NgayDuKien], [DuToan], [LoaiBaoDuongId], [MoTa], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (8, 1065, 7, 4, CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(1000000.0000 AS Numeric(18, 4)), 1, N'', 0, 0, 1, 7, CAST(N'2017-09-14 10:23:01.250' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[BaoDuong] OFF
SET IDENTITY_INSERT [dbo].[BienBanKiemKe] ON 

INSERT [dbo].[BienBanKiemKe] ([BienBanKiemKeId], [SoChungTu], [NgayChungTu], [NgayKiemKe], [PhongBanId], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'KK000001            ', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), 5, N'abc', 1, 4, CAST(N'2017-09-09 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[BienBanKiemKe] ([BienBanKiemKeId], [SoChungTu], [NgayChungTu], [NgayKiemKe], [PhongBanId], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, N'KK000002            ', CAST(N'2017-09-18 00:00:00.000' AS DateTime), CAST(N'2017-09-18 00:00:00.000' AS DateTime), 7, N'', 1, 7, CAST(N'2017-09-18 16:13:40.623' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[BienBanKiemKe] OFF
SET IDENTITY_INSERT [dbo].[BienBanKiemKeChiTiet] ON 

INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1027, 2, 27, CAST(5 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1028, 2, 1061, CAST(10 AS Numeric(18, 0)), CAST(10 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1029, 2, 1064, CAST(2 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1030, 2, 1068, CAST(11 AS Numeric(18, 0)), CAST(11 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1031, 2, 1069, CAST(2 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1040, 3, 27, CAST(7 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1041, 3, 1061, CAST(5 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1042, 3, 1064, CAST(10 AS Numeric(18, 0)), CAST(10 AS Numeric(18, 0)))
INSERT [dbo].[BienBanKiemKeChiTiet] ([BienBanKiemKeChiTietId], [BienBanKiemKeId], [TaiSanId], [SoLuong], [SoLuongKiemKe]) VALUES (1043, 3, 1065, CAST(60 AS Numeric(18, 0)), CAST(57 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[BienBanKiemKeChiTiet] OFF
SET IDENTITY_INSERT [dbo].[CoSo] ON 

INSERT [dbo].[CoSo] ([CoSoId], [MaCoSo], [LoaiCoSoId], [TrucThuoc], [TenCoSo], [DienThoai], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'CS01', 2, NULL, N'Sở tài chính Quảng Ninh', N'0985401027', N'38/40 Quang Trung, phường 10, quận Gò Vấp, Tp.HCM', N'Ghi chú', 53, CAST(N'2017-08-09 00:00:00.000' AS DateTime), 6)
INSERT [dbo].[CoSo] ([CoSoId], [MaCoSo], [LoaiCoSoId], [TrucThuoc], [TenCoSo], [DienThoai], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (15, N'CS02', 4, 1, N'Bệnh viện lai châu', N'0985401027', N'38/40 Quang Trung, phường 10, quận Gò Vấp, Tp.HCM', N'Ghi chú', 53, CAST(N'2017-08-09 00:00:00.000' AS DateTime), 7)
SET IDENTITY_INSERT [dbo].[CoSo] OFF
SET IDENTITY_INSERT [dbo].[DanhGia] ON 

INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (71, N'CT0001              ', CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'TEST', 1065, 7, 5, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-25 16:01:33.440' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (72, N'ct002               ', CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'test', 1065, 7, 4, CAST(5700000.0000 AS Numeric(18, 4)), 5, CAST(10.00 AS Numeric(5, 2)), NULL, 1, 6, CAST(N'2017-09-25 16:03:41.903' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (73, N'tsts                ', CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'stes', 1065, 7, 4, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-25 16:19:17.020' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (74, N'ct0002              ', CAST(N'2017-09-26 00:00:00.000' AS DateTime), CAST(N'2017-09-28 00:00:00.000' AS DateTime), N'eqeqeqe', 1065, 7, 5, NULL, NULL, CAST(20.00 AS Numeric(5, 2)), NULL, 1, 6, CAST(N'2017-09-26 09:16:10.410' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (75, N'CT003               ', CAST(N'2017-09-26 00:00:00.000' AS DateTime), CAST(N'2017-09-26 00:00:00.000' AS DateTime), N'TEST', 1065, 7, 4, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-26 10:11:01.640' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (76, N'ct003               ', CAST(N'2017-09-26 00:00:00.000' AS DateTime), CAST(N'2017-09-26 00:00:00.000' AS DateTime), N'test', 1065, 7, 4, NULL, NULL, CAST(0.00 AS Numeric(5, 2)), NULL, 1, 6, CAST(N'2017-09-26 10:57:50.550' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (78, N'CT-004              ', CAST(N'2017-09-26 00:00:00.000' AS DateTime), CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'TESST', 27, 5, 3, NULL, 1, CAST(100.00 AS Numeric(5, 2)), NULL, 1, 6, CAST(N'2017-09-26 16:25:28.757' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (79, N'CT0005              ', CAST(N'2017-09-27 00:00:00.000' AS DateTime), CAST(N'2017-09-27 00:00:00.000' AS DateTime), N'TEST EDIT', 1061, 5, 3, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-27 10:44:00.970' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (80, N'TESST               ', CAST(N'2017-09-27 00:00:00.000' AS DateTime), CAST(N'2017-09-27 00:00:00.000' AS DateTime), N'REWREW', 27, 7, 4, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-27 11:19:08.790' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (81, N'GDGGF               ', CAST(N'2017-09-27 00:00:00.000' AS DateTime), CAST(N'2017-09-27 00:00:00.000' AS DateTime), N'FSFDSFDS', 27, 5, 3, NULL, NULL, CAST(10.00 AS Numeric(5, 2)), NULL, 1, 6, CAST(N'2017-09-27 11:24:33.057' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (82, N'321                 ', CAST(N'2017-09-27 00:00:00.000' AS DateTime), CAST(N'2017-09-27 00:00:00.000' AS DateTime), N'32131', 27, 5, 3, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-27 11:25:29.777' AS DateTime))
INSERT [dbo].[DanhGia] ([DanhGiaId], [SoChungTu], [NgayChungTu], [NgayDanhGia], [NoiDung], [TaiSanId], [PhongBanId], [NhanVienId], [HaoMonLuyKeCu], [SoNamSuDungCu], [TyLeHaoMonCu], [SLTonCu], [CoSoId], [NguoiTao], [NgayTao]) VALUES (83, N'EQWE                ', CAST(N'2017-09-27 00:00:00.000' AS DateTime), CAST(N'2017-09-27 00:00:00.000' AS DateTime), N'EQWEQ', 27, 5, 3, NULL, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-27 11:26:32.157' AS DateTime))
SET IDENTITY_INSERT [dbo].[DanhGia] OFF
INSERT [dbo].[DanhGia_NguyenGia] ([DanhGiaId], [NguonNganSachId], [GiaTriCu]) VALUES (83, 1, NULL)
SET IDENTITY_INSERT [dbo].[DeNghiTrangCap] ON 

INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (5, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'ĐNTC0000001         ', 1, 6, N'mua', 1, 1, NULL, NULL, NULL, 10, 10, CAST(N'2017-08-30 09:09:10.817' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1014, CAST(N'2017-09-14 00:00:00.000' AS DateTime), N'SP0001              ', 1, 5, N'Mua máy tinh', 1, 2, NULL, NULL, NULL, 0, 3, CAST(N'2017-09-01 15:10:11.600' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1015, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'2                   ', 1, 5, N'2', 1, 1, NULL, NULL, NULL, 0, 3, CAST(N'2017-09-01 15:15:52.147' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1016, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'233                 ', 1, 5, N'333', 1, 1, NULL, NULL, NULL, 0, 3, CAST(N'2017-09-01 15:17:08.640' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1017, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'222                 ', 1, 5, N'222', 1, 1, NULL, CAST(N'2017-09-14 00:00:00.000' AS DateTime), NULL, 3, 3, CAST(N'2017-09-01 15:18:02.910' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1018, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'2                   ', 1, 5, N'2', 1, 2, NULL, CAST(N'2017-09-14 00:00:00.000' AS DateTime), N'chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu chưa đúng mẫu', 3, 3, CAST(N'2017-09-01 15:19:23.007' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1019, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'2                   ', 1, 5, N'2', 1, 1, NULL, CAST(N'2017-09-14 00:00:00.000' AS DateTime), NULL, 3, 3, CAST(N'2017-09-01 15:21:52.990' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1020, CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'DN001               ', 1, 6, N'a', 1, 0, NULL, NULL, NULL, 0, 3, CAST(N'2017-09-25 08:27:47.277' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1021, CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'DN002               ', 1, 5, N'222', 1, 0, NULL, NULL, NULL, 0, 3, CAST(N'2017-09-25 08:30:32.650' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1025, CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'aaa                 ', 2, NULL, N'aaaa', 15, 0, 1, NULL, NULL, 0, 3, CAST(N'2017-09-25 10:33:16.473' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [GuiCapTren], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1026, CAST(N'2017-09-25 00:00:00.000' AS DateTime), N'2                   ', 2, 6, N'2', 1, 0, NULL, NULL, NULL, 0, 3, CAST(N'2017-09-25 10:33:54.373' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[DeNghiTrangCap] OFF
SET IDENTITY_INSERT [dbo].[DeNghiTrangCapChiTiet] ON 

INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1021, 1015, N'2', N'2', 1, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1022, 1016, N'33', N'333', 1, CAST(33 AS Numeric(4, 0)), N'33', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(3.0000 AS Numeric(18, 4)), CAST(3.0000 AS Numeric(18, 4)), N'3', 1)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1023, 1017, N'22', N'222', 1, CAST(22 AS Numeric(4, 0)), N'22', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2', NULL)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1024, 1018, N'2', N'2', 2, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2', NULL)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1029, 1019, N'2', N'2', 1, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2', NULL)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1033, 5, N'abc', N'a', 1, CAST(1 AS Numeric(4, 0)), N'cái', 1, CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(1000000.0000 AS Numeric(18, 4)), CAST(6000000.0000 AS Numeric(18, 4)), N'mua liền', NULL)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1034, 5, N'abc', N'b', 2, CAST(2 AS Numeric(4, 0)), N'cái', 1, CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(1000000.0000 AS Numeric(18, 4)), CAST(6000000.0000 AS Numeric(18, 4)), N'mua liền', NULL)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1035, 1014, N'Máy tính khủng3', N'Đẹp', 1, CAST(2 AS Numeric(4, 0)), N'cái', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(5000000.0000 AS Numeric(18, 4)), CAST(5000000.0000 AS Numeric(18, 4)), N'abc', 2)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1036, 1014, N'máy tính 2', N'xấu', 3, CAST(3 AS Numeric(4, 0)), N'cái', 2, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(30000.0000 AS Numeric(18, 4)), CAST(200000.0000 AS Numeric(18, 4)), N'a', 2)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1037, 1014, N'2', N'2', 2, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-05 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2', 2)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1044, 1025, N'aaaa', N'', 2, CAST(2 AS Numeric(4, 0)), N'cai', 1, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(400.0000 AS Numeric(18, 4)), CAST(222.0000 AS Numeric(18, 4)), N'', 0)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1045, 1025, N'bbbb', N'aaaa', 2, CAST(2 AS Numeric(4, 0)), N'cais', 2, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2222.0000 AS Numeric(18, 4)), N'', 0)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1046, 1025, N'ccc', N'', 1, CAST(2 AS Numeric(4, 0)), N'cai', 3, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(2222.0000 AS Numeric(18, 4)), CAST(2222.0000 AS Numeric(18, 4)), N'', 0)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1047, 1026, N'2', N'2', 3, CAST(2 AS Numeric(4, 0)), N'c', 1, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'', 0)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1052, 1020, N'aaaa', N'', 2, CAST(2 AS Numeric(4, 0)), N'cai', 1, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(400.0000 AS Numeric(18, 4)), CAST(222.0000 AS Numeric(18, 4)), N'', 0)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1053, 1020, N'bbbb', N'aaaa', 2, CAST(2 AS Numeric(4, 0)), N'cais', 2, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2222.0000 AS Numeric(18, 4)), N'', 0)
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu], [DuyetId]) VALUES (1054, 1021, N'ccc', N'', 1, CAST(2 AS Numeric(4, 0)), N'cai', 3, CAST(N'2017-09-25 00:00:00.000' AS DateTime), CAST(2222.0000 AS Numeric(18, 4)), CAST(2222.0000 AS Numeric(18, 4)), N'', 0)
SET IDENTITY_INSERT [dbo].[DeNghiTrangCapChiTiet] OFF
SET IDENTITY_INSERT [dbo].[DieuChuyen] ON 

INSERT [dbo].[DieuChuyen] ([DieuChuyenId], [SoChungTu], [NgayChungTu], [NgayDieuChuyen], [GhiChu], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (6, N'DC00011             ', CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), N'Cho rộng phòng', 0, 0, 1, 7, CAST(N'2017-09-11 10:03:48.860' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[DieuChuyen] OFF
SET IDENTITY_INSERT [dbo].[DieuChuyenChiTiet] ON 

INSERT [dbo].[DieuChuyenChiTiet] ([DieuChuyenChiTietId], [DieuChuyenId], [TaiSanId], [PhongBanSuDung], [NhanVienSuDung], [PhongBanChuyenDen], [NhanVienTiepNhan], [SoLuong], [LyDo]) VALUES (34, 6, 1061, 5, 3, 7, 5, CAST(5.0000 AS Numeric(18, 4)), N'')
INSERT [dbo].[DieuChuyenChiTiet] ([DieuChuyenChiTietId], [DieuChuyenId], [TaiSanId], [PhongBanSuDung], [NhanVienSuDung], [PhongBanChuyenDen], [NhanVienTiepNhan], [SoLuong], [LyDo]) VALUES (35, 6, 27, 5, 3, 7, 4, CAST(7.0000 AS Numeric(18, 4)), N'')
SET IDENTITY_INSERT [dbo].[DieuChuyenChiTiet] OFF
SET IDENTITY_INSERT [dbo].[DuAn] ON 

INSERT [dbo].[DuAn] ([DuAnId], [MaDuAn], [TenDuAn], [GhiChu], [NgungTheoDoi], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'DA01', N'Dự án 1', N'222', 0, 1, 53, CAST(N'2017-08-21 10:47:06.073' AS DateTime), 11)
INSERT [dbo].[DuAn] ([DuAnId], [MaDuAn], [TenDuAn], [GhiChu], [NgungTheoDoi], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, N'DA02', N'Dự án 2', NULL, 0, 1, 3, CAST(N'2017-09-15 13:44:58.607' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[DuAn] OFF
INSERT [dbo].[Duyet] ([DuyetId], [TrangThai]) VALUES (0, N'Chờ duyệt')
INSERT [dbo].[Duyet] ([DuyetId], [TrangThai]) VALUES (1, N'Đồng ý')
INSERT [dbo].[Duyet] ([DuyetId], [TrangThai]) VALUES (2, N'Từ chối')
SET IDENTITY_INSERT [dbo].[GhiGiam] ON 

INSERT [dbo].[GhiGiam] ([GhiGiamId], [SoChungTu], [NgayChungTu], [NgayGhiGiam], [PhongBanId], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (26, N'CT001', CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 5, N'aaa23', 0, NULL, 1, 3, CAST(N'2017-09-11 16:03:51.757' AS DateTime), 76)
SET IDENTITY_INSERT [dbo].[GhiGiam] OFF
SET IDENTITY_INSERT [dbo].[GhiGiamChiTiet] ON 

INSERT [dbo].[GhiGiamChiTiet] ([GhiGiamChiTietId], [GhiGiamId], [TaiSanId], [PhongBanId], [NhanVienId], [XuLyId], [SoLuong]) VALUES (59, 26, 27, 5, 3, 3, CAST(10.0000 AS Numeric(18, 4)))
SET IDENTITY_INSERT [dbo].[GhiGiamChiTiet] OFF
SET IDENTITY_INSERT [dbo].[GhiTang] ON 

INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (9, N'GT00001', CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), N'abcd', 0, 0, 1, 7, CAST(N'2017-09-11 10:01:24.923' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (10, N'GT0002', CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), NULL, 0, 0, 1, 7, CAST(N'2017-09-11 10:26:28.380' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (12, N'kinh001', CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(N'2017-09-14 00:00:00.000' AS DateTime), N'Mua kính hien vi', 0, 0, 1, 7, CAST(N'2017-09-14 16:33:08.073' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (13, N'GT004', CAST(N'2017-09-16 00:00:00.000' AS DateTime), CAST(N'2017-09-16 00:00:00.000' AS DateTime), N'ghi tăng', 0, 0, 1, 3, CAST(N'2017-09-16 11:27:28.417' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (14, N'22222', CAST(N'2017-09-18 00:00:00.000' AS DateTime), CAST(N'2017-09-18 00:00:00.000' AS DateTime), N'2', 0, 0, 1, 3, CAST(N'2017-09-18 16:03:07.553' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1011, N'st', CAST(N'2017-09-22 00:00:00.000' AS DateTime), CAST(N'2017-09-22 00:00:00.000' AS DateTime), N'ss', 0, 0, 1, 3, CAST(N'2017-09-22 10:53:21.543' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[GhiTang] OFF
SET IDENTITY_INSERT [dbo].[GhiTangChiTiet] ON 

INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (186, 12, 1068, CAST(N'2017-09-14 00:00:00.000' AS DateTime), 5, 3, CAST(11.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (187, 13, 1065, CAST(N'2017-09-16 00:00:00.000' AS DateTime), 7, 4, CAST(10.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (188, 14, 1064, CAST(N'2017-09-18 00:00:00.000' AS DateTime), 5, 6, CAST(2.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (1180, 1011, 1061, CAST(N'2017-09-22 00:00:00.000' AS DateTime), 5, 3, CAST(2.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (1181, 1011, 1061, CAST(N'2017-09-22 00:00:00.000' AS DateTime), 5, 3, CAST(4.0000 AS Numeric(18, 4)))
SET IDENTITY_INSERT [dbo].[GhiTangChiTiet] OFF
SET IDENTITY_INSERT [dbo].[HangSanXuat] ON 

INSERT [dbo].[HangSanXuat] ([HangSanXuatId], [MaHangSanXuat], [TenHangSanXuat], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'Hang01', N'SamSum', NULL, 53, CAST(N'2017-08-15 17:03:46.083' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[HangSanXuat] OFF
SET IDENTITY_INSERT [dbo].[HienTrangSuDung] ON 

INSERT [dbo].[HienTrangSuDung] ([HienTrangSuDungId], [NoiDung]) VALUES (3, N'HTSD01    ')
INSERT [dbo].[HienTrangSuDung] ([HienTrangSuDungId], [NoiDung]) VALUES (4, N'HTSD02    ')
SET IDENTITY_INSERT [dbo].[HienTrangSuDung] OFF
INSERT [dbo].[HinhThuc] ([HinhThucId], [TenHinhThuc]) VALUES (1, N'Đấu thầu')
INSERT [dbo].[HinhThuc] ([HinhThucId], [TenHinhThuc]) VALUES (2, N'Chỉ định thầu')
INSERT [dbo].[HinhThuc] ([HinhThucId], [TenHinhThuc]) VALUES (3, N'Chào hàng cạnh tranh')
INSERT [dbo].[HinhThuc] ([HinhThucId], [TenHinhThuc]) VALUES (4, N'Mua sắm trực tiếp')
SET IDENTITY_INSERT [dbo].[KeHoachMuaSam] ON 

INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1031, CAST(2017 AS Numeric(4, 0)), NULL, 1, CAST(N'2017-09-14 00:00:00.000' AS DateTime), NULL, 3, 1, 3, CAST(N'2017-09-01 09:38:57.873' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1033, CAST(2017 AS Numeric(4, 0)), NULL, 2, CAST(N'2017-09-21 00:00:00.000' AS DateTime), N'aâ', 3, 1, 3, CAST(N'2017-09-01 09:40:46.053' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1034, CAST(2017 AS Numeric(4, 0)), NULL, 1, CAST(N'2017-09-14 00:00:00.000' AS DateTime), N'ssss', 3, 1, 3, CAST(N'2017-09-01 09:40:47.477' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1035, CAST(2017 AS Numeric(4, 0)), NULL, 0, CAST(N'2017-09-14 00:00:00.000' AS DateTime), N'222', 3, 1, 3, CAST(N'2017-09-01 09:40:49.650' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1036, CAST(2017 AS Numeric(4, 0)), NULL, 2, NULL, NULL, NULL, 1, 3, CAST(N'2017-09-01 09:40:57.010' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1037, CAST(2017 AS Numeric(4, 0)), NULL, 1, NULL, NULL, NULL, 1, 3, CAST(N'2017-09-01 09:44:48.670' AS DateTime), 7)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1039, CAST(2016 AS Numeric(4, 0)), N'qeqweqwe2', 1, CAST(N'2017-09-14 00:00:00.000' AS DateTime), N'Nơi Này Có Anh | Official Music Video | Sơn Tùng M-TP
Bất kì Video nào có liên quan tới "Nơi Này Có Anh" chưa có sự cho phép đều được coi là vi phạm bản quyền.
Các đơn vị báo chí muốn đăng tải thông tin liên quan vui lòng liên hệ M-TP Entertainment để được xác nhận đăng Video
Theo dõi kênh YouTube Sơn Tùng M-TP để được cập nhật thông tin', 3, 1, 3, CAST(N'2017-09-01 14:09:04.450' AS DateTime), 5)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1040, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, NULL, NULL, 1, 3, CAST(N'2017-09-01 14:10:57.370' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1041, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-07 11:11:00.160' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1042, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, NULL, NULL, 1, 6, CAST(N'2017-09-07 11:11:02.683' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1043, CAST(2017 AS Numeric(4, 0)), N'222', 2, NULL, NULL, NULL, 1, 3, CAST(N'2017-09-18 09:04:53.273' AS DateTime), 3)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NgayDuyet], [NoiDungDuyet], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1044, CAST(2017 AS Numeric(4, 0)), N'ádá2222', 1, NULL, NULL, NULL, 1, 3, CAST(N'2017-09-18 15:56:55.347' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[KeHoachMuaSam] OFF
SET IDENTITY_INSERT [dbo].[KeHoachMuaSamChiTiet] ON 

INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1027, 1031, N'2', 1, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1029, 1033, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1030, 1034, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1032, 1036, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 2)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1035, 1039, N'tan2', 1, 1, N'cái', N'', CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(20000.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1036, 1039, N'nguyen23', 1, 1, N'thùng', N'', CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(3.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 2)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1038, 1037, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 2)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1039, 1037, N'2', 1, 1, N'2', N'2', CAST(N'2017-05-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 2, CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1043, 1043, N'aaâ', 2, 1, N'2', N'eee', CAST(N'2017-09-18 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 2, CAST(2.0000 AS Numeric(18, 4)), N'2', 2)
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu], [DuyetId]) VALUES (1045, 1044, N'aâ', 1, 1, N'cái', N'a', CAST(N'2017-09-18 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2', 1)
SET IDENTITY_INSERT [dbo].[KeHoachMuaSamChiTiet] OFF
SET IDENTITY_INSERT [dbo].[KhachHang] ON 

INSERT [dbo].[KhachHang] ([KhachHangId], [MaKhachHang], [TenKhachHang], [DienThoai], [DiDong], [MaSoThue], [TKNganHang], [TenNganHang], [DiaChi], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'KH001', N'Công ty TNHH TM&DV Song Ân', N'1234562', N'123456', N'123456', N'123456', N'Ngân hàng ACB', N'38/40 Quang Trung, phường 10, quận Gò Vấp, Tp.HCM', NULL, 1, 53, CAST(N'2017-08-14 09:58:02.023' AS DateTime), 5)
SET IDENTITY_INSERT [dbo].[KhachHang] OFF
SET IDENTITY_INSERT [dbo].[KhaiThac] ON 

INSERT [dbo].[KhaiThac] ([KhaiThacId], [TaiSanId], [PhongBanId], [NhanVienId], [KhachHangNCCId], [SoChungTu], [SoLuongKhaiThac], [DonGiaKhaiThac], [ThoiGianBatDau], [ThoiGianKetThuc], [TienThu], [NopNganSach], [DonVi], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, 27, 5, 3, 1, N'KT000001            ', CAST(1 AS Numeric(18, 0)), CAST(6000000.0000 AS Numeric(18, 4)), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(6000000.0000 AS Numeric(18, 4)), CAST(100000.0000 AS Numeric(18, 4)), CAST(5000000.0000 AS Numeric(18, 4)), N'2017-09-09', 1, 7, CAST(N'2017-09-09 00:00:00.000' AS DateTime), 3)
INSERT [dbo].[KhaiThac] ([KhaiThacId], [TaiSanId], [PhongBanId], [NhanVienId], [KhachHangNCCId], [SoChungTu], [SoLuongKhaiThac], [DonGiaKhaiThac], [ThoiGianBatDau], [ThoiGianKetThuc], [TienThu], [NopNganSach], [DonVi], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, 1069, 5, 7, 1, N'K000022             ', CAST(1 AS Numeric(18, 0)), CAST(10000.0000 AS Numeric(18, 4)), CAST(N'2017-09-26 00:00:00.000' AS DateTime), CAST(N'2017-09-26 00:00:00.000' AS DateTime), CAST(10000.0000 AS Numeric(18, 4)), CAST(5000.0000 AS Numeric(18, 4)), CAST(5000.0000 AS Numeric(18, 4)), NULL, 1, 7, CAST(N'2017-09-26 10:34:49.670' AS DateTime), 3)
SET IDENTITY_INSERT [dbo].[KhaiThac] OFF
SET IDENTITY_INSERT [dbo].[KhoTaiSan] ON 

INSERT [dbo].[KhoTaiSan] ([KhoTaiSanId], [CoSoId], [MaKhoTaiSan], [TenKhoTaiSan], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, 1, N'KHO01', N'Kho chính', NULL, 53, CAST(N'2017-08-17 10:49:51.017' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[KhoTaiSan] OFF
SET IDENTITY_INSERT [dbo].[LoaiCoSo] ON 

INSERT [dbo].[LoaiCoSo] ([LoaiCoSoId], [MaLoaiCoSo], [TenLoaiCoSo], [QuanHe], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'L001      ', N'Sở tài chính', N'L002,L003,L004,L005                                                                                 ', 2, NULL, 1)
INSERT [dbo].[LoaiCoSo] ([LoaiCoSoId], [MaLoaiCoSo], [TenLoaiCoSo], [QuanHe], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'L002      ', N'Sở Y Tế', N'L003,L004,L005                                                                                      ', 2, NULL, 1)
INSERT [dbo].[LoaiCoSo] ([LoaiCoSoId], [MaLoaiCoSo], [TenLoaiCoSo], [QuanHe], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, N'L003      ', N'Bệnh viện tỉnh', N'L004,L005                                                                                           ', 2, NULL, 1)
INSERT [dbo].[LoaiCoSo] ([LoaiCoSoId], [MaLoaiCoSo], [TenLoaiCoSo], [QuanHe], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (4, N'L004      ', N'Bệnh viện huyện', N'L005                                                                                                ', 2, NULL, 1)
INSERT [dbo].[LoaiCoSo] ([LoaiCoSoId], [MaLoaiCoSo], [TenLoaiCoSo], [QuanHe], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (5, N'L005      ', N'Bệnh viện xã', NULL, 2, NULL, 1)
SET IDENTITY_INSERT [dbo].[LoaiCoSo] OFF
SET IDENTITY_INSERT [dbo].[LoaiTaiSan] ON 

INSERT [dbo].[LoaiTaiSan] ([LoaiId], [NhomId], [MaLoai], [TenLoai], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, 1, N'I', N'Máy móc TB  chuyên dùng', NULL, 0, CAST(N'2017-08-10 15:03:47.957' AS DateTime), 2)
INSERT [dbo].[LoaiTaiSan] ([LoaiId], [NhomId], [MaLoai], [TenLoai], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, 1, N'II', N'Máy móc đo lường thí nghiệm', NULL, 0, CAST(N'2017-08-10 16:57:37.807' AS DateTime), 3)
INSERT [dbo].[LoaiTaiSan] ([LoaiId], [NhomId], [MaLoai], [TenLoai], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, 1, N'III', N'Tài sản tăng 2012', NULL, 0, CAST(N'2017-08-10 16:59:01.850' AS DateTime), 6)
SET IDENTITY_INSERT [dbo].[LoaiTaiSan] OFF
SET IDENTITY_INSERT [dbo].[NguonNganSach] ON 

INSERT [dbo].[NguonNganSach] ([NguonNganSachId], [MaNguonNganSach], [TenNguonNganSach], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'NS01                ', N'Nguồn bảo hiểm y tế', NULL, 53, CAST(N'2017-08-15 08:22:58.557' AS DateTime), 3)
INSERT [dbo].[NguonNganSach] ([NguonNganSachId], [MaNguonNganSach], [TenNguonNganSach], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'NS02', N'Ngân sách Tỉnh', NULL, 6, CAST(N'2017-09-01 14:19:39.790' AS DateTime), 1)
INSERT [dbo].[NguonNganSach] ([NguonNganSachId], [MaNguonNganSach], [TenNguonNganSach], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, N'NS03', N'Ngân sách Huyện', NULL, 6, CAST(N'2017-09-01 14:19:55.360' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[NguonNganSach] OFF
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (27, 1, CAST(3000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1061, 1, CAST(1000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1065, 1, CAST(9000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1065, 2, CAST(4000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1065, 3, CAST(7000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1069, 1, CAST(9000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1069, 2, CAST(5000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1069, 3, CAST(2000000.0000 AS Numeric(18, 4)))
SET IDENTITY_INSERT [dbo].[NhaCungCap] ON 

INSERT [dbo].[NhaCungCap] ([NhaCungCapId], [MaNhaCungCap], [TenNhaCungCap], [Nhom], [DienThoai], [DiDong], [MaSoThue], [TKNganHang], [TenNganHang], [DaiDien], [DiaChi], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'NCC01', N'Nguyễn Kim', N'TN', N'2', N'2', N'2', N'2', N'2', N'Nguyễn Ngọc Tân', N'2', N'2', 1, 53, CAST(N'2017-08-17 09:59:55.260' AS DateTime), 3)
SET IDENTITY_INSERT [dbo].[NhaCungCap] OFF
SET IDENTITY_INSERT [dbo].[NhanVien] ON 

INSERT [dbo].[NhanVien] ([NhanVienId], [PhongBanId], [MaNhanVien], [TenNhanVien], [ChucDanh], [DienThoai], [Email], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, 5, N'NV001', N'Nguyễn Ngọc Tân', NULL, N'0985401027', NULL, NULL, N'5', 53, CAST(N'2017-08-10 10:50:37.877' AS DateTime), 6)
INSERT [dbo].[NhanVien] ([NhanVienId], [PhongBanId], [MaNhanVien], [TenNhanVien], [ChucDanh], [DienThoai], [Email], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (4, 7, N'NV002', N'Nguyễn Văn B', NULL, NULL, NULL, NULL, N'abc2', 53, CAST(N'2017-08-10 11:16:45.523' AS DateTime), 6)
INSERT [dbo].[NhanVien] ([NhanVienId], [PhongBanId], [MaNhanVien], [TenNhanVien], [ChucDanh], [DienThoai], [Email], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (5, 7, N'NV003', N'Nguyễn Huy Thành', N'Nhân viên', N'0985401023', N'huythanh@ehis.vn', N'Biên hòa', NULL, 53, CAST(N'2017-08-14 08:51:23.580' AS DateTime), 1)
INSERT [dbo].[NhanVien] ([NhanVienId], [PhongBanId], [MaNhanVien], [TenNhanVien], [ChucDanh], [DienThoai], [Email], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (6, 5, N'NV004', N'Nguyễn Thanh Bình', NULL, NULL, NULL, NULL, NULL, 3, CAST(N'2017-08-28 09:50:56.180' AS DateTime), 1)
INSERT [dbo].[NhanVien] ([NhanVienId], [PhongBanId], [MaNhanVien], [TenNhanVien], [ChucDanh], [DienThoai], [Email], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (7, 5, N'NV005', N'Nguyễn Tiến Đạt', NULL, NULL, NULL, NULL, NULL, 3, CAST(N'2017-08-28 09:52:02.620' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[NhanVien] OFF
SET IDENTITY_INSERT [dbo].[NhomTaiSan] ON 

INSERT [dbo].[NhomTaiSan] ([NhomId], [MaNhom], [TenNhom], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'A', N'Tài sản cố định', NULL, 53, CAST(N'2017-08-10 14:26:13.847' AS DateTime), 4)
INSERT [dbo].[NhomTaiSan] ([NhomId], [MaNhom], [TenNhom], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'B', N'Tài sản lâu bền', NULL, 53, CAST(N'2017-08-10 14:30:06.250' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[NhomTaiSan] OFF
SET IDENTITY_INSERT [dbo].[NuocSanXuat] ON 

INSERT [dbo].[NuocSanXuat] ([NuocSanXuatId], [MaNuocSanXuat], [TenNuocSanXuat], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'NUOC01', N'Việt Nam', N'Việt nam', 53, CAST(N'2017-08-15 17:04:07.530' AS DateTime), 2)
INSERT [dbo].[NuocSanXuat] ([NuocSanXuatId], [MaNuocSanXuat], [TenNuocSanXuat], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'NUOC02', N'Nhật', N'Nhật', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[NuocSanXuat] OFF
SET IDENTITY_INSERT [dbo].[PhanLoai] ON 

INSERT [dbo].[PhanLoai] ([PhanLoaiId], [TenPhanLoai]) VALUES (1, N'Đề nghị')
INSERT [dbo].[PhanLoai] ([PhanLoaiId], [TenPhanLoai]) VALUES (2, N'Quyết định')
INSERT [dbo].[PhanLoai] ([PhanLoaiId], [TenPhanLoai]) VALUES (3, N'Khác')
SET IDENTITY_INSERT [dbo].[PhanLoai] OFF
SET IDENTITY_INSERT [dbo].[PhongBan] ON 

INSERT [dbo].[PhongBan] ([PhongBanId], [CoSoId], [MaPhongBan], [TenPhongBan], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (5, 1, N'P001', N'Phòng số 1', NULL, 53, CAST(N'2017-08-09 09:39:36.480' AS DateTime), 15)
INSERT [dbo].[PhongBan] ([PhongBanId], [CoSoId], [MaPhongBan], [TenPhongBan], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (6, 1, N'P002', N'Phòng số 2', NULL, 53, CAST(N'2017-08-09 09:39:36.480' AS DateTime), 21)
INSERT [dbo].[PhongBan] ([PhongBanId], [CoSoId], [MaPhongBan], [TenPhongBan], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (7, 1, N'P003', N'Phòng số 3', NULL, 53, CAST(N'2017-08-09 09:39:36.480' AS DateTime), 15)
INSERT [dbo].[PhongBan] ([PhongBanId], [CoSoId], [MaPhongBan], [TenPhongBan], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (8, 1, N'P004', N'Phòng số 4', NULL, 53, CAST(N'2017-08-09 09:39:36.480' AS DateTime), 12)
SET IDENTITY_INSERT [dbo].[PhongBan] OFF
INSERT [dbo].[PhuongThuc] ([PhuongThucId], [TenPhuongThuc]) VALUES (1, N'Mua sắm')
INSERT [dbo].[PhuongThuc] ([PhuongThucId], [TenPhuongThuc]) VALUES (2, N'Nhận bằng hiện vật')
INSERT [dbo].[PhuongThuc] ([PhuongThucId], [TenPhuongThuc]) VALUES (3, N'Xây mới')
SET IDENTITY_INSERT [dbo].[SuaChua] ON 

INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (137, 8, N'Toàn bộ bơm', CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(900000.0000 AS Numeric(18, 4)), N'', N'', N'')
INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (1117, 1, N'Chân chế', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(600000.0000 AS Numeric(18, 4)), N'thay', N'hcm', N'dang')
INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (1118, 1, N'Mặt ghế', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(5000000.0000 AS Numeric(18, 4)), N'bào', N'hcm', N'xet')
INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (1119, 1, N'Chân chế', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(300000.0000 AS Numeric(18, 4)), N'thay', N'hcm', N'dang')
INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (1120, 1, N'Mặt ghế', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(5000000.0000 AS Numeric(18, 4)), N'bào', N'hcm', N'xet')
INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (1121, 1, N'Chân chế', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(300000.0000 AS Numeric(18, 4)), N'thay', N'hcm', N'dang')
INSERT [dbo].[SuaChua] ([SuaChuaId], [BaoDuongId], [TenBoPhan], [NgayBatDau], [NgayKetThuc], [ChiPhi], [NoiDung], [NoiSua], [KetQua]) VALUES (1122, 1, N'Mặt ghế', CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(N'2017-09-09 00:00:00.000' AS DateTime), CAST(5000000.0000 AS Numeric(18, 4)), N'bào', N'hcm', N'xet')
SET IDENTITY_INSERT [dbo].[SuaChua] OFF
SET IDENTITY_INSERT [dbo].[SuDung] ON 

INSERT [dbo].[SuDung] ([SuDungId], [KyLap], [Nam], [NoiDung], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, 1, CAST(2017 AS Numeric(4, 0)), N'ghế', 1, 7, CAST(N'2017-09-09 00:00:00.000' AS DateTime), 7)
INSERT [dbo].[SuDung] ([SuDungId], [KyLap], [Nam], [NoiDung], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (6, 4, CAST(2017 AS Numeric(4, 0)), N'Khai báo kính', 1, 7, CAST(N'2017-09-27 15:35:06.307' AS DateTime), 3)
INSERT [dbo].[SuDung] ([SuDungId], [KyLap], [Nam], [NoiDung], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (7, 16, CAST(2012 AS Numeric(4, 0)), N'khai báo 2012', 1, 7, CAST(N'2017-09-28 14:28:41.657' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[SuDung] OFF
SET IDENTITY_INSERT [dbo].[SuDungChiTiet] ON 

INSERT [dbo].[SuDungChiTiet] ([SuDungChiTietId], [SuDungId], [TaiSanId], [PhongBanId], [NhanVienId], [SoSanPhamPhucVu], [DonViTinhSanPham], [SoNguyenLieuSuDung], [DonViTinhNguyenLieu], [GhiChu]) VALUES (14, 6, 1068, 5, 3, CAST(0.0000 AS Numeric(18, 4)), N'-', CAST(3.0000 AS Numeric(18, 4)), N'năm', N'xài 3 năm')
INSERT [dbo].[SuDungChiTiet] ([SuDungChiTietId], [SuDungId], [TaiSanId], [PhongBanId], [NhanVienId], [SoSanPhamPhucVu], [DonViTinhSanPham], [SoNguyenLieuSuDung], [DonViTinhNguyenLieu], [GhiChu]) VALUES (20, 1, 27, 5, 3, CAST(1.0000 AS Numeric(18, 4)), N'cái', CAST(100.0000 AS Numeric(18, 4)), N'Lít xăng', N'mua sắm')
INSERT [dbo].[SuDungChiTiet] ([SuDungChiTietId], [SuDungId], [TaiSanId], [PhongBanId], [NhanVienId], [SoSanPhamPhucVu], [DonViTinhSanPham], [SoNguyenLieuSuDung], [DonViTinhNguyenLieu], [GhiChu]) VALUES (21, 1, 1064, 5, 6, CAST(1.0000 AS Numeric(18, 4)), N'km', CAST(6.0000 AS Numeric(18, 4)), N'lít xăng', N'tiếp nhận')
INSERT [dbo].[SuDungChiTiet] ([SuDungChiTietId], [SuDungId], [TaiSanId], [PhongBanId], [NhanVienId], [SoSanPhamPhucVu], [DonViTinhSanPham], [SoNguyenLieuSuDung], [DonViTinhNguyenLieu], [GhiChu]) VALUES (22, 1, 1061, 5, 3, CAST(55.0000 AS Numeric(18, 4)), N'1', CAST(1.0000 AS Numeric(18, 4)), N'ww', N'ww')
INSERT [dbo].[SuDungChiTiet] ([SuDungChiTietId], [SuDungId], [TaiSanId], [PhongBanId], [NhanVienId], [SoSanPhamPhucVu], [DonViTinhSanPham], [SoNguyenLieuSuDung], [DonViTinhNguyenLieu], [GhiChu]) VALUES (25, 7, 1069, 5, 7, CAST(1.0000 AS Numeric(18, 4)), N'asd', CAST(12.0000 AS Numeric(18, 4)), N'qae', N'qwe')
INSERT [dbo].[SuDungChiTiet] ([SuDungChiTietId], [SuDungId], [TaiSanId], [PhongBanId], [NhanVienId], [SoSanPhamPhucVu], [DonViTinhSanPham], [SoNguyenLieuSuDung], [DonViTinhNguyenLieu], [GhiChu]) VALUES (26, 7, 27, 5, 3, CAST(1.0000 AS Numeric(18, 4)), N'1', CAST(1.0000 AS Numeric(18, 4)), N'1', N'1')
SET IDENTITY_INSERT [dbo].[SuDungChiTiet] OFF
SET IDENTITY_INSERT [dbo].[TaiSan] ON 

INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (27, N'Ghe001', N'Ghế răng Diplomat', N'Cái', 1, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1                                                 ', N'1', 1, CAST(N'2017-08-22 00:00:00.000' AS DateTime), CAST(N'2017-08-22 00:00:00.000' AS DateTime), 5, CAST(2.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), NULL, N'1', NULL, NULL, CAST(1.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), 1, 1, NULL, NULL, NULL)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1061, N'May001', N'Máy hút dịch chạy điện', N'Cái', 1, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1                                                 ', N'1', 1, CAST(N'2017-08-22 00:00:00.000' AS DateTime), CAST(N'2017-08-22 00:00:00.000' AS DateTime), 1, CAST(100.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), NULL, N'1', NULL, NULL, CAST(1.00 AS Numeric(5, 2)), NULL, 2, 1, NULL, NULL, NULL)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1064, N'May002', N'Máy trợ thở OXY', N'Cái', 1, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1                                                 ', N'1', 1, CAST(N'2017-08-22 00:00:00.000' AS DateTime), CAST(N'2017-08-22 00:00:00.000' AS DateTime), 1, CAST(100.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), NULL, N'1', NULL, NULL, CAST(1.00 AS Numeric(5, 2)), NULL, 3, 1, NULL, NULL, NULL)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1065, N'Bon001', N'Bơm tiêm điện Terumo', N'Cái', 1, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1                                                 ', N'1', 1, CAST(N'2014-08-22 00:00:00.000' AS DateTime), CAST(N'2014-09-11 00:00:00.000' AS DateTime), 4, CAST(5.00 AS Numeric(5, 2)), CAST(3000000.0000 AS Numeric(18, 4)), CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'Tháng', NULL, CAST(10 AS Numeric(5, 0)), CAST(1.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), 4, 1, NULL, NULL, NULL)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1068, N'Kinh001', N'Kính hiển vi mới', N'Cái', 1, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1', N'1', 1, CAST(N'2017-09-21 00:00:00.000' AS DateTime), CAST(N'2017-09-21 00:00:00.000' AS DateTime), 5, CAST(20.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), NULL, N'1', NULL, NULL, CAST(1.00 AS Numeric(5, 2)), NULL, 1, 1, NULL, NULL, NULL)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1069, N'XN001', N'Máy xét nghiệm sinh hoá', N'Cái', 1, 1, CAST(2012 AS Numeric(4, 0)), 1, 2, N'QDTC1', N'SamSum', 1, CAST(N'2017-09-15 00:00:00.000' AS DateTime), CAST(N'2017-09-15 00:00:00.000' AS DateTime), 5, CAST(20.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), CAST(N'2017-08-15 00:00:00.000' AS DateTime), N'Tháng', NULL, CAST(10 AS Numeric(5, 0)), CAST(10.00 AS Numeric(5, 2)), CAST(1400000.0000 AS Numeric(18, 4)), 0, 1, 3, CAST(N'2017-09-15 13:51:35.493' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[TaiSan] OFF
SET IDENTITY_INSERT [dbo].[ThayDoiThongTin] ON 

INSERT [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId], [TaiSanId], [Ngay], [TenTaiSanCu], [LyDo], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (80, 1061, CAST(N'2017-09-14 00:00:00.000' AS DateTime), NULL, N'', NULL, 3, 1, 3, CAST(N'2017-09-23 09:20:28.427' AS DateTime), 8)
INSERT [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId], [TaiSanId], [Ngay], [TenTaiSanCu], [LyDo], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (81, 27, CAST(N'2017-09-28 00:00:00.000' AS DateTime), N'Ghế răng Diplomat 3', N'123', NULL, 6, 1, 6, CAST(N'2017-09-28 11:40:03.170' AS DateTime), 1)
INSERT [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId], [TaiSanId], [Ngay], [TenTaiSanCu], [LyDo], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (82, 1064, CAST(N'2017-09-28 00:00:00.000' AS DateTime), NULL, N'oto', NULL, 6, 1, 6, CAST(N'2017-09-28 13:48:24.943' AS DateTime), 2)
INSERT [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId], [TaiSanId], [Ngay], [TenTaiSanCu], [LyDo], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (83, 1065, CAST(N'2017-09-28 00:00:00.000' AS DateTime), N'Bơm tiêm điện Terumo 1', N'trên 500', NULL, 6, 1, 6, CAST(N'2017-09-28 15:39:01.293' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[ThayDoiThongTin] OFF
INSERT [dbo].[ThayDoiThongTin_Dat] ([ThayDoiThongTinId], [DiaChiCu], [GiayToCu], [DienTichCu], [LamTruSoCu], [CoSoHDSuNghiepCu], [NhaOCu], [ChoThueCu], [BoTrongCu], [BiLanChiemCu], [SuDungKhacCu]) VALUES (81, N'22', NULL, CAST(165.0000 AS Numeric(18, 4)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[ThayDoiThongTin_Nha] ([ThayDoiThongTinId], [DiaChiCu], [GiayToCu], [CapHangCu], [SoTangCu], [NamSuDungCu], [DienTichCu], [TongDienTichSanCu], [LamTruSoCu], [CoSoHDSuNghiepCu], [NhaOCu], [ChoThueCu], [BoTrongCu], [BiLanChiemCu], [SuDungKhacCu]) VALUES (80, N'2121', NULL, NULL, NULL, NULL, NULL, CAST(22.0000 AS Numeric(18, 4)), NULL, NULL, NULL, NULL, NULL, CAST(22.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThayDoiThongTin_Oto] ([ThayDoiThongTinId], [NhanHieuCu], [BienKiemSoatCu], [CongSuatXeCu], [TrongTaiCu], [ChucDanhCu], [NguonGocXeCu], [LoaiXeCu], [HienTrangSuDungCu]) VALUES (82, NULL, N'123456', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[ThayDoiThongTin_Tren500] ([ThayDoiThongTinId], [KyHieuCu], [HienTrangSuDungCu]) VALUES (83, N'Skin LOL 1', NULL)
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (27, CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 5, 3, CAST(0.0000 AS Numeric(18, 4)), CAST(15.0000 AS Numeric(18, 4)), CAST(10.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (27, CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 7, 4, CAST(0.0000 AS Numeric(18, 4)), CAST(7.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1061, CAST(N'2017-09-22 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 5, 3, CAST(0.0000 AS Numeric(18, 4)), CAST(16.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1061, CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 7, 5, CAST(0.0000 AS Numeric(18, 4)), CAST(5.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1064, CAST(N'2017-09-18 00:00:00.000' AS DateTime), CAST(N'2017-09-18 00:00:00.000' AS DateTime), CAST(N'2017-09-18 00:00:00.000' AS DateTime), 5, 6, CAST(0.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1064, CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 7, 4, CAST(0.0000 AS Numeric(18, 4)), CAST(10.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1065, CAST(N'2017-09-16 00:00:00.000' AS DateTime), CAST(N'2017-09-16 00:00:00.000' AS DateTime), CAST(N'2017-09-16 00:00:00.000' AS DateTime), 7, 4, CAST(0.0000 AS Numeric(18, 4)), CAST(10.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1065, CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), CAST(N'2017-09-11 00:00:00.000' AS DateTime), 7, 5, CAST(0.0000 AS Numeric(18, 4)), CAST(20.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1068, CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(N'2017-09-14 00:00:00.000' AS DateTime), CAST(N'2017-09-14 00:00:00.000' AS DateTime), 5, 3, CAST(0.0000 AS Numeric(18, 4)), CAST(11.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayGhiTang], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (1069, CAST(N'2017-09-15 00:00:00.000' AS DateTime), CAST(N'2017-09-15 00:00:00.000' AS DateTime), CAST(N'2017-09-15 00:00:00.000' AS DateTime), 5, 7, CAST(1.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[ThongSo] ([ThongSoId], [Loai], [Ten]) VALUES (1, NULL, NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (27, N'12', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1061, N'1111', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1064, N'Mazda', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1065, N'abc', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1068, N'12', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1069, N'aaaaa', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinKeKhai_Dat] ([TaiSanId], [DiaChi], [GiayTo], [DienTich], [LamTruSo], [CoSoHDSuNghiep], [NhaO], [ChoThue], [BoTrong], [BiLanChiem], [SuDungKhac]) VALUES (27, N'GÒ VẤP', N'22', CAST(200.0000 AS Numeric(18, 4)), CAST(33.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)))
INSERT [dbo].[ThongTinKeKhai_Dat] ([TaiSanId], [DiaChi], [GiayTo], [DienTich], [LamTruSo], [CoSoHDSuNghiep], [NhaO], [ChoThue], [BoTrong], [BiLanChiem], [SuDungKhac]) VALUES (1068, N'123', N'21313
hi
hello', CAST(84.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)), CAST(12.0000 AS Numeric(18, 4)))
INSERT [dbo].[ThongTinKeKhai_Nha] ([TaiSanId], [DiaChi], [GiayTo], [CapHang], [SoTang], [NamSuDung], [DienTich], [TongDienTichSan], [LamTruSo], [CoSoHDSuNghiep], [NhaO], [ChoThue], [BoTrong], [BiLanChiem], [SuDungKhac]) VALUES (1061, N'quang trung', N'1212', 1, 1, CAST(1 AS Numeric(4, 0)), CAST(22.0000 AS Numeric(18, 4)), CAST(100.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)), CAST(44.0000 AS Numeric(18, 4)), CAST(22.0000 AS Numeric(18, 4)))
INSERT [dbo].[ThongTinKeKhai_Oto] ([TaiSanId], [NhanHieu], [BienKiemSoat], [CongSuatXe], [TrongTai], [ChucDanh], [NguonGocXe], [LoaiXe], [HienTrangSuDung]) VALUES (1064, N'Garen', N'654321', CAST(1000 AS Numeric(4, 0)), CAST(1000 AS Numeric(4, 0)), N'đấu sĩ', N'demacia', 3, 4)
INSERT [dbo].[ThongTinKeKhai_Tren500] ([TaiSanId], [KyHieu], [HienTrangSuDung]) VALUES (1065, N'Skin LOL', 4)
INSERT [dbo].[XuLy] ([XuLyId], [TenXuLy]) VALUES (1, N'Điều chuyển')
INSERT [dbo].[XuLy] ([XuLyId], [TenXuLy]) VALUES (2, N'Bán đấu giá')
INSERT [dbo].[XuLy] ([XuLyId], [TenXuLy]) VALUES (3, N'Chỉ định')
INSERT [dbo].[XuLy] ([XuLyId], [TenXuLy]) VALUES (4, N'Chuyển nhượng')
INSERT [dbo].[XuLy] ([XuLyId], [TenXuLy]) VALUES (5, N'Thanh lý -  Tiêu hủy')
INSERT [dbo].[XuLy] ([XuLyId], [TenXuLy]) VALUES (6, N'Hình thức khác')
ALTER TABLE [dbo].[BanKiemKe]  WITH CHECK ADD  CONSTRAINT [FK_BanKiemKe_BienBanKiemKe] FOREIGN KEY([BienBanKiemKeId])
REFERENCES [dbo].[BienBanKiemKe] ([BienBanKiemKeId])
GO
ALTER TABLE [dbo].[BanKiemKe] CHECK CONSTRAINT [FK_BanKiemKe_BienBanKiemKe]
GO
ALTER TABLE [dbo].[BaoDuong]  WITH CHECK ADD  CONSTRAINT [FK_BaoDuong_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[BaoDuong] CHECK CONSTRAINT [FK_BaoDuong_CoSo]
GO
ALTER TABLE [dbo].[BaoDuong]  WITH CHECK ADD  CONSTRAINT [FK_BaoDuong_NhanVien] FOREIGN KEY([NhanVienId])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[BaoDuong] CHECK CONSTRAINT [FK_BaoDuong_NhanVien]
GO
ALTER TABLE [dbo].[BaoDuong]  WITH CHECK ADD  CONSTRAINT [FK_BaoDuong_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[BaoDuong] CHECK CONSTRAINT [FK_BaoDuong_PhongBan]
GO
ALTER TABLE [dbo].[BaoDuong]  WITH CHECK ADD  CONSTRAINT [FK_BaoDuong_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[BaoDuong] CHECK CONSTRAINT [FK_BaoDuong_TaiSan]
GO
ALTER TABLE [dbo].[BienBanKiemKe]  WITH CHECK ADD  CONSTRAINT [FK_BienBanKiemKe_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[BienBanKiemKe] CHECK CONSTRAINT [FK_BienBanKiemKe_CoSo]
GO
ALTER TABLE [dbo].[BienBanKiemKe]  WITH CHECK ADD  CONSTRAINT [FK_BienBanKiemKe_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[BienBanKiemKe] CHECK CONSTRAINT [FK_BienBanKiemKe_PhongBan]
GO
ALTER TABLE [dbo].[BienBanKiemKeChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_BienBanKiemKeChiTiet_BienBanKiemKe] FOREIGN KEY([BienBanKiemKeId])
REFERENCES [dbo].[BienBanKiemKe] ([BienBanKiemKeId])
GO
ALTER TABLE [dbo].[BienBanKiemKeChiTiet] CHECK CONSTRAINT [FK_BienBanKiemKeChiTiet_BienBanKiemKe]
GO
ALTER TABLE [dbo].[BienBanKiemKeChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_BienBanKiemKeChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[BienBanKiemKeChiTiet] CHECK CONSTRAINT [FK_BienBanKiemKeChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[CoSo]  WITH CHECK ADD  CONSTRAINT [FK_CoSo_LoaiCoSo] FOREIGN KEY([LoaiCoSoId])
REFERENCES [dbo].[LoaiCoSo] ([LoaiCoSoId])
GO
ALTER TABLE [dbo].[CoSo] CHECK CONSTRAINT [FK_CoSo_LoaiCoSo]
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD  CONSTRAINT [FK_DanhGia_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[DanhGia] CHECK CONSTRAINT [FK_DanhGia_CoSo]
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD  CONSTRAINT [FK_DanhGia_NhanVien] FOREIGN KEY([NhanVienId])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[DanhGia] CHECK CONSTRAINT [FK_DanhGia_NhanVien]
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD  CONSTRAINT [FK_DanhGia_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[DanhGia] CHECK CONSTRAINT [FK_DanhGia_PhongBan]
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD  CONSTRAINT [FK_DanhGia_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[DanhGia] CHECK CONSTRAINT [FK_DanhGia_TaiSan]
GO
ALTER TABLE [dbo].[DanhGia_NguyenGia]  WITH CHECK ADD  CONSTRAINT [FK_DanhGia_NguyenGia_DanhGia] FOREIGN KEY([DanhGiaId])
REFERENCES [dbo].[DanhGia] ([DanhGiaId])
GO
ALTER TABLE [dbo].[DanhGia_NguyenGia] CHECK CONSTRAINT [FK_DanhGia_NguyenGia_DanhGia]
GO
ALTER TABLE [dbo].[DanhGia_NguyenGia]  WITH CHECK ADD  CONSTRAINT [FK_DanhGia_NguyenGia_NguonNganSach] FOREIGN KEY([NguonNganSachId])
REFERENCES [dbo].[NguonNganSach] ([NguonNganSachId])
GO
ALTER TABLE [dbo].[DanhGia_NguyenGia] CHECK CONSTRAINT [FK_DanhGia_NguyenGia_NguonNganSach]
GO
ALTER TABLE [dbo].[DeNghiTrangCap]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCap_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[DeNghiTrangCap] CHECK CONSTRAINT [FK_DeNghiTrangCap_CoSo]
GO
ALTER TABLE [dbo].[DeNghiTrangCap]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCap_PhanLoai] FOREIGN KEY([PhanLoaiId])
REFERENCES [dbo].[PhanLoai] ([PhanLoaiId])
GO
ALTER TABLE [dbo].[DeNghiTrangCap] CHECK CONSTRAINT [FK_DeNghiTrangCap_PhanLoai]
GO
ALTER TABLE [dbo].[DeNghiTrangCap]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCap_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[DeNghiTrangCap] CHECK CONSTRAINT [FK_DeNghiTrangCap_PhongBan]
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCapChiTiet_DeNghiTrangCap] FOREIGN KEY([DeNghiId])
REFERENCES [dbo].[DeNghiTrangCap] ([DeNghiId])
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet] CHECK CONSTRAINT [FK_DeNghiTrangCapChiTiet_DeNghiTrangCap]
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCapChiTiet_LoaiTaiSan] FOREIGN KEY([LoaiId])
REFERENCES [dbo].[LoaiTaiSan] ([LoaiId])
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet] CHECK CONSTRAINT [FK_DeNghiTrangCapChiTiet_LoaiTaiSan]
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCapChiTiet_PhuongThuc] FOREIGN KEY([PhuongThucId])
REFERENCES [dbo].[PhuongThuc] ([PhuongThucId])
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet] CHECK CONSTRAINT [FK_DeNghiTrangCapChiTiet_PhuongThuc]
GO
ALTER TABLE [dbo].[DieuChuyen]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyen_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[DieuChuyen] CHECK CONSTRAINT [FK_DieuChuyen_CoSo]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_DieuChuyen] FOREIGN KEY([DieuChuyenId])
REFERENCES [dbo].[DieuChuyen] ([DieuChuyenId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_DieuChuyen]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_NhanVien] FOREIGN KEY([NhanVienSuDung])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_NhanVien]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_NhanVien1] FOREIGN KEY([NhanVienTiepNhan])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_NhanVien1]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_PhongBan] FOREIGN KEY([PhongBanSuDung])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_PhongBan]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_PhongBan1] FOREIGN KEY([PhongBanChuyenDen])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_PhongBan1]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[GhiGiam]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiam_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[GhiGiam] CHECK CONSTRAINT [FK_GhiGiam_CoSo]
GO
ALTER TABLE [dbo].[GhiGiam]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiam_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[GhiGiam] CHECK CONSTRAINT [FK_GhiGiam_PhongBan]
GO
ALTER TABLE [dbo].[GhiGiamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiamChiTiet_GhiGiam] FOREIGN KEY([GhiGiamId])
REFERENCES [dbo].[GhiGiam] ([GhiGiamId])
GO
ALTER TABLE [dbo].[GhiGiamChiTiet] CHECK CONSTRAINT [FK_GhiGiamChiTiet_GhiGiam]
GO
ALTER TABLE [dbo].[GhiGiamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiamChiTiet_NhanVien] FOREIGN KEY([NhanVienId])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[GhiGiamChiTiet] CHECK CONSTRAINT [FK_GhiGiamChiTiet_NhanVien]
GO
ALTER TABLE [dbo].[GhiGiamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiamChiTiet_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[GhiGiamChiTiet] CHECK CONSTRAINT [FK_GhiGiamChiTiet_PhongBan]
GO
ALTER TABLE [dbo].[GhiGiamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiamChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[GhiGiamChiTiet] CHECK CONSTRAINT [FK_GhiGiamChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[GhiGiamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiGiamChiTiet_XuLy] FOREIGN KEY([XuLyId])
REFERENCES [dbo].[XuLy] ([XuLyId])
GO
ALTER TABLE [dbo].[GhiGiamChiTiet] CHECK CONSTRAINT [FK_GhiGiamChiTiet_XuLy]
GO
ALTER TABLE [dbo].[GhiTang]  WITH CHECK ADD  CONSTRAINT [FK_GhiTang_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[GhiTang] CHECK CONSTRAINT [FK_GhiTang_CoSo]
GO
ALTER TABLE [dbo].[GhiTangChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiTangChiTiet_GhiTang] FOREIGN KEY([GhiTangId])
REFERENCES [dbo].[GhiTang] ([GhiTangId])
GO
ALTER TABLE [dbo].[GhiTangChiTiet] CHECK CONSTRAINT [FK_GhiTangChiTiet_GhiTang]
GO
ALTER TABLE [dbo].[GhiTangChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiTangChiTiet_GhiTangChiTiet] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[GhiTangChiTiet] CHECK CONSTRAINT [FK_GhiTangChiTiet_GhiTangChiTiet]
GO
ALTER TABLE [dbo].[GhiTangChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiTangChiTiet_NhanVien] FOREIGN KEY([NhanVienId])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[GhiTangChiTiet] CHECK CONSTRAINT [FK_GhiTangChiTiet_NhanVien]
GO
ALTER TABLE [dbo].[GhiTangChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GhiTangChiTiet_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[GhiTangChiTiet] CHECK CONSTRAINT [FK_GhiTangChiTiet_PhongBan]
GO
ALTER TABLE [dbo].[HaoMon]  WITH CHECK ADD  CONSTRAINT [FK_HaoMon_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[HaoMon] CHECK CONSTRAINT [FK_HaoMon_CoSo]
GO
ALTER TABLE [dbo].[HaoMonChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_HaoMonChiTiet_HaoMon] FOREIGN KEY([HaoMonId])
REFERENCES [dbo].[HaoMon] ([HaoMonId])
GO
ALTER TABLE [dbo].[HaoMonChiTiet] CHECK CONSTRAINT [FK_HaoMonChiTiet_HaoMon]
GO
ALTER TABLE [dbo].[HaoMonChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_HaoMonChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[HaoMonChiTiet] CHECK CONSTRAINT [FK_HaoMonChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[KeHoachMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_KeHoachMuaSam_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KeHoachMuaSam] CHECK CONSTRAINT [FK_KeHoachMuaSam_CoSo]
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KeHoachMuaSamChiTiet_HinhThuc] FOREIGN KEY([HinhThucId])
REFERENCES [dbo].[HinhThuc] ([HinhThucId])
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet] CHECK CONSTRAINT [FK_KeHoachMuaSamChiTiet_HinhThuc]
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KeHoachMuaSamChiTiet_KeHoachMuaSam] FOREIGN KEY([MuaSamId])
REFERENCES [dbo].[KeHoachMuaSam] ([MuaSamId])
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet] CHECK CONSTRAINT [FK_KeHoachMuaSamChiTiet_KeHoachMuaSam]
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KeHoachMuaSamChiTiet_LoaiTaiSan] FOREIGN KEY([LoaiId])
REFERENCES [dbo].[LoaiTaiSan] ([LoaiId])
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet] CHECK CONSTRAINT [FK_KeHoachMuaSamChiTiet_LoaiTaiSan]
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KeHoachMuaSamChiTiet_PhuongThuc] FOREIGN KEY([PhuongThucId])
REFERENCES [dbo].[PhuongThuc] ([PhuongThucId])
GO
ALTER TABLE [dbo].[KeHoachMuaSamChiTiet] CHECK CONSTRAINT [FK_KeHoachMuaSamChiTiet_PhuongThuc]
GO
ALTER TABLE [dbo].[KhachHang]  WITH CHECK ADD  CONSTRAINT [FK_KhachHangNCC_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KhachHang] CHECK CONSTRAINT [FK_KhachHangNCC_CoSo]
GO
ALTER TABLE [dbo].[KhaiThac]  WITH CHECK ADD  CONSTRAINT [FK_KhaiThac_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KhaiThac] CHECK CONSTRAINT [FK_KhaiThac_CoSo]
GO
ALTER TABLE [dbo].[KhaiThac]  WITH CHECK ADD  CONSTRAINT [FK_KhaiThac_KhachHangNCC] FOREIGN KEY([KhachHangNCCId])
REFERENCES [dbo].[KhachHang] ([KhachHangId])
GO
ALTER TABLE [dbo].[KhaiThac] CHECK CONSTRAINT [FK_KhaiThac_KhachHangNCC]
GO
ALTER TABLE [dbo].[KhaiThac]  WITH CHECK ADD  CONSTRAINT [FK_KhaiThac_NhanVien] FOREIGN KEY([NhanVienId])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[KhaiThac] CHECK CONSTRAINT [FK_KhaiThac_NhanVien]
GO
ALTER TABLE [dbo].[KhaiThac]  WITH CHECK ADD  CONSTRAINT [FK_KhaiThac_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[KhaiThac] CHECK CONSTRAINT [FK_KhaiThac_PhongBan]
GO
ALTER TABLE [dbo].[KhaiThac]  WITH CHECK ADD  CONSTRAINT [FK_KhaiThac_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[KhaiThac] CHECK CONSTRAINT [FK_KhaiThac_TaiSan]
GO
ALTER TABLE [dbo].[KhoPhieuNhap]  WITH CHECK ADD  CONSTRAINT [FK_KhoNhapKho_KhoTaiSan] FOREIGN KEY([KhoTaiSanId])
REFERENCES [dbo].[KhoTaiSan] ([KhoTaiSanId])
GO
ALTER TABLE [dbo].[KhoPhieuNhap] CHECK CONSTRAINT [FK_KhoNhapKho_KhoTaiSan]
GO
ALTER TABLE [dbo].[KhoPhieuNhap]  WITH CHECK ADD  CONSTRAINT [FK_KhoNhapKho_NguonNganSach] FOREIGN KEY([NguonNganSachId])
REFERENCES [dbo].[NguonNganSach] ([NguonNganSachId])
GO
ALTER TABLE [dbo].[KhoPhieuNhap] CHECK CONSTRAINT [FK_KhoNhapKho_NguonNganSach]
GO
ALTER TABLE [dbo].[KhoPhieuNhap]  WITH CHECK ADD  CONSTRAINT [FK_KhoNhapKho_NhaCungCap] FOREIGN KEY([NhaCungCapId])
REFERENCES [dbo].[NhaCungCap] ([NhaCungCapId])
GO
ALTER TABLE [dbo].[KhoPhieuNhap] CHECK CONSTRAINT [FK_KhoNhapKho_NhaCungCap]
GO
ALTER TABLE [dbo].[KhoPhieuNhap]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuNhap_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KhoPhieuNhap] CHECK CONSTRAINT [FK_KhoPhieuNhap_CoSo]
GO
ALTER TABLE [dbo].[KhoPhieuNhapChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoNhapKhoChiTiet_KhoNhapKho] FOREIGN KEY([KhoPhieuNhapId])
REFERENCES [dbo].[KhoPhieuNhap] ([KhoPhieuNhapId])
GO
ALTER TABLE [dbo].[KhoPhieuNhapChiTiet] CHECK CONSTRAINT [FK_KhoNhapKhoChiTiet_KhoNhapKho]
GO
ALTER TABLE [dbo].[KhoPhieuNhapChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoNhapKhoChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[KhoPhieuNhapChiTiet] CHECK CONSTRAINT [FK_KhoNhapKhoChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[KhoPhieuXuat]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuat_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KhoPhieuXuat] CHECK CONSTRAINT [FK_KhoPhieuXuat_CoSo]
GO
ALTER TABLE [dbo].[KhoPhieuXuat]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuat_KhoTaiSanNhan] FOREIGN KEY([KhoNhanId])
REFERENCES [dbo].[KhoTaiSan] ([KhoTaiSanId])
GO
ALTER TABLE [dbo].[KhoPhieuXuat] CHECK CONSTRAINT [FK_KhoPhieuXuat_KhoTaiSanNhan]
GO
ALTER TABLE [dbo].[KhoPhieuXuat]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuat_KhoTaiSanXuat] FOREIGN KEY([KhoXuatId])
REFERENCES [dbo].[KhoTaiSan] ([KhoTaiSanId])
GO
ALTER TABLE [dbo].[KhoPhieuXuat] CHECK CONSTRAINT [FK_KhoPhieuXuat_KhoTaiSanXuat]
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuatChiTiet_KhoPhieuXuat] FOREIGN KEY([KhoPhieuXuatId])
REFERENCES [dbo].[KhoPhieuXuat] ([KhoPhieuXuatId])
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet] CHECK CONSTRAINT [FK_KhoPhieuXuatChiTiet_KhoPhieuXuat]
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuatChiTiet_NguonNganSach] FOREIGN KEY([NguonNganSachId])
REFERENCES [dbo].[NguonNganSach] ([NguonNganSachId])
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet] CHECK CONSTRAINT [FK_KhoPhieuXuatChiTiet_NguonNganSach]
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuatChiTiet_NhaCungCap] FOREIGN KEY([NhaCungCapId])
REFERENCES [dbo].[NhaCungCap] ([NhaCungCapId])
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet] CHECK CONSTRAINT [FK_KhoPhieuXuatChiTiet_NhaCungCap]
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoPhieuXuatChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[KhoPhieuXuatChiTiet] CHECK CONSTRAINT [FK_KhoPhieuXuatChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[KhoTaiSan]  WITH CHECK ADD  CONSTRAINT [FK_KhoTaiSan_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KhoTaiSan] CHECK CONSTRAINT [FK_KhoTaiSan_CoSo]
GO
ALTER TABLE [dbo].[KhoTonKho]  WITH CHECK ADD  CONSTRAINT [FK_KhoTonKho_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[KhoTonKho] CHECK CONSTRAINT [FK_KhoTonKho_CoSo]
GO
ALTER TABLE [dbo].[KhoTonKho]  WITH CHECK ADD  CONSTRAINT [FK_KhoTonKho_KhoTaiSan] FOREIGN KEY([KhoTaiSanId])
REFERENCES [dbo].[KhoTaiSan] ([KhoTaiSanId])
GO
ALTER TABLE [dbo].[KhoTonKho] CHECK CONSTRAINT [FK_KhoTonKho_KhoTaiSan]
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoTonKhoChiTiet_KhoTonKho] FOREIGN KEY([KhoTonKhoId])
REFERENCES [dbo].[KhoTonKho] ([KhoTonKhoId])
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet] CHECK CONSTRAINT [FK_KhoTonKhoChiTiet_KhoTonKho]
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoTonKhoChiTiet_NguonNganSach] FOREIGN KEY([NguonNganSachId])
REFERENCES [dbo].[NguonNganSach] ([NguonNganSachId])
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet] CHECK CONSTRAINT [FK_KhoTonKhoChiTiet_NguonNganSach]
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoTonKhoChiTiet_NhaCungCap] FOREIGN KEY([NhaCungCapId])
REFERENCES [dbo].[NhaCungCap] ([NhaCungCapId])
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet] CHECK CONSTRAINT [FK_KhoTonKhoChiTiet_NhaCungCap]
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_KhoTonKhoChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[KhoTonKhoChiTiet] CHECK CONSTRAINT [FK_KhoTonKhoChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[LoaiTaiSan]  WITH CHECK ADD  CONSTRAINT [FK_LoaiTaiSan_NhomTaiSan] FOREIGN KEY([NhomId])
REFERENCES [dbo].[NhomTaiSan] ([NhomId])
GO
ALTER TABLE [dbo].[LoaiTaiSan] CHECK CONSTRAINT [FK_LoaiTaiSan_NhomTaiSan]
GO
ALTER TABLE [dbo].[NguyenGia]  WITH CHECK ADD  CONSTRAINT [FK_NguyenGia_NguonNganSach] FOREIGN KEY([NguonNganSachId])
REFERENCES [dbo].[NguonNganSach] ([NguonNganSachId])
GO
ALTER TABLE [dbo].[NguyenGia] CHECK CONSTRAINT [FK_NguyenGia_NguonNganSach]
GO
ALTER TABLE [dbo].[NguyenGia]  WITH CHECK ADD  CONSTRAINT [FK_NguyenGia_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[NguyenGia] CHECK CONSTRAINT [FK_NguyenGia_TaiSan]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_PhongBan]
GO
ALTER TABLE [dbo].[PhongBan]  WITH CHECK ADD  CONSTRAINT [FK_PhongBan_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[PhongBan] CHECK CONSTRAINT [FK_PhongBan_CoSo]
GO
ALTER TABLE [dbo].[SuaChua]  WITH CHECK ADD  CONSTRAINT [FK_SuaChua_BaoDuong] FOREIGN KEY([BaoDuongId])
REFERENCES [dbo].[BaoDuong] ([BaoDuongId])
GO
ALTER TABLE [dbo].[SuaChua] CHECK CONSTRAINT [FK_SuaChua_BaoDuong]
GO
ALTER TABLE [dbo].[SuDung]  WITH CHECK ADD  CONSTRAINT [FK_SuDung_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[SuDung] CHECK CONSTRAINT [FK_SuDung_CoSo]
GO
ALTER TABLE [dbo].[SuDungChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_SuDungChiTiet_SuDung] FOREIGN KEY([SuDungId])
REFERENCES [dbo].[SuDung] ([SuDungId])
GO
ALTER TABLE [dbo].[SuDungChiTiet] CHECK CONSTRAINT [FK_SuDungChiTiet_SuDung]
GO
ALTER TABLE [dbo].[SuDungChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_SuDungChiTiet_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[SuDungChiTiet] CHECK CONSTRAINT [FK_SuDungChiTiet_TaiSan]
GO
ALTER TABLE [dbo].[TaiSan]  WITH CHECK ADD  CONSTRAINT [FK_TaiSan_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[TaiSan] CHECK CONSTRAINT [FK_TaiSan_CoSo]
GO
ALTER TABLE [dbo].[TaiSan]  WITH CHECK ADD  CONSTRAINT [FK_TaiSan_DuAn] FOREIGN KEY([DuAnId])
REFERENCES [dbo].[DuAn] ([DuAnId])
GO
ALTER TABLE [dbo].[TaiSan] CHECK CONSTRAINT [FK_TaiSan_DuAn]
GO
ALTER TABLE [dbo].[TaiSan]  WITH CHECK ADD  CONSTRAINT [FK_TaiSan_HangSanXuat] FOREIGN KEY([HangSanXuatId])
REFERENCES [dbo].[HangSanXuat] ([HangSanXuatId])
GO
ALTER TABLE [dbo].[TaiSan] CHECK CONSTRAINT [FK_TaiSan_HangSanXuat]
GO
ALTER TABLE [dbo].[TaiSan]  WITH CHECK ADD  CONSTRAINT [FK_TaiSan_LoaiTaiSan] FOREIGN KEY([LoaiId])
REFERENCES [dbo].[LoaiTaiSan] ([LoaiId])
GO
ALTER TABLE [dbo].[TaiSan] CHECK CONSTRAINT [FK_TaiSan_LoaiTaiSan]
GO
ALTER TABLE [dbo].[TaiSan]  WITH CHECK ADD  CONSTRAINT [FK_TaiSan_NuocSanXuat] FOREIGN KEY([NuocSanXuatId])
REFERENCES [dbo].[NuocSanXuat] ([NuocSanXuatId])
GO
ALTER TABLE [dbo].[TaiSan] CHECK CONSTRAINT [FK_TaiSan_NuocSanXuat]
GO
ALTER TABLE [dbo].[TaiSan]  WITH CHECK ADD  CONSTRAINT [FK_TaiSan_PhuongThuc] FOREIGN KEY([PhuongThucId])
REFERENCES [dbo].[PhuongThuc] ([PhuongThucId])
GO
ALTER TABLE [dbo].[TaiSan] CHECK CONSTRAINT [FK_TaiSan_PhuongThuc]
GO
ALTER TABLE [dbo].[ThayDoiThongTin]  WITH CHECK ADD  CONSTRAINT [FK_ThayDoiThongTin_CoSo] FOREIGN KEY([CoSoId])
REFERENCES [dbo].[CoSo] ([CoSoId])
GO
ALTER TABLE [dbo].[ThayDoiThongTin] CHECK CONSTRAINT [FK_ThayDoiThongTin_CoSo]
GO
ALTER TABLE [dbo].[ThayDoiThongTin]  WITH CHECK ADD  CONSTRAINT [FK_ThayDoiThongTin_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[ThayDoiThongTin] CHECK CONSTRAINT [FK_ThayDoiThongTin_TaiSan]
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Dat]  WITH CHECK ADD  CONSTRAINT [FK_ThayDoiThongTin_Dat_ThayDoiThongTin] FOREIGN KEY([ThayDoiThongTinId])
REFERENCES [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId])
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Dat] CHECK CONSTRAINT [FK_ThayDoiThongTin_Dat_ThayDoiThongTin]
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Nha]  WITH CHECK ADD  CONSTRAINT [FK_ThayDoiThongTin_Nha_ThayDoiThongTin] FOREIGN KEY([ThayDoiThongTinId])
REFERENCES [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId])
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Nha] CHECK CONSTRAINT [FK_ThayDoiThongTin_Nha_ThayDoiThongTin]
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Oto]  WITH CHECK ADD  CONSTRAINT [FK_ThayDoiThongTin_Oto_ThayDoiThongTin] FOREIGN KEY([ThayDoiThongTinId])
REFERENCES [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId])
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Oto] CHECK CONSTRAINT [FK_ThayDoiThongTin_Oto_ThayDoiThongTin]
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Tren500]  WITH CHECK ADD  CONSTRAINT [FK_ThayDoiThongTin_Tren500_ThayDoiThongTin] FOREIGN KEY([ThayDoiThongTinId])
REFERENCES [dbo].[ThayDoiThongTin] ([ThayDoiThongTinId])
GO
ALTER TABLE [dbo].[ThayDoiThongTin_Tren500] CHECK CONSTRAINT [FK_ThayDoiThongTin_Tren500_ThayDoiThongTin]
GO
ALTER TABLE [dbo].[ThongTinCongKhai]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinCongKhai_HienTrangSuDung] FOREIGN KEY([HienTrangSuDungId])
REFERENCES [dbo].[HienTrangSuDung] ([HienTrangSuDungId])
GO
ALTER TABLE [dbo].[ThongTinCongKhai] CHECK CONSTRAINT [FK_ThongTinCongKhai_HienTrangSuDung]
GO
ALTER TABLE [dbo].[ThongTinCongKhai]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinCongKhai_KhachHangNCC] FOREIGN KEY([NhaCungCapId])
REFERENCES [dbo].[NhaCungCap] ([NhaCungCapId])
GO
ALTER TABLE [dbo].[ThongTinCongKhai] CHECK CONSTRAINT [FK_ThongTinCongKhai_KhachHangNCC]
GO
ALTER TABLE [dbo].[ThongTinCongKhai]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinCongKhai_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[ThongTinCongKhai] CHECK CONSTRAINT [FK_ThongTinCongKhai_TaiSan]
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Dat]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinKeKhai_Dat_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Dat] CHECK CONSTRAINT [FK_ThongTinKeKhai_Dat_TaiSan]
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Nha]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinKeKhai_Nha_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Nha] CHECK CONSTRAINT [FK_ThongTinKeKhai_Nha_TaiSan]
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Oto]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinKeKhai_Oto_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Oto] CHECK CONSTRAINT [FK_ThongTinKeKhai_Oto_TaiSan]
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Tren500]  WITH CHECK ADD  CONSTRAINT [FK_ThongTinKeKhai_Tren500_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[ThongTinKeKhai_Tren500] CHECK CONSTRAINT [FK_ThongTinKeKhai_Tren500_TaiSan]
GO
/****** Object:  StoredProcedure [dbo].[sp_BanKiemKe_GetListBanKiemKeByKiemKeId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BanKiemKe_GetListBanKiemKeByKiemKeId]
( 
	@BienBanKiemKeId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT BanKiemKeId,
			BienBanKiemKeId,
			NguoiKiemKe,
			ChucVu,
			DaiDien,
			VaiTro
	FROM dbo.BanKiemKe 
	WHERE BienBanKiemKeId = @BienBanKiemKeId	

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoDuong_DeleteBaoDuongById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_BaoDuong_DeleteBaoDuongById]
	@BaoDuongId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.SuaChua WHERE BaoDuongId = @BaoDuongId
			DELETE dbo.BaoDuong WHERE BaoDuongId = @BaoDuongId			
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BaoDuong_GetListBaoDuongByBaoDuongId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BaoDuong_GetListBaoDuongByBaoDuongId]
( 
	@BaoDuongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT	BaoDuongId,
			CAST(H.TaiSanId AS VARCHAR)TaiSanId,
			ts.TenTaiSan,
			CAST(H.PhongBanId AS VARCHAR)PhongBanId,
			pb.TenPhongBan,
			CAST(h.NhanVienId AS VARCHAR)NhanVienId,
			nv.TenNhanVien,
			CONVERT(VARCHAR, H.NgayBaoDuong,103)NgayBaoDuong,
			CONVERT(VARCHAR, H.NgayDuKien,103)NgayDuKien,
			H.DuToan,
			 CAST(H.LoaiBaoDuongId AS VARCHAR)LoaiBaoDuongId,
			H.MoTa
	FROM dbo.BaoDuong H
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = H.TaiSanId
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId= h.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NhanVienId
	WHERE H.BaoDuongId = @BaoDuongId

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoDuong_GetListBaoDuongByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BaoDuong_GetListBaoDuongByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 

	SET @Search = ISNULL(@Search, '')
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0028',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
		SELECT COUNT(*) OVER () AS MAXCNT, H.BaoDuongId, H.NgayBaoDuong, H.NgayDuKien, H.DuToan, H.LoaiBaoDuongId, H.MoTa,
			H.TaiSanId, ts.MaTaiSan, ts.TenTaiSan, h.DuyetId, H.NguoiDuyet,ndd.TenNhanVien TenNguoiDuyet, H.CoSoId, H.NguoiTao, nd.TenNhanVien TenNguoiTao, H.NgayTao,
			H.PhongBanId, pb.TenPhongBan, H.NhanVienId, nv.TenNhanVien
	FROM dbo.BaoDuong H
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = H.TaiSanId
	LEFT JOIN NhanVien nd ON nd.NhanVienId = h.NguoiTao
	LEFT JOIN NhanVien ndd ON ndd.NhanVienId = h.NguoiDuyet
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NhanVienId
	WHERE CAST(H.NgayBaoDuong AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.MoTa LIKE N''%' +@Search+ '%'')';
	END

	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nd.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nd.NhanVienId =''' + @LoginId + '''';   
	END

	--SET @V_SQL = @V_SQL + ' GROUP BY H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
	--						h.DuyetId, H.NguoiDuyet, H.CoSoId, H.NguoiTao, H.NgayTao,ndd.HoTen,nd.HoTen ';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BaoDuong_InsertBaoDuong]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_BaoDuong_InsertBaoDuong]
	@TaiSanId INT,
	@PhongBanId INT,
	@CanBoId INT,
	@NgayBaoDuong DATETIME,
	@NgayDuKien DATETIME,
	@DuToan NUMERIC(18,4),
	@LoaiBaoDuongId INT,
	@MoTa NVARCHAR(MAX),
	@CoSoId INT,
	@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.BaoDuong
			        ( TaiSanId ,		NgayBaoDuong ,			NgayDuKien ,
			          DuToan ,			LoaiBaoDuongId ,		MoTa ,
			          DuyetId ,			NguoiDuyet ,			CoSoId ,
			          NguoiTao ,		NgayTao ,				CtrVersion,
					  PhongBanId,		NhanVienId
			        )
			SELECT	@TaiSanId			,@NgayBaoDuong			,@NgayDuKien
					,@DuToan			,@LoaiBaoDuongId		,@MoTa
					,0					,0						,@CoSoId
					,@NhanVienId		,GETDATE()				,1
					,@PhongBanId		,@CanBoId

			SELECT SCOPE_IDENTITY() AS BaoDuongIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BaoDuong_UpdateBaoDuong]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_BaoDuong_UpdateBaoDuong]
	@BaoDuongId INT,
	@TaiSanId INT,
	@PhongBanId INT,
	@CanBoId INT,
	@NgayBaoDuong DATETIME,
	@NgayDuKien DATETIME,
	@DuToan NUMERIC(18,4),
	@LoaiBaoDuongId INT,
	@MoTa NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	

	BEGIN TRAN
		
		BEGIN TRY
			UPDATE dbo.BaoDuong
			SET TaiSanId = @TaiSanId,
				PhongBanId = @PhongBanId,
				NhanVienId= @CanBoId,
				NgayBaoDuong = @NgayBaoDuong,
				NgayDuKien = @NgayDuKien,
				DuToan = @DuToan,
				LoaiBaoDuongId = @LoaiBaoDuongId,
				MoTa = @MoTa
			WHERE BaoDuongId = @BaoDuongId

			DELETE dbo.SuaChua WHERE BaoDuongId = @BaoDuongId

			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_DeleteBienBanKiemKeById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_BienBanKiemKe_DeleteBienBanKiemKeById]
	@BienBanKiemKeId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.BanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId
			DELETE dbo.BienBanKiemKeChiTiet WHERE BienBanKiemKeId = @BienBanKiemKeId
			DELETE dbo.BienBanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId			
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @SoChungTu		NVARCHAR(50)	= null		
	, @PhongBanId		NVARCHAR(max)
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 

	SET @Search = ISNULL(@Search, '')
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0031',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	

	SET @V_SQL = N'
		SELECT COUNT(*) OVER () AS MAXCNT, H.BienBanKiemKeId, H.SoChungTu, H.NgayChungTu, H.NgayKiemKe, H.PhongBanId, PB.TenPhongBan, H.GhiChu, H.NguoiTao, nv.TenNhanVien TenNguoiTao,
			H.NgayTao
	FROM dbo.BienBanKiemKe H
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	WHERE CAST(H.NgayChungTu AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.GhiChu LIKE N''%' +@Search+ '%'')';
	END

	IF (@SoChungTu > '')
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.SoChungTu LIKE N''%' +@SoChungTu+ '%'') ';
	END

	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END
		

	--SET @V_SQL = @V_SQL + ' GROUP BY H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
	--						h.DuyetId, H.NguoiDuyet, H.CoSoId, H.NguoiTao, H.NgayTao,ndd.HoTen,nd.HoTen ';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeById]
( 
	@BienBanKiemKeId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	H.BienBanKiemKeId,
			H.SoChungTu, 
			CONVERT(VARCHAR, H.NgayChungTu, 103)NgayChungTu,
			CONVERT(VARCHAR, H.NgayKiemKe, 103)NgayKiemKe,
			H.PhongBanId, 
			PB.TenPhongBan, 
			H.GhiChu, 
			H.NguoiTao, 
			nd.HoTen TenNguoiTao,
			H.NgayTao
	FROM dbo.BienBanKiemKe H
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung nd ON nd.NhanVienId = h.NguoiTao
	WHERE H.BienBanKiemKeId = @BienBanKiemKeId

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_GetListReportBienBanKiemKeById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BienBanKiemKe_GetListReportBienBanKiemKeById]
( 
	@BienBanKiemKeId INT
)
AS  
BEGIN
------------------------------------------------  
	-- giatriconlai = nguyengia - (hao mòn nam * so nam sd)
	
	SELECT NguoiKiemKe,ChucVu, DaiDien, VaiTro  FROM dbo.BanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId

	SELECT	H.NgayKiemKe,
			H.NgayChungTu,
			H.SoChungTu,
			TS.MaTaiSan,
			ts.TenTaiSan,
			PB.TenPhongBan,
			L.SoLuong,
			L.SoLuongKiemKe,
			(L.SoLuongKiemKe - L.SoLuong) SoLuongChenhLech,
			SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
			SUM(ISNULL(NG.GiaTri,0)) - (
								DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								) GiaTriConLai,
			(L.SoLuong						* SUM(ISNULL(NG.GiaTri,0))) NguyenGiaKT,
			(L.SoLuongKiemKe				* SUM(ISNULL(NG.GiaTri,0))) NguyenGiaKK,
			((L.SoLuongKiemKe - L.SoLuong)	* SUM(ISNULL(NG.GiaTri,0))) NguyenGiaCL,
			(L.SoLuong						* (SUM(ISNULL(NG.GiaTri,0)) - (DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)))) GiaTriKT,
			(L.SoLuongKiemKe				* (SUM(ISNULL(NG.GiaTri,0)) - (DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)))) GiaTriKK,
			((L.SoLuongKiemKe - L.SoLuong)	* (SUM(ISNULL(NG.GiaTri,0)) - (DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)))) GiaTriCL
			,H.GhiChu

	FROM dbo.BienBanKiemKe H
	JOIN dbo.BienBanKiemKeChiTiet L ON L.BienBanKiemKeId= h.BienBanKiemKeId
	LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = l.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
	WHERE H.BienBanKiemKeId = @BienBanKiemKeId
	GROUP BY H.BienBanKiemKeId,
			ts.TaiSanId,
			TS.MaTaiSan,
			ts.TenTaiSan,
			H.PhongBanId,
			PB.TenPhongBan,
			L.SoLuong,
			L.SoLuongKiemKe,
			TS.NgayBDHaoMon,
			H.NgayKiemKe,
			H.NgayChungTu,
			TS.TyLeHaoMon,
			H.GhiChu,
			H.SoChungTu
	

-----------------------------------------------------
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_InsertBienBanKiemKe]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_BienBanKiemKe_InsertBienBanKiemKe]
	@SoChungTu NVARCHAR(20),
	@NgayChungTu DATETIME,
	@NgayKiemKe DATETIME,
	@PhongBanId INT,
	@GhiChu NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT,
	@MyTable_BanKiemKe MyTableType_BanKiemKe READONLY,
    @MyTable_BienBanKiemKeChiTiet MyTableType_BienBanKiemKeChiTiet READONLY
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @BienBanKiemkeId INT
	SET @BienBanKiemkeId = 0

	BEGIN TRAN
		
		BEGIN TRY

			-- insert header
			INSERT dbo.BienBanKiemKe
			        ( SoChungTu ,			NgayChungTu ,			NgayKiemKe ,
			          PhongBanId ,			GhiChu ,				CoSoId ,
			          NguoiTao ,			NgayTao ,				CtrVersion
			        )
			SELECT	@SoChungTu				,@NgayChungTu			,@NgayKiemKe
					,@PhongBanId			,@GhiChu				,@CoSoId
					,@NhanVienId			,GETDATE()				,1
			
			SELECT @BienBanKiemkeId = SCOPE_IDENTITY()
			SELECT @BienBanKiemkeId AS BienBanKiemKeIdI

			--- insert line

			INSERT dbo.BienBanKiemKeChiTiet
			SELECT @BienBanKiemKeId, TaiSanId, SoLuong, SoLuongKiemKe
			FROM @MyTable_BienBanKiemKeChiTiet


			-- insert ban kiểm kê
			INSERT dbo.BanKiemKe
			SELECT  @BienBanKiemKeId, NguoiKiemKe, ChucVu, DaiDien, VaiTro 
			FROM @MyTable_BanKiemKe


		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_UpdateBienBanKiemKe]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_BienBanKiemKe_UpdateBienBanKiemKe]
	@BienBanKiemKeId INT,
	@SoChungTu NVARCHAR(20),
	@NgayChungTu DATETIME,
	@NgayKiemKe DATETIME,
	@PhongBanId INT,
	@GhiChu NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT,
	@MyTable_BanKiemKe MyTableType_BanKiemKe READONLY,
    @MyTable_BienBanKiemKeChiTiet MyTableType_BienBanKiemKeChiTiet READONLY
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY


			UPDATE dbo.BienBanKiemKe
			SET NgayChungTu = @NgayChungTu,
				NgayKiemKe = @NgayKiemKe,
				PhongBanId = @PhongBanId,
				GhiChu = @GhiChu
			WHERE BienBanKiemKeId = @BienBanKiemKeId
			

			DELETE dbo.BanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId
			DELETE dbo.BienBanKiemKeChiTiet WHERE BienBanKiemKeId = @BienBanKiemKeId


			INSERT dbo.BienBanKiemKeChiTiet
			SELECT @BienBanKiemKeId, TaiSanId, SoLuong, SoLuongKiemKe
			FROM @MyTable_BienBanKiemKeChiTiet


			INSERT dbo.BanKiemKe
			SELECT  @BienBanKiemKeId, NguoiKiemKe, ChucVu, DaiDien, VaiTro 
			FROM @MyTable_BanKiemKe

			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKeChiTiet_GetListBienBanKiemKeChiTietByKiemKeId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_BienBanKiemKeChiTiet_GetListBienBanKiemKeChiTietByKiemKeId]
( 
	@BienBanKiemKeId INT,
	@PhongBanId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	-- giatriconlai = nguyengia - (hao mòn nam * so nam sd)

	IF EXISTS(SELECT 1 FROM dbo.BienBanKiemKe H JOIN dbo.BienBanKiemKeChiTiet L ON L.BienBanKiemKeId = H.BienBanKiemKeId WHERE H.BienBanKiemKeId = @BienBanKiemKeId)
	BEGIN
		SELECT H.BienBanKiemKeId,
				CAST(ts.TaiSanId AS VARCHAR) TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				CAST(H.PhongBanId AS VARCHAR) PhongBanId,
				PB.TenPhongBan,
				L.SoLuong,
				L.SoLuongKiemKe,
				SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
				SUM(ISNULL(NG.GiaTri,0)) - (
									DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								 ) GiaTriConLai

		FROM dbo.BienBanKiemKe H
		JOIN dbo.BienBanKiemKeChiTiet L ON L.BienBanKiemKeId= h.BienBanKiemKeId
		LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
		LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = l.TaiSanId
		LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
		WHERE H.BienBanKiemKeId = @BienBanKiemKeId
		GROUP BY H.BienBanKiemKeId,
				ts.TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				H.PhongBanId,
				PB.TenPhongBan,
				L.SoLuong,
				L.SoLuongKiemKe,
				TS.NgayBDHaoMon,
				H.NgayKiemKe,
				TS.TyLeHaoMon
	END
	ELSE
	BEGIN
		SELECT  0 BienBanKiemKeId,
				CAST(ts.TaiSanId AS VARCHAR) TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				CAST(H.PhongBanId AS VARCHAR) PhongBanId,
				PB.TenPhongBan,
				SUM(H.SLTon + H.SLTang - H.SLGiam) SoLuong,
				SUM(H.SLTon + H.SLTang - H.SLGiam) SoLuongKiemKe,
				SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
				SUM(ISNULL(NG.GiaTri,0)) - (
									DATEDIFF(YEAR, TS.NgayBDHaoMon, GETDATE()) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								 ) GiaTriConLai

		FROM dbo.TheoDoi H
		LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
		LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId
		LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
		WHERE PB.PhongBanId = @PhongBanId
		GROUP BY 
				ts.TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				H.PhongBanId,
				PB.TenPhongBan,
				TS.NgayBDHaoMon,
				TS.TyLeHaoMon
	END

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CoSo_cbxCoSoByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_CoSo_cbxCoSoByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.CoSoId,a.MaCoSo,a.TenCoSo
	FROM CoSo a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_CoSo_GetCoSoById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_CoSo_GetCoSoById]
( 
	  @CoSoId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.CoSoId,a.MaCoSo,a.TenCoSo,CONVERT(varchar, a.LoaiCoSoId) as LoaiCoSoId,a.TrucThuoc,b.MaCoSo as MaTrucThuoc,b.TenCoSo as TenTrucThuoc,a.DienThoai,a.DiaChi,a.GhiChu,a.CtrVersion
	FROM CoSo a left join CoSo b on a.TrucThuoc=b.CoSoId where a.CoSoId = @CoSoId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_CoSo_GetListCoSoByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_CoSo_GetListCoSoByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

DECLARE @IS_VIEW varchar(10) = '0'
   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
  @NHAN_VIEN_ID = @NhanVienId,
  @CO_SO_ID = @CoSoId,
  @CHUC_NANG = 'CN0015',
  @QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.CoSoId,a.MaCoSo,a.TenCoSo,a.DienThoai,a.DiaChi,a.GhiChu,nv.TenNhanVien,a.NgayTao
	FROM CoSo a LEFT JOIN NhanVien nv on a.NguoiTao=nv.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaCoSo LIKE N''%' +@Search+ '%'' OR TenCoSo LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
		 END
		   IF @IS_VIEW = 'VR' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
		 END
		  IF @IS_VIEW = 'VE' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
		 END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DanhGia_DeleteDanhGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_DeleteDanhGia]
					 @DanhGiaId				=	84

					,@COSO_ID				=	1
					,@NHANVIEN_ID			=	7
					,@MESSAGE				=	@MESSAGE	OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.25 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
/*
DROP TYPE NguyenGiaType
CREATE TYPE NguyenGiaType AS TABLE
( 
	TaiSanId			INT,
	NguonNganSachId		INT,
	GiaTri				numeric(18, 4)
)
*/
CREATE PROCEDURE [dbo].[sp_DanhGia_DeleteDanhGia]
	 @DanhGiaId				INT				=	NULL

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'DG_DELETE'
			,@TaiSanId			INT				=	NULL

	-- INPUT DEFAULT
	SET @DanhGiaId		=	ISNULL(@DanhGiaId, 0)
	SET @COSO_ID		=	ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID	=	ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE		=	ISNULL(@MESSAGE, '')

BEGIN TRY

BEGIN TRANSACTION @V_TRANS_NAME

	IF @DanhGiaId = 0
	BEGIN
		SET @MESSAGE	=	N'DanhGiaId|1|Không tìm thấy thông tin đánh giá';
		THROW 51000, @MESSAGE, 1;
	END

	SELECT @TaiSanId = TaiSanId FROM DanhGia WHERE DanhGiaId = @DanhGiaId

	-- UPDATE TÀI SẢN
	UPDATE	TS
	SET		 TS.HaoMonLuyKe		=	ISNULL(DG.HaoMonLuyKeCu,TS.HaoMonLuyKe)
			,TS.SoNamSuDung		=	ISNULL(DG.SoNamSuDungCu,TS.SoNamSuDung)
			,TS.TyLeHaoMon		=	ISNULL(DG.TyLeHaoMonCu,TS.TyLeHaoMon)
	FROM	TaiSan TS
			LEFT JOIN DanhGia DG ON TS.TaiSanId = DG.TaiSanId AND DG.DanhGiaId = @DanhGiaId
	WHERE	DG.DanhGiaId = @DanhGiaId

	-- UPDATE NGUYÊN GIÁ
	SELECT		TS.TaiSanId,ISNULL(DG_NG.NguonNganSachId,NG.NguonNganSachId) NguonNganSachId,ISNULL(DG_NG.GiaTriCu,NG.GiaTri) GiaTriCu,ng.GiaTri
				,CASE WHEN DG_NG.NguonNganSachId IS NULL THEN 1 ELSE 0 END isCreate
	INTO		#DANHGIA_NGUYENGIA
	FROM		(	SELECT	DanhGia_NguyenGia.GiaTriCu,DanhGia_NguyenGia.NguonNganSachId,DanhGia.TaiSanId
					FROM	DanhGia_NguyenGia
							LEFT JOIN DanhGia ON DanhGia_NguyenGia.DanhGiaId = DanhGia.DanhGiaId
					WHERE	DanhGia_NguyenGia.DanhGiaId = @DanhGiaId ) DG_NG
				FULL JOIN (	SELECT * 
							FROM NguyenGia 
							WHERE TaiSanId = @TaiSanId ) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
				LEFT JOIN TaiSan TS ON DG_NG.TaiSanId = TS.TaiSanId OR NG.TaiSanId = TS.TaiSanId
	WHERE TS.TaiSanId = @TaiSanId
	
	DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId		,GiaTri		)
	SELECT					@TaiSanId	,NG.NguonNganSachId		,NG.GiaTriCu
	FROM		#DANHGIA_NGUYENGIA NG
	WHERE		NG.isCreate = 0

	-- DELTE ĐÁNH GIÁ
	DELETE DanhGia_NguyenGia WHERE DanhGiaId = @DanhGiaId
	DELETE DanhGia WHERE DanhGiaId = @DanhGiaId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	IF OBJECT_ID('tempdb..#DANHGIA_NGUYENGIA') IS NOT NULL
		DROP TABLE #DANHGIA_NGUYENGIA

	SELECT * FROM DanhGia WHERE DanhGiaId = @DanhGiaId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DanhGia_GetListDanhGiaByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_GetListDanhGiaByCriteria]
						 @search			=	NULL
						,@DanhGiaIds		=	N'75'
						,@TaiSanIds			=	NULL
						,@PhongBanIds		=	NULL
						,@NhanVienIds		=	NULL
	
						,@Field				=	N''
						,@skip				=	N''
						,@take				=	NULL
						,@OrderClause		=	NULL
				
						,@COSO_ID			=	1
						,@NHANVIEN_ID		=	null
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_DanhGia_GetListDanhGiaByCriteria]
	 @search			NVARCHAR(MAX)	=	NULL
	,@DanhGiaIds		NVARCHAR(MAX)	=	NULL
	,@TaiSanIds			NVARCHAR(MAX)	=	NULL
	,@PhongBanIds		NVARCHAR(MAX)	=	NULL
	,@NhanVienIds		NVARCHAR(MAX)	=	NULL
	
	,@Field				NVARCHAR(MAX)	=	NULL
	,@skip				INT				=	NULL
	,@take				INT				=	NULL
	,@OrderClause		NVARCHAR(MAX)	=	NULL
				
	,@COSO_ID			INT				=	NULL
	,@NHANVIEN_ID		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(MAX) 

	-- SET DEFAULT

	SET @search = ISNULL(@search, '')
	SET @DanhGiaIds = ISNULL(@DanhGiaIds, '')
	SET @TaiSanIds = ISNULL(@TaiSanIds, '')
	SET @PhongBanIds = ISNULL(@PhongBanIds, '')
	SET @NhanVienIds = ISNULL(@NhanVienIds, '')

	SET @Field = ISNULL(@Field, '')
	IF (@Field = '')
		SET @Field = ' DG.* ';

	SET @skip = ISNULL(@skip, 0)
	SET @take = ISNULL(@take, 0)

	SET @OrderClause = ISNULL(@OrderClause,'')
	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';

	SET @COSO_ID = ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE = ISNULL(@MESSAGE, '')
----------
	SET @V_SQL = N'
		SELECT		COUNT(DG.DanhGiaId) OVER () AS MAXCNT,DG.DanhGiaId ID
					,' + @Field + ' 
					,TS.TenTaiSan,PB.TenPhongBan,NV.TenNhanVien
					,NV_NT.TenNhanVien TenNguoiTao,DG_NG.NguyenGiaCu
		FROM		DanhGia DG
					LEFT JOIN (
						select		DanhGiaId, SUM(GiaTriCu) NguyenGiaCu
						from		DanhGia_NguyenGia
						GROUP BY	DanhGiaId
					) DG_NG ON DG.DanhGiaId = DG_NG.DanhGiaId
					LEFT JOIN TaiSan TS ON DG.TaiSanId = TS.TaiSanId
					LEFT JOIN PhongBan PB ON DG.PhongBanId = PB.PhongBanId
					LEFT JOIN NhanVien NV ON DG.NhanVienId = NV.NhanVienId
					LEFT JOIN CoSo CS ON DG.CoSoId = CS.CoSoId
					LEFT JOIN NhanVien NV_NT ON DG.NguoiTao = NV_NT.NhanVienId
		WHERE		DG.CoSoId = @COSO_ID 
		'

	IF @search <> ''
	BEGIN
		SET @V_SQL = @V_SQL + N' AND (DG.SoChungTu LIKE N''%' +@search+ '%'' OR DG.NoiDung LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR TS.MaTaiSan LIKE N''%' +@search+ '%'' OR TS.TenTaiSan LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR PB.MaPhongBan LIKE N''%' +@search+ '%'' OR PB.TenPhongBan LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR NV.MaNhanVien LIKE N''%' +@search+ '%'' OR NV.TenNhanVien LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR CS.MaCoSo LIKE N''%' +@search+ '%'' OR CS.TenCoSo LIKE  N''%' +@search+ '%'') ';
	END

	IF @DanhGiaIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.DanhGiaId AS VARCHAR(20)) + ''|'', ''|'' + @DanhGiaIds + ''|'') > 0 ';

	IF @TaiSanIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.TaiSanId AS VARCHAR(20)) + ''|'', ''|'' + @TaiSanIds + ''|'') > 0 ';

	IF @PhongBanIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.PhongBanId AS VARCHAR(20)) + ''|'', ''|'' + @PhongBanIds + ''|'') > 0 ';

	IF @NhanVienIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.NhanVienId AS VARCHAR(20)) + ''|'', ''|'' + @NhanVienIds + ''|'') > 0 ';

	IF @OrderClause <> ''
		SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	IF @OrderClause <> '' AND @take <> 0
		SET @V_SQL = @V_SQL + ' OFFSET ' + CAST(@skip AS nvarchar(20)) + ' ROWS FETCH NEXT ' + CAST(@take AS nvarchar(20)) + ' ROWS ONLY '
		
	print @V_SQL
	exec sp_executesql @V_SQL,N'
		 @search			NVARCHAR(MAX)	=	NULL
		,@DanhGiaIds		NVARCHAR(MAX)	=	NULL
		,@TaiSanIds			NVARCHAR(MAX)	=	NULL
		,@PhongBanIds		NVARCHAR(MAX)	=	NULL
		,@NhanVienIds		NVARCHAR(MAX)	=	NULL
	
		,@COSO_ID			INT				=	NULL
		,@NHANVIEN_ID		INT				=	NULL
		'
		,@search			=	@search
		,@DanhGiaIds		=	@DanhGiaIds
		,@TaiSanIds			=	@TaiSanIds
		,@PhongBanIds		=	@PhongBanIds
		,@NhanVienIds		=	@NhanVienIds
				
		,@COSO_ID			=	@COSO_ID
		,@NHANVIEN_ID		=	@NHANVIEN_ID
--------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DanhGia_GetListNguyenGiaByDanhGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_GetListNguyenGiaByDanhGia]
							 @TaiSanId			=	1065
							,@DanhGiaId			=	NULL
	
							,@COSO_ID			=	1
							,@NHANVIEN_ID		=	7
							,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_DanhGia_GetListNguyenGiaByDanhGia]
	 @TaiSanId			INT				=	NULL
	,@DanhGiaId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@PhongBanId		INT				=	NULL
	
	,@COSO_ID			INT				=	NULL
	,@NHANVIEN_ID		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON
--------------------------------------------------
SELECT		TS.TaiSanId,TS.TenTaiSan,ISNULL(DG_NG.NguonNganSachId,NG.NguonNganSachId) NguonNganSachId,ISNULL(DG_NG.GiaTriCu,NG.GiaTri) GiaTriCu,NG.GiaTri
			,CASE WHEN DG_NG.NguonNganSachId IS NULL THEN 1 ELSE 0 END isCreate
FROM		(	SELECT	DanhGia_NguyenGia.GiaTriCu,DanhGia_NguyenGia.NguonNganSachId,DanhGia.TaiSanId
				FROM	DanhGia_NguyenGia
						LEFT JOIN DanhGia ON DanhGia_NguyenGia.DanhGiaId = DanhGia.DanhGiaId
				WHERE	DanhGia_NguyenGia.DanhGiaId = @DanhGiaId ) DG_NG
			FULL JOIN (	SELECT * 
						FROM NguyenGia 
						WHERE TaiSanId = @TaiSanId ) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
			LEFT JOIN TaiSan TS ON DG_NG.TaiSanId = TS.TaiSanId OR NG.TaiSanId = TS.TaiSanId
WHERE TS.TaiSanId = @TaiSanId
--------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DanhGia_InsertDanhGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @NguyenGiaList dbo.NguyenGiaType
					INSERT INTO @NguyenGiaList VALUES(0,1,9000000)
					INSERT INTO @NguyenGiaList VALUES(0,2,5000000)
					INSERT INTO @NguyenGiaList VALUES(0,3,2000000)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_InsertDanhGia]
				---- THÔNG TIN ĐÁNH GIÁ
					 @DanhGiaId				=	NULL
					,@SoChungTu				=	N'CT0001'
					,@NgayChungTu			=	'2017-09-20'
					,@NgayDanhGia			=	'2017-09-20'
					,@NoiDung				=	NULL
					,@TaiSanId				=	1069
					,@PhongBanId			=	7
					,@NhanVienId			=	4
					,@SLTonCu				=	1
					,@SoNamSuDungCu			=	5
					,@TyLeHaoMonCu			=	20
					,@HaoMonLuyKeCu			=	0
					,@NguoiTao				=	7
					,@NgayTao				=	'2017-09-20'

				---- THÔNG TIN TÀI SẢN MỚI
					,@SoNamSuDung			=	5
					,@TyLeHaoMon			=	20
					,@HaoMonLuyKe			=	0
					,@SLTon					=	1

					,@NguyenGiaList			=	@NguyenGiaList

					,@COSO_ID				=	1
					,@NHANVIEN_ID			=	7
					,@MESSAGE				=	@MESSAGE	OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
/*
DROP TYPE NguyenGiaType
CREATE TYPE NguyenGiaType AS TABLE
( 
	TaiSanId			INT,
	NguonNganSachId		INT,
	GiaTri				numeric(18, 4)
)
*/
CREATE PROCEDURE [dbo].[sp_DanhGia_InsertDanhGia]
---- THÔNG TIN ĐÁNH GIÁ
	 @DanhGiaId				INT				=	NULL
	,@SoChungTu				NVARCHAR(MAX)	=	NULL
	,@NgayChungTu			DATETIME		=	NULL
	,@NgayDanhGia			DATETIME		=	NULL
	,@NoiDung				NVARCHAR(MAX)	=	NULL
	,@TaiSanId				INT				=	NULL
	,@PhongBanId			INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@SLTonCu				NUMERIC(18, 4)	=	NULL
	,@SoNamSuDungCu			INT				=	NULL
	,@TyLeHaoMonCu			NUMERIC(5,2)	=	NULL
	,@HaoMonLuyKeCu			NUMERIC(18,4)	=	NULL
	,@CoSoId				INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL

---- THÔNG TIN TÀI SẢN MỚI
    ,@SoNamSuDung			INT				=	NULL
    ,@TyLeHaoMon			NUMERIC(5,2)	=	NULL
    ,@HaoMonLuyKe			NUMERIC(18,4)	=	NULL
    ,@SLTon					NUMERIC(18,4)	=	NULL

	,@NguyenGiaList		NguyenGiaType			READONLY

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'DG_INSERT'
			,@V_MATAISAN		NVARCHAR(MAX)	=	''

	-- INPUT DEFAULT
	SET @COSO_ID		=	ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID	=	ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@PhongBanId		=	ISNULL(@PhongBanId, 0)
	SET	@NguoiTao		=	ISNULL(@NguoiTao, @NHANVIEN_ID)
	SET	@NgayTao		=	ISNULL(@NgayTao, GETDATE())

BEGIN TRY

BEGIN TRANSACTION @V_TRANS_NAME

	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE	=	N'TaiSanId|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END
	IF @NhanVienId = 0
	BEGIN
		SET @MESSAGE	=	N'NhanVienId|1|Không tìm thấy thông tin nhân viên';
		THROW 51000, @MESSAGE, 1;
	END
	IF @PhongBanId = 0
	BEGIN
		SET @MESSAGE	=	N'PhongBanId|1|Không tìm thấy thông tin phòng ban';
		THROW 51000, @MESSAGE, 1;
	END

	SELECT @SLTonCu			=	ISNULL(TD.SLTon + TD.SLTang - TD.SLGiam, 0)
	FROM TheoDoi TD
	WHERE TD.NhanVienId = @NhanVienId AND TD.PhongBanId = @PhongBanId AND TD.TaiSanId = @TaiSanId

	SELECT	@SoNamSuDungCu = SoNamSuDung
			,@TyLeHaoMonCu = TyLeHaoMon
			,@HaoMonLuyKeCu = HaoMonLuyKe
	FROM	TaiSan
	WHERE	TaiSanId = @TaiSanId

		-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @SLTonCu				= @SLTon				SET @SLTonCu			= NULL
	IF @SoNamSuDungCu		= @SoNamSuDung			SET @SoNamSuDungCu		= NULL
	IF @TyLeHaoMonCu		= @TyLeHaoMon			SET @TyLeHaoMonCu		= NULL
	IF @HaoMonLuyKeCu		= @HaoMonLuyKeCu		SET @HaoMonLuyKeCu		= NULL

	-- INSERT ĐÁNH GIÁ
	INSERT INTO DanhGia	(	SoChungTu	,NgayChungTu	,NgayDanhGia	,NoiDung	,TaiSanId	,PhongBanId		,NhanVienId		,HaoMonLuyKeCu	,SoNamSuDungCu	,TyLeHaoMonCu	,SLTonCu	,CoSoId		,NguoiTao	,NgayTao	)
	VALUES				(	@SoChungTu	,@NgayChungTu	,@NgayDanhGia	,@NoiDung	,@TaiSanId	,@PhongBanId	,@NhanVienId	,@HaoMonLuyKeCu	,@SoNamSuDungCu	,@TyLeHaoMonCu	,@SLTonCu	,@COSO_ID	,@NguoiTao	,@NgayTao	)

	SET @DanhGiaId	=	@@IDENTITY

	-- INSERT ĐÁNH GIÁ NGUYÊN GIÁ TỪ BẢNG NGUYÊN GIÁ
	INSERT INTO DanhGia_NguyenGia	(	DanhGiaId	,NguonNganSachId		,GiaTriCu					)
	SELECT								@DanhGiaId	,NG_NEW.NguonNganSachId	,NG_OLD.GiaTri
	FROM		NguyenGia NG_OLD
				LEFT JOIN @NguyenGiaList NG_NEW ON NG_OLD.TaiSanId = @TaiSanId and NG_NEW.NguonNganSachId = NG_OLD.NguonNganSachId
	WHERE		NG_NEW.GiaTri <> NG_OLD.GiaTri

	INSERT INTO DanhGia_NguyenGia	(	DanhGiaId	,NguonNganSachId		,GiaTriCu					)
	SELECT								@DanhGiaId	,NG_NEW.NguonNganSachId	,NULL
	FROM		NguyenGia NG_OLD
				LEFT JOIN @NguyenGiaList NG_NEW ON NG_OLD.TaiSanId = @TaiSanId and NG_NEW.NguonNganSachId = NG_OLD.NguonNganSachId
	WHERE		NG_NEW.GiaTri = NG_OLD.GiaTri

	-- UPDATE THÔNG TIN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		 SoNamSuDung	=	@SoNamSuDung
			,TyLeHaoMon		=	@TyLeHaoMon
			,HaoMonLuyKe	=	@HaoMonLuyKe
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE NGUYÊN GIÁ MỚI
	 DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId	,GiaTri )
	SELECT					@TaiSanId	,NguonNganSachId	,GiaTri
	FROM @NguyenGiaList

	
	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM DanhGia WHERE DanhGiaId = @DanhGiaId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DanhGia_UpdateDanhGia]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @NguyenGiaList dbo.NguyenGiaType
					INSERT INTO @NguyenGiaList VALUES(0,1,9000000)
					INSERT INTO @NguyenGiaList VALUES(0,2,5000000)
					INSERT INTO @NguyenGiaList VALUES(0,3,2000000)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_UpdateDanhGia]
				---- THÔNG TIN ĐÁNH GIÁ
					 @DanhGiaId				=	NULL
					,@SoChungTu				=	N'CT0001'
					,@NgayChungTu			=	'2017-09-20'
					,@NgayDanhGia			=	'2017-09-20'
					,@NoiDung				=	NULL
					,@TaiSanId				=	1069
					,@PhongBanId			=	7
					,@NhanVienId			=	4
					,@SLTonCu				=	1
					,@SoNamSuDungCu			=	5
					,@TyLeHaoMonCu			=	20
					,@HaoMonLuyKeCu			=	0
					,@NguoiTao				=	7
					,@NgayTao				=	'2017-09-20'

				---- THÔNG TIN TÀI SẢN MỚI
					,@SoNamSuDung			=	5
					,@TyLeHaoMon			=	20
					,@HaoMonLuyKe			=	0
					,@SLTon					=	1

					,@NguyenGiaList			=	@NguyenGiaList

					,@COSO_ID				=	1
					,@NHANVIEN_ID			=	7
					,@MESSAGE				=	@MESSAGE	OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.25 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
/*
DROP TYPE NguyenGiaType
CREATE TYPE NguyenGiaType AS TABLE
( 
	TaiSanId			INT,
	NguonNganSachId		INT,
	GiaTri				numeric(18, 4)
)
*/
CREATE PROCEDURE [dbo].[sp_DanhGia_UpdateDanhGia]
---- THÔNG TIN ĐÁNH GIÁ
	 @DanhGiaId				INT				=	NULL
	,@SoChungTu				NVARCHAR(MAX)	=	NULL
	,@NgayChungTu			DATETIME		=	NULL
	,@NgayDanhGia			DATETIME		=	NULL
	,@NoiDung				NVARCHAR(MAX)	=	NULL
	,@TaiSanId				INT				=	NULL
	,@PhongBanId			INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@SLTonCu				NUMERIC(18, 4)	=	NULL
	,@SoNamSuDungCu			INT				=	NULL
	,@TyLeHaoMonCu			NUMERIC(5,2)	=	NULL
	,@HaoMonLuyKeCu			NUMERIC(18,4)	=	NULL
	,@CoSoId				INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL

---- THÔNG TIN TÀI SẢN MỚI
    ,@SoNamSuDung			INT				=	NULL
    ,@TyLeHaoMon			NUMERIC(5,2)	=	NULL
    ,@HaoMonLuyKe			NUMERIC(18,4)	=	NULL
    ,@SLTon					NUMERIC(18,4)	=	NULL

	,@NguyenGiaList		NguyenGiaType			READONLY

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'DG_UPDATE'
			,@V_MATAISAN		NVARCHAR(MAX)	=	''

	-- INPUT DEFAULT
	SET @COSO_ID		=	ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID	=	ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE		=	ISNULL(@MESSAGE, '')

BEGIN TRY

BEGIN TRANSACTION @V_TRANS_NAME

	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE	=	N'TaiSanId|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END
	IF @NhanVienId = 0
	BEGIN
		SET @MESSAGE	=	N'NhanVienId|1|Không tìm thấy thông tin nhân viên';
		THROW 51000, @MESSAGE, 1;
	END
	IF @PhongBanId = 0
	BEGIN
		SET @MESSAGE	=	N'PhongBanId|1|Không tìm thấy thông tin phòng ban';
		THROW 51000, @MESSAGE, 1;
	END

	-- LÂY THÔNG TIN CŨ TỪ DB
	SELECT	 @SLTonCu		= ISNULL(DG.SLTonCu, ISNULL(TD.SLTon + TD.SLTang - TD.SLGiam, 0))
			,@SoNamSuDungCu = ISNULL(DG.SoNamSuDungCu, TS.SoNamSuDung)
			,@TyLeHaoMonCu	= ISNULL(DG.TyLeHaoMonCu, TS.TyLeHaoMon)
			,@HaoMonLuyKeCu = ISNULL(DG.HaoMonLuyKeCu, TS.HaoMonLuyKe)
	FROM	DanhGia DG
			LEFT JOIN TaiSan TS ON DG.TaiSanId = TS.TaiSanId
			LEFT JOIN TheoDoi TD ON DG.NhanVienId = TD.NhanVienId AND DG.PhongBanId = TD.PhongBanId AND DG.TaiSanId = TD.TaiSanId
	WHERE	DG.DanhGiaId = @DanhGiaId

	-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @SLTonCu				= @SLTon				SET @SLTonCu			= NULL
	IF @SoNamSuDungCu		= @SoNamSuDung			SET @SoNamSuDungCu		= NULL
	IF @TyLeHaoMonCu		= @TyLeHaoMon			SET @TyLeHaoMonCu		= NULL
	IF @HaoMonLuyKeCu		= @HaoMonLuyKe			SET @HaoMonLuyKeCu		= NULL

	-- INSERT ĐÁNH GIÁ
	UPDATE	DanhGia
	SET		 NoiDung		=	@NoiDung
			,SoChungTu		=	@SoChungTu
			,NgayDanhGia	=	@NgayDanhGia
			,NgayChungTu	=	@NgayChungTu
			,HaoMonLuyKeCu	=	@HaoMonLuyKeCu
			,SoNamSuDungCu	=	@SoNamSuDungCu
			,TyLeHaoMonCu	=	@TyLeHaoMonCu
			,SLTonCu		=	@SLTonCu
	WHERE	DanhGiaId = @DanhGiaId

	-- INSERT ĐÁNH GIÁ NGUYÊN GIÁ TỪ BẢNG NGUYÊN GIÁ
	SELECT		TS.TaiSanId,ISNULL(DG_NG.NguonNganSachId,NG.NguonNganSachId) NguonNganSachId,ISNULL(DG_NG.GiaTriCu,NG.GiaTri) GiaTriCu,ng.GiaTri
				,CASE WHEN DG_NG.NguonNganSachId IS NULL THEN 1 ELSE 0 END isCreate
	INTO		#DANHGIA_NGUYENGIA
	FROM		(	SELECT	DanhGia_NguyenGia.GiaTriCu,DanhGia_NguyenGia.NguonNganSachId,DanhGia.TaiSanId
					FROM	DanhGia_NguyenGia
							LEFT JOIN DanhGia ON DanhGia_NguyenGia.DanhGiaId = DanhGia.DanhGiaId
					WHERE	DanhGia_NguyenGia.DanhGiaId = @DanhGiaId ) DG_NG
				FULL JOIN (	SELECT * 
							FROM NguyenGia 
							WHERE TaiSanId = @TaiSanId ) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
				LEFT JOIN TaiSan TS ON DG_NG.TaiSanId = TS.TaiSanId OR NG.TaiSanId = TS.TaiSanId
	WHERE TS.TaiSanId = @TaiSanId

	UPDATE	DG_NG
	SET		NguonNganSachId		=	NG.NguonNganSachId
			,GiaTriCu			=	NG.GiaTriCu
	FROM	DanhGia_NguyenGia DG_NG
			LEFT JOIN(	SELECT	_NG.GiaTriCu, _NGL.GiaTri,_NG.NguonNganSachId,_NG.isCreate
						FROM	#DANHGIA_NGUYENGIA _NG
								 JOIN @NguyenGiaList _NGL ON _NG.NguonNganSachId = _NGL.NguonNganSachId) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
	WHERE	DG_NG.DanhGiaId = @DanhGiaId
			AND NG.isCreate = 0 
			AND ISNULL(NG.GiaTri,0) <> ISNULL(NG.GiaTriCu,0) 
			AND DG_NG.NguonNganSachId = NG.NguonNganSachId

	UPDATE	DG_NG
	SET		NguonNganSachId		=	NG.NguonNganSachId
			,GiaTriCu			=	NULL
	FROM	DanhGia_NguyenGia DG_NG
			LEFT JOIN(	SELECT	_NG.GiaTriCu, _NGL.GiaTri,_NG.NguonNganSachId,_NG.isCreate
						FROM	#DANHGIA_NGUYENGIA _NG
								 JOIN @NguyenGiaList _NGL ON _NG.NguonNganSachId = _NGL.NguonNganSachId) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
	WHERE	DG_NG.DanhGiaId = @DanhGiaId
			AND NG.isCreate = 0 
			AND ISNULL(NG.GiaTri,0) = ISNULL(NG.GiaTriCu,0) 
			AND DG_NG.NguonNganSachId = NG.NguonNganSachId

	-- UPDATE THÔNG TIN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		 SoNamSuDung	=	@SoNamSuDung
			,TyLeHaoMon		=	@TyLeHaoMon
			,HaoMonLuyKe	=	@HaoMonLuyKe
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE NGUYÊN GIÁ MỚI
	 DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId	,GiaTri )
	SELECT					@TaiSanId	,NguonNganSachId	,GiaTri
	FROM @NguyenGiaList

	
	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	IF OBJECT_ID('tempdb..#DANHGIA_NGUYENGIA') IS NOT NULL
		DROP TABLE #DANHGIA_NGUYENGIA

	SELECT * FROM DanhGia WHERE DanhGiaId = @DanhGiaId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_DeleteDeNghiTrangCapById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DeNghiTrangCap_DeleteDeNghiTrangCapById]
	@DeNghiId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.DeNghiTrangCapChiTiet WHERE DeNghiId = @DeNghiId
			DELETE dbo.DeNghiTrangCap WHERE DeNghiId = @DeNghiId
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)	
	, @SoPhieu		    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @PhongBanId		NVARCHAR(MAX)	
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------


	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0019',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, H.DeNghiId, H.Ngay, H.SoPhieu, H.PhanLoaiId, PL.TenPhanLoai, H.PhongBanId,ISNULL(PB.TenPhongBan,cs.TenCoSo) as TenPhongBan, H.NoiDung, H.CoSoId,
			H.DuyetId,H.NoiDungDuyet,D.TrangThai,H.NguoiTao,H.GuiCapTren,nv.TenNhanVien TenNhanVien,H.NgayTao,H.CtrVersion
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	LEFT JOIN dbo.CoSo cs ON cs.CoSoId = h.CoSoId
	WHERE 1 = 1 and CAST(Ngay AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	IF @PhongBanId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and  h.PhongBanId in (' + @PhongBanId + ')';
	END

	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and  H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY  H.Ngay desc,' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByDeNghiId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByDeNghiId]
( 
	@DeNghiId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.DeNghiId, 
			Convert(varchar,H.Ngay,103) Ngay, 
			H.SoPhieu, 
			CAST(H.PhanLoaiId AS VARCHAR) PhanLoaiId, 
			PL.TenPhanLoai, 
			CAST(H.PhongBanId AS VARCHAR) PhongBanId, 
			PB.TenPhongBan, 
			H.NoiDung,H.DuyetId,H.NoiDungDuyet,D.TrangThai
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ON NguoiDung.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	WHERE H.DeNghiId = @DeNghiId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*

EXEC [dbo].[sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById] @DeNghiId = 5 -- int

*/

CREATE PROC [dbo].[sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById]
( 
	@DeNghiId NVARCHAR(10)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	CS.MaCoSo, CS.TenCoSo,
			CONVERT(varchar,H.Ngay,103) Ngay, 
			H.SoPhieu, PL.TenPhanLoai, PB.TenPhongBan, 
			H.NoiDung, H.NoiDungDuyet, D.TrangThai,
			----------------------------------------------line
			l.TenTaiSan, L.MoTa, L.NgayDeNghi, L.SoLuong, L.DonViTinh, 
			L.DuToan, L.DuToanDuocDuyet, pt.TenPhuongThuc, L.GhiChu

	FROM dbo.DeNghiTrangCap H 
	JOIN dbo.DeNghiTrangCapChiTiet L ON L.DeNghiId = H.DeNghiId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	LEFT JOIN dbo.PhuongThuc PT ON PT.PhuongThucId = L.PhuongThucId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.DeNghiId = @DeNghiId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetTongHopDeNghiTrangCapByDeNghiId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DeNghiTrangCap_GetTongHopDeNghiTrangCapByDeNghiId]
( 
	@DeNghiId varchar(max)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	declare @query varchar(max)=null;
	set @query = 'SELECT CT.DeNghiChiTietId,
			CT.DeNghiId,
			ct.LoaiId,
			LTS.TenLoai,
			CT.TenTaiSan,
			CT.MoTa,
			LTS.TenLoai,
			CT.SoLuong,
			CT.DonViTinh,
			CAST(ct.PhuongThucId AS VARCHAR)PhuongThucId,
			PT.TenPhuongThuc,
			CONVERT(VARCHAR, CT.NgayDeNghi,103) NgayDeNghi,
			CT.DuToan,
			CT.DuToanDuocDuyet,
			CT.GhiChu,ct.DuyetId
	FROM dbo.DeNghiTrangCapChiTiet CT
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = CT.LoaiId
	LEFT JOIN dbo.PhuongThuc PT ON PT.PhuongThucId = CT.PhuongThucId
	WHERE 	CONVERT(VARCHAR, CT.DeNghiId)  in ( '+@DeNghiId+')';
	execute(@query);

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_InsertDeNghiTrangCap]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DeNghiTrangCap_InsertDeNghiTrangCap]
	@NgayLap DATETIME
	,@SoPhieu NVARCHAR(50)
	,@PhanLoaiId INT
	,@PhongBanId INT
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
	,@GuiCapTren INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	if(@PhongBanId = 0) SET @PhongBanId = NULL
	if(@GuiCapTren = 0) SET @GuiCapTren = NULL
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DeNghiTrangCap
			        ( Ngay ,			SoPhieu ,			PhanLoaiId ,
			          PhongBanId ,		NoiDung ,			CoSoId ,
			          DuyetId ,			NguoiDuyet ,		NguoiTao ,
			          NgayTao ,			CtrVersion,GuiCapTren
			        )
			SELECT	 @NgayLap			,@SoPhieu			,@PhanLoaiId
					 ,@PhongBanId		,@NoiDung			,@CoSoId
					 ,0					,0					,@NhanVienId
					 ,GETDATE()			,1, @GuiCapTren

			SELECT SCOPE_IDENTITY() AS DeNghiIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_UpdateDeNghiTrangCap]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DeNghiTrangCap_UpdateDeNghiTrangCap]
	@DeNghiId INT
	,@NgayLap DATETIME
	,@SoPhieu NVARCHAR(50)
	,@PhanLoaiId INT
	,@PhongBanId INT
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.DeNghiTrangCap
			SET Ngay = @NgayLap
				,PhanLoaiId = @PhanLoaiId
				,PhongBanId = @PhongBanId
				,NoiDung = @NoiDung
			WHERE DeNghiId = @DeNghiId

			DELETE dbo.DeNghiTrangCapChiTiet WHERE DeNghiId = @DeNghiId

			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCapChiTiet_GetDeNghiTrangCapChiTietByDeNghiId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_DeNghiTrangCapChiTiet_GetDeNghiTrangCapChiTietByDeNghiId]
	@DeNghiId INT
AS  
BEGIN
SET NOCOUNT ON  
	
	SELECT CT.DeNghiChiTietId,
			CT.DeNghiId,
			ct.LoaiId,
			LTS.TenLoai,
			CT.TenTaiSan,
			CT.MoTa,
			LTS.TenLoai,
			CT.SoLuong,
			CT.DonViTinh,
			CAST(ct.PhuongThucId AS VARCHAR)PhuongThucId,
			PT.TenPhuongThuc,
			CONVERT(VARCHAR, CT.NgayDeNghi,103) NgayDeNghi,
			CT.DuToan,
			CT.DuToanDuocDuyet,
			CT.GhiChu,ct.DuyetId
	FROM dbo.DeNghiTrangCapChiTiet CT
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = CT.LoaiId
	LEFT JOIN dbo.PhuongThuc PT ON PT.PhuongThucId = CT.PhuongThucId
	WHERE CT.DeNghiId = @DeNghiId
	
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCapChiTiet_InsertDeNghiTrangCapChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DeNghiTrangCapChiTiet_InsertDeNghiTrangCapChiTiet]
	@DeNghiId INT
	,@TenTaiSan NVARCHAR(max)
	,@MoTa NVARCHAR(500)
	,@LoaiId INT
	,@SoLuong NUMERIC(4,0)
	,@DonViTinh NVARCHAR(50)
	,@PhuongThucId INT
	,@NgayDeNghi DATETIME
	,@DuToan NUMERIC(18,4)
	,@DuToanDuocDuyet NUMERIC(18,4)
	,@GhiChu NVARCHAR(max)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DeNghiTrangCapChiTiet
			        (
			          DeNghiId ,			TenTaiSan ,				MoTa ,
			          LoaiId ,				SoLuong ,				DonViTinh ,
			          PhuongThucId ,		NgayDeNghi ,			DuToan ,
			          DuToanDuocDuyet ,		GhiChu
			        )
			SELECT	@DeNghiId				,@TenTaiSan				,@MoTa
					,@LoaiId				,@SoLuong				,@DonViTinh
					,@PhuongThucId			,@NgayDeNghi			,@DuToan
					,@DuToanDuocDuyet		,@GhiChu			

			SELECT SCOPE_IDENTITY()
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_DeleteDieuChuyenyId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DieuChuyen_DeleteDieuChuyenyId]
	@DieuChuyenId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	DECLARE @V_TB_DIEUCHUYENCT TABLE
	(
		ROWID INT IDENTITY(1,1),
		TAISANID INT,
		PHONGBANSUDUNG INT,
		NHANVIENSUDUNG INT,
		PHONGBANCHUYENDEN INT,
		NHANVIENTIEPNHAN INT,
		SOLUONG NUMERIC(18,4)
	)

	DECLARE @V_ROWID INT,
			@V_TAISANID INT,
			@V_PHONGBANSUDUNG INT,
			@V_NHANVIENSUDUNG INT,
			@V_PHONGBANCHUYENDEN INT,
			@V_NHANVIENTIEPNHAN INT,
			@V_SOLUONG NUMERIC(18,4)

	BEGIN TRAN
		
		BEGIN TRY
			
			/*
				. cập nhật lại số lượng tăng, giảm bảng theo dõi
			*/

			INSERT @V_TB_DIEUCHUYENCT(TAISANID ,PHONGBANSUDUNG ,NHANVIENSUDUNG, PHONGBANCHUYENDEN ,NHANVIENTIEPNHAN ,SOLUONG)
			SELECT TaiSanId, PhongBanSuDung, NhanVienSuDung, PhongBanChuyenDen, NhanVienTiepNhan, SoLuong
			FROM dbo.DieuChuyenChiTiet WHERE DieuChuyenId = @DieuChuyenId

			WHILE EXISTS(SELECT 1 FROM @V_TB_DIEUCHUYENCT)
			BEGIN
				SELECT TOP 1 @V_ROWID = ROWID, @V_TAISANID = TAISANID, @V_PHONGBANSUDUNG = PHONGBANSUDUNG, @V_NHANVIENSUDUNG = NHANVIENSUDUNG, @V_PHONGBANCHUYENDEN = PHONGBANCHUYENDEN, @V_NHANVIENTIEPNHAN = NHANVIENTIEPNHAN, @V_SOLUONG = SOLUONG FROM @V_TB_DIEUCHUYENCT

				-- cập nhật sl phòng sử dụng
				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENSUDUNG AND PhongBanId = @V_PHONGBANSUDUNG )
				BEGIN
					UPDATE dbo.TheoDoi SET SLGiam = SLGiam - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENSUDUNG AND PhongBanId = @V_PHONGBANSUDUNG 
				END

				-- cập nhật sl phòng chuyển đến
				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENTIEPNHAN AND PhongBanId = @V_PHONGBANCHUYENDEN )
				BEGIN
					UPDATE dbo.TheoDoi SET SLTang = SLTang - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENTIEPNHAN AND PhongBanId = @V_PHONGBANCHUYENDEN 
				END
				

				DELETE @V_TB_DIEUCHUYENCT WHERE ROWID = @V_ROWID
				SELECT @V_ROWID = NULL,@V_TAISANID = NULL,@V_PHONGBANSUDUNG = NULL,@V_NHANVIENSUDUNG = NULL,@V_PHONGBANCHUYENDEN = NULL, @V_NHANVIENTIEPNHAN=NULL, @V_SOLUONG = NULL
			END

			DELETE dbo.DieuChuyenChiTiet WHERE DieuChuyenId = @DieuChuyenId
			DELETE dbo.DieuChuyen WHERE DieuChuyenId = @DieuChuyenId
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_GetListDieuChuyenByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DieuChuyen_GetListDieuChuyenByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)	
	, @SoChungTu	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null			
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------


	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0025',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------
	
    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, H.DieuChuyenId, H.SoChungTu, H.NgayDieuChuyen,H.NgayChungTu, H.GhiChu, H.DuyetId,H.NguoiDuyet, nd.TenNhanVien TenNguoiDuyet,
			H.CoSoId, H.NguoiTao, nv.TenNhanVien TenNguoiTao, H.NgayTao, H.CtrVersion
	FROM dbo.DieuChuyen H
	LEFT JOIN NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN NhanVien nd ON nd.NhanVienId = H.NguoiDuyet 
	WHERE CAST(H.NgayDieuChuyen AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	

	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_GetListDieuChuyenByDieuChuyenId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DieuChuyen_GetListDieuChuyenByDieuChuyenId]
( 
	@DieuChuyenId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT H.DieuChuyenId,
			H.SoChungTu,
			CONVERT(VARCHAR, H.NgayChungTu,103)NgayChungTu,
			CONVERT(VARCHAR, H.NgayDieuChuyen,103)NgayDieuChuyen,
			H.GhiChu
	FROM dbo.DieuChuyen H
	WHERE H.DieuChuyenId = @DieuChuyenId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_GetListReportDieuChuyenByDieuChuyenId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*

EXEC dbo.sp_DieuChuyen_GetListReportDieuChuyenByDieuChuyenId @DieuChuyenId = N'6' -- nvarchar(10)

*/


CREATE PROC [dbo].[sp_DieuChuyen_GetListReportDieuChuyenByDieuChuyenId]
( 
	@DieuChuyenId NVARCHAR(10)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	CS.MaCoSo, CS.TenCoSo,
			H.SoChungTu,
			H.NgayChungTu,
			H.NgayDieuChuyen,
			H.GhiChu,
			----------------------------------------------------line
			TS.TenTaiSan, TS.DonViTinh, PBSD.TenPhongBan PhongBanSuDung, PBCD.TenPhongBan PhongBanChuyenDen,
			NVSD.TenNhanVien NhanVienSuDung, NVTN.TenNhanVien NhanVienTiepNhan,
			L.SoLuong, L.LyDo

	FROM dbo.DieuChuyen H
	JOIN dbo.DieuChuyenChiTiet L ON L.DieuChuyenId = H.DieuChuyenId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.PhongBan PBSD ON PBSD.PhongBanId = L.PhongBanSuDung
	LEFT JOIN dbo.PhongBan PBCD ON PBCD.PhongBanId = L.PhongBanChuyenDen
	LEFT JOIN dbo.NhanVien NVSD ON NVSD.NhanVienId = L.NhanVienSuDung
	LEFT JOIN dbo.NhanVien NVTN ON NVTN.NhanVienId = L.NhanVienTiepNhan
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.DieuChuyenId = @DieuChuyenId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_InsertDieuChuyen]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_DieuChuyen_InsertDieuChuyen]
	@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayDieuChuyen datetime
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DieuChuyen
			        ( SoChungTu ,		NgayChungTu ,		NgayDieuChuyen ,
			          GhiChu ,			DuyetId ,			NguoiDuyet ,
			          CoSoId ,			NguoiTao ,			NgayTao ,
			          CtrVersion
			        )
			SELECT	@SoChungTu			,@NgayChungTu		,@NgayDieuChuyen
					,@GhiChu			,0					,0
					,@CoSoId			,@NhanVienId		,GETDATE()
					,1

			SELECT SCOPE_IDENTITY() AS DieuChuyenIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_UpdateDieuChuyen]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_DieuChuyen_UpdateDieuChuyen]
	@DieuChuyenId INT
	,@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayDieuChuyen datetime
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	DECLARE @V_TB_DIEUCHUYENCT TABLE
	(
		ROWID INT IDENTITY(1,1),
		TAISANID INT,
		PHONGBANSUDUNG INT,
		NHANVIENSUDUNG INT,
		PHONGBANCHUYENDEN INT,
		NHANVIENTIEPNHAN INT,
		SOLUONG NUMERIC(18,4)
	)

	DECLARE @V_ROWID INT,
			@V_TAISANID INT,
			@V_PHONGBANSUDUNG INT,
			@V_NHANVIENSUDUNG INT,
			@V_PHONGBANCHUYENDEN INT,
			@V_NHANVIENTIEPNHAN INT,
			@V_SOLUONG NUMERIC(18,4)

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.DieuChuyen
			SET NgayChungTu = @NgayChungTu
				,NgayDieuChuyen = @NgayDieuChuyen
				,GhiChu = @GhiChu
			WHERE DieuChuyenId = @DieuChuyenId

			/*
				. cập nhật lại số lượng tăng, giảm bảng theo dõi
			*/

			INSERT @V_TB_DIEUCHUYENCT(TAISANID ,PHONGBANSUDUNG ,NHANVIENSUDUNG, PHONGBANCHUYENDEN ,NHANVIENTIEPNHAN ,SOLUONG)
			SELECT TaiSanId, PhongBanSuDung, NhanVienSuDung, PhongBanChuyenDen, NhanVienTiepNhan, SoLuong
			FROM dbo.DieuChuyenChiTiet WHERE DieuChuyenId = @DieuChuyenId

			WHILE EXISTS(SELECT 1 FROM @V_TB_DIEUCHUYENCT)
			BEGIN
				SELECT TOP 1 @V_ROWID = ROWID, @V_TAISANID = TAISANID, @V_PHONGBANSUDUNG = PHONGBANSUDUNG, @V_NHANVIENSUDUNG = NHANVIENSUDUNG, @V_PHONGBANCHUYENDEN = PHONGBANCHUYENDEN, @V_NHANVIENTIEPNHAN = NHANVIENTIEPNHAN, @V_SOLUONG = SOLUONG FROM @V_TB_DIEUCHUYENCT

				-- cập nhật sl phòng sử dụng
				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENSUDUNG AND PhongBanId = @V_PHONGBANSUDUNG )
				BEGIN
					UPDATE dbo.TheoDoi SET SLGiam = SLGiam - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENSUDUNG AND PhongBanId = @V_PHONGBANSUDUNG 
				END

				-- cập nhật sl phòng chuyển đến
				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENTIEPNHAN AND PhongBanId = @V_PHONGBANCHUYENDEN )
				BEGIN
					UPDATE dbo.TheoDoi SET SLTang = SLTang - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENTIEPNHAN AND PhongBanId = @V_PHONGBANCHUYENDEN 
				END
				

				DELETE @V_TB_DIEUCHUYENCT WHERE ROWID = @V_ROWID
				SELECT @V_ROWID = NULL,@V_TAISANID = NULL,@V_PHONGBANSUDUNG = NULL,@V_NHANVIENSUDUNG = NULL,@V_PHONGBANCHUYENDEN = NULL, @V_NHANVIENTIEPNHAN=NULL, @V_SOLUONG = NULL
			END


			DELETE dbo.DieuChuyenChiTiet WHERE DieuChuyenId = @DieuChuyenId

			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyenChiTiet_GetDieuChuyenChiTietByDieuChuyenId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_DieuChuyenChiTiet_GetDieuChuyenChiTietByDieuChuyenId]
	@DieuChuyenId INT
AS  
BEGIN
SET NOCOUNT ON  

	SELECT ct.DieuChuyenChiTietId,
			ct.DieuChuyenId,
			CAST(ct.TaiSanId AS VARCHAR)TaiSanId,
			ts.MaTaiSan,
			ts.TenTaiSan,
			ts.DonViTinh,
			CAST(ct.PhongBanSuDung AS VARCHAR)PhongBanSuDung,
			pbsd.TenPhongBan TenPhongBanSuDung,
			CAST(ct.NhanVienSuDung AS VARCHAR)NhanVienSuDung,
			nvsd.TenNhanVien TenNhanVienSuDung,
			CAST(ct.PhongBanChuyenDen AS VARCHAR)PhongBanChuyenDen,
			pbcd.TenPhongBan TenPhongBanChuyenDen,
			CAST(ct.NhanVienTiepNhan AS VARCHAR)NhanVienTiepNhan,
			nvtn.TenNhanVien TenNhanVienTiepNhan,
			ct.SoLuong,
			ISNULL(td.SLTon + td.SLTang - td.SLGiam,0)SoLuongTon,
			ct.LyDo
	FROM dbo.DieuChuyenChiTiet ct
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.PhongBan pbsd ON pbsd.PhongBanId = ct.PhongBanSuDung
	LEFT JOIN dbo.PhongBan pbcd ON pbcd.PhongBanId = ct.PhongBanChuyenDen
	LEFT JOIN dbo.NhanVien nvsd ON nvsd.NhanVienId = ct.NhanVienSuDung
	LEFT JOIN dbo.NhanVien nvtn ON nvtn.NhanVienId = ct.NhanVienTiepNhan
	LEFT JOIN dbo.TheoDoi td ON td.TaiSanId = ts.TaiSanId AND td.PhongBanId = ct.PhongBanSuDung AND td.NhanVienId = ct.NhanVienSuDung
	WHERE ct.DieuChuyenId = @DieuChuyenId


SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyenChiTiet_InsertDieuChuyenChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DieuChuyenChiTiet_InsertDieuChuyenChiTiet]
	@DieuChuyenId INT
	,@TaiSanId INT
	,@PhongBanSuDung INT
	,@NhanVienSuDung INT
	,@PhongBanChuyenDen INT
	,@NhanVienTiepNhan INT
	,@SoLuong NUMERIC(18,4)
	,@LyDo NVARCHAR(max)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_NGAYDIEUCHUYEN DATETIME

	SELECT @V_NGAYDIEUCHUYEN = NgayDieuChuyen FROM dbo.DieuChuyen WHERE DieuChuyenId = @DieuChuyenId

	BEGIN TRAN
		BEGIN TRY
			
			INSERT dbo.DieuChuyenChiTiet( DieuChuyenId ,	TaiSanId ,	PhongBanSuDung ,	NhanVienSuDung,		PhongBanChuyenDen ,		NhanVienTiepNhan,	SoLuong ,	LyDo)
			SELECT						@DieuChuyenId,		@TaiSanId,	@PhongBanSuDung,	@NhanVienSuDung,	@PhongBanChuyenDen,		@NhanVienTiepNhan,	@SoLuong,	@LyDo

			/*
				.  giảm số lượng phòng sử dụng
				.  ghi tăng số lượng phòng chuyển đến
			*/

			--------- giảm phòng su dung
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienSuDung AND PhongBanId = @PhongBanSuDung)
			BEGIN
				UPDATE dbo.TheoDoi SET SLGiam = SLGiam + @SoLuong WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienSuDung AND PhongBanId = @PhongBanSuDung
			END
			

			--------- tăng phòng chuyển đến
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienTiepNhan AND PhongBanId = @PhongBanChuyenDen)
			BEGIN
				UPDATE dbo.TheoDoi SET SLTang = SLTang + @SoLuong WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienTiepNhan AND PhongBanId = @PhongBanChuyenDen
			END
			ELSE
			BEGIN
				INSERT dbo.TheoDoi
						( 
							TaiSanId ,			NgayTrangCap ,			NgayBatDauSuDung ,		PhongBanId ,			
							NhanVienId ,		SLTon ,					SLTang ,				SLGiam,
							NgayGhiTang
						)
				SELECT		@TaiSanId			,@V_NGAYDIEUCHUYEN		,@V_NGAYDIEUCHUYEN		,@PhongBanChuyenDen
							,@NhanVienTiepNhan	,0						,@SoLuong				,0
							,@V_NGAYDIEUCHUYEN
			END

			SELECT SCOPE_IDENTITY()
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DuAn_cbxDuAnByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_DuAn_cbxDuAnByCriteria]
						 @Search			=	N''
						,@DuAnId			=	N''
						,@MaDuAn			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROC [dbo].[sp_DuAn_cbxDuAnByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL	
	,@DuAnId	        INT				=	NULL			
	,@MaDuAn	        NVARCHAR(500)	=	NULL			
	,@CoSoId	        NVARCHAR(500)	=	NULL			
	,@NhanVienId	    NVARCHAR(500)	=	NULL		
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search		=	ISNULL(@Search,'')
	SET @DuAnId		=	ISNULL(@DuAnId, 0)
	SET @MaDuAn		=	ISNULL(@MaDuAn,'')

	SELECT TOP 10 DA.*
	FROM	DuAn DA
	WHERE	(@DuAnId = 0 OR DA.DuAnId = @DuAnId)
			AND (@MaDuAn = '' OR DA.MaDuAn = @MaDuAn)
			AND (@Search = '' OR DA.MaDuAn LIKE N'%' + @Search + '%' OR DA.TenDuAn LIKE N'%' + @Search + '%')

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuAn_GetListDuAnByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_DuAn_GetListDuAnByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------


		DECLARE @IS_VIEW varchar(10) = '0'
		   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		  @NHAN_VIEN_ID = @NhanVienId,
		  @CO_SO_ID = @CoSoId,
		  @CHUC_NANG = 'CN0004',
		  @QUYEN=@IS_VIEW OUTPUT
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.DuAnId,a.MaDuAn,a.TenDuAn,a.GhiChu,nv.TenNhanVien as HoTen,a.NgayTao
	FROM DuAn a LEFT JOIN NhanVien nv on a.NguoiTao=nv.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaDuAn LIKE N''%' +@Search+ '%'' OR TenDuAn LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
 END
   IF @IS_VIEW = 'VR' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
 END
  IF @IS_VIEW = 'VE' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
 END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetCap_Duyet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create PROC [dbo].[sp_DuyetCap_Duyet]
( 
	  @DeNghiId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	, @NgayDuyet		DATETIME		= null		
	, @NguoiDuyet		nvarchar(500)	= null		
	, @NoiDungDuyet		NVARCHAR(MAX)	= null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update DeNghiTrangCap set DuyetId = @DuyetId, NgayDuyet= @NgayDuyet, NguoiDuyet = @NguoiDuyet, NoiDungDuyet=@NoiDungDuyet where DeNghiId =  @DeNghiId
select * from DeNghiTrangCap where  DeNghiId =  @DeNghiId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetCap_DuyetChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DuyetCap_DuyetChiTiet]
( 
	  @DeNghiChiTietId  nvarchar(500)	= null	
	, @DeNghiId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update DeNghiTrangCapChiTiet set DuyetId = @DuyetId where DeNghiId =  @DeNghiId and DeNghiChiTietId = @DeNghiChiTietId
declare @check int = 0;
set @check = (select count(*) from DeNghiTrangCapChiTiet where  DeNghiId =  @DeNghiId  and (DuyetId not in (1,2)  or DuyetId is null))
if(@check = 0)
begin
	declare @Duyet int = 0;
	set @Duyet = (select count(*) from DeNghiTrangCapChiTiet where  DeNghiId =  @DeNghiId  and DuyetId  = 1 )
	if(@Duyet> 0 )
	Update DeNghiTrangCap set DuyetId = 1 where DeNghiId =  @DeNghiId 
	else 
	Update DeNghiTrangCap set DuyetId = 2 where DeNghiId =  @DeNghiId 
end
select ISNULL(DuyetId,0) as DuyetId  from DeNghiTrangCap where  DeNghiId =  @DeNghiId 
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetCap_GetListDuyetCapByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DuyetCap_GetListDuyetCapByCriteria]
( 
	  @CoSoId	        nvarchar(10)	
	, @SoPhieu		    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @PhongBanId		NVARCHAR(MAX)	
	, @DuyetId			nvarchar(10)				= null	
	, @LoginId			nvarchar(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

		DECLARE @IS_VIEW varchar(10) = '0'
		exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0029',
		@QUYEN=@IS_VIEW OUTPUT
		PRINT(@CoSoId);
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, H.DeNghiId, H.Ngay, H.SoPhieu, H.PhanLoaiId, PL.TenPhanLoai, H.PhongBanId, ISNULL(PB.TenPhongBan,cs.TenCoSo) as TenPhongBan ,cs.TenCoSo, H.NoiDung, H.CoSoId,
			H.DuyetId,H.NoiDungDuyet,D.TrangThai,H.NguoiTao,nv.TenNhanVien,H.NgayTao,H.CtrVersion
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	LEFT JOIN dbo.CoSo cs ON cs.CoSoId = h.CoSoId
	WHERE 1 = 1 and CAST(Ngay AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	IF @PhongBanId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and  h.PhongBanId in (' + @PhongBanId + ')';
	END

	IF @DuyetId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and H.DuyetId in ('+@DuyetId+')';
	END
	IF @IS_VIEW = 'VA' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and ( H.CoSoId =''' + @CoSoId + ''' or H.GuiCapTren = 1)';   
	END
		IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and h.CoSoId =''' + @CoSoId + '''';   
	END
		IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
		IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END


	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY H.Ngay desc' ;

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetCapChiTiet_GetDuyetCapChiTietByDeNghiId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_DuyetCapChiTiet_GetDuyetCapChiTietByDeNghiId]
	@DeNghiId INT
AS  
BEGIN
SET NOCOUNT ON  
	
	SELECT CT.DeNghiChiTietId,
			CT.DeNghiId,
			ct.LoaiId,
			LTS.TenLoai,
			CT.TenTaiSan,
			CT.MoTa,
			LTS.TenLoai,
			CT.SoLuong,
			CT.DonViTinh,
			CAST(ct.PhuongThucId AS VARCHAR)PhuongThucId,
			PT.TenPhuongThuc,
			CONVERT(VARCHAR, CT.NgayDeNghi,103) NgayDeNghi,
			CT.DuToan,
			CT.DuToanDuocDuyet,
			CT.GhiChu,
			CT.DuyetId
	FROM dbo.DeNghiTrangCapChiTiet CT
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = CT.LoaiId
	LEFT JOIN dbo.PhuongThuc PT ON PT.PhuongThucId = CT.PhuongThucId
	WHERE CT.DeNghiId = @DeNghiId
	
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetMua_Duyet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DuyetMua_Duyet]
( 
	  @MuaSamId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	, @NgayDuyet		DATETIME		= null		
	, @NguoiDuyet		nvarchar(500)	= null		
	, @NoiDungDuyet		NVARCHAR(MAX)	= null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update KeHoachMuaSam set DuyetId = @DuyetId, NgayDuyet= @NgayDuyet, NguoiDuyet = @NguoiDuyet, NoiDungDuyet=@NoiDungDuyet where MuaSamId =  @MuaSamId
select * from KeHoachMuaSam where  MuaSamId =  @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetMua_DuyetChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DuyetMua_DuyetChiTiet]
( 
	  @MuaSamChiTietId  nvarchar(500)	= null	
	, @MuaSamId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update KeHoachMuaSamChiTiet set DuyetId = @DuyetId where MuaSamId =  @MuaSamId and MuaSamChiTietId = @MuaSamChiTietId
declare @check int = 0;
set @check = (select COUNT(*) from KeHoachMuaSamChiTiet where  MuaSamId =  @MuaSamId  and (DuyetId not in (1,2) or DuyetId is null))
if(@check = 0)
begin
	declare @Duyet int = 0;
	set @Duyet = (select count(*) from KeHoachMuaSamChiTiet where  MuaSamId =  @MuaSamId  and DuyetId  = 1 )
	if(@Duyet> 0 )
	Update KeHoachMuaSam set DuyetId = 1 where MuaSamId =  @MuaSamId 
	else 
	Update KeHoachMuaSam set DuyetId = 2 where MuaSamId =  @MuaSamId 
end
select ISNULL(DuyetId,0) as DuyetId  from KeHoachMuaSam where  MuaSamId =  @MuaSamId 
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetMua_GetDuyetMuaChiTietByMuaSamId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_DuyetMua_GetDuyetMuaChiTietByMuaSamId]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.MuaSamId,a.MuaSamChiTietId,a.TenTaiSan,a.LoaiId,b.TenLoai,CAST(c.PhuongThucId AS VARCHAR) PhuongThucId, c.TenPhuongThuc,a.DonViTinh,a.MoTa,Convert(varchar(10),CONVERT(date,a.Ngay,106),103) AS Ngay,a.SoLuong,a.DonGia,CAST(d.HinhThucId AS VARCHAR) HinhThucId,d.TenHinhThuc,a.DuToan,a.GhiChu,a.DuyetId  from KeHoachMuaSamChiTiet  a 
	left join LoaiTaiSan b on a.LoaiId=b.LoaiId left join PhuongThuc c on a.PhuongThucId=c.PhuongThucId left join HinhThuc d on a.HinhThucId=d.HinhThucId
	where MuaSamId= @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuyetMua_GetListDuyetMuaByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_DuyetMua_GetListDuyetMuaByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null	
	, @DuyetId			nvarchar(500)	= null			
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
		exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NhanVienId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0030',
		@QUYEN=@IS_VIEW OUTPUT
		PRINT(@IS_VIEW);

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.*,b.TrangThai,cs.TenCoSo
	FROM KeHoachMuaSam a 
	LEFT JOIN dbo.Duyet b ON b.DuyetId = a.DuyetId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = a.NguoiTao 
	LEFT JOIN dbo.CoSo cs ON cs.CoSoId = a.CoSoId
	where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (Nam LIKE N''%' +@Search+ '%'' OR NoiDung LIKE  N''%' +@Search+ '%'')';

	IF @DuyetId > ''
	SET @V_SQL = @V_SQL + ' and a.DuyetId in (' +@DuyetId+ ')';

	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
	END
		IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
	END
		IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
	END
	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY a.Nam desc';

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiam_DeleteGhiGiamById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiGiam_DeleteGhiGiamById]
( 
	  @GhiGiamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	Delete GhiGiam where GhiGiamId = @GhiGiamId
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiam_GetListGhiGiamByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiGiam_GetListGhiGiamByCriteria]
( 
@CoSoId	        nvarchar(500)	= null			
, @NhanVienId	    nvarchar(500)	= null		
, @SoChungTu		nvarchar(500)   = null	
, @TuNgay			nvarchar(500)   = null	
, @DenNgay			nvarchar(500)   = null	
, @PhongBanId			nvarchar(500)	= null			
, @OrderClause		nvarchar(500)	= null				
, @SKIP				int				= null				-- Số dòng skip (để phân trang)
, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
DECLARE @V_SQL NVARCHAR(4000) 

----------
DECLARE @IS_VIEW varchar(10) = '0'
exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
@NHAN_VIEN_ID = @NhanVienId,
@CO_SO_ID = @CoSoId,
@CHUC_NANG = 'CN0023',
@QUYEN=@IS_VIEW OUTPUT


-- Chuẩn bị biến @Skip & @Take
IF (@SKIP IS NULL)
SET @SKIP = 0;

IF (@TAKE IS NULL)
SET @TAKE = 50;
----------

-- Chuẩn bị biến @ORDER_CLAUSE
IF (@OrderClause IS NULL)
SET @OrderClause = ' MAXCNT ';

IF (@OrderClause = '')
SET @OrderClause = ' MAXCNT ';
----------

    
---- Xây dựng nội dung câu SQL  
-- selects all rows from the table according to search criteria
SET @V_SQL = N'
SELECT COUNT(*) OVER () AS MAXCNT,a.GhiGiamId,a.SoChungTu,a.NgayChungTu,a.NgayGhiGiam,a.PhongBanId,c.TenPhongBan,a.NoiDung,isnull(SUM(NG.GiaTri),0) TongNguyenGia,a.DuyetId, a.NguoiDuyet,a.CoSoId, a.NguoiTao, a.NgayTao,ndd.HoTen,nd.HoTen 
FROM GhiGiam a 
LEFT JOIN GhiGiamChiTiet b ON a.GhiGiamId =b.GhiGiamId
LEFT join PhongBan c on a.PhongBanId=c.PhongBanId 
LEFT JOIN TaiSan TS ON TS.TaiSanId = b.TaiSanId
LEFT JOIN NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
LEFT JOIN QLTS_MAIN.dbo.NguoiDung nd ON nd.NhanVienId = a.NguoiTao
LEFT JOIN QLTS_MAIN.dbo.NguoiDung ndd ON ndd.NhanVienId = a.NguoiDuyet
LEFT JOIN NhanVien nv ON nv.NhanVienId = a.NguoiTao
where 1=1 ' 

-- Build Where clause
-- Where clause Quick search
IF (@SoChungTu > '')
BEGIN
SET @V_SQL = @V_SQL + ' and (a.SoChungTu LIKE N''%' +@SoChungTu+ '%'') ';
END

IF (@PhongBanId > '')
BEGIN
SET @V_SQL = @V_SQL + ' and a.PhongBanId in ('+@PhongBanId+') ';
END

IF( @TuNgay <> '' AND @DenNgay <> '')
BEGIN 
SET @V_SQL = @V_SQL + ' and a.NgayGhiGiam BETWEEN  ''' + @TuNgay + ''' AND '''+ @DenNgay + '''';
END
ELSE IF @TuNgay <> ''
BEGIN
SET @V_SQL = @V_SQL + ' and  a.NgayGhiGiam >=  ''' + @TuNgay + '''';
END
ELSE IF @DenNgay <>''
BEGIN 
SET @V_SQL = @V_SQL + ' and  a.NgayGhiGiam <=  ''' + @DenNgay + '''';
END
		

IF @IS_VIEW = 'VB' 
BEGIN    
SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
END
IF @IS_VIEW = 'VR' 
BEGIN    
SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
END
IF @IS_VIEW = 'VE' 
BEGIN    
SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
END

	
SET @V_SQL = @V_SQL + 'GROUP BY  a.GhiGiamId,a.SoChungTu,a.NgayChungTu,a.NgayGhiGiam,a.PhongBanId,c.TenPhongBan,a.NoiDung,
				a.DuyetId, a.NguoiDuyet,a.CoSoId, a.NguoiTao, a.NgayTao,ndd.HoTen,nd.HoTen ';

-- Build Order clause
IF @OrderClause > ''
SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

-- Build Skip clause
SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

-- Build Take clause
SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
PRINT(@V_SQL);
EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiam_InsertGhiGiamChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_GhiGiam_InsertGhiGiamChiTiet]
	@GhiGiamId int
	,@TaiSanId int
	,@PhongBanId int
	,@NhanVienId int
	,@XuLyId INT
	,@SoLuong NUMERIC(18,4) 
as
BEGIN
	Declare @ErrMsg nvarchar(max);

	BEGIN TRAN
		
		BEGIN TRY
		Declare @SoLuongTon NUMERIC(18,4) ; 
		SET @SoLuongTon = (select Isnull((SLTon + SLTang - SLGiam),0)  from TheoDoi  where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId);
		IF(@SoLuongTon >= @SoLuong)	
		BEGIN
			Insert into GhiGiamChiTiet (GhiGiamId,TaiSanId,PhongBanId,NhanVienId,XuLyId,SoLuong) values (@GhiGiamId , @TaiSanId , @PhongBanId , @NhanVienId, @XuLyId, @SoLuong) 
			Update TheoDoi set SLGiam = (SLGiam + @SoLuong) where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId
			select * from  GhiGiamChiTiet where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId
		END
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiam_ReportGhiGiamById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiGiam_ReportGhiGiamById]
( 
	  @GhiGiamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT gg.SoChungTu,gg.NgayChungTu,gg.NgayGhiGiam,PB.TenPhongBan,gg.NoiDung, a.GhiGiamId,a.GhiGiamChiTietId,b.MaTaiSan,
	b.TaiSanId,b.DonViTinh,b.TenTaiSan,CAST(c.XuLyId AS VARCHAR) as XuLyId,c.TenXuLy,ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,
	a.SoLuong,d.NguonNganSachId,ISNULL(sum(d.GiaTri),0) as NguyenGia,cs.MaCoSo,cs.TenCoSo   
	from GhiGiam gg inner join GhiGiamChiTiet  a  on gg.GhiGiamId = a. GhiGiamId
	left join TaiSan b on a.TaiSanId=b.TaiSanId  left join XuLy c on a.XuLyId=c.XuLyId
	left join NguyenGia d on a.TaiSanId=d.TaiSanId
	LEFT JOIN TheoDoi TD ON b.TaiSanId = TD.TaiSanId and a.PhongBanId=TD.PhongBanId and a.NhanVienId=TD.NhanVienId
	LEFT JOIN PhongBan PB ON gg.PhongBanId = PB.PhongBanId
	left join CoSo cs on gg.CoSoId=cs.CoSoId
	where gg.GhiGiamId = @GhiGiamId
	group by  gg.SoChungTu,gg.NgayChungTu,gg.NgayGhiGiam,gg.NoiDung,a.GhiGiamId,a.GhiGiamChiTietId,b.TaiSanId,b.MaTaiSan,b.DonViTinh,b.TenTaiSan,PB.TenPhongBan,a.NhanVienId,c.TenXuLy,a.SoLuong,TD.SLTon,TD.SLTang,TD.SLGiam,c.XuLyId,d.NguonNganSachId,cs.MaCoSo,cs.TenCoSo  
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiamChiTiet_DeleteGhiGiamChiTietById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiGiamChiTiet_DeleteGhiGiamChiTietById]
( 
	 @GhiGiamChiTietId int
	,@TaiSanId int
	,@PhongBanId int
	,@NhanVienId int
	,@SoLuong NUMERIC(18,4) 
)
AS  
BEGIN
Declare @ErrMsg nvarchar(max);

	BEGIN TRAN
		
		BEGIN TRY
		Declare @SoLuongTon NUMERIC(18,4) ; 
		SET @SoLuongTon = (select Isnull((SLTon + SLTang - SLGiam),0)  from TheoDoi  where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId);
	
			Update TheoDoi set SLGiam = (SLGiam - @SoLuong) where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId
			delete GhiGiamChiTiet where GhiGiamChiTietId=@GhiGiamChiTietId
			select @@ROWCOUNT
	
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
	
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiamChiTiet_GetGhiGiamChiTietByGhiGiamId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiGiamChiTiet_GetGhiGiamChiTietByGhiGiamId]
( 
	  @GhiGiamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.GhiGiamId,a.GhiGiamChiTietId,b.MaTaiSan,b.TaiSanId,b.DonViTinh,b.TenTaiSan,PB.PhongBanId,PB.TenPhongBan,a.NhanVienId,CAST(c.XuLyId AS VARCHAR) as XuLyId,c.TenXuLy,ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,a.SoLuong,ISNULL(sum(d.GiaTri),0) as NguyenGia 
	from GhiGiamChiTiet  a 
	left join TaiSan b on a.TaiSanId=b.TaiSanId  left join XuLy c on a.XuLyId=c.XuLyId
	left join NguyenGia d on a.TaiSanId=d.TaiSanId
	LEFT JOIN TheoDoi TD ON b.TaiSanId = TD.TaiSanId and a.PhongBanId=TD.PhongBanId and a.NhanVienId=TD.NhanVienId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
	where GhiGiamId= @GhiGiamId
	group by  a.GhiGiamId,a.GhiGiamChiTietId,b.TaiSanId,b.MaTaiSan,b.DonViTinh,b.TenTaiSan,PB.PhongBanId,PB.TenPhongBan,a.NhanVienId,c.TenXuLy,a.SoLuong,TD.SLTon,TD.SLTang,TD.SLGiam,c.XuLyId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiamChiTiet_UpdateGhiGiamChiTietById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiGiamChiTiet_UpdateGhiGiamChiTietById]
( 
	@GhiGiamId int
	,@TaiSanId int
	,@PhongBanId int
	,@NhanVienId int
	,@XuLyId INT
	,@SoLuong NUMERIC(18,4) 
)
AS  
BEGIN
Declare @ErrMsg nvarchar(max);

	BEGIN TRAN
		
		BEGIN TRY
		Declare @SoLuongTon NUMERIC(18,4) ; 
		SET @SoLuongTon = (select Isnull((SLTon + SLTang - SLGiam),0)  from TheoDoi  where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId);
		IF(@SoLuongTon >= @SoLuong)	
		BEGIN
			
			Insert into GhiGiamChiTiet (GhiGiamId,TaiSanId,PhongBanId,NhanVienId,XuLyId,SoLuong) values (@GhiGiamId , @TaiSanId , @PhongBanId , @NhanVienId, @XuLyId, @SoLuong) 
			Update TheoDoi set SLGiam = (SLGiam + @SoLuong) where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId
			select * from  GhiGiamChiTiet where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId
		END
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_DeleteGhiTangById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_GhiTang_DeleteGhiTangById]
	@GhiTangId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_TB_GHITANGCT TABLE
	(
		ROWID INT IDENTITY(1,1),
		TAISANID INT,
		NGAYBATDAUSUDUNG DATETIME,
		PHONGBANID INT,
		NHANVIENID INT,
		SOLUONG NUMERIC(18,4)
	)
	DECLARE @V_ROWID INT ,
			@V_TAISANID INT,
			@V_NGAYBATDAUSUDUNG DATETIME,
			@V_PHONGBANID INT,
			@V_NHANVIENID INT,
			@V_SOLUONG NUMERIC(18,4),
			@V_NGAYGHITANG DATETIME,
			@V_SOCHUNGTU NVARCHAR(50)

	SELECT @V_NGAYGHITANG = NgayGhiTang, @V_SOCHUNGTU = SoChungTu FROM dbo.GhiTang WHERE GhiTangId = @GhiTangId

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT @V_TB_GHITANGCT( TAISANID ,NGAYBATDAUSUDUNG ,PHONGBANID ,NHANVIENID ,SOLUONG)
			SELECT GTCT.TaiSanId,GTCT.NgayBatDauSuDung,GTCT.PhongBanId,GTCT.NhanVienId,GTCT.SoLuong
			FROM dbo.GhiTangChiTiet GTCT WHERE GTCT.GhiTangId = @GhiTangId			

			WHILE EXISTS(SELECT 1 FROM @V_TB_GHITANGCT)
			BEGIN
				SELECT TOP 1 @V_ROWID = ROWID, @V_TAISANID = TAISANID, @V_NGAYBATDAUSUDUNG = NGAYBATDAUSUDUNG, @V_PHONGBANID = PHONGBANID, @V_NHANVIENID=NHANVIENID,@V_SOLUONG = SOLUONG FROM @V_TB_GHITANGCT

				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID)
				BEGIN

					UPDATE dbo.TheoDoi SET SLTang = SLTang - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID

					IF (SELECT SLTon + SLTang - SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID) < 0
					BEGIN	
						begin try rollback tran end try begin catch end CATCH
                        SELECT -1 AS ID,@V_SOCHUNGTU SOCHUNGTU
						RETURN
					END
					
				END
				

				DELETE @V_TB_GHITANGCT WHERE ROWID = @V_ROWID
				SELECT @V_ROWID = NULL,@V_TAISANID = NULL,@V_NGAYBATDAUSUDUNG = NULL,@V_PHONGBANID = NULL,@V_NHANVIENID = NULL,@V_SOLUONG = NULL
			END

			DELETE dbo.GhiTangChiTiet WHERE GhiTangId = @GhiTangId
			DELETE dbo.GhiTang WHERE GhiTangId = @GhiTangId
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_GetListGhiTangByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_GhiTang_GetListGhiTangByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)	
	, @SoChungTu	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0024',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
			isnull(SUM(NG.GiaTri),0) TongNguyenGia, h.DuyetId, H.NguoiDuyet,ndd.TenNhanVien TenNguoiDuyet, H.CoSoId, H.NguoiTao,nv.TenNhanVien TenNguoiTao, H.NgayTao
	FROM dbo.GhiTang H
	LEFT JOIN dbo.GhiTangChiTiet L ON H.GhiTangId = L.GhiTangId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	LEFT JOIN NhanVien nv ON nv.NhanVienId = h.NguoiTao
	LEFT JOIN NhanVien ndd ON ndd.NhanVienId = h.NguoiDuyet
	WHERE CAST(H.NgayChungTu AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	IF (@SoChungTu > '')
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.SoChungTu LIKE N''%' +@SoChungTu+ '%'') ';
	END
	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	SET @V_SQL = @V_SQL + ' GROUP BY H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
							h.DuyetId, H.NguoiDuyet, H.CoSoId, H.NguoiTao, H.NgayTao,ndd.TenNhanVien,nv.TenNhanVien ';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_GetListGhiTangByGhiTangId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_GhiTang_GetListGhiTangByGhiTangId]
( 
	@GhiTangId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.GhiTangId,
			H.SoChungTu,
			CONVERT(VARCHAR, H.NgayChungTu,103)NgayChungTu,
			CONVERT(VARCHAR, H.NgayGhiTang,103)NgayGhiTang,
			H.NoiDung

	FROM dbo.GhiTang H
	WHERE H.GhiTangId = @GhiTangId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_GetListReportGhiTangByGhiTangId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

EXEC dbo.sp_GhiTang_GetListReportGhiTangByGhiTangId @GhiTangId = N'14' -- nvarchar(10)

*/


CREATE PROC [dbo].[sp_GhiTang_GetListReportGhiTangByGhiTangId]
( 
	@GhiTangId NVARCHAR(10)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	
	SELECT	CS.MaCoSo, CS.TenCoSo,
			H.SoChungTu,
			H.NgayChungTu,
			H.NgayGhiTang,
			H.NoiDung,
			-----------------------------------------------line
			TS.TenTaiSan, LTS.TenLoai LoaiTaiSan, TS.NamSanXuat, NSX.TenNuocSanXuat, TS.SoQDTC, PB.TenPhongBan, NV.TenNhanVien, L.SoLuong,
			L.NgayBatDauSuDung

	FROM dbo.GhiTang H
	JOIN dbo.GhiTangChiTiet L ON L.GhiTangId = H.GhiTangId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = L.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = L.NhanVienId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.GhiTangId = @GhiTangId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_InsertGhiTang]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_GhiTang_InsertGhiTang]
	@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayGhiTang datetime
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.GhiTang
			        ( SoChungTu ,			NgayChungTu ,			NgayGhiTang ,
			          NoiDung ,				DuyetId ,				NguoiDuyet ,
			          CoSoId ,				NguoiTao ,				NgayTao ,
			          CtrVersion
			        )
			SELECT	@SoChungTu				,@NgayChungTu			,@NgayGhiTang
					,@NoiDung				,0						,0
					,@CoSoId				,@NhanVienId			,GETDATE()
					,1

			SELECT SCOPE_IDENTITY() AS GhiTangIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_UpdateGhiTang]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_GhiTang_UpdateGhiTang]
	@GhiTangId INT
	,@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayGhiTang datetime
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
	,@CompareLine INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	DECLARE @V_TB_GHITANGCT TABLE
	(
		ROWID INT IDENTITY(1,1),
		TAISANID INT,
		NGAYBATDAUSUDUNG DATETIME,
		PHONGBANID INT,
		NHANVIENID INT,
		SOLUONG NUMERIC(18,4)
	)
	DECLARE @V_ROWID INT ,
			@V_TAISANID INT,
			@V_NGAYBATDAUSUDUNG DATETIME,
			@V_PHONGBANID INT,
			@V_NHANVIENID INT,
			@V_SOLUONG NUMERIC(18,4)

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.GhiTang
			SET NgayChungTu = @NgayChungTu,
				NgayGhiTang = @NgayGhiTang,
				NoiDung = @NoiDung
			WHERE GhiTangId = @GhiTangId
			
			-------------------------------------------------------------
			/* cập nhật lại tồn cho theo dõi */

			IF (@CompareLine = 0)	
			BEGIN
				INSERT @V_TB_GHITANGCT( TAISANID ,NGAYBATDAUSUDUNG ,PHONGBANID ,NHANVIENID ,SOLUONG)
				SELECT GTCT.TaiSanId,GTCT.NgayBatDauSuDung,GTCT.PhongBanId,GTCT.NhanVienId,GTCT.SoLuong
				FROM dbo.GhiTangChiTiet GTCT WHERE GTCT.GhiTangId = @GhiTangId


				WHILE EXISTS(SELECT 1 FROM @V_TB_GHITANGCT)
				BEGIN
					SELECT TOP 1 @V_ROWID = ROWID, @V_TAISANID = TAISANID, @V_NGAYBATDAUSUDUNG = NGAYBATDAUSUDUNG, @V_PHONGBANID = PHONGBANID, @V_NHANVIENID=NHANVIENID,@V_SOLUONG = SOLUONG FROM @V_TB_GHITANGCT

					IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID )
					BEGIN

						UPDATE dbo.TheoDoi SET SLTang = SLTang - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID 

						IF (SELECT SLTon + SLTang - SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID) < 0
						BEGIN	
							begin try rollback tran end try begin catch end CATCH
							SELECT -1 AS ID
							RETURN
						END
					END
				

					DELETE @V_TB_GHITANGCT WHERE ROWID = @V_ROWID
					SELECT @V_ROWID = NULL,@V_TAISANID = NULL,@V_NGAYBATDAUSUDUNG = NULL,@V_PHONGBANID = NULL,@V_NHANVIENID = NULL,@V_SOLUONG = NULL
				END

				DELETE dbo.GhiTangChiTiet WHERE GhiTangId = @GhiTangId

			END

			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTangChiTiet_GetGhiTangChiTietByDeNghiId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_GhiTangChiTiet_GetGhiTangChiTietByDeNghiId]
	@GhiTangId INT
AS  
BEGIN
SET NOCOUNT ON  

	SELECT ct.GhiTangChiTietId,
			ct.GhiTangId,
			CAST(ct.TaiSanId AS VARCHAR)TaiSanId,
			ts.MaTaiSan,
			ts.TenTaiSan,
			ts.DonViTinh,
			CAST(ct.PhongBanId AS VARCHAR)PhongBanId,
			pb.TenPhongBan,
			CONVERT(VARCHAR, ct.NgayBatDauSuDung,103)NgayBatDauSuDung,
			CAST(ct.NhanVienId AS VARCHAR)NhanVienId,
			nv.TenNhanVien,
			ct.SoLuong,
			ISNULL(SUM(ng.GiaTri),0) NguyenGia
	FROM dbo.GhiTangChiTiet ct
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = ct.PhongBanId
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.NguyenGia ng ON ng.TaiSanId = ts.TaiSanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = ct.NhanVienId
	WHERE ct.GhiTangId = @GhiTangId
	GROUP BY
			ct.GhiTangChiTietId,
			ct.GhiTangId,
			ct.TaiSanId,
			ts.MaTaiSan,
			ts.TenTaiSan,
			ts.DonViTinh,
			ct.PhongBanId,
			pb.TenPhongBan,
			ct.NgayBatDauSuDung,
			ct.NhanVienId,
			nv.TenNhanVien,
			ct.SoLuong
	
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTangChiTiet_InsertGhiTangChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_GhiTangChiTiet_InsertGhiTangChiTiet]
	@GhiTangId INT
	,@TaiSanId INT
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@NhanVienId INT
	,@SoLuong NUMERIC(18,4)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_NGAYGHITANG DATETIME

	SELECT @V_NGAYGHITANG = NgayGhiTang FROM dbo.GhiTang WHERE GhiTangId = @GhiTangId
	
	IF (@PhongBanId = 0) SET @PhongBanId = NULL
	IF (@NhanVienId = 0) SET @NhanVienId = NULL

	BEGIN TRAN
		BEGIN TRY
			
			INSERT dbo.GhiTangChiTiet
			        ( GhiTangId ,			TaiSanId ,			NgayBatDauSuDung ,
			          PhongBanId ,			NhanVienId ,		SoLuong
			        )
			SELECT	@GhiTangId				,@TaiSanId			,@NgayBatDauSuDung
					,@PhongBanId			,@NhanVienId		,@SoLuong
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienId AND PhongBanId = @PhongBanId)
			BEGIN
				UPDATE dbo.TheoDoi SET SLTang = SLTang + @SoLuong,NgayGhiTang=@V_NGAYGHITANG WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienId AND PhongBanId = @PhongBanId
			END
			ELSE
			BEGIN
				INSERT dbo.TheoDoi
						( 
							TaiSanId ,			NgayTrangCap ,			NgayBatDauSuDung ,		PhongBanId ,			
							NhanVienId ,		SLTon ,					SLTang ,				SLGiam		, NgayGhiTang
						)
				SELECT		@TaiSanId			,@V_NGAYGHITANG			,@NgayBatDauSuDung		,@PhongBanId
							,@NhanVienId		,0						,@SoLuong				,0			,@V_NGAYGHITANG
			END

			SELECT SCOPE_IDENTITY()
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_HangSanXuat_cbxHangSanXuatByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_HangSanXuat_cbxHangSanXuatByCriteria]
						 @Search			=	N''
						,@HangSanXuatId		=	N''
						,@MaHangSanXuat		=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROC [dbo].[sp_HangSanXuat_cbxHangSanXuatByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@HangSanXuatId		INT				=	NULL
	,@MaHangSanXuat		NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @HangSanXuatId		=	ISNULL(@HangSanXuatId, 0)
	SET @MaHangSanXuat		=	ISNULL(@MaHangSanXuat,'')

	SELECT TOP 10 HSX.*
	FROM	HangSanXuat HSX
	WHERE	(@HangSanXuatId = 0 OR HSX.HangSanXuatId = @HangSanXuatId)
			AND (@MaHangSanXuat = '' OR HSX.MaHangSanXuat = @MaHangSanXuat)
			AND (@Search = '' OR HSX.MaHangSanXuat LIKE N'%' + @Search + '%' OR HSX.TenHangSanXuat LIKE N'%' + @Search + '%')

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_HangSanXuat_GetListHangSanXuatByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_HangSanXuat_GetListHangSanXuatByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	--DECLARE @IS_VIEW_ALL varchar = '0'
 -- 	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	--	@LOGINID = @CoSoId,
	--	@CHUC_NANG = 'CN0004',
	--	@QUYEN_TAC_VU = 'View All',
	--	@YES_NO=@IS_VIEW_ALL OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.HangSanXuatId,a.MaHangSanXuat,a.TenHangSanXuat,a.GhiChu,b.HoTen,a.NgayTao
	FROM HangSanXuat a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaHangSanXuat LIKE N''%' +@Search+ '%'' OR TenHangSanXuat LIKE  N''%' +@Search+ '%'')';


	--	IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	--END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.06
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]
						 @Search			=	N''
						,@HienTrangSuDungId	=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.06 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]
( 
	 @Search				NVARCHAR(500)   =	NULL
	,@HienTrangSuDungId		INT				=	NULL
	,@CoSoId				NVARCHAR(500)	=	NULL			
	,@NhanVienId			NVARCHAR(500)	=	NULL		
	
)
AS  
BEGIN
SET NOCOUNT ON 
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @HienTrangSuDungId	=	ISNULL(@HienTrangSuDungId, 0)

	SELECT TOP 10 HTSD.*
	FROM	HienTrangSuDung HTSD
	WHERE	(@HienTrangSuDungId = 0 OR HTSD.HienTrangSuDungId = @HienTrangSuDungId)
			AND (@Search = '' OR HTSD.NoiDung LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSam_DeleteKeHoachMuaSamById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KeHoachMuaSam_DeleteKeHoachMuaSamById]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	Delete KeHoachMuaSamChiTiet where MuaSamId = @MuaSamId
	Delete KeHoachMuaSam where MuaSamId = @MuaSamId
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSam_GetListKeHoachMuaSamByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KeHoachMuaSam_GetListKeHoachMuaSamByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NhanVienId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0021',
		@QUYEN=@IS_VIEW OUTPUT
		PRINT(@IS_VIEW)
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.*,b.TrangThai
	FROM KeHoachMuaSam a 
	LEFT JOIN dbo.Duyet b ON b.DuyetId = a.DuyetId
	LEFT JOIN NhanVien nv ON nv.NhanVienId = a.NguoiTao
	where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (Nam LIKE N''%' +@Search+ '%'' OR NoiDung LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	END
	  IF @IS_VIEW = 'VR' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';	  
	END
	 IF @IS_VIEW = 'VE' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';	  
	END
	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSam_ReportKeHoachMuaSamById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KeHoachMuaSam_ReportKeHoachMuaSamById]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT ms.Nam,ms.NoiDung,a.TenTaiSan,a.LoaiId,b.TenLoai,CAST(c.PhuongThucId AS VARCHAR) PhuongThucId, 
	c.TenPhuongThuc,a.DonViTinh,a.MoTa,Convert(varchar(10),CONVERT(date,a.Ngay,106),103) AS Ngay,a.SoLuong,a.DonGia,CAST(d.HinhThucId AS VARCHAR) HinhThucId,
	d.TenHinhThuc,a.DuToan,a.GhiChu,a.DuyetId,cs.MaCoSo,cs.TenCoSo  
	from KeHoachMuaSam ms inner join KeHoachMuaSamChiTiet  a on ms.MuaSamId=a.MuaSamId
	left join LoaiTaiSan b on a.LoaiId=b.LoaiId left join PhuongThuc c on a.PhuongThucId=c.PhuongThucId 
	left join HinhThuc d on a.HinhThucId=d.HinhThucId
	left join CoSo cs on ms.CoSoId=cs.CoSoId
	where ms.MuaSamId= @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSamChiTiet_DeleteKeHoachMuaSamChiTietById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_KeHoachMuaSamChiTiet_DeleteKeHoachMuaSamChiTietById]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	Delete KeHoachMuaSamChiTiet where MuaSamId = @MuaSamId
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSamChiTiet_GetKeHoachMuaSamChiTietByMuaSamId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KeHoachMuaSamChiTiet_GetKeHoachMuaSamChiTietByMuaSamId]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.MuaSamId,a.MuaSamChiTietId,a.TenTaiSan,a.LoaiId,b.TenLoai,CAST(c.PhuongThucId AS VARCHAR) PhuongThucId, c.TenPhuongThuc,a.DonViTinh,a.MoTa,Convert(varchar(10),CONVERT(date,a.Ngay,106),103) AS Ngay,a.SoLuong,a.DonGia,CAST(d.HinhThucId AS VARCHAR) HinhThucId,d.TenHinhThuc,a.DuToan,a.GhiChu,a.MoTa,a.DuyetId  from KeHoachMuaSamChiTiet  a 
	left join LoaiTaiSan b on a.LoaiId=b.LoaiId left join PhuongThuc c on a.PhuongThucId=c.PhuongThucId left join HinhThuc d on a.HinhThucId=d.HinhThucId
	where MuaSamId= @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhachHang_cbxKhachHangByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KhachHang_cbxKhachHangByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.KhachHangId,a.MaKhachHang,a.TenKhachHang
	FROM KhachHang a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhachHang_cbxKhachHangById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KhachHang_cbxKhachHangById]
( 
	  @CoSoId	        nvarchar(500)	= null				
	, @NhanVienId	    nvarchar(500)	= null				
	, @Search			nvarchar(500)   = null	
	, @KhachHangId		INT   = 0	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	IF(@KhachHangId IS NULL OR @KhachHangId = '') SET @KhachHangId = 0

	SELECT a.KhachHangId,a.MaKhachHang,a.TenKhachHang
	FROM KhachHang a
	Where a.CoSoId = @CoSoId
	AND (@KhachHangId = 0 OR a.KhachHangId = @KhachHangId)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhachHang_GetListKhachHangByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KhachHang_GetListKhachHangByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @KhachHangId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
  @NHAN_VIEN_ID = '0',
  @CO_SO_ID = @CoSoId,
  @CHUC_NANG = 'CN0010',
  @QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.KhachHangId,a.MaKhachHang,a.TenKhachHang,a.DienThoai,a.DiaChi,a.GhiChu,b.HoTen,a.NgayTao
	FROM KhachHang a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaKhachHang LIKE N''%' +@Search+ '%'' OR TenKhachHang LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
		 END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhaiThac_DeleteKhaiThacById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_KhaiThac_DeleteKhaiThacById]
	@KhaiThacId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.KhaiThac WHERE KhaiThacId = @KhaiThacId
			
			SELECT @@ROWCOUNT ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_KhaiThac_GetListKhaiThacByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_KhaiThac_GetListKhaiThacByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)	
	, @SoChungTu	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------


	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0034',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------
    

---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, H.KhaiThacId, H.TaiSanId, TS.MaTaiSan, TS.TenTaiSan, TS.DonViTinh, H.KhachHangNCCId, TenKhachHang, H.SoChungTu,
			H.SoLuongKhaiThac, H.DonGiaKhaiThac, H.ThoiGianBatDau, H.ThoiGianKetThuc, H.SoLuongKhaiThac * H.DonGiaKhaiThac TongSoTien, H.TienThu, H.NopNganSach, H.DonVi, H.GhiChu, H.NguoiTao, nv.TenNhanVien TenNguoiTao, H.NgayTao,
			PB.TenPhongBan
	FROM dbo.KhaiThac H
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.KhachHang KH ON KH.KhachHangId = H.KhachHangNCCId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId	
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	WHERE 1 = 1 and CAST(H.NgayTao AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.GhiChu LIKE N''%' +@Search+ '%'')';
	END

	IF (@SoChungTu > '')
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.SoChungTu LIKE N''%' +@SoChungTu+ '%'') ';
	END

	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY  H.NgayTao desc,' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhaiThac_GetListKhaiThacById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_KhaiThac_GetListKhaiThacById]
( 
	@KhaiThacId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	H.KhaiThacId, H.TaiSanId,H.PhongBanId,H.NhanVienId NhanVienIdKT, TS.TenTaiSan, TS.DonViTinh, 
			H.KhachHangNCCId, TenKhachHang, H.SoChungTu, H.SoLuongKhaiThac, H.DonGiaKhaiThac, 
			CONVERT(VARCHAR,H.ThoiGianBatDau,103)ThoiGianBatDau, CONVERT(VARCHAR,H.ThoiGianKetThuc,103)ThoiGianKetThuc, H.TienThu, H.NopNganSach, H.DonVi, H.GhiChu, 
			H.NguoiTao, nv.TenNhanVien TenNguoiTao, H.NgayTao, H.CtrVersion
	FROM dbo.KhaiThac H
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.KhachHang KH ON KH.KhachHangId = H.KhachHangNCCId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId	
	WHERE H.KhaiThacId = @KhaiThacId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_KhaiThac_InsertKhaiThac]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_KhaiThac_InsertKhaiThac]
	@TaiSanId INT
	,@PhongBanId INT
	,@NhanVienIdKT INT
	,@KhachHangNCCId INT
	,@SoChungTu NVARCHAR(50)
	,@SoLuongKhaiThac NUMERIC(18,4)
	,@DonGiaKhaiThac NUMERIC(18,4)
	,@ThoiGianBatDau datetime
	,@ThoiGianKetThuc datetime
	,@TienThu NUMERIC(18,4)
	,@NopNganSach NUMERIC(18,4)
	,@DonVi NUMERIC(18,4)
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			INSERT dbo.KhaiThac
			        ( TaiSanId ,					KhachHangNCCId ,			SoChungTu ,					
					  SoLuongKhaiThac ,				DonGiaKhaiThac ,			ThoiGianBatDau ,
					  ThoiGianKetThuc ,				TienThu ,					NopNganSach ,			
					  DonVi ,						GhiChu ,					CoSoId ,			
					  NguoiTao ,					NgayTao ,					CtrVersion,
					  PhongBanId,					NhanVienId
			        )
			SELECT @TaiSanId						,@KhachHangNCCId			,@SoChungTu
					,@SoLuongKhaiThac				,@DonGiaKhaiThac			,@ThoiGianBatDau
					,@ThoiGianKetThuc				,@TienThu					,@NopNganSach
					,@DonVi							,@GhiChu					,@CoSoId
					,@NhanVienId					,GETDATE()					,1
					,@PhongBanId					,@NhanVienIdKT
			
			SELECT SCOPE_IDENTITY() AS KhaiThacIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_KhaiThac_UpdateKhaiThac]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_KhaiThac_UpdateKhaiThac]
	@KhaiThacId INT
	,@TaiSanId INT
	,@PhongBanId INT
	,@NhanVienIdKT INT
	,@KhachHangNCCId INT
	,@SoChungTu NVARCHAR(50)
	,@SoLuongKhaiThac NUMERIC(18,4)
	,@DonGiaKhaiThac NUMERIC(18,4)
	,@ThoiGianBatDau datetime
	,@ThoiGianKetThuc datetime
	,@TienThu NUMERIC(18,4)
	,@NopNganSach NUMERIC(18,4)
	,@DonVi NUMERIC(18,4)
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
	,@CtrVersion INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	IF EXISTS (SELECT 1 FROM dbo.KhaiThac WHERE KhaiThacId = @KhaiThacId AND CtrVersion <> @CtrVersion)
	BEGIN
		SELECT -1 AS ID
		RETURN
	END

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.KhaiThac
			SET TaiSanId = @TaiSanId,
				PhongBanId = @PhongBanId,
				NhanVienId = @NhanVienIdKT,
				KhachHangNCCId = @KhachHangNCCId,
				SoLuongKhaiThac = @SoLuongKhaiThac,
				DonGiaKhaiThac = @DonGiaKhaiThac,
				ThoiGianBatDau = @ThoiGianBatDau,
				ThoiGianKetThuc = @ThoiGianKetThuc,
				TienThu = @TienThu,
				NopNganSach = @NopNganSach,
				DonVi = @DonVi,
				GhiChu = @GhiChu,
				CtrVersion = CtrVersion + 1
			WHERE KhaiThacId = @KhaiThacId
			
			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_KhoTaiSan_cbxKhoTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_KhoTaiSan_cbxKhoTaiSanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.KhoTaiSanId,a.MaKhoTaiSan,a.TenKhoTaiSan
	FROM KhoTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhoTaiSan_GetListKhoTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_KhoTaiSan_GetListKhoTaiSanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------


		DECLARE @IS_VIEW varchar(10) = '0'
	   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	  @NHAN_VIEN_ID = @NhanVienId,
	  @CO_SO_ID = @CoSoId,
	  @CHUC_NANG = 'CN0013',
	  @QUYEN=@IS_VIEW OUTPUT
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.KhoTaiSanId,a.MaKhoTaiSan,a.TenKhoTaiSan,a.GhiChu,nv.TenNhanVien HoTen,a.NgayTao
	FROM KhoTaiSan a LEFT JOIN [NhanVien] nv on a.NguoiTao=nv.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaKhoTaiSan LIKE N''%' +@Search+ '%'' OR TenKhoTaiSan LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
		 END
		   IF @IS_VIEW = 'VR' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
		 END
		  IF @IS_VIEW = 'VE' 
		 BEGIN    
		   SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
		 END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]
						 @Search			=	N''
						,@LoaiId			=	N''
						,@MaLoai			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROC [dbo].[sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@LoaiId			INT				=	NULL
	,@MaLoai			NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @LoaiId				=	ISNULL(@LoaiId, 0)
	SET @MaLoai				=	ISNULL(@MaLoai,'')

	SELECT TOP 10 LTS.*
	FROM	LoaiTaiSan LTS
	WHERE	(@LoaiId = 0 OR LTS.LoaiId = @LoaiId)
			AND (@MaLoai = '' OR LTS.MaLoai = @MaLoai)
			AND (@Search = '' OR LTS.MaLoai LIKE N'%' + @Search + '%' OR LTS.TenLoai LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_LoaiTaiSan_GetListLoaiTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_LoaiTaiSan_GetListLoaiTaiSanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------
	DECLARE @IS_VIEW varchar(10) = '0'
   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
  @NHAN_VIEN_ID = @NhanVienId,
  @CO_SO_ID = @CoSoId,
  @CHUC_NANG = 'CN0005',
  @QUYEN=@IS_VIEW OUTPUT
	

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.LoaiId,a.MaLoai,a.TenLoai,b.TenNhom,a.GhiChu,c.HoTen,a.NgayTao
	FROM LoaiTaiSan a Inner join NhomTaiSan b on a.NhomId=b.NhomId LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] c on a.NguoiTao=c.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search
	
	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (a.MaLoaiTaiSan LIKE N''%' +@Search+ '%'' OR a.TenLoaiTaiSan LIKE  N''%' +@Search+ '%'')';

	--	IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--		SET @V_SQL = @V_SQL + ' and b.CoSoId =''' + @CoSoId + '''';	  
	--END
	
	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_LoaiTaiSan_GetLoaiTaiSanById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_LoaiTaiSan_GetLoaiTaiSanById]
( 
	  @LoaiId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.LoaiId,a.MaLoai,a.TenLoai,b.NhomId,b.MaNhom,b.TenNhom,a.GhiChu,a.CtrVersion
	FROM LoaiTaiSan a Inner join NhomTaiSan b on a.NhomId=b.NhomId where a.LoaiId = @LoaiId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_LogData_InsertLogData]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_LogData_InsertLogData]
( 
	  @Ngay	        nvarchar(500)	= null,			
	  @MaChucNang   nvarchar(500)	= null,	
	  @DoiTuongId   nvarchar(500)	= null,	
	  @SuKien       nvarchar(500)	= null,	
	  @NoiDung      nvarchar(500)	= null,	
	  @NguoiTao	        nvarchar(500)	= null
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
BEGIN TRY  
    Insert into LogData values(@Ngay,@MaChucNang,@DoiTuongId,@SuKien,@NoiDung,@NguoiTao)
END TRY  
BEGIN CATCH  
END CATCH  

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NguonNganSach_cbxNguonNganSachByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_NguonNganSach_cbxNguonNganSachByCriteria]
						 @Search			=	N''
						,@NguonNganSachId	=	N''
						,@MaNguonNganSach	=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROC [dbo].[sp_NguonNganSach_cbxNguonNganSachByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@NguonNganSachId	INT				=	NULL
	,@MaNguonNganSach	NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @NguonNganSachId	=	ISNULL(@NguonNganSachId, 0)
	SET @MaNguonNganSach	=	ISNULL(@MaNguonNganSach,'')

	SELECT TOP 10 NNS.*
	FROM	NguonNganSach NNS
	WHERE	(@NguonNganSachId = 0 OR NNS.NguonNganSachId = @NguonNganSachId)
			AND (@MaNguonNganSach = '' OR NNS.MaNguonNganSach = @MaNguonNganSach)
			AND (@Search = '' OR NNS.MaNguonNganSach LIKE N'%' + @Search + '%' OR NNS.MaNguonNganSach LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NguonNganSach_GetListNguonNganSachByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NguonNganSach_GetListNguonNganSachByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	--DECLARE @IS_VIEW_ALL varchar = '0'
 -- 	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	--	@LOGINID = @CoSoId,
	--	@CHUC_NANG = 'CN0011',
	--	@QUYEN_TAC_VU = 'View All',
	--	@YES_NO=@IS_VIEW_ALL OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.NguonNganSachId,a.MaNguonNganSach,a.TenNguonNganSach,a.GhiChu,b.HoTen,a.NgayTao
	FROM NguonNganSach a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaNguonNganSach LIKE N''%' +@Search+ '%'' OR TenNguonNganSach LIKE  N''%' +@Search+ '%'')';


	--	IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	--END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhaCungCap_cbxNhaCungCapByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_NhaCungCap_cbxNhaCungCapByCriteria]
						 @Search			=	N''
						,@NhaCungCapId		=	N''
						,@MaNhaCungCap		=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROC [dbo].[sp_NhaCungCap_cbxNhaCungCapByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@NhaCungCapId		INT				=	NULL
	,@MaNhaCungCap		NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @NhaCungCapId		=	ISNULL(@NhaCungCapId, 0)
	SET @MaNhaCungCap		=	ISNULL(@MaNhaCungCap,'')

	SELECT TOP 10 NCC.*
	FROM	NhaCungCap NCC
	WHERE	NCC.CoSoId = @CoSoId
			AND (@NhaCungCapId = 0 OR NCC.NhaCungCapId = @NhaCungCapId)
			AND (@MaNhaCungCap = '' OR NCC.MaNhaCungCap = @MaNhaCungCap)
			AND (@Search = '' OR NCC.MaNhaCungCap LIKE N'%' + @Search + '%' OR NCC.TenNhaCungCap LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhaCungCap_GetListNhaCungCapByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NhaCungCap_GetListNhaCungCapByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhaCungCapId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------
	DECLARE @IS_VIEW varchar(10) = '0'
   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
  @NHAN_VIEN_ID = '0',
  @CO_SO_ID = @CoSoId,
  @CHUC_NANG = 'CN00012',
  @QUYEN=@IS_VIEW OUTPUT


	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.NhaCungCapId,a.MaNhaCungCap,a.TenNhaCungCap,a.DienThoai,a.DiaChi,a.GhiChu,b.HoTen,a.NgayTao
	FROM NhaCungCap a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaNhaCungCap LIKE N''%' +@Search+ '%'' OR TenNhaCungCap LIKE  N''%' +@Search+ '%'')';


	 IF @IS_VIEW = 'VB' 
	 BEGIN    
	   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
	 END


	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_cbxNhanVienByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NhanVien_cbxNhanVienByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.NhanVienId,a.MaNhanVien,a.TenNhanVien,a.PhongBanId
	FROM NhanVien a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId inner join PhongBan c on a.PhongBanId=c.PhongBanId
	Where c.CoSoId = @CoSoId

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_cbxNhanVienByPhongBanId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NhanVien_cbxNhanVienByPhongBanId]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @PhongBanId		INT				= 0
	, @IDNhanVien		INT				= 0
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
	IF(@IDNhanVien IS NULL) SET @IDNhanVien = 0

	SELECT a.NhanVienId,a.MaNhanVien,a.TenNhanVien,a.PhongBanId
	FROM NhanVien a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId inner join PhongBan c on a.PhongBanId=c.PhongBanId
	Where c.CoSoId = @CoSoId
	AND a.PhongBanId = @PhongBanId
	AND (@IDNhanVien = 0 OR a.NhanVienId = @IDNhanVien)

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_GetListNhanVienByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NhanVien_GetListNhanVienByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------
	DECLARE @IS_VIEW varchar(10) = '0'
   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
  @NHAN_VIEN_ID = @NhanVienId,
  @CO_SO_ID = @CoSoId,
  @CHUC_NANG = 'CN0005',
  @QUYEN=@IS_VIEW OUTPUT


	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.NhanVienId,a.MaNhanVien,a.TenNhanVien,b.TenPhongBan,a.DienThoai,a.GhiChu,nv.TenNhanVien as HoTen,a.NgayTao
	FROM NhanVien a Inner join PhongBan b on a.PhongBanId=b.PhongBanId LEFT JOIN [dbo].[NhanVien] nv on a.NguoiTao=nv.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search
	
	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (a.MaNhanVien LIKE N''%' +@Search+ '%'' OR a.TenNhanVien LIKE  N''%' +@Search+ '%'')';

		IF @IS_VIEW = 'VB' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
 END
   IF @IS_VIEW = 'VR' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
 END
  IF @IS_VIEW = 'VE' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
 END
	
	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_GetNhanVienById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NhanVien_GetNhanVienById]
( 
	  @NhanVienId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.NhanVienId,a.MaNhanVien,a.TenNhanVien,b.PhongBanId,b.MaPhongBan,b.TenPhongBan,a.ChucDanh,a.Email,a.DiaChi,a.DienThoai,a.GhiChu,a.CtrVersion
	FROM NhanVien a Inner join PhongBan b on a.PhongBanId=b.PhongBanId where a.NhanVienId = @NhanVienId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhomTaiSan_cbxNhomTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_NhomTaiSan_cbxNhomTaiSanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.NhomId,a.MaNhom,a.TenNhom
	FROM NhomTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 


	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhomTaiSan_GetListNhomTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_NhomTaiSan_GetListNhomTaiSanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------
	DECLARE @IS_VIEW varchar(10) = '0'
   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
  @NHAN_VIEN_ID = @NhanVienId,
  @CO_SO_ID = @CoSoId,
  @CHUC_NANG = 'CN0004',
  @QUYEN=@IS_VIEW OUTPUT
	

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.NhomId,a.MaNhom,a.TenNhom,a.GhiChu,b.HoTen,a.NgayTao
	FROM NhomTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaNhomTaiSan LIKE N''%' +@Search+ '%'' OR TenNhomTaiSan LIKE  N''%' +@Search+ '%'')';


	--	IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	--END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NuocSanXuat_cbxNuocSanXuatByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_NuocSanXuat_cbxNuocSanXuatByCriteria]
						 @Search			=	N''
						,@NuocSanXuatId		=	N''
						,@MaNuocSanXuat		=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROC [dbo].[sp_NuocSanXuat_cbxNuocSanXuatByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@NuocSanXuatId		INT				=	NULL
	,@MaNuocSanXuat		NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @NuocSanXuatId		=	ISNULL(@NuocSanXuatId, 0)
	SET @MaNuocSanXuat		=	ISNULL(@MaNuocSanXuat,'')

	SELECT TOP 10 NSX.*
	FROM	NuocSanXuat NSX
	WHERE	(@NuocSanXuatId = 0 OR NSX.NuocSanXuatId = @NuocSanXuatId)
			AND (@MaNuocSanXuat = '' OR NSX.MaNuocSanXuat = @MaNuocSanXuat)
			AND (@Search = '' OR NSX.MaNuocSanXuat LIKE N'%' + @Search + '%' OR NSX.TenNuocSanXuat LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NuocSanXuat_GetListNuocSanXuatByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_NuocSanXuat_GetListNuocSanXuatByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	--DECLARE @IS_VIEW_ALL varchar = '0'
 -- 	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	--	@LOGINID = @CoSoId,
	--	@CHUC_NANG = 'CN0004',
	--	@QUYEN_TAC_VU = 'View All',
	--	@YES_NO=@IS_VIEW_ALL OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.NuocSanXuatId,a.MaNuocSanXuat,a.TenNuocSanXuat,a.GhiChu,b.HoTen,a.NgayTao
	FROM NuocSanXuat a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaNuocSanXuat LIKE N''%' +@Search+ '%'' OR TenNuocSanXuat LIKE  N''%' +@Search+ '%'')';


	--	IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	--END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_PhongBan_cbxPhongBanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_PhongBan_cbxPhongBanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.PhongBanId,a.MaPhongBan,a.TenPhongBan
	FROM PhongBan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_PhongBan_cbxPhongBanById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_PhongBan_cbxPhongBanById]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @PhongBanId		INT   = 0	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	IF(@PhongBanId IS NULL OR @PhongBanId = '') SET @PhongBanId = 0

	SELECT a.PhongBanId,a.MaPhongBan,a.TenPhongBan
	FROM PhongBan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId
	AND (@PhongBanId = 0 OR a.PhongBanId = @PhongBanId)

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_PhongBan_GetListPhongBanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_PhongBan_GetListPhongBanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	
		DECLARE @IS_VIEW varchar(10) = '0'
	   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	  @NHAN_VIEN_ID = @NhanVienId,
	  @CO_SO_ID = @CoSoId,
	  @CHUC_NANG = 'CN0004',
	  @QUYEN=@IS_VIEW OUTPUT
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.PhongBanId,a.MaPhongBan,a.TenPhongBan,a.GhiChu,nv.TenNhanVien as HoTen,a.NgayTao
	FROM PhongBan a LEFT JOIN [dbo].[NhanVien] nv on a.NguoiTao=nv.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaPhongBan LIKE N''%' +@Search+ '%'' OR TenPhongBan LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
 END
   IF @IS_VIEW = 'VR' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';   
 END
  IF @IS_VIEW = 'VE' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
 END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_PhuongThuc_cbxPhuongThucByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_PhuongThuc_cbxPhuongThucByCriteria]
						 @Search			=	N''
						,@PhuongThucId		=	N''
						,@MaPhuongThuc		=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_PhuongThuc_cbxPhuongThucByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@PhuongThucId		INT				=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @PhuongThucId		=	ISNULL(@PhuongThucId, 0)

	SELECT TOP 10 PT.*
	FROM	PhuongThuc PT
	WHERE	(@PhuongThucId = 0 OR PT.PhuongThucId = @PhuongThucId)
			AND (PT.TenPhuongThuc LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_SuaChua_GetListReportSuaChuaByBaoDuongId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*

EXEC sp_SuaChua_GetListReportSuaChuaByBaoDuongId '1'

*/

CREATE PROC [dbo].[sp_SuaChua_GetListReportSuaChuaByBaoDuongId]
( 
	@BaoDuongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	--SELECT * FROM dbo.BaoDuong WHERE BaoDuongId = 1
	--SELECT * FROM dbo.SuaChua WHERE BaoDuongId = 1
	--SELECT TOP 2* FROM dbo.TaiSan

	DECLARE @V_NGAYBATDAU DATETIME
			,@V_NGAYKETTHUC DATETIME

	DECLARE @TableLoaiBaoDuong TABLE
	(
		 _type INT,
		 _name NVARCHAR(100)
	)

	insert @TableLoaiBaoDuong
	select 1,N'Thay thế'
	union
	select 2,N'Bảo dưỡng'
	union
	select 3,N'Sửa chữa'

	SELECT @V_NGAYBATDAU = MIN(NgayBatDau), @V_NGAYKETTHUC = MAX(NgayKetThuc) FROM SuaChua WHERE BaoDuongId = @BaoDuongId

	SELECT	cs.MaCoSo, CS.TenCoSo,
			TS.TenTaiSan, TS.SoQDTC, TS.DonViTinh, TS.MaTaiSan, '' SoThe, PB.TenPhongBan, NV.TenNhanVien, H.DuToan, H.NgayBaoDuong, H.NgayDuKien, LBD._name TenLoaiBaoDuong,
			L.TenBoPhan, L.NoiDung, L.ChiPhi, L.KetQua, L.NgayBatDau,L.NgayKetThuc, @V_NGAYBATDAU v_ngaybatdau, @V_NGAYKETTHUC v_ngayketthuc
	FROM dbo.BaoDuong H
	JOIN dbo.SuaChua L ON L.BaoDuongId = H.BaoDuongId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = H.NhanVienId
	LEFT JOIN @TableLoaiBaoDuong LBD ON LBD._type = H.LoaiBaoDuongId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.BaoDuongId = @BaoDuongId

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SuaChua_GetListSuaChuaByBaoDuongId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_SuaChua_GetListSuaChuaByBaoDuongId]
( 
	@BaoDuongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.SuaChuaId,
			H.BaoDuongId,
			H.TenBoPhan,
			CONVERT(VARCHAR,H.NgayBatDau,103)NgayBatDau,
			CONVERT(VARCHAR,H.NgayKetThuc,103)NgayKetThuc,
			H.ChiPhi,
			H.NoiDung,
			H.NoiSua,
			H.KetQua
	FROM dbo.SuaChua H
	WHERE H.BaoDuongId = @BaoDuongId

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SuaChua_InsertSuaChua]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_SuaChua_InsertSuaChua]
	@BaoDuongId INT
	,@TenBoPhan NVARCHAR(100)
	,@NgayBatDau DATETIME
	,@NgayKetThuc DATETIME
	,@ChiPhi NUMERIC(18,4)
	,@NoiDung NVARCHAR(500)
	,@NoiSua NVARCHAR(500)
	,@KetQua NVARCHAR(500)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.SuaChua
			        ( BaoDuongId ,		TenBoPhan ,
					  NgayBatDau ,		NgayKetThuc ,
			          ChiPhi ,			NoiDung ,
			          NoiSua ,			KetQua
			        )
			SELECT @BaoDuongId			,@TenBoPhan
					,@NgayBatDau		,@NgayKetThuc
					,@ChiPhi			,@NoiDung
					,@NoiSua			,@KetQua		
			

			SELECT SCOPE_IDENTITY() AS SuaChuaId

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_SuDung_DeleteSuDungById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_SuDung_DeleteSuDungById]
	@SuDungId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.SuDungChiTiet WHERE SuDungId = @SuDungId
			DELETE dbo.SuDung WHERE SuDungId = @SuDungId
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_SuDung_GetListReportSuDungById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_SuDung_GetListReportSuDungById]
( 
	@SuDungId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	--1:dat
	--2:nha
	--3:oto
	--4:tren 500
	
	SELECT CS.MaCoSo, CS.TenCoSo,
		   CAST(H.KyLap AS VARCHAR)KyLap,
		   H.Nam,
		   H.NoiDung,
		   H.NguoiTao,
		   NV.TenNhanVien TenNguoiTao,
		   H.NgayTao,
		   TS.MaTaiSan,
		   TS.TenTaiSan,
		   L.SoSanPhamPhucVu,
		   L.DonViTinhSanPham,
		   L.SoNguyenLieuSuDung,
		   L.DonViTinhNguyenLieu,
		   L.GhiChu,
		   CASE WHEN TS.LoaiKeKhai = 3 THEN N'Phương tiện đi lại' ELSE N'Tài sản cố định khác' END TenLoaiTaiSan,
		   YEAR(TS.NgayBDHaoMon) NamSuDung,
		   SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
		   SUM(ISNULL(NG.GiaTri,0)) - (
								DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayTao) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								) GiaTriConLai
	FROM dbo.SuDung H
	JOIN dbo.SuDungChiTiet L ON L.SuDungId = H.SuDungId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = h.NguoiTao
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.SuDungId = @SuDungId
	GROUP BY
		   CS.MaCoSo, CS.TenCoSo,
		   H.KyLap,
		   H.Nam,
		   H.NoiDung,
		   H.NguoiTao,
		   NV.TenNhanVien,
		   H.NgayTao,
		   TS.MaTaiSan,
		   TS.TenTaiSan,
		   L.SoSanPhamPhucVu,
		   L.DonViTinhSanPham,
		   L.SoNguyenLieuSuDung,
		   L.DonViTinhNguyenLieu,
		   L.GhiChu,
		   TS.LoaiKeKhai,
		   TS.NgayBDHaoMon,
		   TS.TyLeHaoMon
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_SuDung_GetListSuDungByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_SuDung_GetListSuDungByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)		
	, @KyLap			nvarchar(500)   = null	
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @LoginId			NVARCHAR(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 

	SET @Search = ISNULL(@Search, '')
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0035',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

	IF OBJECT_ID('tempdb..#V_TB_KYLAP') IS NOT NULL
		DROP TABLE #V_TB_KYLAP
	CREATE TABLE #V_TB_KYLAP
	(
		 _id INT,
		 _name NVARCHAR(100)
	)

	insert #V_TB_KYLAP
	select 1,N'Cả năm'		union
	select 2,N'Quý I'		union
	select 3,N'Quý II'		union
	select 4,N'Quý III'		union
	select 5,N'Quý IV'		union
	select 6,N'Tháng 1'		union
	select 7,N'Tháng 2'		union
	select 8,N'Tháng 3'		union
	select 9,N'Tháng 4'		union
	select 10,N'Tháng 5'	union
	select 11,N'Tháng 6'	union
	select 12,N'Tháng 7'	union
	select 13,N'Tháng 8'	union
	select 14,N'Tháng 9'	union
	select 15,N'Tháng 10'	union
	select 16,N'Tháng 11'	union
	select 17,N'Tháng 12'

---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
		SELECT COUNT(*) OVER () AS MAXCNT, H.SuDungId, H.KyLap, KL._name TenKyLap, H.Nam, H.NoiDung, H.NguoiTao, nd.TenNhanVien TenNguoiTao, H.NgayTao
	FROM dbo.SuDung H
	LEFT JOIN #V_TB_KYLAP KL ON KL._id = H.KyLap
	LEFT JOIN NhanVien nd ON nd.NhanVienId = h.NguoiTao
	WHERE CAST(H.NgayTao AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nd.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nd.NhanVienId =''' + @LoginId + '''';   
	END

	--SET @V_SQL = @V_SQL + ' GROUP BY H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
	--						h.DuyetId, H.NguoiDuyet, H.CoSoId, H.NguoiTao, H.NgayTao,ndd.HoTen,nd.HoTen ';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_SuDung_GetListSuDungById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_SuDung_GetListSuDungById]
( 
	@SuDungId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.SuDungId,
		   CAST(H.KyLap AS VARCHAR)KyLap,
		   H.Nam,
		   H.NoiDung,
		   H.NguoiTao,
		   NV.TenNhanVien TenNguoiTao,
		   H.NgayTao,
		   H.CtrVersion
	FROM dbo.SuDung H
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = h.NguoiTao
	WHERE H.SuDungId = @SuDungId

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SuDung_InsertSuDung]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_SuDung_InsertSuDung]
	@KyLap INT,
	@Nam numeric (4, 0),
	@NoiDung NVARCHAR(500),
	@CoSoId INT,
	@NguoiTao INT,
	@CtrVersion INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.SuDung
			        ( KyLap ,			Nam ,			NoiDung ,
			          CoSoId ,			NguoiTao ,		NgayTao ,
			          CtrVersion
			        )
			SELECT @KyLap,				@Nam,			@NoiDung,
					@CoSoId,			@NguoiTao,		GETDATE(),
					1

			SELECT SCOPE_IDENTITY() AS SuDungIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_SuDung_UpdateSuDung]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_SuDung_UpdateSuDung]
	@SuDungId INT,
	@KyLap INT,
	@Nam numeric (4, 0),
	@NoiDung NVARCHAR(500),
	@CoSoId INT,
	@NguoiTao INT,
	@CtrVersion INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	IF EXISTS (SELECT 1 FROM dbo.SuDung WHERE SuDungId = @SuDungId AND CtrVersion <> @CtrVersion)
	BEGIN
		SELECT -1 AS ID
		RETURN
	END

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.SuDung 
			SET KyLap = @KyLap,
				Nam = @Nam,
				NoiDung = @NoiDung,
				CtrVersion = CtrVersion + 1
			WHERE SuDungId = @SuDungId

			DELETE dbo.SuDungChiTiet WHERE SuDungId = @SuDungId

			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_SuDungChiTiet_GetListSuDungChiTietBySuDungId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_SuDungChiTiet_GetListSuDungChiTietBySuDungId]
( 
	@SuDungId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT L.SuDungId,
		   CAST(L.TaiSanId AS VARCHAR)TaiSanId,
		   TS.TenTaiSan,
		   CAST(L.PhongBanId AS VARCHAR)PhongBanId,
		   PB.TenPhongBan,
		   CAST(L.NhanVienId AS VARCHAR)NhanVienId,
		   NV.TenNhanVien,
		   L.SoSanPhamPhucVu,
		   L.DonViTinhSanPham,
		   L.SoNguyenLieuSuDung,
		   L.DonViTinhNguyenLieu,
		   L.GhiChu
	FROM dbo.SuDungChiTiet L
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = L.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = L.NhanVienId
	WHERE SuDungId = @SuDungId

-----------------------------------------------------
SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SuDungChiTiet_InsertSuDungChiTiet]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_SuDungChiTiet_InsertSuDungChiTiet]
	@SuDungId INT,
	@TaiSanId INT,
	@PhongBanId INT,
	@NhanVienId INT,
	@SoSanPhamPhucVu NUMERIC(18,4),
	@DonViTinhSanPham NVARCHAR(50),
	@SoNguyenLieuSuDung NUMERIC(18,4),
	@DonViTinhNguyenLieu NVARCHAR(50),
	@GhiChu NVARCHAR(500)
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.SuDungChiTiet
			        ( SuDungId ,			TaiSanId ,			SoSanPhamPhucVu ,
			          DonViTinhSanPham ,	SoNguyenLieuSuDung ,DonViTinhNguyenLieu ,
			          GhiChu,				PhongBanId,			NhanVienId
			        )
			SELECT	@SuDungId,				@TaiSanId			,@SoSanPhamPhucVu
					,@DonViTinhSanPham		,@SoNguyenLieuSuDung,@DonViTinhNguyenLieu
					,@GhiChu	,			@PhongBanId			,@NhanVienId
									
			SELECT SCOPE_IDENTITY() AS SuDungChiTietIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_cbxTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_cbxTaiSanByCriteria]
						 @Search			=	N''
						,@TaiSanId			=	N''
						,@MaTaiSan			=	N''
						,@LoaiKeKhai		=	N'1|3'
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_cbxTaiSanByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@TaiSanId			NVARCHAR(500)	=	NULL
	,@MaTaiSan			NVARCHAR(500)   =	NULL
	,@LoaiKeKhai		NVARCHAR(500)   =	NULL
	,@CoSoId	        NVARCHAR(500)	=	NULL
	,@NhanVienId	    NVARCHAR(500)	=	NULL
	
)
AS  
BEGIN
SET NOCOUNT ON 
	SET @Search = ISNULL(@Search,'')
	SET @TaiSanId = ISNULL(@TaiSanId, '')
	SET @MaTaiSan = ISNULL(@MaTaiSan,'')
	SET @LoaiKeKhai = ISNULL(@LoaiKeKhai,'')

	SELECT		TS.*,ISNULL(NG.NguyenGia,0) NguyenGia
	FROM		(	SELECT		TOP 10 _TS.TaiSanId, ISNULL(SUM(_NG.GiaTri),0) NguyenGia
					FROM		TaiSan _TS 
								LEFT JOIN NguyenGia _NG ON _TS.TaiSanId = _NG.TaiSanId
					WHERE		_TS.CoSoId = @CoSoId
								AND (@Search = '' OR _TS.MaTaiSan LIKE N'%' + @Search + '%' OR _TS.TenTaiSan LIKE N'%' + @Search + '%')
								AND (@TaiSanId = '' OR @TaiSanId = 0 OR CHARINDEX('|' + CAST(_TS.TaiSanId AS VARCHAR(10)) + '|','|' + @TaiSanId + '|') > 0)
								AND (@MaTaiSan = '' OR CHARINDEX('|' + _TS.MaTaiSan + '|','|' + @MaTaiSan + '|') > 0)
								AND (@LoaiKeKhai = '' OR CHARINDEX('|' + CAST(_TS.LoaiKeKhai AS VARCHAR(10)) + '|','|' + @LoaiKeKhai + '|') > 0)
					GROUP BY	_TS.TaiSanId
				) NG
				LEFT JOIN TaiSan TS ON  TS.TaiSanId = NG.TaiSanId

SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_cbxTaiSanSuDungByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_cbxTaiSanSuDungByCriteria]
						 @Search			=	N''
						,@TaiSanId			=	N''
						,@MaTaiSan			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_cbxTaiSanSuDungByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TaiSanId			INT				=	NULL	
	, @MaTaiSan			NVARCHAR(500)   =	NULL	
)
AS  
BEGIN
SET NOCOUNT ON
	SET @Search = ISNULL(@Search,'')
	SET @TaiSanId = ISNULL(@TaiSanId, 0)
	SET @MaTaiSan = ISNULL(@MaTaiSan,'')

	SELECT	TOP 10 TS.TaiSanId,TS.MaTaiSan,TS.DonViTinh,TS.TenTaiSan,PB.PhongBanId,PB.TenPhongBan, ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,  ISNULL(SUM(NG.GiaTri),0) NguyenGia,nv.NhanVienId,nv.TenNhanVien
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN TheoDoi TD ON TS.TaiSanId = TD.TaiSanId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
			LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = TD.NhanVienId
	WHERE	TS.CoSoId = @CoSoId
			and (TD.SLTon + TD.SLTang - TD.SLGiam) > 0  
			AND (@TaiSanId = 0 OR TS.TaiSanId = @TaiSanId)
			AND (@MaTaiSan = '' OR TS.MaTaiSan = @MaTaiSan)
			AND (@Search = '' OR TS.MaTaiSan LIKE N'%' + @Search + '%' OR TS.TenTaiSan LIKE N'%' + @Search + '%')
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh,PB.PhongBanId,PB.TenPhongBan,TD.SLTon,TD.SLTang,TD.SLGiam,nv.NhanVienId,nv.TenNhanVien
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_cbxTaiSanSuDungById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_cbxTaiSanSuDungByCriteria]
						 @Search			=	N''
						,@TaiSanId			=	N''
						,@MaTaiSan			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
create PROCEDURE [dbo].[sp_TaiSan_cbxTaiSanSuDungById]
( 
	  @CoSoId	        INT				= null			
	, @TaiSanId			INT				=	NULL	
	, @PhongBanId		INT				=	NULL
	, @NhanVienId	    INT				= null				
)
AS  
BEGIN
SET NOCOUNT ON

	SELECT	TOP 10 TS.TaiSanId,TS.MaTaiSan,TS.DonViTinh,TS.TenTaiSan,PB.PhongBanId,PB.TenPhongBan, ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,  ISNULL(SUM(NG.GiaTri),0) NguyenGia,nv.NhanVienId,nv.TenNhanVien
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN TheoDoi TD ON TS.TaiSanId = TD.TaiSanId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
			LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = TD.NhanVienId
	WHERE	TS.CoSoId = @CoSoId and TD.TaiSanId = @TaiSanId and TD.PhongBanId = @PhongBanId and TD.NhanVienId = @NhanVienId
			
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh,PB.PhongBanId,PB.TenPhongBan,TD.SLTon,TD.SLTang,TD.SLGiam,nv.NhanVienId,nv.TenNhanVien
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_DeleteListTaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.05
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: XÓA THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_DeleteListTaiSan]
						 @TaiSanIds			=	N'1045|1044'

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.05 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_DeleteListTaiSan]
	 @TaiSanIds			VARCHAR(MAX)	=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET @TaiSanIds = ISNULL(@TaiSanIds,'')
	SET @MESSAGE = ISNULL(@MESSAGE,'')

BEGIN TRANSACTION TAISAN_DELETE
BEGIN TRY
	-- XÓA BẢNG CON
	DELETE NguyenGia WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinCongKhai WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Dat WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Nha WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Oto WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Tren500 WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0

	-- XÓA TÀI SẢN
	DELETE TaiSan WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0

	COMMIT TRANSACTION TAISAN_DELETE
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TAISAN_DELETE

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage, -- Message text.
				   @ErrorSeverity, -- Severity.
				   @ErrorState -- State.
				   );
END CATCH
	SELECT * FROM TaiSan WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetListNguyenGiaByTaiSanId]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_GetListNguyenGiaByTaiSanId]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_GetListNguyenGiaByTaiSanId]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	NG.*
	FROM	NguyenGia NG
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetListTaiSanByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.05
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: DANH SÁCH TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_GetListTaiSanByCriteria]
						 @SEARCH_STRING		=	N'q'
						,@SKIP				=	''
						,@TAKE				=	''
						,@OrderClause		=	'MAXCNT ASC'
						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.05 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_GetListTaiSanByCriteria]
	 @SEARCH_STRING		NVARCHAR(MAX)	=	NULL
	,@SEARCH_MATAISAN	NVARCHAR(MAX)	=	NULL
	,@SEARCH_TENTAISAN	NVARCHAR(MAX)	=	NULL
	,@SKIP				INT				=	NULL
	,@TAKE				INT				=	NULL
	,@OrderClause		NVARCHAR(MAX)	=	NULL				
	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(MAX) 
	DECLARE @V_SEARCH_STRING	NVARCHAR(MAX) 

	SET @SKIP = ISNULL(@SKIP, 0)
	SET @TAKE = ISNULL(@TAKE, 0)
	IF @TAKE = 0
		SET @TAKE = 10
	
	SET @CoSoId = ISNULL(@CoSoId, 0)

	SET @NhanVienId = ISNULL(@NhanVienId, '')
	IF @NhanVienId = ''
		SET @NhanVienId = 0
	
	SET @SEARCH_MATAISAN = ISNULL(@SEARCH_MATAISAN, '')
	SET @SEARCH_TENTAISAN = ISNULL(@SEARCH_TENTAISAN, '')

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	EXEC [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NhanVienId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0022',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @OrderClause = ISNULL(@OrderClause, '')
	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT	COUNT(TS.TaiSanId) OVER () AS MAXCNT, TS.*,l.TenLoai,n.TenNhom,h.TenHangSanXuat,nc.TenNuocSanXuat,ISNULL(NG.NguyenGia,0) NguyenGia 
	FROM	TaiSan TS 
			LEFT JOIN (
				select		TaiSanId, SUM(GiaTri) NguyenGia
				from		NguyenGia
				GROUP BY	TaiSanId
			) NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN LoaiTaiSan l ON TS.LoaiId=l.LoaiId
			LEFT JOIN NhomTaiSan n ON l.NhomId=n.NhomId
			LEFT JOIN HangSanXuat h ON TS.HangSanXuatId=h.HangSanXuatId
			LEFT JOIN NuocSanXuat nc ON TS.NuocSanXuatId=nc.NuocSanXuatId
			LEFT JOIN NhanVien NV ON TS.NguoiTao=NV.NhanVienId
	WHERE	1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @SEARCH_STRING <> ''
	SET @V_SQL = @V_SQL + N' AND (TS.MaTaiSan LIKE N''' +@SEARCH_STRING+ ''' OR TS.TenTaiSan LIKE  N''' +@SEARCH_STRING+ ''')';

	IF @SEARCH_MATAISAN <> ''
	SET @V_SQL = @V_SQL + N' AND (TS.MaTaiSan LIKE N''%' + @SEARCH_MATAISAN + '%'')';

	IF @SEARCH_TENTAISAN <> ''
	SET @V_SQL = @V_SQL + N' AND (TS.TenTaiSan LIKE N''%' +@SEARCH_TENTAISAN+ '%'')';

	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and TS.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and NV.PhongBanId = NV.PhongBanId';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and NV.NhanVienId =''' + @NhanVienId + '''';   
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS NVARCHAR(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS NVARCHAR(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetTaiSanById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.08.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_GetTaiSanById]
						 @TaiSanId			=	1065

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.31 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_GetTaiSanById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	TOP 10 TS.*, ISNULL(NG.NguyenGia,0) NguyenGia
	FROM	TaiSan TS
			LEFT JOIN (	SELECT	TaiSanId, ISNULL(SUM(GiaTri),0) NguyenGia
						FROM	NguyenGia
						GROUP BY  TaiSanId
			) NG ON TS.TaiSanId = NG.TaiSanId
	WHERE	TS.CoSoId = @CoSoId
			AND TS.TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetTaiSanByMa]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.08.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_GetTaiSanById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.31 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_GetTaiSanByMa]
	 @MaTaiSan		VARCHAR(20)				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	TOP 1 TS.TaiSanId,TS.MaTaiSan,TS.DonViTinh,TS.TenTaiSan,PB.TenPhongBan, ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,  ISNULL(SUM(NG.GiaTri),0) NguyenGia
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN TheoDoi TD ON TS.TaiSanId = TD.TaiSanId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
		WHERE	TS.MaTaiSan = @MaTaiSan and TS.CoSoId=@CoSoId
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh,PB.TenPhongBan,TD.SLTon,TD.SLTang,TD.SLGiam

SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_InsertTaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.08.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @NguyenGiaList dbo.NguyenGiaType
					INSERT INTO @NguyenGiaList VALUES(0,1,1111111)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_InsertTaiSan]
						 @MaTaiSan			=	'TS001'
						,@TenTaiSan			=	N'KHÔNG BIẾT'
						,@DonViTinh			=	'CÁI'
						,@LoaiId			=	1
						,@PhuongThucId		=	1
						,@NamSanXuat		=	2015
						,@NuocSanXuatId		=	1
						,@HangSanXuatId		=	2
						,@SoQDTC			=	'QDTC'
						,@NhanHieu			=	'SAMSUNG'
						,@DuAnId			=	1
						,@NgayMua			=	'2018-08-31'
						,@NgayBDHaoMon		=	'2018-08-31'
						,@SoNamSuDung		=	1
						,@TyLeHaoMon		=	1.1
						,@HaoMonLuyKe		=	1.1
						,@NgayBDKhauHao		=	'2018-08-31'
						,@KyTinhKhauHao		=	N'KỲ KH'
						,@GiaTriKhauHao		=	1
						,@SoKyKhauHao		=	1
						,@TyLeKhauHao		=	1.1
						,@KhauHaoLuyKe		=	1.1
						,@LoaiKeKhai		=	1
						,@NguoiTao			=	NULL
						,@NgayTao			=	NULL
						,@CtrVersion		=	NULL

						,@NguyenGiaList		=	@NguyenGiaList

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.31 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
/*
DROP TYPE NguyenGiaType
CREATE TYPE NguyenGiaType AS TABLE
( 
	TaiSanId			INT,
	NguonNganSachId		INT,
	GiaTri				numeric(18, 4)
)
*/
CREATE PROCEDURE [dbo].[sp_TaiSan_InsertTaiSan]
	 @TaiSanId			INT				=	NULL
    ,@MaTaiSan			NVARCHAR(MAX)	=	NULL
    ,@TenTaiSan			NVARCHAR(MAX)	=	NULL
    ,@DonViTinh			NVARCHAR(MAX)	=	NULL
    ,@LoaiId			INT				=	NULL
    ,@PhuongThucId		INT				=	NULL
    ,@NamSanXuat		NUMERIC(4,0)	=	NULL
    ,@NuocSanXuatId		INT				=	NULL
    ,@HangSanXuatId		INT				=	NULL
    ,@SoQDTC			NVARCHAR(MAX)	=	NULL
    ,@NhanHieu			NVARCHAR(MAX)	=	NULL
    ,@DuAnId			INT				=	NULL
    ,@NgayMua			DATETIME		=	NULL
    ,@NgayBDHaoMon		DATETIME		=	NULL
    ,@SoNamSuDung		INT				=	NULL
    ,@TyLeHaoMon		NUMERIC(5,2)	=	NULL
    ,@HaoMonLuyKe		NUMERIC(18,4)	=	NULL
    ,@NgayBDKhauHao		DATETIME		=	NULL
    ,@KyTinhKhauHao		NVARCHAR(MAX)	=	NULL
    ,@GiaTriKhauHao		NUMERIC(18,4)	=	NULL
    ,@SoKyKhauHao		NUMERIC(5,0)	=	NULL
    ,@TyLeKhauHao		NUMERIC(5,2)	=	NULL
    ,@KhauHaoLuyKe		NUMERIC(18,4)	=	NULL
    ,@LoaiKeKhai		INT				=	NULL
    ,@NguoiTao			INT				=	NULL
    ,@NgayTao			DATETIME		=	NULL
    ,@CtrVersion		INT				=	NULL

	,@NguyenGiaList		NguyenGiaType		READONLY

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE @V_MATAISAN		NVARCHAR(MAX)	=	''

	-- INPUT DEFAULT
	SET	@TaiSanId	=	ISNULL(@TaiSanId, 0)
	SET	@NgayTao	=	ISNULL(@NgayTao, GETDATE())
	SET	@CtrVersion	=	ISNULL(@CtrVersion, 1)
	SET	@NhanVienId	=	ISNULL(@NhanVienId, 0)
	SET @NguoiTao	=	ISNULL(@NguoiTao, @NhanVienId)
	SET @MESSAGE	=	ISNULL(@MESSAGE, '')

BEGIN TRY
	IF EXISTS (SELECT 1 FROM TaiSan WHERE CoSoId = @CoSoId AND MaTaiSan = @MaTaiSan)
	BEGIN
		SET @MESSAGE	=	N'MA_TAI_SAN|1|Mã này đã tồn tại';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TAISAN_INSERT
	-- INSERT DỮ LIỆU
	INSERT INTO TaiSan	(	MaTaiSan	,TenTaiSan	,DonViTinh	,LoaiId		,PhuongThucId	,NamSanXuat		,NuocSanXuatId	,HangSanXuatId	,SoQDTC		,NhanHieu	,DuAnId		,NgayMua	,NgayBDHaoMon	,SoNamSuDung	,TyLeHaoMon		,HaoMonLuyKe	,NgayBDKhauHao	,KyTinhKhauHao	,GiaTriKhauHao	,SoKyKhauHao	,TyLeKhauHao	,KhauHaoLuyKe	,LoaiKeKhai		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES				(	@MaTaiSan	,@TenTaiSan	,@DonViTinh	,@LoaiId	,@PhuongThucId	,@NamSanXuat	,@NuocSanXuatId	,@HangSanXuatId	,@SoQDTC	,@NhanHieu	,@DuAnId	,@NgayMua	,@NgayBDHaoMon	,@SoNamSuDung	,@TyLeHaoMon	,@HaoMonLuyKe	,@NgayBDKhauHao	,@KyTinhKhauHao	,@GiaTriKhauHao	,@SoKyKhauHao	,@TyLeKhauHao	,@KhauHaoLuyKe	,@LoaiKeKhai	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @TaiSanId	=	@@IDENTITY

	/*** NGUYÊN GIÁ ***/
	 DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId	,GiaTri )
	SELECT					@TaiSanId	,NguonNganSachId	,GiaTri
	FROM @NguyenGiaList

	COMMIT TRANSACTION TAISAN_INSERT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TAISAN_INSERT

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM TaiSan WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_UpdateTaiSan]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.08.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @NguyenGiaList dbo.NguyenGiaType
					INSERT INTO @NguyenGiaList VALUES(0,1,121212121)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_UpdateTaiSan]
						 @TaiSanId			=	34
						,@MaTaiSan			=	'TS001'
						,@TenTaiSan			=	N'KHÔNG BIẾT'
						,@DonViTinh			=	'CÁI'
						,@LoaiId			=	1
						,@PhuongThucId		=	1
						,@NamSanXuat		=	2015
						,@NuocSanXuatId		=	1
						,@HangSanXuatId		=	2
						,@SoQDTC			=	'QDTC'
						,@NhanHieu			=	'SAMSUNG'
						,@DuAnId			=	1
						,@NgayMua			=	'2018-08-31'
						,@NgayBDHaoMon		=	'2018-08-31'
						,@SoNamSuDung		=	1
						,@TyLeHaoMon		=	1.1
						,@HaoMonLuyKe		=	1.1
						,@NgayBDKhauHao		=	'2018-08-31'
						,@KyTinhKhauHao		=	N'KỲ KH'
						,@GiaTriKhauHao		=	1
						,@SoKyKhauHao		=	1
						,@TyLeKhauHao		=	1.1
						,@KhauHaoLuyKe		=	1.1
						,@LoaiKeKhai		=	1
						,@NguoiTao			=	NULL
						,@NgayTao			=	NULL
						,@CtrVersion		=	NULL

						,@NguyenGiaList		=	@NguyenGiaList

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.31 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_UpdateTaiSan]
	/* TÀI SẢN */
	 @TaiSanId			INT				=	NULL
    ,@MaTaiSan			NVARCHAR(MAX)	=	NULL
    ,@TenTaiSan			NVARCHAR(MAX)	=	NULL
    ,@DonViTinh			NVARCHAR(MAX)	=	NULL
    ,@LoaiId			INT				=	NULL
    ,@PhuongThucId		INT				=	NULL
    ,@NamSanXuat		NUMERIC(4,0)	=	NULL
    ,@NuocSanXuatId		INT				=	NULL
    ,@HangSanXuatId		INT				=	NULL
    ,@SoQDTC			NVARCHAR(MAX)	=	NULL
    ,@NhanHieu			NVARCHAR(MAX)	=	NULL
    ,@DuAnId			INT				=	NULL
    ,@NgayMua			DATETIME		=	NULL
    ,@NgayBDHaoMon		DATETIME		=	NULL
    ,@SoNamSuDung		INT				=	NULL
    ,@TyLeHaoMon		NUMERIC(5,2)	=	NULL
    ,@HaoMonLuyKe		NUMERIC(18,4)	=	NULL
    ,@NgayBDKhauHao		DATETIME		=	NULL
    ,@KyTinhKhauHao		NVARCHAR(MAX)	=	NULL
    ,@GiaTriKhauHao		NUMERIC(18,4)	=	NULL
    ,@SoKyKhauHao		NUMERIC(5,0)	=	NULL
    ,@TyLeKhauHao		NUMERIC(5,2)	=	NULL
    ,@KhauHaoLuyKe		NUMERIC(18,4)	=	NULL
    ,@LoaiKeKhai		INT				=	NULL
    ,@NguoiTao			INT				=	NULL
    ,@NgayTao			DATETIME		=	NULL
    ,@CtrVersion		INT				=	NULL

	,@NguyenGiaList		NguyenGiaType		READONLY

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@CtrVersion		=	ISNULL(@CtrVersion, 0)

BEGIN TRY

	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- KIỂM TRA @CtrVersion
	IF EXISTS (SELECT 1 FROM TaiSan WHERE TaiSanId = @TaiSanId AND CtrVersion <> @CtrVersion)
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người thay đổi thông tin';
		THROW 51000, @MESSAGE, 1;
	END

	-- KIỂM TRA @MaTaiSan
	IF EXISTS (SELECT 1 FROM TaiSan WHERE CoSoId = @CoSoId AND MaTaiSan = @MaTaiSan AND TaiSanId <> @TaiSanId)
	BEGIN
		SET @MESSAGE	=	N'MA_TAI_SAN|1|Mã tài sản đã tồn tại';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TAISAN_UPDATE
	-- INSERT DỮ LIỆU
	UPDATE	TaiSan
	SET		 MaTaiSan		=	@MaTaiSan
			,TenTaiSan		=	@TenTaiSan
			,DonViTinh		=	@DonViTinh
			,LoaiId			=	@LoaiId
			,PhuongThucId	=	@PhuongThucId
			,NamSanXuat		=	@NamSanXuat
			,NuocSanXuatId	=	@NuocSanXuatId
			,HangSanXuatId	=	@HangSanXuatId
			,SoQDTC			=	@SoQDTC
			,NhanHieu		=	@NhanHieu
			,DuAnId			=	@DuAnId
			,NgayMua		=	@NgayMua
			,NgayBDHaoMon	=	@NgayBDHaoMon
			,SoNamSuDung	=	@SoNamSuDung
			,TyLeHaoMon		=	@TyLeHaoMon
			,HaoMonLuyKe	=	@HaoMonLuyKe
			,NgayBDKhauHao	=	@NgayBDKhauHao
			,KyTinhKhauHao	=	@KyTinhKhauHao
			,GiaTriKhauHao	=	@GiaTriKhauHao
			,SoKyKhauHao	=	@SoKyKhauHao
			,TyLeKhauHao	=	@TyLeKhauHao
			,KhauHaoLuyKe	=	@KhauHaoLuyKe
			,LoaiKeKhai		=	@LoaiKeKhai
			,CtrVersion		=	CtrVersion + 1
	 WHERE TaiSanId = @TaiSanId

	/*** NGUYÊN GIÁ ***/
	 DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId	,GiaTri )
	SELECT					@TaiSanId	,NguonNganSachId	,GiaTri
	FROM @NguyenGiaList

	COMMIT TRANSACTION TAISAN_UPDATE
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TAISAN_UPDATE

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();
	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM TaiSan WHERE TaiSanId = @TaiSanId

	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin_DeleteThayDoiThongTin]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin_DeleteThayDoiThongTin]
						 @ThayDoiThongTinId			=	39

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin_DeleteThayDoiThongTin]
	 @ThayDoiThongTinId		INT				=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON

DECLARE  @V_TRANS_NAME			NVARCHAR(MAX)	=	N'TDTT_DELETE'
		,@V_TAISANID			INT				=	NULL
		,@V_NGAY				DATETIME		=	NULL
		,@V_LAOIKEKHAI			INT				=	NULL

BEGIN TRY
	SET @MESSAGE = ISNULL(@MESSAGE,'')

	SELECT		 @V_TAISANID = TS.TaiSanId
				,@V_LAOIKEKHAI = TS.LoaiKeKhai
				,@V_NGAY = Ngay
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN TAISAN TS ON TDTT.TaiSanId = TS.TaiSanId
	WHERE TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	SELECT @V_TAISANID = TAISANID FROM THAYDOITHONGTIN WHERE THAYDOITHONGTINID = @THAYDOITHONGTINID

	IF EXISTS (SELECT 1 FROM THAYDOITHONGTIN WHERE TAISANID = @V_TAISANID AND THAYDOITHONGTINID <> @THAYDOITHONGTINID AND Ngay >= @V_NGAY)
	BEGIN
		SET @MESSAGE = N'NGAY|1|Không thể xóa vì đã có nhiều thay đổi';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION @V_TRANS_NAME

	-- UPDATE TÀI SẢN
	UPDATE		TS
	SET			TS.TenTaiSan = ISNULL(TDTT.TenTaiSanCu,TS.TenTaiSan)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE THÔNG TIN TÀI SẢN KÊ KHAI
	IF @V_LAOIKEKHAI = 1 -- ĐẤT
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.BiLanChiem		=	ISNULL(TDTT_LOAI.BiLanChiemCu,TTKK.BiLanChiem)
					,TTKK.BoTrong			=	ISNULL(TDTT_LOAI.BoTrongCu,TTKK.BoTrong)
					,TTKK.ChoThue			=	ISNULL(TDTT_LOAI.ChoThueCu,TTKK.ChoThue)
					,TTKK.CoSoHDSuNghiep	=	ISNULL(TDTT_LOAI.CoSoHDSuNghiepCu,TTKK.CoSoHDSuNghiep)
					,TTKK.DiaChi			=	ISNULL(TDTT_LOAI.DiaChiCu,TTKK.DiaChi)
					,TTKK.DienTich			=	ISNULL(TDTT_LOAI.DienTichCu,TTKK.DienTich)
					,TTKK.GiayTo			=	ISNULL(TDTT_LOAI.GiayToCu,TTKK.GiayTo)
					,TTKK.LamTruSo			=	ISNULL(TDTT_LOAI.LamTruSoCu,TTKK.LamTruSo)
					,TTKK.NhaO				=	ISNULL(TDTT_LOAI.NhaOCu,TTKK.NhaO)
					,TTKK.SuDungKhac		=	ISNULL(TDTT_LOAI.SuDungKhacCu,TTKK.SuDungKhac)
		FROM		ThongTinKeKhai_Dat TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Dat TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END
	-- UPDATE THÔNG TIN TÀI SẢN KÊ KHAI
	ELSE IF @V_LAOIKEKHAI = 2 -- NHÀ
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.BiLanChiem		=	ISNULL(TDTT_LOAI.BiLanChiemCu,TTKK.BiLanChiem)
					,TTKK.BoTrong			=	ISNULL(TDTT_LOAI.BoTrongCu,TTKK.BoTrong)
					,TTKK.CapHang			=	ISNULL(TDTT_LOAI.CapHangCu,TTKK.CapHang)
					,TTKK.ChoThue			=	ISNULL(TDTT_LOAI.ChoThueCu,TTKK.ChoThue)
					,TTKK.CoSoHDSuNghiep	=	ISNULL(TDTT_LOAI.CoSoHDSuNghiepCu,TTKK.CoSoHDSuNghiep)
					,TTKK.DiaChi			=	ISNULL(TDTT_LOAI.DiaChiCu,TTKK.DiaChi)
					,TTKK.DienTich			=	ISNULL(TDTT_LOAI.DienTichCu,TTKK.DienTich)
					,TTKK.GiayTo			=	ISNULL(TDTT_LOAI.GiayToCu,TTKK.GiayTo)
					,TTKK.LamTruSo			=	ISNULL(TDTT_LOAI.LamTruSoCu,TTKK.LamTruSo)
					,TTKK.NamSuDung			=	ISNULL(TDTT_LOAI.NamSuDungCu,TTKK.NamSuDung)
					,TTKK.NhaO				=	ISNULL(TDTT_LOAI.NhaOCu,TTKK.NhaO)
					,TTKK.SuDungKhac		=	ISNULL(TDTT_LOAI.SuDungKhacCu,TTKK.SuDungKhac)
					,TTKK.TongDienTichSan	=	ISNULL(TDTT_LOAI.TongDienTichSanCu,TTKK.TongDienTichSan)
		FROM		ThongTinKeKhai_Nha TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Nha TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END
	ELSE IF @V_LAOIKEKHAI = 3 -- OTO
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.BienKiemSoat		=	ISNULL(TDTT_LOAI.BienKiemSoatCu,TTKK.BienKiemSoat)
					,TTKK.ChucDanh			=	ISNULL(TDTT_LOAI.ChucDanhCu,TTKK.ChucDanh)
					,TTKK.CongSuatXe		=	ISNULL(TDTT_LOAI.CongSuatXeCu,TTKK.CongSuatXe)
					,TTKK.HienTrangSuDung	=	ISNULL(TDTT_LOAI.HienTrangSuDungCu,TTKK.HienTrangSuDung)
					,TTKK.LoaiXe			=	ISNULL(TDTT_LOAI.LoaiXeCu,TTKK.LoaiXe)
					,TTKK.NguonGocXe		=	ISNULL(TDTT_LOAI.NguonGocXeCu,TTKK.NguonGocXe)
					,TTKK.NhanHieu			=	ISNULL(TDTT_LOAI.NhanHieuCu,TTKK.NhanHieu)
					,TTKK.TrongTai			=	ISNULL(TDTT_LOAI.TrongTaiCu,TTKK.TrongTai)
		FROM		ThongTinKeKhai_Oto TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Oto TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END
	ELSE IF @V_LAOIKEKHAI = 4 -- TRÊN 500 TRIỆU
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.HienTrangSuDung	=	ISNULL(TDTT_LOAI.HienTrangSuDungCu,TTKK.HienTrangSuDung)
					,TTKK.KyHieu			=	ISNULL(TDTT_LOAI.KyHieuCu,TTKK.KyHieu)
		FROM		ThongTinKeKhai_Tren500 TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Tren500 TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END


	-- DELETE THAY ĐỔI THÔNG TIN
	DELETE ThayDoiThongTin_Dat WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin_Nha WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin_Oto WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin_Tren500 WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH

	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId

SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin_GetListThayDoiThongTinByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin_GetListThayDoiThongTinByCriteria]
						 @Search			=	N'ghế'
						,@Skip				=	6
						,@Take				=	10
						,@OrderClause		=	'ID desc'

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin_GetListThayDoiThongTinByCriteria]
	 @Search			NVARCHAR(MAX)	=	NULL
	,@Field				NVARCHAR(MAX)	=	NULL
	,@Skip				INT				=	NULL
	,@Take				INT				=	NULL
	,@OrderClause		NVARCHAR(MAX)	=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON
	DECLARE @V_SQL NVARCHAR(MAX) 

---- SET DEFAULT PARAMS
	SET @CoSoId = ISNULL(@CoSoId,0)
	SET @NhanVienId = ISNULL(@NhanVienId,0)
	SET @MESSAGE = ISNULL(@MESSAGE,'')

	SET @Search = ISNULL(@Search,'')
	SET @Skip = ISNULL(@Skip,0)

	SET @Take = ISNULL(@Take,0)
	IF @Take = 0
		SET @Take = 10

	SET @OrderClause = ISNULL(@OrderClause,'')
	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';

	SET @Field = ISNULL(@Field,'TDTT.*')

---- KIỂM TRA
---- BUILD SQL CLAUSE
	SET @V_SQL = N'
	SELECT		COUNT(TDTT.ThayDoiThongTinId) OVER () AS MAXCNT,' + @Field + ' 
				,TS.MaTaiSan,TS.TenTaiSan,TS.LoaiKeKhai
				,NV_ND.TenNhanVien TenNguoiDuyet
				,TDTT.ThayDoiThongTinId ID,TDTT.CtrVersion VERSION
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN NhanVien NV_ND ON TDTT.NguoiDuyet = NV_ND.NhanVienId
	WHERE		TDTT.CoSoId = @CoSoId
				AND (@Search = '''' OR TS.MaTaiSan LIKE ''%'' + @Search + ''%'' OR TS.TenTaiSan LIKE ''%'' + @Search + ''%'')
	ORDER BY	' + @OrderClause + ' 
				OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY
	'
---- EXEC @V_SQL
	exec sp_executesql @V_SQL,N'
		 @Search			NVARCHAR(MAX)	=	NULL
		,@Field				NVARCHAR(MAX)	=	NULL
		,@Skip				INT				=	NULL
		,@Take				INT				=	NULL
		,@CoSoId			INT				=	NULL
		'
		,@Search		=	@Search
		,@Field			=	@Field
		,@Skip			=	@Skip
		,@Take			=	@Take
		,@CoSoId		=	@CoSoId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin_GetThayDoiThongTinById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin_GetThayDoiThongTinById]
						 @ThayDoiThongTinId			=	26

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin_GetThayDoiThongTinById]
	 @ThayDoiThongTinId		INT				=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	TDTT.*, TS.LoaiKeKhai,TS.TenTaiSan TenTaiSanMoi,ISNULL(TDTT.TenTaiSanCu, TS.TenTaiSan) TenTaiSanCu
	FROM	ThayDoiThongTin TDTT
			LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
	WHERE	TDTT.CoSoId = @CoSoId
			AND TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin_report_TDTTById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.27
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_ThayDoiThongTin_report_TDTTNhaById]
						 @ThayDoiThongTinId			=	82
6. Precaution	:
7. History		:
				  2017.09.27 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin_report_TDTTById]
	@ThayDoiThongTinId		INT			=	NULL
AS  
BEGIN
SET NOCOUNT ON
--------------------------------------------------
SET @ThayDoiThongTinId = ISNULL(@ThayDoiThongTinId, 0)
SELECT		-- THÔNG TIN CHUNG
			 TDTT.Ngay,TS.LoaiKeKhai,CS.TenCoSo TenDonVi,CS_QL.TenCoSo TenDonViChuQuan
			--,TS.TenTaiSan				,TDTT.TenTaiSanCu
			,CASE WHEN TDTT.TenTaiSanCu IS NOT NULL THEN TS.TenTaiSan ELSE TDTT.TenTaiSanCu END TenTaiSan
			,ISNULL(TDTT.TenTaiSanCu,TS.TenTaiSan) TenTaiSanCu
			
			-- THÔNG TIN NHÀ
			
			--,TTKK_NHA.DiaChi			TTKK_NHA_DiaChi			,TDTT_NHA.DiaChiCu				TDTT_NHA_DiaChiCu
			,CASE WHEN TDTT_NHA.DiaChiCu IS NOT NULL THEN TTKK_NHA.DiaChi ELSE TDTT_NHA.DiaChiCu END TTKK_NHA_DiaChi
			,ISNULL(TDTT_NHA.DiaChiCu,TTKK_NHA.DiaChi) TDTT_NHA_DiaChiCu

			--,TTKK_NHA.DienTich			TTKK_NHA_DienTich			,TDTT_NHA.DienTichCu				TDTT_NHA_DienTichCu
			,CASE WHEN TDTT_NHA.DienTichCu IS NOT NULL THEN TTKK_NHA.DienTich ELSE TDTT_NHA.DienTichCu END TTKK_NHA_DienTich
			,ISNULL(TDTT_NHA.DienTichCu,TTKK_NHA.DienTich) TDTT_NHA_DienTichCu
			--,TTKK_NHA.TongDienTichSan			TTKK_NHA_TongDienTichSan			,TDTT_NHA.TongDienTichSanCu				TDTT_NHA_TongDienTichSanCu
			,CASE WHEN TDTT_NHA.TongDienTichSanCu IS NOT NULL THEN TTKK_NHA.TongDienTichSan ELSE TDTT_NHA.TongDienTichSanCu END TTKK_NHA_TongDienTichSan
			,ISNULL(TDTT_NHA.TongDienTichSanCu,TTKK_NHA.TongDienTichSan) TDTT_NHA_TongDienTichSanCu
			--,TTKK_NHA.BoTrong			TTKK_NHA_BoTrong			,TDTT_NHA.BoTrongCu				TDTT_NHA_BoTrongCu
			,CASE WHEN TDTT_NHA.BoTrongCu IS NOT NULL THEN TTKK_NHA.BoTrong ELSE TDTT_NHA.BoTrongCu END TTKK_NHA_BoTrong
			,ISNULL(TDTT_NHA.BoTrongCu,TTKK_NHA.BoTrong) TDTT_NHA_BoTrongCu
			--,TTKK_NHA.ChoThue			TTKK_NHA_ChoThue			,TDTT_NHA.ChoThueCu				TDTT_NHA_ChoThueCu
			,CASE WHEN TDTT_NHA.ChoThueCu IS NOT NULL THEN TTKK_NHA.ChoThue ELSE TDTT_NHA.ChoThueCu END TTKK_NHA_ChoThue
			,ISNULL(TDTT_NHA.ChoThueCu,TTKK_NHA.ChoThue) TDTT_NHA_ChoThueCu
			--,TTKK_NHA.CoSoHDSuNghiep	TTKK_NHA_CoSoHDSuNghiep		,TDTT_NHA.CoSoHDSuNghiepCu		TDTT_NHA_CoSoHDSuNghiepCu
			,CASE WHEN TDTT_NHA.CoSoHDSuNghiepCu IS NOT NULL THEN TTKK_NHA.CoSoHDSuNghiep ELSE TDTT_NHA.CoSoHDSuNghiepCu END TTKK_NHA_CoSoHDSuNghiep
			,ISNULL(TDTT_NHA.CoSoHDSuNghiepCu,TTKK_NHA.CoSoHDSuNghiep) TDTT_NHA_CoSoHDSuNghiepCu
			--,TTKK_NHA.LamTruSo			TTKK_NHA_LamTruSo			,TDTT_NHA.LamTruSoCu			TDTT_NHA_LamTruSoCu
			,CASE WHEN TDTT_NHA.LamTruSoCu IS NOT NULL THEN TTKK_NHA.LamTruSo ELSE TDTT_NHA.ChoThueCu END TTKK_NHA_LamTruSo
			,ISNULL(TDTT_NHA.LamTruSoCu,TTKK_NHA.LamTruSo) TDTT_NHA_LamTruSoCu
			--,TTKK_NHA.NhaO				TTKK_NHA_NhaO				,TDTT_NHA.NhaOCu				TDTT_NHA_NhaOCu
			,CASE WHEN TDTT_NHA.NhaOCu IS NOT NULL THEN TTKK_NHA.NhaO ELSE TDTT_NHA.NhaOCu END TTKK_NHA_NhaO
			,ISNULL(TDTT_NHA.NhaOCu,TTKK_NHA.NhaO) TDTT_NHA_NhaOCu

			-- THÔNG TIN ĐẤT
			
			--,TTKK_DAT.DiaChi			TTKK_DAT_DiaChi				,TDTT_DAT.DiaChiCu				TDTT_DAT_DiaChiCu
			,CASE WHEN TDTT_DAT.DiaChiCu IS NOT NULL THEN TTKK_DAT.DiaChi ELSE TDTT_DAT.DiaChiCu END TTKK_DAT_DiaChi
			,ISNULL(TDTT_DAT.DiaChiCu,TTKK_DAT.DiaChi) TDTT_DAT_DiaChiCu
			--,TTKK_DAT.DienTich			TTKK_DAT_DienTich			,TDTT_DAT.DienTichCu			TDTT_DAT_DienTichCu
			,CASE WHEN TDTT_DAT.DienTichCu IS NOT NULL THEN TTKK_DAT.DienTich ELSE TDTT_DAT.DienTichCu END TTKK_DAT_DienTich
			,ISNULL(TDTT_DAT.DienTichCu,TTKK_DAT.DienTich) TDTT_DAT_DienTichCu
			--,TTKK_DAT.LamTruSo			TTKK_DAT_LamTruSo			,TDTT_DAT.LamTruSoCu			TDTT_DAT_LamTruSoCu
			,CASE WHEN TDTT_DAT.LamTruSoCu IS NOT NULL THEN TTKK_DAT.LamTruSo ELSE TDTT_DAT.LamTruSoCu END TTKK_DAT_LamTruSo
			,ISNULL(TDTT_DAT.LamTruSoCu,TTKK_DAT.LamTruSo) TDTT_DAT_LamTruSoCu
			--,TTKK_DAT.CoSoHDSuNghiep	TTKK_DAT_CoSoHDSuNghiep		,TDTT_DAT.CoSoHDSuNghiepCu		TDTT_DAT_CoSoHDSuNghiepCu
			,CASE WHEN TDTT_DAT.CoSoHDSuNghiepCu IS NOT NULL THEN TTKK_DAT.CoSoHDSuNghiep ELSE TDTT_DAT.CoSoHDSuNghiepCu END TTKK_DAT_CoSoHDSuNghiep
			,ISNULL(TDTT_DAT.CoSoHDSuNghiepCu,TTKK_DAT.CoSoHDSuNghiep) TDTT_DAT_CoSoHDSuNghiepCu
			--,TTKK_DAT.NhaO				TTKK_DAT_NhaO				,TDTT_DAT.NhaOCu				NhaOCu
			,CASE WHEN TDTT_DAT.NhaOCu IS NOT NULL THEN TTKK_DAT.NhaO ELSE TDTT_DAT.NhaOCu END TTKK_DAT_NhaO
			,ISNULL(TDTT_DAT.NhaOCu,TTKK_DAT.NhaO) TDTT_DAT_NhaOCu
			--,TTKK_DAT.ChoThue			TTKK_DAT_ChoThue			,TDTT_DAT.ChoThueCu				TDTT_DAT_ChoThueCu
			,CASE WHEN TDTT_DAT.ChoThueCu IS NOT NULL THEN TTKK_DAT.ChoThue ELSE TDTT_DAT.ChoThueCu END TTKK_DAT_ChoThue
			,ISNULL(TDTT_DAT.ChoThueCu,TTKK_DAT.ChoThue) TDTT_DAT_ChoThueCu
			--,TTKK_DAT.BoTrong			TTKK_DAT_BoTrong			,TDTT_DAT.BoTrongCu				TDTT_DAT_BoTrongCu
			,CASE WHEN TDTT_DAT.BoTrongCu IS NOT NULL THEN TTKK_DAT.BoTrong ELSE TDTT_DAT.BoTrongCu END TTKK_DAT_BoTrong
			,ISNULL(TDTT_DAT.BoTrongCu,TTKK_DAT.BoTrong) TDTT_DAT_BoTrongCu

			-- THÔNG TIN OTO
			
			--,TTKK_OTO.BienKiemSoat			TTKK_OTO_BienKiemSoat			,TDTT_OTO.BienKiemSoatCu				TDTT_OTO_BienKiemSoatCu
			,CASE WHEN TDTT_OTO.BienKiemSoatCu IS NOT NULL THEN TTKK_OTO.BienKiemSoat ELSE TDTT_OTO.BienKiemSoatCu END TTKK_OTO_BienKiemSoat
			,ISNULL(TDTT_OTO.BienKiemSoatCu,TTKK_OTO.BienKiemSoat) TDTT_OTO_BienKiemSoatCu
			--,TTKK_OTO.LoaiXe			TTKK_OTO_LoaiXe			,TDTT_OTO.LoaiXeCu				TDTT_OTO_LoaiXeCu
			,CASE WHEN TDTT_OTO.LoaiXeCu IS NOT NULL THEN TTKK_OTO.LoaiXe ELSE TDTT_OTO.LoaiXeCu END TTKK_OTO_LoaiXe
			,ISNULL(TDTT_OTO.LoaiXeCu,TTKK_OTO.LoaiXe) TDTT_OTO_LoaiXeCu
			--,TTKK_OTO.TrongTai			TTKK_OTO_TrongTai			,TDTT_OTO.TrongTaiCu				TDTT_OTO_TrongTaiCu
			,CASE WHEN TDTT_OTO.TrongTaiCu IS NOT NULL THEN TTKK_OTO.TrongTai ELSE TDTT_OTO.TrongTaiCu END TTKK_OTO_TrongTai
			,ISNULL(TDTT_OTO.TrongTaiCu,TTKK_OTO.TrongTai) TDTT_OTO_TrongTaiCu

FROM		ThayDoiThongTin TDTT
			LEFT JOIN CoSo CS ON TDTT.CoSoId = CS.CoSoId
			LEFT JOIN CoSo CS_QL ON CS.TrucThuoc = CS_QL.CoSoId
			LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId

			LEFT JOIN ThayDoiThongTin_Dat TDTT_DAT ON TDTT.ThayDoiThongTinId = TDTT_DAT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Dat TTKK_DAT ON TDTT.TaiSanId = TTKK_DAT.TaiSanId

			LEFT JOIN ThayDoiThongTin_Nha TDTT_NHA ON TDTT.ThayDoiThongTinId = TDTT_NHA.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Nha TTKK_NHA ON TDTT.TaiSanId = TTKK_NHA.TaiSanId

			LEFT JOIN ThayDoiThongTin_Oto TDTT_OTO ON TDTT.ThayDoiThongTinId = TDTT_OTO.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Oto TTKK_OTO ON TDTT.TaiSanId = TTKK_OTO.TaiSanId
WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
--------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin500_GetThayDoiThongTin500ById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin500_GetThayDoiThongTin500ById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin500_GetThayDoiThongTin500ById]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	 TDTT_500.ThayDoiThongTinId
			,ISNULL(TDTT_500.KyHieuCu			, TTKK_500.KyHieu)			KyHieuCu
			,ISNULL(TDTT_500.HienTrangSuDungCu	, TTKK_500.HienTrangSuDung)	HienTrangSuDungCu
			,ISNULL(HTSD_OLD.NoiDung			, HTSD_NEW.NoiDung)			TenHienTrangSuDungCu
	FROM	ThayDoiThongTin_Tren500 TDTT_500
			LEFT JOIN ThayDoiThongTin TDTT ON TDTT_500.ThayDoiThongTinId = TDTT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Tren500 TTKK_500 ON TDTT.TaiSanId = TTKK_500.TaiSanId
			LEFT JOIN HienTrangSuDung HTSD_OLD ON TDTT_500.HienTrangSuDungCu = HTSD_OLD.HienTrangSuDungId
			LEFT JOIN HienTrangSuDung HTSD_NEW ON TTKK_500.HienTrangSuDung = HTSD_NEW.HienTrangSuDungId
	WHERE	TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin500_InsertThayDoiThongTin500]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin500_InsertThayDoiThongTin500]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@KyHieu				=	NULL
						,@HienTrangSuDung		=	NULL

						-- THÔNG TIN KÊ KHAI CŨ
						,@KyHieuCu				=	NULL
						,@HienTrangSuDungCu		=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin500_InsertThayDoiThongTin500]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI MỚI
	,@KyHieu				NVARCHAR(MAX)	=	NULL
	,@HienTrangSuDung		INT				=	NULL

AS
BEGIN
SET NOCOUNT ON;
--------------------------------------------------
---------- BIẾN NỘI BỘ
	DECLARE	 @V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_INSERT'
			-- THAY ĐỔI THÔNG TIN KÊ KHAI
			,@KyHieuCu				NVARCHAR(MAX)	=	NULL
			,@HienTrangSuDungCu		INT				=	NULL
----------/ BIẾN NỘI BỘ

---------- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET @NguoiDuyet		=	@NhanVienId
	SET @NguoiTao		=	@NhanVienId
	SET @NgayTao		=	GETDATE()
	SET @CtrVersion		=	1
----------/ INPUT DEFAULT

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @HienTrangSuDungCu	=	TTKK_500.HienTrangSuDung
				,@KyHieuCu			=	TTKK_500.KyHieu
	FROM		ThongTinKeKhai_Tren500 TTKK_500
	WHERE		TaiSanId = @TaiSanId

	SELECT @TenTaiSanCu = TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId

	-- SO SÁNH THÔNG TIN KÊ KHAI CŨ VÀ MỚI
	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @KyHieuCu			= @KyHieu				SET @KyHieuCu			= NULL
	IF @HienTrangSuDungCu	= @HienTrangSuDung		SET @HienTrangSuDungCu	= NULL

BEGIN TRANSACTION @V_TRANS_NAME
/*
	- Lưu bảng ThayDoiThongTin
		- Tên tài sản cũ là tên tài sản hiện tại
	- Update tên tài sản mới vào bảng TaiSan
	- Lấy thông tin từ bảng ThongTinKeKhai_Dat lưu vào bảng ThayDoiThongTin_Dat
	- Lưu thông tin kê khai mới vào bảng ThongTinKeKhai_Dat
*/
	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin	(	TaiSanId	,Ngay	,TenTaiSanCu	,LyDo	,DuyetId	,NguoiDuyet		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES						(	@TaiSanId	,@Ngay	,@TenTaiSanCu	,@LyDo	,@DuyetId	,@NguoiDuyet	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @ThayDoiThongTinId = @@IDENTITY

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- INSERT THAY ĐỔI THÔNG TIN ĐẤT
	INSERT INTO ThayDoiThongTin_Tren500	(	ThayDoiThongTinId	,KyHieuCu	,HienTrangSuDungCu	)
	VALUES								(	@ThayDoiThongTinId	,@KyHieuCu	,@HienTrangSuDungCu	)

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Tren500
	SET			 KyHieu				=	@KyHieu
				,HienTrangSuDung	=	@HienTrangSuDung
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
--------------------------------------------------
SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTin500_UpdateThayDoiThongTin500]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin500_UpdateThayDoiThongTin500]
						 @CoSoId				=	1
						,@NhanVienId			=	7
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	75
						,@TaiSanId				=	1065
						,@Ngay					=	'2017-09-22'
						,@TenTaiSanCu			=	N'Bơm tiêm điện Terumo'
						,@LyDo					=	N'test'
						,@CtrVersion			=	1

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	N'Bơm tiêm điện Terumo'

						-- THÔNG TIN KÊ KHAI MỚI
						,@KyHieu				=	N'Skin LOL'
						,@HienTrangSuDung		=	4

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTin500_UpdateThayDoiThongTin500]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				int				=	NULL
	,@Ngay					datetime		=	NULL
	,@TenTaiSanCu			nvarchar(MAX)	=	NULL
	,@LyDo					nvarchar(MAX)	=	NULL
	,@DuyetId				int				=	NULL
	,@NguoiDuyet			int				=	NULL
	,@NguoiTao				int				=	NULL
	,@NgayTao				datetime		=	NULL
	,@CtrVersion			int				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI MỚI
	,@KyHieu				NVARCHAR(MAX)	=	NULL
	,@HienTrangSuDung		INT				=	NULL
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
---------- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(MAX)	=	N'TDTT_500_UPDATE'
			-- THAY ĐỔI THÔNG TIN KÊ KHAI
			,@KyHieuCu				NVARCHAR(MAX)	=	NULL
			,@HienTrangSuDungCu		INT				=	NULL
----------/ BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @TenTaiSanCu		=	ISNULL(TenTaiSanCu, TS.TenTaiSan)
				,@HienTrangSuDungCu	=	ISNULL(TDTT_500.HienTrangSuDungCu, TTKK_500.HienTrangSuDung)
				,@KyHieuCu			=	ISNULL(TDTT_500.KyHieuCu, TTKK_500.KyHieu)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Tren500 TDTT_500 ON TDTT.ThayDoiThongTinId = TDTT_500.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Tren500 TTKK_500 ON TDTT.TaiSanId = TTKK_500.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
				
	-- SO SÁNH THÔNG TIN KÊ KHAI CŨ VÀ MỚI
	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @KyHieuCu			= @KyHieu				SET @KyHieuCu			= NULL
	IF @HienTrangSuDungCu	= @HienTrangSuDung		SET @HienTrangSuDungCu	= NULL

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin
	SET		 Ngay			=	@Ngay
			,TenTaiSanCu	=	@TenTaiSanCu
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	UPDATE	 ThayDoiThongTin_Tren500
	SET		 HienTrangSuDungCu	=	@HienTrangSuDungCu
			,KyHieuCu			=	@KyHieuCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KÊ KHAI MỚI
	UPDATE		ThongTinKeKhai_Tren500
	SET			 KyHieu				=	@KyHieu
				,HienTrangSuDung	=	@HienTrangSuDung
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinDat_GetThayDoiThongTinDatById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinDat_GetThayDoiThongTinDatById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinDat_GetThayDoiThongTinDatById]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	TDTT_DAT.ThayDoiThongTinId
			,ISNULL(TDTT_DAT.BiLanChiemCu		, TTKK_DAT.BiLanChiem)		BiLanChiemCu
			,ISNULL(TDTT_DAT.BoTrongCu			, TTKK_DAT.BoTrong)			BoTrongCu
			,ISNULL(TDTT_DAT.ChoThueCu			, TTKK_DAT.ChoThue)			ChoThueCu
			,ISNULL(TDTT_DAT.CoSoHDSuNghiepCu	, TTKK_DAT.CoSoHDSuNghiep)	CoSoHDSuNghiepCu
			,ISNULL(TDTT_DAT.DiaChiCu			, TTKK_DAT.DiaChi)			DiaChiCu
			,ISNULL(TDTT_DAT.DienTichCu			, TTKK_DAT.DienTich)		DienTichCu
			,ISNULL(TDTT_DAT.GiayToCu			, TTKK_DAT.GiayTo)			GiayToCu
			,ISNULL(TDTT_DAT.LamTruSoCu			, TTKK_DAT.LamTruSo)		LamTruSoCu
			,ISNULL(TDTT_DAT.NhaOCu				, TTKK_DAT.NhaO)			NhaOCu
			,ISNULL(TDTT_DAT.SuDungKhacCu		, TTKK_DAT.SuDungKhac)		SuDungKhacCu
	FROM	ThayDoiThongTin_Dat TDTT_DAT
			LEFT JOIN ThayDoiThongTin TDTT ON TDTT_DAT.ThayDoiThongTinId = TDTT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Dat TTKK_DAT ON TDTT.TaiSanId = TTKK_DAT.TaiSanId
	WHERE	TDTT_DAT.ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.12
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI ĐẤT MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@DienTich				=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.12 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI ĐẤT MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL
AS
BEGIN
	SET NOCOUNT ON;
---------- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_DAT_INSERT'
	
		-- THAY ĐỔI THÔNG TIN ĐẤT
		,@DiaChiCu			NVARCHAR(MAX)		=	NULL
		,@GiayToCu			NVARCHAR(MAX)		=	NULL
		,@DienTichCu		NUMERIC(18, 4)		=	NULL
		,@LamTruSoCu		NUMERIC(18, 4)		=	NULL
		,@CoSoHDSuNghiepCu	NUMERIC(18, 4)		=	NULL
		,@NhaOCu			NUMERIC(18, 4)		=	NULL
		,@ChoThueCu			NUMERIC(18, 4)		=	NULL
		,@BoTrongCu			NUMERIC(18, 4)		=	NULL
		,@BiLanChiemCu		NUMERIC(18, 4)		=	NULL
		,@SuDungKhacCu		NUMERIC(18, 4)		=	NULL
----------/ BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET @NguoiDuyet		=	@NhanVienId
	SET @NguoiTao		=	@NhanVienId
	SET @NgayTao		=	GETDATE()
	SET @CtrVersion		=	1

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @DiaChiCu			=	DiaChi	
				,@GiayToCu			=	GiayTo	
				,@DienTichCu		=	DienTich	
				,@LamTruSoCu		=	LamTruSo
				,@CoSoHDSuNghiepCu	=	CoSoHDSuNghiep
				,@NhaOCu			=	NhaO
				,@ChoThueCu			=	ChoThue
				,@BoTrongCu			=	BoTrong
				,@BiLanChiemCu		=	BiLanChiem
				,@SuDungKhacCu		=	SuDungKhac
	FROM		ThongTinKeKhai_Dat TTKK_DAT
	WHERE		TaiSanId = @TaiSanId

	SELECT @TenTaiSanCu = TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId

	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @DiaChiCu			= @DiaChi				SET @DiaChiCu			= NULL
	IF @GiayToCu			= @GiayTo				SET @GiayToCu			= NULL
	IF @DienTichCu			= @DienTich				SET @DienTichCu			= NULL
	IF @LamTruSoCu			= @LamTruSo				SET @LamTruSoCu			= NULL
	IF @CoSoHDSuNghiepCu	= @CoSoHDSuNghiep		SET @CoSoHDSuNghiepCu	= NULL
	IF @NhaOCu				= @NhaO					SET @NhaOCu				= NULL
	IF @ChoThueCu			= @ChoThue				SET @ChoThueCu			= NULL
	IF @BoTrongCu			= @BoTrong				SET @BoTrongCu			= NULL
	IF @BiLanChiemCu		= @BiLanChiem			SET @BiLanChiemCu		= NULL
	IF @SuDungKhacCu		= @SuDungKhac			SET @SuDungKhacCu		= NULL

BEGIN TRANSACTION @V_TRANS_NAME
/*
	- Lưu bảng ThayDoiThongTin
		- Tên tài sản cũ là tên tài sản hiện tại
	- Update tên tài sản mới vào bảng TaiSan
	- Lấy thông tin từ bảng ThongTinKeKhai_Dat lưu vào bảng ThayDoiThongTin_Dat
	- Lưu thông tin kê khai mới vào bảng ThongTinKeKhai_Dat
*/
	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin	(	TaiSanId	,Ngay	,TenTaiSanCu	,LyDo	,DuyetId	,NguoiDuyet		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES						(	@TaiSanId	,@Ngay	,@TenTaiSanCu	,@LyDo	,@DuyetId	,@NguoiDuyet	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @ThayDoiThongTinId = @@IDENTITY

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- INSERT THAY ĐỔI THÔNG TIN ĐẤT
	INSERT INTO ThayDoiThongTin_Dat	(	ThayDoiThongTinId	,DiaChiCu	,GiayToCu	,DienTichCu		,LamTruSoCu		,CoSoHDSuNghiepCu	,NhaOCu		,ChoThueCu	,BoTrongCu	,BiLanChiemCu	,SuDungKhacCu	)
	VALUES							(	@ThayDoiThongTinId	,@DiaChiCu	,@GiayToCu	,@DienTichCu	,@LamTruSoCu	,@CoSoHDSuNghiepCu	,@NhaOCu	,@ChoThueCu	,@BoTrongCu	,@BiLanChiemCu	,@SuDungKhacCu	)

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Dat
	SET			 DiaChi			=	@DiaChi
				,GiayTo			=	@GiayTo
				,DienTich		=	@DienTich
				,LamTruSo		=	@LamTruSo
				,CoSoHDSuNghiep	=	@CoSoHDSuNghiep
				,NhaO			=	@NhaO
				,ChoThue		=	@ChoThue
				,BoTrong		=	@BoTrong
				,BiLanChiem		=	@BiLanChiem
				,SuDungKhac		=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat_170921]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.12
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI ĐẤT MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@DienTich				=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.12 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat_170921]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI ĐẤT MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL

AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_DAT_INSERT'
	
	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET @NguoiDuyet		=	@NhanVienId
	SET @NguoiTao		=	@NhanVienId
	SET @NgayTao		=	GETDATE()
	SET @CtrVersion		=	1

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	SET @TenTaiSanCu = (SELECT TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId)

BEGIN TRANSACTION @V_TRANS_NAME
/*
	- Lưu bảng ThayDoiThongTin
		- Tên tài sản cũ là tên tài sản hiện tại
	- Update tên tài sản mới vào bảng TaiSan
	- Lấy thông tin từ bảng ThongTinKeKhai_Dat lưu vào bảng ThayDoiThongTin_Dat
	- Lưu thông tin kê khai mới vào bảng ThongTinKeKhai_Dat
*/
	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin	(	TaiSanId	,Ngay	,TenTaiSanCu	,LyDo	,DuyetId	,NguoiDuyet		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES						(	@TaiSanId	,@Ngay	,@TenTaiSanCu	,@LyDo	,@DuyetId	,@NguoiDuyet	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @ThayDoiThongTinId = @@IDENTITY

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- INSERT THAY ĐỔI THÔNG TIN ĐẤT
	INSERT INTO ThayDoiThongTin_Dat	(	ThayDoiThongTinId	,DiaChiCu	,GiayToCu	,DienTichCu	,LamTruSoCu	,CoSoHDSuNghiepCu	,NhaOCu	,ChoThueCu	,BoTrongCu	,BiLanChiemCu	,SuDungKhacCu)
	SELECT								@ThayDoiThongTinId	,DiaChi		,GiayTo		,DienTich	,LamTruSo	,CoSoHDSuNghiep		,NhaO	,ChoThue	,BoTrong	,BiLanChiem		,SuDungKhac
	FROM		ThongTinKeKhai_Dat
	WHERE		TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Dat
	SET			 DiaChi			=	@DiaChi
				,GiayTo			=	@GiayTo
				,DienTich		=	@DienTich
				,LamTruSo		=	@LamTruSo
				,CoSoHDSuNghiep	=	@CoSoHDSuNghiep
				,NhaO			=	@NhaO
				,ChoThue		=	@ChoThue
				,BoTrong		=	@BoTrong
				,BiLanChiem		=	@BiLanChiem
				,SuDungKhac		=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinDat_UpdateThayDoiThongTinDat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinDat_UpdateThayDoiThongTinDat]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI ĐẤT MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@DienTich				=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinDat_UpdateThayDoiThongTinDat]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI ĐẤT MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL
AS
BEGIN
	SET NOCOUNT ON;
	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_DAT_UPDATE'
	-- THAY ĐỔI THONG TIN ĐẤT
	,@DiaChiCu			NVARCHAR(MAX)		=	NULL
	,@GiayToCu			NVARCHAR(MAX)		=	NULL
	,@DienTichCu		NUMERIC(18, 4)		=	NULL
	,@LamTruSoCu		NUMERIC(18, 4)		=	NULL
	,@CoSoHDSuNghiepCu	NUMERIC(18, 4)		=	NULL
	,@NhaOCu			NUMERIC(18, 4)		=	NULL
	,@ChoThueCu			NUMERIC(18, 4)		=	NULL
	,@BoTrongCu			NUMERIC(18, 4)		=	NULL
	,@BiLanChiemCu		NUMERIC(18, 4)		=	NULL
	,@SuDungKhacCu		NUMERIC(18, 4)		=	NULL

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- KIỂM TRA @TaiSanId
	IF @ThayDoiThongTinId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @TenTaiSanCu		=	ISNULL(TenTaiSanCu, TS.TenTaiSan)
				,@BiLanChiemCu		=	ISNULL(TDTT_Dat.BiLanChiemCu, TTKK_Dat.BiLanChiem)
				,@BoTrongCu			=	ISNULL(TDTT_Dat.BoTrongCu, TTKK_Dat.BoTrong)
				,@ChoThueCu			=	ISNULL(TDTT_Dat.ChoThueCu, TTKK_Dat.ChoThue)
				,@CoSoHDSuNghiepCu	=	ISNULL(TDTT_Dat.CoSoHDSuNghiepCu, TTKK_Dat.CoSoHDSuNghiep)
				,@DiaChiCu			=	ISNULL(TDTT_Dat.DiaChiCu, TTKK_Dat.DiaChi)
				,@DienTichCu		=	ISNULL(TDTT_Dat.DienTichCu, TTKK_Dat.DienTich)
				,@GiayToCu			=	ISNULL(TDTT_Dat.GiayToCu, TTKK_Dat.GiayTo)
				,@LamTruSoCu		=	ISNULL(TDTT_Dat.LamTruSoCu, TTKK_Dat.LamTruSo)
				,@NhaOCu			=	ISNULL(TDTT_Dat.NhaOCu, TTKK_Dat.NhaO)
				,@SuDungKhacCu		=	ISNULL(TDTT_Dat.SuDungKhacCu, TTKK_Dat.SuDungKhac)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Dat TDTT_Dat ON TDTT.ThayDoiThongTinId = TDTT_Dat.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Dat TTKK_Dat ON TDTT.TaiSanId = TTKK_Dat.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @DiaChiCu			= @DiaChi				SET @DiaChiCu			= NULL
	IF @GiayToCu			= @GiayTo				SET @GiayToCu			= NULL
	IF @DienTichCu			= @DienTich				SET @DienTichCu			= NULL
	IF @LamTruSoCu			= @LamTruSo				SET @LamTruSoCu			= NULL
	IF @CoSoHDSuNghiepCu	= @CoSoHDSuNghiep		SET @CoSoHDSuNghiepCu	= NULL
	IF @NhaOCu				= @NhaO					SET @NhaOCu				= NULL
	IF @ChoThueCu			= @ChoThue				SET @ChoThueCu			= NULL
	IF @BoTrongCu			= @BoTrong				SET @BoTrongCu			= NULL
	IF @BiLanChiemCu		= @BiLanChiem			SET @BiLanChiemCu		= NULL
	IF @SuDungKhacCu		= @SuDungKhac			SET @SuDungKhacCu		= NULL

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TaiSanId		=	@TaiSanId
			,TenTaiSanCu	=	@TenTaiSanCu
			,Ngay			=	@Ngay
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THAY ĐỔI THÔNG TIN ĐẤT
	UPDATE	ThayDoiThongTin_Dat
	SET		 DiaChiCu			= @DiaChiCu
			,GiayToCu			= @GiayToCu
			,DienTichCu			= @DienTichCu
			,LamTruSoCu			= @LamTruSoCu
			,CoSoHDSuNghiepCu	= @CoSoHDSuNghiepCu
			,NhaOCu				= @NhaOCu
			,ChoThueCu			= @ChoThueCu
			,BoTrongCu			= @BoTrongCu
			,BiLanChiemCu		= @BiLanChiemCu
			,SuDungKhacCu		= @SuDungKhacCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Dat
	SET			 DiaChi			=	@DiaChi
				,GiayTo			=	@GiayTo
				,DienTich		=	@DienTich
				,LamTruSo		=	@LamTruSo
				,CoSoHDSuNghiep	=	@CoSoHDSuNghiep
				,NhaO			=	@NhaO
				,ChoThue		=	@ChoThue
				,BoTrong		=	@BoTrong
				,BiLanChiem		=	@BiLanChiem
				,SuDungKhac		=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	 TDTT_NHA.ThayDoiThongTinId
			,ISNULL(TDTT_NHA.BiLanChiemCu		, TTKK_NHA.BiLanChiem) BiLanChiemCu
			,ISNULL(TDTT_NHA.BoTrongCu			, TTKK_NHA.BoTrong) BoTrongCu
			,ISNULL(TDTT_NHA.CapHangCu			, TTKK_NHA.CapHang) CapHangCu
			,ISNULL(TDTT_NHA.ChoThueCu			, TTKK_NHA.ChoThue) ChoThueCu
			,ISNULL(TDTT_NHA.CoSoHDSuNghiepCu	, TTKK_NHA.CoSoHDSuNghiep) CoSoHDSuNghiepCu
			,ISNULL(TDTT_NHA.DiaChiCu			, TTKK_NHA.DiaChi) DiaChiCu
			,ISNULL(TDTT_NHA.DienTichCu			, TTKK_NHA.DienTich) DienTichCu
			,ISNULL(TDTT_NHA.GiayToCu			, TTKK_NHA.GiayTo) GiayToCu
			,ISNULL(TDTT_NHA.LamTruSoCu			, TTKK_NHA.LamTruSo) LamTruSoCu
			,ISNULL(TDTT_NHA.NamSuDungCu		, TTKK_NHA.NamSuDung) NamSuDungCu
			,ISNULL(TDTT_NHA.NhaOCu				, TTKK_NHA.NhaO) NhaOCu
			,ISNULL(TDTT_NHA.SoTangCu			, TTKK_NHA.SoTang) SoTangCu
			,ISNULL(TDTT_NHA.SuDungKhacCu		, TTKK_NHA.SuDungKhac) SuDungKhacCu
			,ISNULL(TDTT_NHA.TongDienTichSanCu	, TTKK_NHA.TongDienTichSan) TongDienTichSanCu
	FROM	ThayDoiThongTin_Nha TDTT_NHA
			LEFT JOIN ThayDoiThongTin TDTT ON TDTT_NHA.ThayDoiThongTinId = TDTT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Nha TTKK_NHA ON TDTT.TaiSanId = TTKK_NHA.TaiSanId
	WHERE	TDTT_NHA.ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById_170921]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
create PROCEDURE [dbo].[sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById_170921]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	*
	FROM	ThayDoiThongTin_Nha
	WHERE	ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinNha_InsertThayDoiThongTinNha]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_InsertThayDoiThongTinNha]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@CapHang				=	NULL
						,@SoTang				=	NULL
						,@NamSuDung				=	NULL
						,@DienTich				=	NULL
						,@TongDienTichSan		=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinNha_InsertThayDoiThongTinNha]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSan				NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI NHÀ MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@CapHang				INT				=	NULL
	,@SoTang				INT				=	NULL
	,@NamSuDung				NUMERIC(18,4)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@TongDienTichSan		NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
---------- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_NHA_INSERT'
	
			-- THAY ĐỔI THÔNG TIN NHÀ
			,@DiaChiCu				NVARCHAR(MAX)	=	NULL
			,@GiayToCu				NVARCHAR(MAX)	=	NULL
			,@CapHangCu				INT				=	NULL
			,@SoTangCu				INT				=	NULL
			,@NamSuDungCu			NUMERIC(18,4)	=	NULL
			,@DienTichCu			NUMERIC(18,4)	=	NULL
			,@TongDienTichSanCu		NUMERIC(18,4)	=	NULL
			,@LamTruSoCu			NUMERIC(18,4)	=	NULL
			,@CoSoHDSuNghiepCu		NUMERIC(18,4)	=	NULL
			,@NhaOCu				NUMERIC(18,4)	=	NULL
			,@ChoThueCu				NUMERIC(18,4)	=	NULL
			,@BoTrongCu				NUMERIC(18,4)	=	NULL
			,@BiLanChiemCu			NUMERIC(18,4)	=	NULL
			,@SuDungKhacCu			NUMERIC(18,4)	=	NULL
----------/ BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET @NguoiDuyet		=	@NhanVienId
	SET @NguoiTao		=	@NhanVienId
	SET @NgayTao		=	GETDATE()
	SET @CtrVersion		=	1

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @DiaChiCu			=	DiaChi
				,@GiayToCu			=	GiayTo
				,@CapHangCu			=	CapHang
				,@SoTangCu			=	SoTang
				,@NamSuDungCu		=	NamSuDung
				,@DienTichCu		=	DienTich
				,@TongDienTichSanCu	=	TongDienTichSan	
				,@LamTruSoCu		=	LamTruSo
				,@CoSoHDSuNghiepCu	=	CoSoHDSuNghiep
				,@NhaOCu			=	NhaO
				,@ChoThueCu			=	ChoThue
				,@BoTrongCu			=	BoTrong
				,@BiLanChiemCu		=	BiLanChiem
				,@SuDungKhacCu		=	SuDungKhac
	FROM		ThongTinKeKhai_Nha
	WHERE		TaiSanId = @TaiSanId

	SELECT @TenTaiSanCu = TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId

	-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @TenTaiSanCu			= @TenTaiSan			SET @TenTaiSanCu		= NULL
	IF @DiaChiCu			= @DiaChi				SET @DiaChiCu			= NULL
	IF @GiayToCu			= @GiayTo				SET @GiayToCu			= NULL
	IF @CapHangCu			= @CapHang				SET @CapHangCu			= NULL
	IF @SoTangCu			= @SoTang				SET @SoTangCu			= NULL
	IF @NamSuDungCu			= @NamSuDung			SET @NamSuDungCu		= NULL
	IF @DienTichCu			= @DienTich				SET @DienTichCu			= NULL
	IF @TongDienTichSanCu	= @TongDienTichSan		SET @TongDienTichSanCu	= NULL
	IF @LamTruSoCu			= @LamTruSo				SET @LamTruSoCu			= NULL
	IF @CoSoHDSuNghiepCu	= @CoSoHDSuNghiep		SET @CoSoHDSuNghiepCu	= NULL
	IF @NhaOCu				= @NhaO					SET @NhaOCu				= NULL
	IF @ChoThueCu			= @ChoThue				SET @ChoThueCu			= NULL
	IF @BoTrongCu			= @BoTrong				SET @BoTrongCu			= NULL
	IF @BiLanChiemCu		= @BiLanChiem			SET @BiLanChiemCu		= NULL
	IF @SuDungKhacCu		= @SuDungKhac			SET @SuDungKhacCu		= NULL

BEGIN TRANSACTION @V_TRANS_NAME
/*
	- Lưu bảng ThayDoiThongTin
		- Tên tài sản cũ là tên tài sản hiện tại
	- Update tên tài sản mới vào bảng TaiSan
	- Lấy thông tin từ bảng ThongTinKeKhai_Dat lưu vào bảng ThayDoiThongTin_Dat
	- Lưu thông tin kê khai mới vào bảng ThongTinKeKhai_Dat
*/
	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin	(	TaiSanId	,Ngay	,TenTaiSanCu	,LyDo	,DuyetId	,NguoiDuyet		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES						(	@TaiSanId	,@Ngay	,@TenTaiSanCu	,@LyDo	,@DuyetId	,@NguoiDuyet	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @ThayDoiThongTinId = @@IDENTITY

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSan
	WHERE	TaiSanId = @TaiSanId

	-- INSERT THAY ĐỔI THÔNG TIN NHÀ
	INSERT INTO ThayDoiThongTin_Nha	(	ThayDoiThongTinId	,DiaChiCu	,GiayToCu	,CapHangCu	,SoTangCu	,NamSuDungCu	,DienTichCu		,TongDienTichSanCu	,LamTruSoCu		,CoSoHDSuNghiepCu	,NhaOCu		,ChoThueCu	,BoTrongCu	,BiLanChiemCu	,SuDungKhacCu	)
	VALUES							(	@ThayDoiThongTinId	,@DiaChiCu	,@GiayToCu	,@CapHangCu	,@SoTangCu	,@NamSuDungCu	,@DienTichCu	,@TongDienTichSanCu	,@LamTruSoCu	,@CoSoHDSuNghiepCu	,@NhaOCu	,@ChoThueCu	,@BoTrongCu	,@BiLanChiemCu	,@SuDungKhacCu	)

	-- UPDATE THÔNG TIN KÊ KHAI NHÀ
	UPDATE		ThongTinKeKhai_Nha
	SET			 DiaChi				=	@DiaChi
				,GiayTo				=	@GiayTo
				,CapHang			=	@CapHang
				,SoTang				=	@SoTang
				,NamSuDung			=	@NamSuDung
				,DienTich			=	@DienTich
				,TongDienTichSan	=	@TongDienTichSan
				,LamTruSo			=	@LamTruSo
				,CoSoHDSuNghiep		=	@CoSoHDSuNghiep
				,NhaO				=	@NhaO
				,ChoThue			=	@ChoThue
				,BoTrong			=	@BoTrong
				,BiLanChiem			=	@BiLanChiem
				,SuDungKhac			=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinNha_InsertThayDoiThongTinNha_170921]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_InsertThayDoiThongTinNha]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@CapHang				=	NULL
						,@SoTang				=	NULL
						,@NamSuDung				=	NULL
						,@DienTich				=	NULL
						,@TongDienTichSan		=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
create PROCEDURE [dbo].[sp_ThayDoiThongTinNha_InsertThayDoiThongTinNha_170921]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI NHÀ MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@CapHang				INT				=	NULL
	,@SoTang				INT				=	NULL
	,@NamSuDung				NUMERIC(18,4)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@TongDienTichSan		NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL

AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_INSERT'
	
	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET @NguoiDuyet		=	@NhanVienId
	SET @NguoiTao		=	@NhanVienId
	SET @NgayTao		=	GETDATE()
	SET @CtrVersion		=	1

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	SET @TenTaiSanCu = (SELECT TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId)

BEGIN TRANSACTION @V_TRANS_NAME
/*
	- Lưu bảng ThayDoiThongTin
		- Tên tài sản cũ là tên tài sản hiện tại
	- Update tên tài sản mới vào bảng TaiSan
	- Lấy thông tin từ bảng ThongTinKeKhai_Dat lưu vào bảng ThayDoiThongTin_Dat
	- Lưu thông tin kê khai mới vào bảng ThongTinKeKhai_Dat
*/
	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin	(	TaiSanId	,Ngay	,TenTaiSanCu	,LyDo	,DuyetId	,NguoiDuyet		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES						(	@TaiSanId	,@Ngay	,@TenTaiSanCu	,@LyDo	,@DuyetId	,@NguoiDuyet	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @ThayDoiThongTinId = @@IDENTITY

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- INSERT THAY ĐỔI THÔNG TIN ĐẤT
	INSERT INTO ThayDoiThongTin_Nha	(	ThayDoiThongTinId	,DiaChiCu	,GiayToCu	,CapHangCu	,SoTangCu	,NamSuDungCu	,DienTichCu	,TongDienTichSanCu	,LamTruSoCu	,CoSoHDSuNghiepCu	,NhaOCu	,ChoThueCu	,BoTrongCu	,BiLanChiemCu	,SuDungKhacCu)
	SELECT								@ThayDoiThongTinId	,DiaChi		,GiayTo		,CapHang	,SoTang		,NamSuDung		,DienTich	,TongDienTichSan	,LamTruSo	,CoSoHDSuNghiep		,NhaO	,ChoThue	,BoTrong	,BiLanChiem		,SuDungKhac
	FROM		ThongTinKeKhai_Nha
	WHERE		TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Nha
	SET			 DiaChi				=	@DiaChi
				,GiayTo				=	@GiayTo
				,CapHang			=	@CapHang
				,SoTang				=	@SoTang
				,NamSuDung			=	@NamSuDung
				,DienTich			=	@DienTich
				,TongDienTichSan	=	@TongDienTichSan
				,LamTruSo			=	@LamTruSo
				,CoSoHDSuNghiep		=	@CoSoHDSuNghiep
				,NhaO				=	@NhaO
				,ChoThue			=	@ChoThue
				,BoTrong			=	@BoTrong
				,BiLanChiem			=	@BiLanChiem
				,SuDungKhac			=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@CapHang				=	NULL
						,@SoTang				=	NULL
						,@NamSuDung				=	NULL
						,@DienTich				=	NULL
						,@TongDienTichSan		=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI NHÀ MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@CapHang				INT				=	NULL
	,@SoTang				INT				=	NULL
	,@NamSuDung				NUMERIC(18,4)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@TongDienTichSan		NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(MAX)	=	N'TDTT_NHA_UPDATE'
	-- THAY ĐỔI THÔNG TIN NHÀ
	,@DiaChiCu				NVARCHAR(MAX)	=	NULL
	,@GiayToCu				NVARCHAR(MAX)	=	NULL
	,@CapHangCu				INT				=	NULL
	,@SoTangCu				INT				=	NULL
	,@NamSuDungCu			NUMERIC(18,4)	=	NULL
	,@DienTichCu			NUMERIC(18,4)	=	NULL
	,@TongDienTichSanCu		NUMERIC(18,4)	=	NULL
	,@LamTruSoCu			NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiepCu		NUMERIC(18,4)	=	NULL
	,@NhaOCu				NUMERIC(18,4)	=	NULL
	,@ChoThueCu				NUMERIC(18,4)	=	NULL
	,@BoTrongCu				NUMERIC(18,4)	=	NULL
	,@BiLanChiemCu			NUMERIC(18,4)	=	NULL
	,@SuDungKhacCu			NUMERIC(18,4)	=	NULL

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @TenTaiSanCu		=	ISNULL(TDTT.TenTaiSanCu, TS.TenTaiSan)
				,@BiLanChiemCu		=	ISNULL(TDTT_Nha.BiLanChiemCu, TTKK_Nha.BiLanChiem)
				,@BoTrongCu			=	ISNULL(TDTT_Nha.BoTrongCu, TTKK_Nha.BoTrong)
				,@CapHangCu			=	ISNULL(TDTT_Nha.CapHangCu, TTKK_Nha.CapHang)
				,@ChoThueCu			=	ISNULL(TDTT_Nha.ChoThueCu, TTKK_Nha.ChoThue)
				,@CoSoHDSuNghiepCu	=	ISNULL(TDTT_Nha.CoSoHDSuNghiepCu, TTKK_Nha.CoSoHDSuNghiep)
				,@DiaChiCu			=	ISNULL(TDTT_Nha.DiaChiCu, TTKK_Nha.DiaChi)
				,@DienTichCu		=	ISNULL(TDTT_Nha.DienTichCu, TTKK_Nha.DienTich)
				,@GiayToCu			=	ISNULL(TDTT_Nha.GiayToCu, TTKK_Nha.GiayTo)
				,@LamTruSoCu		=	ISNULL(TDTT_Nha.LamTruSoCu, TTKK_Nha.LamTruSo)
				,@NamSuDungCu		=	ISNULL(TDTT_Nha.NamSuDungCu, TTKK_Nha.NamSuDung)
				,@NhaOCu			=	ISNULL(TDTT_Nha.NhaOCu, TTKK_Nha.NhaO)
				,@SoTangCu			=	ISNULL(TDTT_Nha.SoTangCu, TTKK_Nha.SoTang)
				,@SuDungKhacCu		=	ISNULL(TDTT_Nha.SuDungKhacCu, TTKK_Nha.SuDungKhac)
				,@TongDienTichSanCu	=	ISNULL(TDTT_Nha.TongDienTichSanCu, TTKK_Nha.TongDienTichSan)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Nha TDTT_Nha ON TDTT.ThayDoiThongTinId = TDTT_Nha.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Nha TTKK_Nha ON TDTT.TaiSanId = TTKK_Nha.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @DiaChiCu			= @DiaChi				SET @DiaChiCu			= NULL
	IF @GiayToCu			= @GiayTo				SET @GiayToCu			= NULL
	IF @CapHangCu			= @CapHang				SET @CapHangCu			= NULL
	IF @SoTangCu			= @SoTang				SET @SoTangCu			= NULL
	IF @NamSuDungCu			= @NamSuDung			SET @NamSuDungCu		= NULL
	IF @DienTichCu			= @DienTich				SET @DienTichCu			= NULL
	IF @TongDienTichSanCu	= @TongDienTichSan		SET @TongDienTichSanCu	= NULL
	IF @LamTruSoCu			= @LamTruSo				SET @LamTruSoCu			= NULL
	IF @CoSoHDSuNghiepCu	= @CoSoHDSuNghiep		SET @CoSoHDSuNghiepCu	= NULL
	IF @NhaOCu				= @NhaO					SET @NhaOCu				= NULL
	IF @ChoThueCu			= @ChoThue				SET @ChoThueCu			= NULL
	IF @BoTrongCu			= @BoTrong				SET @BoTrongCu			= NULL
	IF @BiLanChiemCu		= @BiLanChiem			SET @BiLanChiemCu		= NULL
	IF @SuDungKhacCu		= @SuDungKhac			SET @SuDungKhacCu		= NULL

	PRINT @DiaChi
	PRINT @DiaChiCu
	PRINT @GiayTo
	PRINT @GiayToCu

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TaiSanId		=	@TaiSanId
			,TenTaiSanCu	=	@TenTaiSanCu
			,Ngay			=	@Ngay
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE THAY ĐỔI THÔNG TIN NHÀ
	UPDATE	ThayDoiThongTin_Nha
	SET		 DiaChiCu			= @DiaChiCu
			,GiayToCu			= @GiayToCu
			,CapHangCu			= @CapHangCu
			,SoTangCu			= @SoTangCu
			,NamSuDungCu		= @NamSuDungCu
			,DienTichCu			= @DienTichCu
			,TongDienTichSanCu	= @TongDienTichSanCu
			,LamTruSoCu			= @LamTruSoCu
			,CoSoHDSuNghiepCu	= @CoSoHDSuNghiepCu
			,NhaOCu				= @NhaOCu
			,ChoThueCu			= @ChoThueCu
			,BoTrongCu			= @BoTrongCu
			,BiLanChiemCu		= @BiLanChiemCu
			,SuDungKhacCu		= @SuDungKhacCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI
	UPDATE		ThongTinKeKhai_Nha
	SET			 DiaChi				=	@DiaChi
				,GiayTo				=	@GiayTo
				,CapHang			=	@CapHang
				,SoTang				=	@SoTang
				,NamSuDung			=	@NamSuDung
				,DienTich			=	@DienTich
				,TongDienTichSan	=	@TongDienTichSan
				,LamTruSo			=	@LamTruSo
				,CoSoHDSuNghiep		=	@CoSoHDSuNghiep
				,NhaO				=	@NhaO
				,ChoThue			=	@ChoThue
				,BoTrong			=	@BoTrong
				,BiLanChiem			=	@BiLanChiem
				,SuDungKhac			=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha_170921]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@CapHang				=	NULL
						,@SoTang				=	NULL
						,@NamSuDung				=	NULL
						,@DienTich				=	NULL
						,@TongDienTichSan		=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
create PROCEDURE [dbo].[sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha_170921]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI NHÀ MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@CapHang				INT				=	NULL
	,@SoTang				INT				=	NULL
	,@NamSuDung				NUMERIC(18,4)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@TongDienTichSan		NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL

AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_NHA_UPDATE'
	
	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	SET @TenTaiSanCu = (SELECT TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId)

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TaiSanId		=	@TaiSanId
			,Ngay			=	@Ngay
			,TenTaiSanCu	=	@TenTaiSanCu
			,LyDo			=	@LyDo
			,DuyetId		=	@DuyetId
			,NguoiDuyet		=	@NguoiDuyet
			,CoSoId			=	@CoSoId
			,NguoiTao		=	@NguoiTao
			,NgayTao		=	@NgayTao
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Nha
	SET			 DiaChi				=	@DiaChi
				,GiayTo				=	@GiayTo
				,CapHang			=	@CapHang
				,SoTang				=	@SoTang
				,NamSuDung			=	@NamSuDung
				,DienTich			=	@DienTich
				,TongDienTichSan	=	@TongDienTichSan
				,LamTruSo			=	@LamTruSo
				,CoSoHDSuNghiep		=	@CoSoHDSuNghiep
				,NhaO				=	@NhaO
				,ChoThue			=	@ChoThue
				,BoTrong			=	@BoTrong
				,BiLanChiem			=	@BiLanChiem
				,SuDungKhac			=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinOto_GetThayDoiThongTinOtoById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinOto_GetThayDoiThongTinOtoById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinOto_GetThayDoiThongTinOtoById]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	 TDTT_OTO.ThayDoiThongTinId
			,ISNULL(TDTT_OTO.BienKiemSoatCu		, TTKK_OTO.BienKiemSoat)	BienKiemSoatCu
			,ISNULL(TDTT_OTO.ChucDanhCu			, TTKK_OTO.ChucDanh)		ChucDanhCu
			,ISNULL(TDTT_OTO.CongSuatXeCu		, TTKK_OTO.CongSuatXe)		CongSuatXeCu
			,ISNULL(TDTT_OTO.HienTrangSuDungCu	, TTKK_OTO.HienTrangSuDung)	HienTrangSuDungCu
			,ISNULL(TDTT_OTO.LoaiXeCu			, TTKK_OTO.LoaiXe)			LoaiXeCu
			,ISNULL(TDTT_OTO.NguonGocXeCu		, TTKK_OTO.NguonGocXe)		NguonGocXeCu
			,ISNULL(TDTT_OTO.NhanHieuCu			, TTKK_OTO.NhanHieu)		NhanHieuCu
			,ISNULL(TDTT_OTO.TrongTaiCu			, TTKK_OTO.TrongTai)		TrongTaiCu
	FROM	ThayDoiThongTin_Oto TDTT_OTO
			LEFT JOIN ThayDoiThongTin TDTT ON TDTT_OTO.ThayDoiThongTinId = TDTT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Oto TTKK_OTO ON TDTT.TaiSanId = TTKK_OTO.TaiSanId
	WHERE	TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinOto_InsertThayDoiThongTinOto]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinOto_InsertThayDoiThongTinOto]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@NhanHieu				=	NULL
						,@BienKiemSoat			=	NULL
						,@CongSuatXe			=	NULL
						,@TrongTai				=	NULL
						,@ChucDanh				=	NULL
						,@NguonGocXe			=	NULL
						,@LoaiXe				=	NULL
						,@HienTrangSuDung		=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinOto_InsertThayDoiThongTinOto]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI MỚI
	,@NhanHieu				NVARCHAR(MAX)	=	NULL
	,@BienKiemSoat			NVARCHAR(MAX)	=	NULL
	,@CongSuatXe			NUMERIC(4,0)	=	NULL
	,@TrongTai				NUMERIC(4,0)	=	NULL
	,@ChucDanh				NVARCHAR(MAX)	=	NULL
	,@NguonGocXe			NVARCHAR(MAX)	=	NULL
	,@LoaiXe				INT				=	NULL
	,@HienTrangSuDung		INT				=	NULL

AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
---------- BIẾN NỘI BỘ
	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_OTO_INSERT'
	
	-- THAY ĐỔI THÔNG TIN OTO
	,@NhanHieuCu			NVARCHAR(MAX)	=	NULL
	,@BienKiemSoatCu		NVARCHAR(MAX)	=	NULL
	,@CongSuatXeCu			NUMERIC(4,0)	=	NULL
	,@TrongTaiCu			NUMERIC(4,0)	=	NULL
	,@ChucDanhCu			NVARCHAR(MAX)	=	NULL
	,@NguonGocXeCu			NVARCHAR(MAX)	=	NULL
	,@LoaiXeCu				INT				=	NULL
	,@HienTrangSuDungCu		INT				=	NULL

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET @NguoiDuyet		=	@NhanVienId
	SET @NguoiTao		=	@NhanVienId
	SET @NgayTao		=	GETDATE()
	SET @CtrVersion		=	1

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @NhanHieuCu		=	NhanHieu
				,@BienKiemSoatCu	=	BienKiemSoat	
				,@CongSuatXeCu		=	CongSuatXe	
				,@TrongTaiCu		=	TrongTai
				,@ChucDanhCu		=	ChucDanh
				,@NguonGocXeCu		=	NguonGocXe
				,@LoaiXeCu			=	LoaiXe
				,@HienTrangSuDungCu	=	HienTrangSuDung
	FROM		ThongTinKeKhai_Oto
	WHERE		TaiSanId = @TaiSanId

	SELECT @TenTaiSanCu = TenTaiSan FROM TaiSan WHERE TaiSanId = @TaiSanId

	-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @TenTaiSanCu			= @TenTaiSanMoi		SET @TenTaiSanCu		= NULL
	IF @NhanHieuCu			= @NhanHieu			SET @NhanHieuCu			= NULL
	IF @BienKiemSoatCu		= @BienKiemSoat		SET @BienKiemSoatCu		= NULL
	IF @CongSuatXeCu		= @CongSuatXe		SET @CongSuatXeCu		= NULL
	IF @TrongTaiCu			= @TrongTai			SET @TrongTaiCu			= NULL
	IF @ChucDanhCu			= @ChucDanh			SET @ChucDanhCu			= NULL
	IF @NguonGocXeCu		= @NguonGocXe		SET @NguonGocXeCu		= NULL
	IF @LoaiXeCu			= @LoaiXe			SET @LoaiXeCu			= NULL
	IF @HienTrangSuDungCu	= @HienTrangSuDung	SET @HienTrangSuDungCu	= NULL

BEGIN TRANSACTION @V_TRANS_NAME
/*
	- Lưu bảng ThayDoiThongTin
		- Tên tài sản cũ là tên tài sản hiện tại
	- Update tên tài sản mới vào bảng TaiSan
	- Lấy thông tin từ bảng ThongTinKeKhai lưu vào bảng ThayDoiThongTin
	- Lưu thông tin kê khai mới vào bảng ThongTinKeKhai
*/
	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin	(	TaiSanId	,Ngay	,TenTaiSanCu	,LyDo	,DuyetId	,NguoiDuyet		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES						(	@TaiSanId	,@Ngay	,@TenTaiSanCu	,@LyDo	,@DuyetId	,@NguoiDuyet	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

	SET @ThayDoiThongTinId = @@IDENTITY

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- INSERT THAY ĐỔI THÔNG TIN
	INSERT INTO ThayDoiThongTin_Oto	(	ThayDoiThongTinId	,NhanHieuCu		,BienKiemSoatCu		,CongSuatXeCu	,TrongTaiCu		,ChucDanhCu		,NguonGocXeCu	,LoaiXeCu	,HienTrangSuDungCu	)
	VALUES							(	@ThayDoiThongTinId	,@NhanHieuCu	,@BienKiemSoatCu	,@CongSuatXeCu	,@TrongTaiCu	,@ChucDanhCu	,@NguonGocXeCu	,@LoaiXeCu	,@HienTrangSuDungCu	)

	-- UPDATE THÔNG TIN KE KHAI
	UPDATE		ThongTinKeKhai_Oto
	SET			NhanHieu		=	@NhanHieu
			   ,BienKiemSoat	=	@BienKiemSoat
			   ,CongSuatXe		=	@CongSuatXe
			   ,TrongTai		=	@TrongTai
			   ,ChucDanh		=	@ChucDanh
			   ,NguonGocXe		=	@NguonGocXe
			   ,LoaiXe			=	@LoaiXe
			   ,HienTrangSuDung	=	@HienTrangSuDung
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
--------------------------------------------------
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThayDoiThongTinOto_UpdateThayDoiThongTinOto]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinOto_UpdateThayDoiThongTinOto]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI MỚI
						,@NhanHieu				=	NULL
						,@BienKiemSoat			=	NULL
						,@CongSuatXe			=	NULL
						,@TrongTai				=	NULL
						,@ChucDanh				=	NULL
						,@NguonGocXe			=	NULL
						,@LoaiXe				=	NULL
						,@HienTrangSuDung		=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThayDoiThongTinOto_UpdateThayDoiThongTinOto]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI NHÀ MỚI
	,@NhanHieu				NVARCHAR(MAX)	=	NULL
	,@BienKiemSoat			NVARCHAR(MAX)	=	NULL
	,@CongSuatXe			NUMERIC(4,0)	=	NULL
	,@TrongTai				NUMERIC(4,0)	=	NULL
	,@ChucDanh				NVARCHAR(MAX)	=	NULL
	,@NguonGocXe			NVARCHAR(MAX)	=	NULL
	,@LoaiXe				INT				=	NULL
	,@HienTrangSuDung		INT				=	NULL

AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_OTO_UPDATE'
	-- THAY ĐỔI THÔNG TIN OTO
	,@NhanHieuCu			NVARCHAR(MAX)	=	NULL
	,@BienKiemSoatCu		NVARCHAR(MAX)	=	NULL
	,@CongSuatXeCu			NUMERIC(4,0)	=	NULL
	,@TrongTaiCu			NUMERIC(4,0)	=	NULL
	,@ChucDanhCu			NVARCHAR(MAX)	=	NULL
	,@NguonGocXeCu			NVARCHAR(MAX)	=	NULL
	,@LoaiXeCu				INT				=	NULL
	,@HienTrangSuDungCu		INT				=	NULL

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @TenTaiSanCu			=	ISNULL(TDTT.TenTaiSanCu, TS.TenTaiSan)
				,@BienKiemSoatCu		=	ISNULL(TDTT_Oto.BienKiemSoatCu, TTKK_Oto.BienKiemSoat)
				,@ChucDanhCu			=	ISNULL(TDTT_Oto.ChucDanhCu, TTKK_Oto.ChucDanh)
				,@CongSuatXeCu			=	ISNULL(TDTT_Oto.CongSuatXeCu, TTKK_Oto.CongSuatXe)
				,@HienTrangSuDungCu		=	ISNULL(TDTT_Oto.HienTrangSuDungCu, TTKK_Oto.HienTrangSuDung)
				,@LoaiXeCu				=	ISNULL(TDTT_Oto.LoaiXeCu, TTKK_Oto.LoaiXe)
				,@NguonGocXeCu			=	ISNULL(TDTT_Oto.NguonGocXeCu, TTKK_Oto.NguonGocXe)
				,@NhanHieuCu			=	ISNULL(TDTT_Oto.NhanHieuCu, TTKK_Oto.NhanHieu)
				,@TrongTaiCu			=	ISNULL(TDTT_Oto.TrongTaiCu, TTKK_Oto.TrongTai)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Oto TDTT_Oto ON TDTT.ThayDoiThongTinId = TDTT_Oto.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Oto TTKK_Oto ON TDTT.TaiSanId = TTKK_Oto.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @TenTaiSanCu			= @TenTaiSanMoi		SET @TenTaiSanCu		= NULL
	IF @NhanHieuCu			= @NhanHieu			SET @NhanHieuCu			= NULL
	IF @BienKiemSoatCu		= @BienKiemSoat		SET @BienKiemSoatCu		= NULL
	IF @CongSuatXeCu		= @CongSuatXe		SET @CongSuatXeCu		= NULL
	IF @TrongTaiCu			= @TrongTai			SET @TrongTaiCu			= NULL
	IF @ChucDanhCu			= @ChucDanh			SET @ChucDanhCu			= NULL
	IF @NguonGocXeCu		= @NguonGocXe		SET @NguonGocXeCu		= NULL
	IF @LoaiXeCu			= @LoaiXe			SET @LoaiXeCu			= NULL
	IF @HienTrangSuDungCu	= @HienTrangSuDung	SET @HienTrangSuDungCu	= NULL

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TenTaiSanCu	=	@TenTaiSanCu
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	UPDATE	ThayDoiThongTin_Oto
	set		 BienKiemSoatCu			=	@BienKiemSoatCu
			,ChucDanhCu				=	@ChucDanhCu
			,CongSuatXeCu			=	@CongSuatXeCu
			,HienTrangSuDungCu		=	@HienTrangSuDungCu
			,LoaiXeCu				=	@LoaiXeCu
			,NguonGocXeCu			=	@NguonGocXeCu
			,NhanHieuCu				=	@NhanHieuCu
			,TrongTaiCu				=	@TrongTaiCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI
	UPDATE		ThongTinKeKhai_Oto
	SET			NhanHieu		=	@NhanHieu
			   ,BienKiemSoat	=	@BienKiemSoat
			   ,CongSuatXe		=	@CongSuatXe
			   ,TrongTai		=	@TrongTai
			   ,ChucDanh		=	@ChucDanh
			   ,NguonGocXe		=	@NguonGocXe
			   ,LoaiXe			=	@LoaiXe
			   ,HienTrangSuDung	=	@HienTrangSuDung
	WHERE		TaiSanId = @TaiSanId

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TheoDoi_DeleteTheoDoiById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_TheoDoi_DeleteTheoDoiById]
	@TaiSanId INT
	,@PhongBanId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_SLTang NUMERIC(18,4)
			,@V_SLGiam NUMERIC(18,4)

	SELECT @V_SLTang = SLTang, @V_SLGiam = SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId

	BEGIN TRAN
		
		BEGIN TRY
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId)
			BEGIN
				
				IF (@V_SLGiam > 0 OR @V_SLTang > 0)
				BEGIN
					SELECT -1 AS ID	-- phat sinh su dung
					RETURN
				END	

				DELETE dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId
				SELECT 0 AS ID

			END
			ELSE
            BEGIN
            	SELECT -2 AS ID	-- not exists
            END

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TheoDoi_GetListTheoDoiByCriteria]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_TheoDoi_GetListTheoDoiByCriteria]
( 
	  @CoSoId	        INT		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @LoginId			INT
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	--IF @Search <> ''
	--BEGIN	
	--	SET @Search = N'%' + @Search + '%'
	--	SET @Search = CAST(@Search AS VARCHAR(max))	
	--END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0026',
		@QUYEN=@IS_VIEW OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------
	
    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, td.TaiSanId, ts.MaTaiSan, ts.TenTaiSan, td.NgayGhiTang, td.NgayTrangCap, td.NgayBatDauSuDung, 
				td.PhongBanId, pb.TenPhongBan, td.NhanVienId, nv.TenNhanVien, td.SLTon, td.SLTang, td.SLGiam,
				(td.SLTon + td.SLTang -td.SLGiam) SoLuong, 
				ISNULL(SUM(NG.GiaTri),0) NguyenGia, 
				(td.SLTon + td.SLTang -td.SLGiam) * ISNULL(SUM(NG.GiaTri),0) AS ThanhTien
	FROM dbo.TheoDoi td
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = td.TaiSanId
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = td.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = td.NhanVienId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = td.TaiSanId 
	WHERE 1=1 '
	--WHERE CAST(td.NgayGhiTang AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (ts.MaTaiSan LIKE N''%' + @Search+ '%'' OR ts.TenTaiSan LIKE  N''%' +@Search+ '%'' OR pb.TenPhongBan LIKE  N''%' +@Search+'%'' OR nv.TenNhanVien LIKE  N''%' +@Search+ '%'')';
	END
	
	--IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--	SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + CAST(@CoSoId AS VARCHAR) + '''';	  
	--	SET @V_SQL = @V_SQL + ' and H.NguoiTao =''' + CAST(@LoginId AS VARCHAR) + '''';	  
	--END

	SET @V_SQL = @V_SQL + ' GROUP BY td.TaiSanId, ts.MaTaiSan, ts.TenTaiSan, td.NgayGhiTang, td.NgayTrangCap, td.NgayBatDauSuDung, 
							td.PhongBanId, pb.TenPhongBan, td.NhanVienId, nv.TenNhanVien, td.SLTon, td.SLTang, td.SLGiam,
							td.SLTon,td.SLTang,td.SLGiam ';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	---SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	--SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TheoDoi_GetSoLuongTheoDoiById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_TheoDoi_GetSoLuongTheoDoiById]
( 
	  @TaiSanId	        nvarchar(500)	= null,
	  @PhongBanId        nvarchar(500)	= null,
	  @NhanVienId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT (SLTon + SLTang - SLGiam) as SoLuong from TheoDoi where TaiSanId = @TaiSanId and PhongBanId = @PhongBanId and NhanVienId = @NhanVienId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TheoDoi_GetTheoDoiById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_TheoDoi_GetTheoDoiById]
	@TaiSanId INT,
	@PhongBanId INT,
	@NhanVienId INT
AS  
BEGIN
SET NOCOUNT ON  

	SELECT CAST(TaiSanId AS VARCHAR)TaiSanId,
			CONVERT(VARCHAR, NgayGhiTang,103)NgayGhiTang,
			CONVERT(VARCHAR, NgayTrangCap,103)NgayTrangCap,
			CONVERT(VARCHAR, NgayBatDauSuDung, 103)NgayBatDauSuDung,
			CAST(td.PhongBanId AS VARCHAR)PhongBanId,
			pb.TenPhongBan,
			CAST(td.NhanVienId AS VARCHAR)NhanVienId,
			nv.TenNhanVien,
			SLTon
	FROM dbo.TheoDoi td
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = td.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = td.NhanVienId
	WHERE TaiSanId = @TaiSanId
	AND td.PhongBanId = @PhongBanId
	AND td.NhanVienId = @NhanVienId
	
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TheoDoi_InsertTheoDoi]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_TheoDoi_InsertTheoDoi]
	@TaiSanId INT
	,@NgayGhiTang DATETIME
    ,@NgayTrangCap datetime
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@NhanVienId INT
	,@SLTon NUMERIC(18,4)
	,@SLTang NUMERIC(18,4)
	,@SLGiam NUMERIC(18,4)
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId)
			BEGIN
				--UPDATE dbo.TheoDoi
				--SET NgayGhiTang = @NgayGhiTang,
				--	NgayTrangCap = @NgayTrangCap,
				--	NgayBatDauSuDung = @NgayBatDauSuDung,
				--	SLTon = @SLTon
				--WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId

				--IF (SELECT SLTon + SLTang - SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId) < 0
				--BEGIN
				--	SELECT -1 AS ID
				--	RETURN
				--END	
				SELECT -1 AS ID
			END
			ELSE
            BEGIN
				INSERT dbo.TheoDoi
						( TaiSanId ,				NgayGhiTang ,			NgayTrangCap ,			
						  NgayBatDauSuDung ,		PhongBanId ,			NhanVienId ,
						  SLTon ,					SLTang ,				SLGiam
						)
				SELECT	@TaiSanId					,@NgayGhiTang			,@NgayTrangCap
						,@NgayBatDauSuDung			,@PhongBanId			,@NhanVienId
						,@SLTon						,0						,0

				SELECT @@ROWCOUNT AS ID
			END

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TheoDoi_UpdateTheoDoi]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_TheoDoi_UpdateTheoDoi]
	@TaiSanId INT
	,@TaiSanId_Old INT
	,@NgayGhiTang DATETIME
    ,@NgayTrangCap datetime
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@PhongBanId_Old INT
	,@NhanVienId INT
	,@NhanVienId_Old INT
	,@SLTon NUMERIC(18,4)
	,@SLTang NUMERIC(18,4)
	,@SLGiam NUMERIC(18,4)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_SLTang NUMERIC(18,4)
			,@V_SLGiam NUMERIC(18,4)

	SELECT @V_SLTang = SLTang, @V_SLGiam = SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId_Old AND PhongBanId = @PhongBanId_Old AND NhanVienId = @NhanVienId_Old

	BEGIN TRAN
		
		BEGIN TRY

			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId_Old AND PhongBanId = @PhongBanId_Old AND NhanVienId = @NhanVienId_Old)
			BEGIN

				IF (@V_SLGiam > 0 OR @V_SLTang > 0)
				BEGIN
					SELECT -1 AS ID
					RETURN
				END	
								
				UPDATE dbo.TheoDoi
				SET NgayGhiTang = @NgayGhiTang,
					NgayTrangCap = @NgayTrangCap,
					NgayBatDauSuDung = @NgayBatDauSuDung,
					SLTon = @SLTon,
					TaiSanId = @TaiSanId,
					PhongBanId = @PhongBanId,
					NhanVienId = @NhanVienId
				WHERE TaiSanId = @TaiSanId_Old AND PhongBanId = @PhongBanId_Old AND NhanVienId = @NhanVienId_Old

			END
			

			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinCongKhai_GetThongTinCongKhaiById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinCongKhai_GetThongTinCongKhaiById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.07 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
create PROCEDURE [dbo].[sp_ThongTinCongKhai_GetThongTinCongKhaiById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	TTCK.*
	FROM	ThongTinCongKhai TTCK
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinCongKhai_InsertThongTinCongKhai]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinCongKhai_InsertThongTinCongKhai]
						 @TaiSanId				=	NULL
						,@MoTa					=	NULL
						,@MucDich				=	NULL
						,@HienTrangSuDungId		=	NULL
						,@DonGia				=	NULL
						,@NopNganSach			=	NULL
						,@DeLaiDonVi			=	NULL
						,@HHCK					=	NULL
						,@NhaCungCapId			=	NULL

						,@CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.07 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinCongKhai_InsertThongTinCongKhai]
	 @TaiSanId				INT				=	NULL
	,@MoTa					NVARCHAR(MAX)	=	NULL
	,@MucDich				NVARCHAR(MAX)	=	NULL
	,@HienTrangSuDungId		INT				=	NULL
	,@DonGia				NUMERIC(18,4)	=	NULL
	,@NopNganSach			NUMERIC(18,4)	=	NULL
	,@DeLaiDonVi			NUMERIC(18,4)	=	NULL
	,@HHCK					NUMERIC(18,4)	=	NULL
	,@NhaCungCapId			INT				=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET	@MoTa			=	ISNULL(@MoTa, '')
	SET	@MucDich		=	ISNULL(@MucDich, '')
	SET	@DonGia			=	ISNULL(@DonGia, 0)
	SET	@NopNganSach	=	ISNULL(@NopNganSach, 0)
	SET	@DeLaiDonVi		=	ISNULL(@DeLaiDonVi, 0)
	SET	@HHCK			=	ISNULL(@HHCK, 0)

	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

BEGIN TRY
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TTCK_INSERT
	-- INSERT DỮ LIỆU
	DELETE ThongTinCongKhai WHERE TaiSanId = @TaiSanId
	INSERT INTO ThongTinCongKhai	(	TaiSanId	,MoTa	,MucDich	,HienTrangSuDungId	,DonGia		,NopNganSach	,DeLaiDonVi		,HHCK	,NhaCungCapId	)
	VALUES							(	@TaiSanId	,@MoTa	,@MucDich	,@HienTrangSuDungId	,@DonGia	,@NopNganSach	,@DeLaiDonVi	,@HHCK	,@NhaCungCapId	)

	COMMIT TRANSACTION TTCK_INSERT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TTCK_INSERT

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM ThongTinCongKhai WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhai500_GetThongTinKeKhai500ById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhai500_GetThongTinKeKhai500ById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhai500_GetThongTinKeKhai500ById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE, '')
	SELECT	*,
			HTSD.NoiDung TenHienTrangSuDung
	FROM	ThongTinKeKhai_Tren500 TTKK_500
			LEFT JOIN HienTrangSuDung HTSD ON TTKK_500.HienTrangSuDung = HTSD.HienTrangSuDungId
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhai500_InsertThongTinKeKhai500]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.09
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhai500_InsertThongTinKeKhai500]
						 @TaiSanId				=	NULL
						,@KyHieu				=	NULL
						,@HienTrangSuDung		=	NULL

						,@CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE					OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.09 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhai500_InsertThongTinKeKhai500]
	 @TaiSanId				INT				=	NULL
	,@KyHieu				NVARCHAR(MAX)	=	NULL
	,@HienTrangSuDung		INT				=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET @TaiSanId			=	ISNULL(@TaiSanId, 0)
	SET @KyHieu				=	ISNULL(@KyHieu, '')
	SET @HienTrangSuDung	=	ISNULL(@HienTrangSuDung, 0)

	SET @CoSoId				=	ISNULL(@CoSoId, 0)
	SET @NhanVienId			=	ISNULL(@NhanVienId, 0)
	SET @MESSAGE			=	ISNULL(@MESSAGE, '')

BEGIN TRY
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TTKK_500_INSERT
	-- INSERT DỮ LIỆU
	DELETE ThongTinKeKhai_Tren500 WHERE TaiSanId = @TaiSanId
	INSERT INTO ThongTinKeKhai_Tren500	(	TaiSanId	,KyHieu		,HienTrangSuDung	)
	VALUES								(	@TaiSanId	,@KyHieu	,@HienTrangSuDung	)

	COMMIT TRANSACTION TTKK_500_INSERT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TTKK_500_INSERT

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM ThongTinKeKhai_Tren500 WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiDat_GetThongTinKeKhaiDatById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhaiDat_GetThongTinKeKhaiDatById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.07 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhaiDat_GetThongTinKeKhaiDatById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	*
	FROM	ThongTinKeKhai_Dat
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiDat_InsertThongTinKeKhaiDat]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhaiDat_InsertThongTinKeKhaiDat]
						 @TaiSanId				=	NULL
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@DienTich				=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL
					
						,@CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.07 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhaiDat_InsertThongTinKeKhaiDat]
	 @TaiSanId				INT				=	NULL
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET	@DiaChi			=	ISNULL(@DiaChi, '')
	SET	@GiayTo			=	ISNULL(@GiayTo, '')
	SET	@DienTich		=	ISNULL(@DienTich, 0)
	SET	@LamTruSo		=	ISNULL(@LamTruSo, 0)
	SET	@CoSoHDSuNghiep	=	ISNULL(@CoSoHDSuNghiep, 0)
	SET	@NhaO			=	ISNULL(@NhaO, 0)
	SET	@ChoThue		=	ISNULL(@ChoThue, 0)
	SET	@BoTrong		=	ISNULL(@BoTrong, 0)
	SET	@BiLanChiem		=	ISNULL(@BiLanChiem, 0)
	SET	@SuDungKhac		=	ISNULL(@SuDungKhac, 0)

	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

BEGIN TRY
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TTKK_DAT_INSERT
	-- INSERT DỮ LIỆU
	DELETE ThongTinKeKhai_Dat WHERE TaiSanId = @TaiSanId
	INSERT INTO ThongTinKeKhai_Dat	(	TaiSanId	,DiaChi		,GiayTo		,DienTich	,LamTruSo	,CoSoHDSuNghiep		,NhaO	,ChoThue	,BoTrong	,BiLanChiem		,SuDungKhac		)
	VALUES							(	@TaiSanId	,@DiaChi	,@GiayTo	,@DienTich	,@LamTruSo	,@CoSoHDSuNghiep	,@NhaO	,@ChoThue	,@BoTrong	,@BiLanChiem	,@SuDungKhac	)

	COMMIT TRANSACTION TTKK_DAT_INSERT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TTKK_DAT_INSERT

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM ThongTinKeKhai_Dat WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiNha_GetThongTinKeKhaiNhaById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhaiNha_GetThongTinKeKhaiNhaById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhaiNha_GetThongTinKeKhaiNhaById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	*
	FROM	ThongTinKeKhai_Nha
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiNha_InsertThongTinKeKhaiNha]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.09
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhaiNha_InsertThongTinKeKhaiNha]
						 @TaiSanId				=	NULL
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@CapHang				=	NULL
						,@SoTang				=	NULL
						,@NamSuDung				=	NULL
						,@DienTich				=	NULL
						,@TongDienTichSan		=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL
					
						,@CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.09 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhaiNha_InsertThongTinKeKhaiNha]
	 @TaiSanId				INT				=	NULL
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@CapHang				INT				=	NULL
	,@SoTang				INT				=	NULL
	,@NamSuDung				NUMERIC(4, 0)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@TongDienTichSan		NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET	@TaiSanId			=	ISNULL(@TaiSanId, 0)
	SET	@DiaChi				=	ISNULL(@DiaChi, '')
	SET	@GiayTo				=	ISNULL(@GiayTo, '')
	SET	@CapHang			=	ISNULL(@CapHang, 0)
	SET	@SoTang				=	ISNULL(@SoTang, 0)
	SET	@NamSuDung			=	ISNULL(@SoTang, 0)
	SET	@DienTich			=	ISNULL(@DienTich, 0)
	SET	@TongDienTichSan	=	ISNULL(@TongDienTichSan, 0)
	SET	@LamTruSo			=	ISNULL(@LamTruSo, 0)
	SET	@CoSoHDSuNghiep		=	ISNULL(@CoSoHDSuNghiep, 0)
	SET	@NhaO				=	ISNULL(@NhaO, 0)
	SET	@ChoThue			=	ISNULL(@ChoThue, 0)
	SET	@BoTrong			=	ISNULL(@BoTrong, 0)
	SET	@BiLanChiem			=	ISNULL(@BiLanChiem, 0)
	SET	@SuDungKhac			=	ISNULL(@SuDungKhac, 0)

	SET	@NhanVienId			=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE			=	ISNULL(@MESSAGE, '')

BEGIN TRY
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TTKK_NHA_INSERT
	-- INSERT DỮ LIỆU
	DELETE ThongTinKeKhai_Nha WHERE TaiSanId = @TaiSanId
	INSERT INTO ThongTinKeKhai_Nha	(	TaiSanId	,DiaChi		,GiayTo		,CapHang	,SoTang		,NamSuDung	,DienTich	,TongDienTichSan	,LamTruSo	,CoSoHDSuNghiep		,NhaO	,ChoThue	,BoTrong	,BiLanChiem		,SuDungKhac		)
	VALUES							(	@TaiSanId	,@DiaChi	,@GiayTo	,@CapHang	,@SoTang	,@NamSuDung	,@DienTich	,@TongDienTichSan	,@LamTruSo	,@CoSoHDSuNghiep	,@NhaO	,@ChoThue	,@BoTrong	,@BiLanChiem	,@SuDungKhac	)

	COMMIT TRANSACTION TTKK_NHA_INSERT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TTKK_NHA_INSERT

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM ThongTinKeKhai_Nha WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiOto_GetThongTinKeKhaiOtoById]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhaiOto_GetThongTinKeKhaiOtoById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhaiOto_GetThongTinKeKhaiOtoById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	TTKK_OTO.*,HTSD.NoiDung TenHienTrangSuDung
	FROM	ThongTinKeKhai_Oto TTKK_OTO
			LEFT JOIN HienTrangSuDung HTSD ON TTKK_OTO.HienTrangSuDung = HTSD.HienTrangSuDungId
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiOto_InsertThongTinKeKhaiOto]    Script Date: 9/28/2017 4:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThongTinKeKhaiOto_InsertThongTinKeKhaiOto]
						 @TaiSanId				=	NULL
						,@NhanHieu				=	NULL
						,@BienKiemSoat			=	NULL
						,@CongSuatXe			=	NULL
						,@TrongTai				=	NULL
						,@ChucDanh				=	NULL
						,@NguonGocXe			=	NULL
						,@LoaiXe				=	NULL
						,@HienTrangSuDung		=	NULL

						,@CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE					OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_ThongTinKeKhaiOto_InsertThongTinKeKhaiOto]
	 @TaiSanId				INT				=	NULL
	,@NhanHieu				NVARCHAR(MAX)	=	NULL
	,@BienKiemSoat			NVARCHAR(MAX)	=	NULL
	,@CongSuatXe			NUMERIC(18,4)	=	NULL
	,@TrongTai				NUMERIC(18,4)	=	NULL
	,@ChucDanh				NVARCHAR(MAX)	=	NULL
	,@NguonGocXe			NVARCHAR(MAX)	=	NULL
	,@LoaiXe				INT				=	NULL
	,@HienTrangSuDung		INT				=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET @TaiSanId			=	ISNULL(@TaiSanId, 0)
	SET @NhanHieu			=	ISNULL(@NhanHieu, '')
	SET @BienKiemSoat		=	ISNULL(@BienKiemSoat, '')
	SET @CongSuatXe			=	ISNULL(@CongSuatXe, 0)
	SET @TrongTai			=	ISNULL(@TrongTai, 0)
	SET @ChucDanh			=	ISNULL(@ChucDanh, '')
	SET @NguonGocXe			=	ISNULL(@NguonGocXe, '')
	SET @LoaiXe				=	ISNULL(@LoaiXe, 0)
	SET @HienTrangSuDung	=	ISNULL(@HienTrangSuDung, 0)

	SET @CoSoId				=	ISNULL(@CoSoId, 0)
	SET @NhanVienId			=	ISNULL(@NhanVienId, 0)
	SET @MESSAGE			=	ISNULL(@MESSAGE, '')

BEGIN TRY
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION TTKK_OTO_INSERT
	-- INSERT DỮ LIỆU
	DELETE ThongTinKeKhai_Oto WHERE TaiSanId = @TaiSanId
	INSERT INTO ThongTinKeKhai_Oto	(	TaiSanId	,NhanHieu	,BienKiemSoat	,CongSuatXe		,TrongTai	,ChucDanh	,NguonGocXe		,LoaiXe		,HienTrangSuDung	)
	VALUES							(	@TaiSanId	,@NhanHieu	,@BienKiemSoat	,@CongSuatXe	,@TrongTai	,@ChucDanh	,@NguonGocXe	,@LoaiXe	,@HienTrangSuDung	)

	COMMIT TRANSACTION TTKK_OTO_INSERT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TTKK_OTO_INSERT

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM ThongTinKeKhai_Oto WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
USE [master]
GO
ALTER DATABASE [QLTS] SET  READ_WRITE 
GO
