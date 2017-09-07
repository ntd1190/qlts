USE [master]
GO
/****** Object:  Database [QLTS]    Script Date: 9/7/2017 4:52:35 PM ******/
CREATE DATABASE [QLTS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLTS', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QLTS.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QLTS_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QLTS_log.ldf' , SIZE = 16576KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
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
/****** Object:  UserDefinedTableType [dbo].[NguyenGiaType]    Script Date: 9/7/2017 4:52:35 PM ******/
CREATE TYPE [dbo].[NguyenGiaType] AS TABLE(
	[TaiSanId] [int] NULL,
	[NguonNganSachId] [int] NULL,
	[GiaTri] [numeric](18, 4) NULL
)
GO
/****** Object:  Table [dbo].[BanKiemKe]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[BaoDuong]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaoDuong](
	[BaoDuongId] [int] IDENTITY(1,1) NOT NULL,
	[TaiSanId] [int] NOT NULL,
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
/****** Object:  Table [dbo].[BienBanKiemKe]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[BienBanKiemKeChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BienBanKiemKeChiTiet](
	[BienBanKiemKeChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[BienBanKiemKeId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[SoLuong] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_BienBanKiemKeChiTiet] PRIMARY KEY CLUSTERED 
(
	[BienBanKiemKeChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BoTriSuDung]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[CoSo]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[DanhGia]    Script Date: 9/7/2017 4:52:35 PM ******/
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
	[HaoMonLuyKeCu] [numeric](18, 4) NOT NULL,
	[SoNamSuDungCu] [int] NOT NULL,
	[TyLeHaoMonCu] [numeric](2, 2) NOT NULL,
	[SLTonCu] [numeric](18, 4) NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [int] NULL,
 CONSTRAINT [PK_DanhGia] PRIMARY KEY CLUSTERED 
(
	[DanhGiaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DanhGia_NguyenGia]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhGia_NguyenGia](
	[DanhGiaId] [int] NOT NULL,
	[NguonNganSachId] [int] NOT NULL,
	[GiaTriCu] [numeric](18, 4) NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DeNghiTrangCap]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[DeNghiTrangCapChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
 CONSTRAINT [PK_DeNghiTrangCapChiTiet] PRIMARY KEY CLUSTERED 
(
	[DeNghiChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DieuChuyen]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DieuChuyen](
	[DieuChuyenId] [int] IDENTITY(1,1) NOT NULL,
	[SoChungTu] [nchar](20) NOT NULL,
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
/****** Object:  Table [dbo].[DieuChuyenChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DieuChuyenChiTiet](
	[DieuChuyenChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[DieuChuyenId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[PhongBanSuDung] [int] NOT NULL,
	[PhongBanChuyenDen] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
	[LyDo] [nvarchar](500) NULL,
 CONSTRAINT [PK_DieuChuyenChiTiet] PRIMARY KEY CLUSTERED 
(
	[DieuChuyenChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DuAn]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[GhiGiam]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[GhiGiamChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GhiGiamChiTiet](
	[GhiGiamChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[GhiGiamId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[XuLyId] [int] NOT NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
 CONSTRAINT [PK_GhiGiamChiTiet] PRIMARY KEY CLUSTERED 
(
	[GhiGiamChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[GhiTang]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[GhiTangChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GhiTangChiTiet](
	[GhiTangChiTietId] [int] IDENTITY(1,1) NOT NULL,
	[GhiTangId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[NgayBatDauSuDung] [datetime] NULL,
	[PhongBanId] [int] NULL,
	[NhanVienId] [int] NULL,
	[SoLuong] [numeric](18, 4) NOT NULL,
 CONSTRAINT [PK_GhiTangChiTiet] PRIMARY KEY CLUSTERED 
(
	[GhiTangChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HangSanXuat]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[HaoMon]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[HaoMonChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[HienTrangSuDung]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HienTrangSuDung](
	[HienTrangSuDungId] [int] IDENTITY(1,1) NOT NULL,
	[NoiDung] [nchar](10) NULL,
 CONSTRAINT [PK_HienTrangSuDung] PRIMARY KEY CLUSTERED 
(
	[HienTrangSuDungId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HinhThuc]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KeHoachMuaSam]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KeHoachMuaSam](
	[MuaSamId] [int] IDENTITY(1,1) NOT NULL,
	[Nam] [numeric](4, 0) NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[DuyetId] [int] NULL,
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
/****** Object:  Table [dbo].[KeHoachMuaSamChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
 CONSTRAINT [PK_KeHoachMuaSamChiTiet] PRIMARY KEY CLUSTERED 
(
	[MuaSamChiTietId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhaiThac]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhaiThac](
	[KhaiThacId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[KhachHangNCCId] [int] NOT NULL,
	[SoChungTu] [nchar](20) NOT NULL,
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
/****** Object:  Table [dbo].[KhoaSoLieu]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoPhieuNhap]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoPhieuNhapChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoPhieuXuat]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoPhieuXuatChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoTaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoTonKho]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[KhoTonKhoChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[LoaiCoSo]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[LoaiTaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[LogData]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[NguonNganSach]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[NguyenGia]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[NhaCungCap]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[NhanVien]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[NhomTaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[NuocSanXuat]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[PhanLoai]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[PhongBan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[PhuongThuc]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[SuaChua]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[SuDung]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[SuDungChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SuDungChiTiet](
	[SuDungChiTiet] [int] IDENTITY(1,1) NOT NULL,
	[SuDungId] [int] NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[SoSanPhamPhucVu] [numeric](18, 4) NULL,
	[DonViTinhSanPham] [nvarchar](50) NULL,
	[SoNguyenLieuSuDung] [numeric](18, 4) NULL,
	[DonViTinhNguyenLieu] [nvarchar](50) NULL,
	[GhiChu] [nvarchar](500) NULL,
 CONSTRAINT [PK_SuDungChiTiet] PRIMARY KEY CLUSTERED 
(
	[SuDungChiTiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
	[NgayGhiTang] [datetime] NOT NULL,
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
/****** Object:  Table [dbo].[ThayDoiThongTin]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin](
	[ThayDoiThongTinId] [int] IDENTITY(1,1) NOT NULL,
	[TaiSanId] [int] NOT NULL,
	[Ngay] [datetime] NOT NULL,
	[TenTaiSanCu] [nvarchar](200) NOT NULL,
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
/****** Object:  Table [dbo].[ThayDoiThongTin_Dat]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Dat](
	[ThayDoiThongTinId] [int] NOT NULL,
	[DiaChiCu] [nvarchar](500) NOT NULL,
	[GiayToCu] [nvarchar](500) NULL,
	[DienTichCu] [numeric](18, 4) NOT NULL,
	[LamTruSoCu] [numeric](18, 4) NOT NULL,
	[CoSoHDSuNghiepCu] [numeric](18, 4) NOT NULL,
	[NhaOCu] [numeric](18, 4) NOT NULL,
	[ChoThueCu] [numeric](18, 4) NOT NULL,
	[BoTrongCu] [numeric](18, 4) NOT NULL,
	[BiLanChiemCu] [numeric](18, 4) NOT NULL,
	[SuDungKhacCu] [numeric](18, 4) NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Nha]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Nha](
	[ThayDoiThongTinId] [int] NOT NULL,
	[DiaChiCu] [nvarchar](500) NOT NULL,
	[GiayToCu] [nvarchar](500) NULL,
	[CapHangCu] [int] NOT NULL,
	[SoTangCu] [int] NOT NULL,
	[NamSuDungCu] [numeric](4, 0) NOT NULL,
	[DienTichCu] [numeric](18, 4) NOT NULL,
	[TongDienTichSanCu] [numeric](18, 4) NOT NULL,
	[LamTruSoCu] [numeric](18, 4) NOT NULL,
	[CoSoHDSuNghiepCu] [numeric](18, 4) NOT NULL,
	[NhaOCu] [numeric](18, 4) NOT NULL,
	[ChoThueCu] [numeric](18, 4) NOT NULL,
	[BoTrongCu] [numeric](18, 4) NOT NULL,
	[BiLanChiemCu] [numeric](18, 4) NOT NULL,
	[SuDungKhacCu] [numeric](18, 4) NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Oto]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Oto](
	[ThayDoiThongTinId] [int] NOT NULL,
	[NhanHieuCu] [nvarchar](500) NOT NULL,
	[BienKiemSoatCu] [nvarchar](20) NOT NULL,
	[CongSuatXeCu] [numeric](4, 0) NOT NULL,
	[TrongTaiCu] [numeric](4, 0) NOT NULL,
	[ChucDanhCu] [nvarchar](100) NULL,
	[NguonGocXeCu] [nvarchar](500) NULL,
	[LoaiXeCu] [int] NOT NULL,
	[HienTrangSuDungCu] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThayDoiThongTin_Tren500]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThayDoiThongTin_Tren500](
	[ThayDoiThongTinId] [int] NOT NULL,
	[KyHieuCu] [nvarchar](500) NOT NULL,
	[HienTrangSuDungCu] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TheoDoi]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TheoDoi](
	[TaiSanId] [int] NOT NULL,
	[NgayTrangCap] [datetime] NULL,
	[NgayBatDauSuDung] [datetime] NULL,
	[PhongBanId] [int] NOT NULL,
	[NhanVienId] [int] NULL,
	[SLTon] [numeric](18, 4) NULL,
	[SLTang] [numeric](18, 4) NULL,
	[SLGiam] [numeric](18, 4) NULL,
 CONSTRAINT [PK_TheoDoi] PRIMARY KEY CLUSTERED 
(
	[TaiSanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongSo]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[ThongTinCongKhai]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[ThongTinKeKhai_Dat]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[ThongTinKeKhai_Nha]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[ThongTinKeKhai_Oto]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[ThongTinKeKhai_Tren500]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  Table [dbo].[XuLy]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  UserDefinedFunction [dbo].[DelimitedSplit8K]    Script Date: 9/7/2017 4:52:35 PM ******/
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
SET IDENTITY_INSERT [dbo].[CoSo] ON 

INSERT [dbo].[CoSo] ([CoSoId], [MaCoSo], [LoaiCoSoId], [TrucThuoc], [TenCoSo], [DienThoai], [DiaChi], [GhiChu], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'CS01', 2, 1, N'Sở tài chính Quảng Ninh', N'0985401027', N'38/40 Quang Trung, phường 10, quận Gò Vấp, Tp.HCM', N'Ghi chú', 53, CAST(N'2017-08-09 00:00:00.000' AS DateTime), 6)
SET IDENTITY_INSERT [dbo].[CoSo] OFF
SET IDENTITY_INSERT [dbo].[DeNghiTrangCap] ON 

INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (5, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'ĐNTC0000001         ', 1, 6, N'mua', 1, 1, 10, 10, CAST(N'2017-08-30 09:09:10.817' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1014, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'SP0001              ', 1, 5, N'Mua máy tinh', 1, 0, 0, 3, CAST(N'2017-09-01 15:10:11.600' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1015, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'2                   ', 1, 5, N'2', 1, 0, 0, 3, CAST(N'2017-09-01 15:15:52.147' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1016, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'233                 ', 1, 5, N'333', 1, 0, 0, 3, CAST(N'2017-09-01 15:17:08.640' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1017, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'222                 ', 1, 5, N'222', 1, 0, 0, 3, CAST(N'2017-09-01 15:18:02.910' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1018, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'2                   ', 1, 5, N'2', 1, 0, 0, 3, CAST(N'2017-09-01 15:19:23.007' AS DateTime), 1)
INSERT [dbo].[DeNghiTrangCap] ([DeNghiId], [Ngay], [SoPhieu], [PhanLoaiId], [PhongBanId], [NoiDung], [CoSoId], [DuyetId], [NguoiDuyet], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1019, CAST(N'2017-09-01 00:00:00.000' AS DateTime), N'2                   ', 1, 5, N'2', 1, 0, 0, 3, CAST(N'2017-09-01 15:21:52.990' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[DeNghiTrangCap] OFF
SET IDENTITY_INSERT [dbo].[DeNghiTrangCapChiTiet] ON 

INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1021, 1015, N'2', N'2', 1, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1022, 1016, N'33', N'333', 1, CAST(33 AS Numeric(4, 0)), N'33', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(3.0000 AS Numeric(18, 4)), CAST(3.0000 AS Numeric(18, 4)), N'3')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1023, 1017, N'22', N'222', 1, CAST(22 AS Numeric(4, 0)), N'22', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1024, 1018, N'2', N'2', 2, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1029, 1019, N'2', N'2', 1, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1030, 1014, N'Máy tính khủng3', N'Đẹp', 1, CAST(2 AS Numeric(4, 0)), N'cái', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(5000000.0000 AS Numeric(18, 4)), CAST(5000000.0000 AS Numeric(18, 4)), N'abc')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1031, 1014, N'máy tính 2', N'xấu', 3, CAST(3 AS Numeric(4, 0)), N'cái', 2, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(30000.0000 AS Numeric(18, 4)), CAST(200000.0000 AS Numeric(18, 4)), N'a')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1032, 1014, N'2', N'2', 2, CAST(2 AS Numeric(4, 0)), N'2', 1, CAST(N'2017-09-05 00:00:00.000' AS DateTime), CAST(2.0000 AS Numeric(18, 4)), CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1033, 5, N'abc', N'a', 1, CAST(1 AS Numeric(4, 0)), N'cái', 1, CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(1000000.0000 AS Numeric(18, 4)), CAST(6000000.0000 AS Numeric(18, 4)), N'mua liền')
INSERT [dbo].[DeNghiTrangCapChiTiet] ([DeNghiChiTietId], [DeNghiId], [TenTaiSan], [MoTa], [LoaiId], [SoLuong], [DonViTinh], [PhuongThucId], [NgayDeNghi], [DuToan], [DuToanDuocDuyet], [GhiChu]) VALUES (1034, 5, N'abc', N'b', 2, CAST(2 AS Numeric(4, 0)), N'cái', 1, CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(1000000.0000 AS Numeric(18, 4)), CAST(6000000.0000 AS Numeric(18, 4)), N'mua liền')
SET IDENTITY_INSERT [dbo].[DeNghiTrangCapChiTiet] OFF
SET IDENTITY_INSERT [dbo].[DieuChuyen] ON 

INSERT [dbo].[DieuChuyen] ([DieuChuyenId], [SoChungTu], [NgayChungTu], [NgayDieuChuyen], [GhiChu], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'DC00001             ', CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'ghi chú', 0, 0, 1, 7, CAST(N'2017-09-07 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[DieuChuyen] ([DieuChuyenId], [SoChungTu], [NgayChungTu], [NgayDieuChuyen], [GhiChu], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (2, N'DC00002             ', CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'ghi chú này rất dài', 0, 0, 1, 7, CAST(N'2017-09-07 00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[DieuChuyen] OFF
SET IDENTITY_INSERT [dbo].[DieuChuyenChiTiet] ON 

INSERT [dbo].[DieuChuyenChiTiet] ([DieuChuyenChiTietId], [DieuChuyenId], [TaiSanId], [PhongBanSuDung], [PhongBanChuyenDen], [SoLuong], [LyDo]) VALUES (1, 1, 28, 5, 6, CAST(1.0000 AS Numeric(18, 4)), N'khong thich')
INSERT [dbo].[DieuChuyenChiTiet] ([DieuChuyenChiTietId], [DieuChuyenId], [TaiSanId], [PhongBanSuDung], [PhongBanChuyenDen], [SoLuong], [LyDo]) VALUES (2, 2, 28, 6, 5, CAST(1.0000 AS Numeric(18, 4)), N'chuyển lại')
SET IDENTITY_INSERT [dbo].[DieuChuyenChiTiet] OFF
SET IDENTITY_INSERT [dbo].[DuAn] ON 

INSERT [dbo].[DuAn] ([DuAnId], [MaDuAn], [TenDuAn], [GhiChu], [NgungTheoDoi], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'DA01', N'Quản lý tài sản', N'222', 0, 1, 53, CAST(N'2017-08-21 10:47:06.073' AS DateTime), 10)
SET IDENTITY_INSERT [dbo].[DuAn] OFF
SET IDENTITY_INSERT [dbo].[GhiTang] ON 

INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'GT00001', CAST(N'2017-09-04 00:00:00.000' AS DateTime), CAST(N'2017-09-05 00:00:00.000' AS DateTime), N'abc11', 0, 7, 1, 7, CAST(N'2017-09-05 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (4, N'1', CAST(N'2017-09-05 00:00:00.000' AS DateTime), CAST(N'2017-09-05 00:00:00.000' AS DateTime), N'1', 0, 0, 1, 7, CAST(N'2017-09-05 10:43:08.497' AS DateTime), 1)
INSERT [dbo].[GhiTang] ([GhiTangId], [SoChungTu], [NgayChungTu], [NgayGhiTang], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (5, N'2', CAST(N'2017-09-05 00:00:00.000' AS DateTime), CAST(N'2017-09-06 00:00:00.000' AS DateTime), N'adasdasdasdas', 0, 0, 1, 7, CAST(N'2017-09-05 10:45:13.793' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[GhiTang] OFF
SET IDENTITY_INSERT [dbo].[GhiTangChiTiet] ON 

INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (4, 4, 27, CAST(N'2017-09-05 00:00:00.000' AS DateTime), 5, 3, CAST(1.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (31, 1, 32, CAST(N'2017-09-05 00:00:00.000' AS DateTime), 5, 7, CAST(1.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (78, 5, 32, CAST(N'2017-09-07 00:00:00.000' AS DateTime), 5, 3, CAST(1.0000 AS Numeric(18, 4)))
INSERT [dbo].[GhiTangChiTiet] ([GhiTangChiTietId], [GhiTangId], [TaiSanId], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SoLuong]) VALUES (79, 5, 28, CAST(N'2017-09-07 00:00:00.000' AS DateTime), 5, 7, CAST(9.0000 AS Numeric(18, 4)))
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

INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1031, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 09:38:57.873' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1033, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 09:40:46.053' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1034, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 09:40:47.477' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1035, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 09:40:49.650' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1036, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 09:40:57.010' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1037, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 09:44:48.670' AS DateTime), 7)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1039, CAST(2016 AS Numeric(4, 0)), N'qeqweqwe2', 0, NULL, 1, 3, CAST(N'2017-09-01 14:09:04.450' AS DateTime), 5)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1040, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 3, CAST(N'2017-09-01 14:10:57.370' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1041, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 6, CAST(N'2017-09-07 11:11:00.160' AS DateTime), 1)
INSERT [dbo].[KeHoachMuaSam] ([MuaSamId], [Nam], [NoiDung], [DuyetId], [NguoiDuyet], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1042, CAST(2017 AS Numeric(4, 0)), NULL, 0, NULL, 1, 6, CAST(N'2017-09-07 11:11:02.683' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[KeHoachMuaSam] OFF
SET IDENTITY_INSERT [dbo].[KeHoachMuaSamChiTiet] ON 

INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1027, 1031, N'2', 1, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1029, 1033, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1030, 1034, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1032, 1036, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1035, 1039, N'tan2', 1, 1, N'cái', N'', CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(20000.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1036, 1039, N'nguyen23', 1, 1, N'thùng', N'', CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(3.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1038, 1037, N'2', 2, 1, N'2', N'2', CAST(N'2017-01-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 1, CAST(2.0000 AS Numeric(18, 4)), N'2')
INSERT [dbo].[KeHoachMuaSamChiTiet] ([MuaSamChiTietId], [MuaSamId], [TenTaiSan], [LoaiId], [PhuongThucId], [DonViTinh], [MoTa], [Ngay], [SoLuong], [DonGia], [HinhThucId], [DuToan], [GhiChu]) VALUES (1039, 1037, N'2', 1, 1, N'2', N'2', CAST(N'2017-05-09 00:00:00.000' AS DateTime), CAST(2 AS Numeric(4, 0)), CAST(2.0000 AS Numeric(18, 4)), 2, CAST(2.0000 AS Numeric(18, 4)), N'2')
SET IDENTITY_INSERT [dbo].[KeHoachMuaSamChiTiet] OFF
SET IDENTITY_INSERT [dbo].[KhachHang] ON 

INSERT [dbo].[KhachHang] ([KhachHangId], [MaKhachHang], [TenKhachHang], [DienThoai], [DiDong], [MaSoThue], [TKNganHang], [TenNganHang], [DiaChi], [GhiChu], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1, N'KH001', N'Công ty TNHH TM&DV Song Ân', N'1234562', N'123456', N'123456', N'123456', N'Ngân hàng ACB', N'38/40 Quang Trung, phường 10, quận Gò Vấp, Tp.HCM', NULL, 1, 53, CAST(N'2017-08-14 09:58:02.023' AS DateTime), 5)
SET IDENTITY_INSERT [dbo].[KhachHang] OFF
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
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (32, 1, CAST(1212121.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (32, 2, CAST(21321313.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (32, 3, CAST(12212.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (33, 1, CAST(1111111.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1034, 1, CAST(2000000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1036, 1, CAST(13213.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1036, 2, CAST(133.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1036, 3, CAST(3213.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1040, 1, CAST(13213.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1040, 2, CAST(133.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1040, 3, CAST(3213.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1041, 1, CAST(100000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1041, 2, CAST(100000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1041, 3, CAST(200000.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1046, 2, CAST(3213213213.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1047, 2, CAST(3213213213.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1048, 1, CAST(32123131.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1049, 1, CAST(212121.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1050, 1, CAST(212112.0000 AS Numeric(18, 4)))
INSERT [dbo].[NguyenGia] ([TaiSanId], [NguonNganSachId], [GiaTri]) VALUES (1050, 2, CAST(1212221.0000 AS Numeric(18, 4)))
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
SET IDENTITY_INSERT [dbo].[TaiSan] ON 

INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (27, N'Ghe001', N'Ghế răng Diplomat', N'1', 1, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1                                                 ', N'1', 1, CAST(N'2017-08-22 00:00:00.000' AS DateTime), CAST(N'2017-08-22 00:00:00.000' AS DateTime), CAST(N'2017-08-22 00:00:00.000' AS DateTime), 1, CAST(2.00 AS Numeric(5, 2)), CAST(1.0000 AS Numeric(18, 4)), NULL, N'1', NULL, NULL, CAST(1.00 AS Numeric(5, 2)), NULL, 1, 1, NULL, NULL, NULL)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (28, N'TS001', N'KHÔNG BIẾT', N'CÁI', 1, 1, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 1, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-08-31 10:16:21.227' AS DateTime), 2)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (29, N'TS001', N'KHÔNG BIẾT', N'CÁI', 1, 1, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 1, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-08-31 10:16:37.263' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (30, N'TS001', N'KHÔNG BIẾT', N'CÁI', 1, 1, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 1, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-08-31 10:30:08.473' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (32, N'1', N'1', N'cái', 2, 1, CAST(1 AS Numeric(4, 0)), 2, 2, N'1                                                 ', N'1', 1, CAST(N'2017-08-31 00:00:00.000' AS DateTime), CAST(N'2017-08-31 00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 6, CAST(N'2017-08-31 16:04:54.533' AS DateTime), 7)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (33, N'1', N'1', N'cái', 2, 1, CAST(1 AS Numeric(4, 0)), 1, 2, N'1                                                 ', N'1', 1, CAST(N'2017-08-31 00:00:00.000' AS DateTime), CAST(N'2017-08-31 00:00:00.000' AS DateTime), CAST(N'2017-09-06 00:00:00.000' AS DateTime), 0, CAST(0.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), NULL, N'0', CAST(0.0000 AS Numeric(18, 4)), NULL, NULL, CAST(0.0000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-08-31 16:09:16.153' AS DateTime), 3)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (34, N'test', N'KHÔNG BIẾT', N'cái', 1, 3, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 1, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-08-31 16:16:02.257' AS DateTime), 36)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1032, N'test', N'KHÔNG BIẾT', N'cái', 1, 1, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 1, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-09-01 09:36:55.733' AS DateTime), 2)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1034, N'test', N'KHÔNG BIẾT', NULL, 2, 1, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 2, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-09-01 09:39:25.357' AS DateTime), 17)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1035, N'test', N'KHÔNG BIẾT', NULL, 1, 1, CAST(2015 AS Numeric(4, 0)), 1, 2, N'QDTC                                              ', N'SAMSUNG', 1, CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), CAST(N'2018-08-31 00:00:00.000' AS DateTime), 1, CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), CAST(N'2018-08-31 00:00:00.000' AS DateTime), N'KỲ KH', CAST(1.0000 AS Numeric(18, 4)), CAST(1 AS Numeric(5, 0)), CAST(1.10 AS Numeric(5, 2)), CAST(1.1000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-09-01 09:39:45.117' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1036, N'3131', N'3213', N'2313', 3, 2, CAST(3213 AS Numeric(4, 0)), 1, 2, N'32131                                             ', NULL, 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(N'2017-09-01 00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 6, CAST(N'2017-09-01 14:49:16.873' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1040, N'321', N'331313', N'12313', 2, NULL, NULL, 2, NULL, N'32131                                             ', N'23131', NULL, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(N'2017-09-01 00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 6, CAST(N'2017-09-01 14:50:53.600' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1041, N'21', N'132131', N'3213', 2, 2, CAST(3213 AS Numeric(4, 0)), 1, 2, N'32131                                             ', N'32131', 1, CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(N'2017-09-01 00:00:00.000' AS DateTime), CAST(N'2017-09-06 00:00:00.000' AS DateTime), 0, CAST(0.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), NULL, N'0', CAST(0.0000 AS Numeric(18, 4)), CAST(0 AS Numeric(5, 0)), CAST(0.00 AS Numeric(5, 2)), CAST(0.0000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-09-01 15:02:54.523' AS DateTime), 9)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1046, N'3213', N'13132', N'32131', 3, 1, CAST(3213 AS Numeric(4, 0)), 1, 2, N'32131', N'321313', 1, CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-06 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), 12, CAST(32.00 AS Numeric(5, 2)), CAST(321.0000 AS Numeric(18, 4)), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'321', CAST(321.0000 AS Numeric(18, 4)), CAST(312 AS Numeric(5, 0)), CAST(321.00 AS Numeric(5, 2)), CAST(321.0000 AS Numeric(18, 4)), 0, 1, 6, CAST(N'2017-09-07 10:45:36.000' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1047, N'3213', N'13132', N'32131', 3, 1, CAST(3213 AS Numeric(4, 0)), 1, 2, N'32131', N'321313', 1, CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-06 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), 12, CAST(32.00 AS Numeric(5, 2)), CAST(321.0000 AS Numeric(18, 4)), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'321', CAST(321.0000 AS Numeric(18, 4)), CAST(312 AS Numeric(5, 0)), CAST(321.00 AS Numeric(5, 2)), CAST(321.0000 AS Numeric(18, 4)), 0, 1, 6, CAST(N'2017-09-07 10:49:26.660' AS DateTime), 1)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1048, N'32132', N'31321', N'321321', 3, 2, CAST(3132 AS Numeric(4, 0)), 1, 2, N'321321', N'32131', 1, CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-08 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), 32131, CAST(31.00 AS Numeric(5, 2)), CAST(31.0000 AS Numeric(18, 4)), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'3213132', CAST(32.0000 AS Numeric(18, 4)), CAST(32 AS Numeric(5, 0)), CAST(32.00 AS Numeric(5, 2)), CAST(32.0000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-09-07 10:51:08.880' AS DateTime), 35)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1049, N'212', N'1212', N'21212', 2, 3, CAST(2121 AS Numeric(4, 0)), 2, 2, N'2121', N'2121', 1, CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), 21, CAST(21.00 AS Numeric(5, 2)), CAST(2121.0000 AS Numeric(18, 4)), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'2121', CAST(212.0000 AS Numeric(18, 4)), CAST(121 AS Numeric(5, 0)), CAST(212.00 AS Numeric(5, 2)), CAST(2121.0000 AS Numeric(18, 4)), 1, 1, 6, CAST(N'2017-09-07 10:55:11.360' AS DateTime), 3)
INSERT [dbo].[TaiSan] ([TaiSanId], [MaTaiSan], [TenTaiSan], [DonViTinh], [LoaiId], [PhuongThucId], [NamSanXuat], [NuocSanXuatId], [HangSanXuatId], [SoQDTC], [NhanHieu], [DuAnId], [NgayMua], [NgayGhiTang], [NgayBDHaoMon], [SoNamSuDung], [TyLeHaoMon], [HaoMonLuyKe], [NgayBDKhauHao], [KyTinhKhauHao], [GiaTriKhauHao], [SoKyKhauHao], [TyLeKhauHao], [KhauHaoLuyKe], [LoaiKeKhai], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (1050, N'212', N'1212', N'1212', 2, 3, CAST(2121 AS Numeric(4, 0)), 1, 2, N'21212', N'21212', 1, CAST(N'2017-08-30 00:00:00.000' AS DateTime), CAST(N'2017-11-30 00:00:00.000' AS DateTime), CAST(N'2017-09-14 00:00:00.000' AS DateTime), 12, CAST(12.00 AS Numeric(5, 2)), CAST(12.0000 AS Numeric(18, 4)), CAST(N'2017-09-07 00:00:00.000' AS DateTime), N'12', CAST(12.0000 AS Numeric(18, 4)), CAST(12 AS Numeric(5, 0)), CAST(12.00 AS Numeric(5, 2)), CAST(12.0000 AS Numeric(18, 4)), 0, 1, 6, CAST(N'2017-09-07 10:56:41.110' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[TaiSan] OFF
INSERT [dbo].[TheoDoi] ([TaiSanId], [NgayTrangCap], [NgayBatDauSuDung], [PhongBanId], [NhanVienId], [SLTon], [SLTang], [SLGiam]) VALUES (27, CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-07 00:00:00.000' AS DateTime), 5, 4, CAST(1.0000 AS Numeric(18, 4)), CAST(1.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)))
INSERT [dbo].[ThongSo] ([ThongSoId], [Loai], [Ten]) VALUES (1, NULL, NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1034, N'132133', N'32131', 4, CAST(3231.0000 AS Numeric(18, 4)), CAST(3213213.0000 AS Numeric(18, 4)), CAST(31321.0000 AS Numeric(18, 4)), CAST(321312231.0000 AS Numeric(18, 4)), 1)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1047, N'', N'', NULL, CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), CAST(0.0000 AS Numeric(18, 4)), NULL)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1048, N'12321', N'123131', 3, CAST(3213.0000 AS Numeric(18, 4)), CAST(2131321.0000 AS Numeric(18, 4)), CAST(321.0000 AS Numeric(18, 4)), CAST(32132131.0000 AS Numeric(18, 4)), 1)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1049, N'2121', N'21', 4, CAST(2121.0000 AS Numeric(18, 4)), CAST(2121.0000 AS Numeric(18, 4)), CAST(212121.0000 AS Numeric(18, 4)), CAST(2121.0000 AS Numeric(18, 4)), 1)
INSERT [dbo].[ThongTinCongKhai] ([TaiSanId], [MoTa], [MucDich], [HienTrangSuDungId], [DonGia], [NopNganSach], [DeLaiDonVi], [HHCK], [NhaCungCapId]) VALUES (1050, N'212', N'121212', 4, CAST(212.0000 AS Numeric(18, 4)), CAST(212.0000 AS Numeric(18, 4)), CAST(212121.0000 AS Numeric(18, 4)), CAST(12121.0000 AS Numeric(18, 4)), 1)
INSERT [dbo].[ThongTinKeKhai_Dat] ([TaiSanId], [DiaChi], [GiayTo], [DienTich], [LamTruSo], [CoSoHDSuNghiep], [NhaO], [ChoThue], [BoTrong], [BiLanChiem], [SuDungKhac]) VALUES (1048, N'3231313', N'2131321', CAST(34584752762.0000 AS Numeric(18, 4)), CAST(32313.0000 AS Numeric(18, 4)), CAST(1321.0000 AS Numeric(18, 4)), CAST(32132132132.0000 AS Numeric(18, 4)), CAST(321321231.0000 AS Numeric(18, 4)), CAST(31231.0000 AS Numeric(18, 4)), CAST(3213.0000 AS Numeric(18, 4)), CAST(2131231321.0000 AS Numeric(18, 4)))
INSERT [dbo].[ThongTinKeKhai_Dat] ([TaiSanId], [DiaChi], [GiayTo], [DienTich], [LamTruSo], [CoSoHDSuNghiep], [NhaO], [ChoThue], [BoTrong], [BiLanChiem], [SuDungKhac]) VALUES (1049, N'321321', N'', CAST(7730944.0000 AS Numeric(18, 4)), CAST(32131.0000 AS Numeric(18, 4)), CAST(3131321.0000 AS Numeric(18, 4)), CAST(31313.0000 AS Numeric(18, 4)), CAST(332.0000 AS Numeric(18, 4)), CAST(1321313.0000 AS Numeric(18, 4)), CAST(1321.0000 AS Numeric(18, 4)), CAST(3213213.0000 AS Numeric(18, 4)))
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
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DeNghiTrangCapChiTiet_DeNghiTrangCapChiTiet] FOREIGN KEY([DeNghiId])
REFERENCES [dbo].[DeNghiTrangCap] ([DeNghiId])
GO
ALTER TABLE [dbo].[DeNghiTrangCapChiTiet] CHECK CONSTRAINT [FK_DeNghiTrangCapChiTiet_DeNghiTrangCapChiTiet]
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
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_PhongBanChuyenDen] FOREIGN KEY([PhongBanChuyenDen])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_PhongBanChuyenDen]
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_DieuChuyenChiTiet_PhongBanSuDung] FOREIGN KEY([PhongBanSuDung])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[DieuChuyenChiTiet] CHECK CONSTRAINT [FK_DieuChuyenChiTiet_PhongBanSuDung]
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
ALTER TABLE [dbo].[TheoDoi]  WITH CHECK ADD  CONSTRAINT [FK_TheoDoi_NhanVien] FOREIGN KEY([NhanVienId])
REFERENCES [dbo].[NhanVien] ([NhanVienId])
GO
ALTER TABLE [dbo].[TheoDoi] CHECK CONSTRAINT [FK_TheoDoi_NhanVien]
GO
ALTER TABLE [dbo].[TheoDoi]  WITH CHECK ADD  CONSTRAINT [FK_TheoDoi_PhongBan] FOREIGN KEY([PhongBanId])
REFERENCES [dbo].[PhongBan] ([PhongBanId])
GO
ALTER TABLE [dbo].[TheoDoi] CHECK CONSTRAINT [FK_TheoDoi_PhongBan]
GO
ALTER TABLE [dbo].[TheoDoi]  WITH CHECK ADD  CONSTRAINT [FK_TheoDoi_TaiSan] FOREIGN KEY([TaiSanId])
REFERENCES [dbo].[TaiSan] ([TaiSanId])
GO
ALTER TABLE [dbo].[TheoDoi] CHECK CONSTRAINT [FK_TheoDoi_TaiSan]
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
/****** Object:  StoredProcedure [dbo].[sp_CoSo_cbxCoSoByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_CoSo_GetCoSoById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_CoSo_GetListCoSoByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, a.CoSoId,a.MaCoSo,a.TenCoSo,a.DienThoai,a.DiaChi,a.GhiChu,b.HoTen,a.NgayTao
	FROM CoSo a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaCoSo LIKE N''%' +@Search+ '%'' OR TenCoSo LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_DeleteDeNghiTrangCapById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]
( 
	  @CoSoId	        INT	
	, @SoPhieu		    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @PhongBanId		NVARCHAR(MAX)	
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
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0019',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, H.DeNghiId, H.Ngay, H.SoPhieu, H.PhanLoaiId, PL.TenPhanLoai, H.PhongBanId, PB.TenPhongBan, H.NoiDung, H.CoSoId,
			H.DuyetId,H.NguoiTao,NguoiDung.HoTen TenNhanVien,H.NgayTao,H.CtrVersion
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ON NguoiDung.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	WHERE 1 = 1 and CAST(Ngay AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	IF @PhongBanId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and  h.PhongBanId in (SELECT Item FROM dbo.DelimitedSplit8K(' + @PhongBanId + ','','') WHERE Item > 0 ) ';
	END

	
	IF @IS_VIEW_ALL = '0' 
	BEGIN			 
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + CAST(@CoSoId AS VARCHAR) + '''';	  
		SET @V_SQL = @V_SQL + ' and H.NguoiTao =''' + CAST(@LoginId AS VARCHAR) + '''';	  
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
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByDeNghiId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
			H.NoiDung
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ON NguoiDung.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	WHERE H.DeNghiId = @DeNghiId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_InsertDeNghiTrangCap]    Script Date: 9/7/2017 4:52:35 PM ******/
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
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DeNghiTrangCap
			        ( Ngay ,			SoPhieu ,			PhanLoaiId ,
			          PhongBanId ,		NoiDung ,			CoSoId ,
			          DuyetId ,			NguoiDuyet ,		NguoiTao ,
			          NgayTao ,			CtrVersion
			        )
			SELECT	 @NgayLap			,@SoPhieu			,@PhanLoaiId
					 ,@PhongBanId		,@NoiDung			,@CoSoId
					 ,0					,0					,@NhanVienId
					 ,GETDATE()			,1

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
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_UpdateDeNghiTrangCap]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCapChiTiet_GetDeNghiTrangCapChiTietByDeNghiId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
			CT.GhiChu
	FROM dbo.DeNghiTrangCapChiTiet CT
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = CT.LoaiId
	LEFT JOIN dbo.PhuongThuc PT ON PT.PhuongThucId = CT.PhuongThucId
	WHERE CT.DeNghiId = @DeNghiId
	
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCapChiTiet_InsertDeNghiTrangCapChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_DeleteDieuChuyenyId]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_DieuChuyen_DeleteDieuChuyenyId]
	@DieuChuyenId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
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
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_GetListDieuChuyenByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_DieuChuyen_GetListDieuChuyenByCriteria]
( 
	  @CoSoId	        INT	
	, @SoChungTu	    nvarchar(500)	= null		
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
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0025',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, H.DieuChuyenId, H.SoChungTu, H.NgayDieuChuyen,H.NgayChungTu, H.GhiChu, H.DuyetId,H.NguoiDuyet, nd.HoTen TenNguoiDuyet,
			H.CoSoId, H.NguoiTao, nt.HoTen TenNguoiTao, H.NgayTao, H.CtrVersion
	FROM dbo.DieuChuyen H
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung nt ON nt.NhanVienId = H.NguoiTao 
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung nd ON nd.NhanVienId = H.NguoiTao 
	WHERE CAST(H.NgayDieuChuyen AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	

	
	IF @IS_VIEW_ALL = '0' 
	BEGIN			 
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + CAST(@CoSoId AS VARCHAR) + '''';	  
		SET @V_SQL = @V_SQL + ' and H.NguoiTao =''' + CAST(@LoginId AS VARCHAR) + '''';	  
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
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_GetListDieuChuyenByDieuChuyenId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
			CONVERT(VARCHAR, H.NgayChungTu,103),
			CONVERT(VARCHAR, H.NgayDieuChuyen,103),
			H.GhiChu
	FROM dbo.DieuChuyen H
	WHERE H.DieuChuyenId = @DieuChuyenId

-----------------------------------------------------
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_InsertDieuChuyen]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyenChiTiet_GetDieuChuyenChiTietByDieuChuyenId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
			CAST(ct.PhongBanSuDung AS VARCHAR)PhongBanSuDung,
			pbsd.TenPhongBan TenPhongBanSuDung,
			CAST(ct.PhongBanChuyenDen AS VARCHAR)PhongBanChuyenDen,
			pbcd.TenPhongBan TenPhongBanChuyenDen,
			ct.SoLuong,
			ct.LyDo
	FROM dbo.DieuChuyenChiTiet ct
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.PhongBan pbsd ON pbsd.PhongBanId = ct.PhongBanSuDung
	LEFT JOIN dbo.PhongBan pbcd ON pbcd.PhongBanId = ct.PhongBanChuyenDen
	WHERE ct.DieuChuyenId = @DieuChuyenId

	
SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [dbo].[sp_DuAn_cbxDuAnByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_DuAn_cbxDuAnByCriteria]
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

	SELECT a.DuAnId,a.MaDuAn,a.TenDuAn
	FROM DuAn a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_DuAn_GetListDuAnByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_DuAn_GetListDuAnByCriteria]
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, a.DuAnId,a.MaDuAn,a.TenDuAn,a.GhiChu,b.HoTen,a.NgayTao
	FROM DuAn a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaDuAn LIKE N''%' +@Search+ '%'' OR TenDuAn LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_GhiGiam_DeleteGhiGiamById]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_GhiGiam_DeleteGhiGiamById]
( 
	  @GhiGiamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	Delete GhiGiamChiTiet where GhiGiamId = @GhiGiamId
	Delete GhiGiam where GhiGiamId = @GhiGiamId
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiGiam_GetListGhiGiamByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0023',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
		

		IF @IS_VIEW_ALL = '0' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
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
/****** Object:  StoredProcedure [dbo].[sp_GhiGiamChiTiet_GetGhiGiamChiTietByGhiGiamId]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_GhiGiamChiTiet_GetGhiGiamChiTietByGhiGiamId]
( 
	  @GhiGiamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.GhiGiamId,a.GhiGiamChiTietId,b.MaTaiSan,b.TenTaiSan,c.TenXuLy,a.SoLuong,ISNULL(sum(d.GiaTri),0) as NguyenGia from GhiGiamChiTiet  a 
	left join TaiSan b on a.TaiSanId=b.TaiSanId left join XuLy c on a.XuLyId=c.XuLyId
	left join NguyenGia d on a.TaiSanId=d.TaiSanId
	where GhiGiamId= @GhiGiamId
	group by  a.GhiGiamId,a.GhiGiamChiTietId,b.MaTaiSan,b.TenTaiSan,c.TenXuLy,a.SoLuong
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_DeleteGhiTangById]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_GhiTang_DeleteGhiTangById]
	@GhiTangId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
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
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_GetListGhiTangByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_GhiTang_GetListGhiTangByCriteria]
( 
	  @CoSoId	        INT	
	, @SoChungTu	    nvarchar(500)	= null		
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
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0024',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
			isnull(SUM(NG.GiaTri),0) TongNguyenGia, h.DuyetId, H.NguoiDuyet,ndd.HoTen TenNguoiDuyet, H.CoSoId, H.NguoiTao,nd.HoTen TenNguoiTao, H.NgayTao
	FROM dbo.GhiTang H
	LEFT JOIN dbo.GhiTangChiTiet L ON H.GhiTangId = L.GhiTangId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung nd ON nd.NhanVienId = h.NguoiTao
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ndd ON ndd.NhanVienId = h.NguoiDuyet
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
	
	IF @IS_VIEW_ALL = '0' 
	BEGIN			 
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + CAST(@CoSoId AS VARCHAR) + '''';	  
		SET @V_SQL = @V_SQL + ' and H.NguoiTao =''' + CAST(@LoginId AS VARCHAR) + '''';	  
	END

	SET @V_SQL = @V_SQL + ' GROUP BY H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
							h.DuyetId, H.NguoiDuyet, H.CoSoId, H.NguoiTao, H.NgayTao,ndd.HoTen,nd.HoTen ';

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
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_GetListGhiTangByGhiTangId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_InsertGhiTang]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_UpdateGhiTang]    Script Date: 9/7/2017 4:52:35 PM ******/
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
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.GhiTang
			SET NgayChungTu = @NgayChungTu,
				NgayGhiTang = @NgayGhiTang,
				NoiDung = @NoiDung
			WHERE GhiTangId = @GhiTangId
			
			DELETE dbo.GhiTangChiTiet WHERE GhiTangId = @GhiTangId

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
/****** Object:  StoredProcedure [dbo].[sp_GhiTangChiTiet_GetGhiTangChiTietByDeNghiId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_GhiTangChiTiet_InsertGhiTangChiTiet]    Script Date: 9/7/2017 4:52:35 PM ******/
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
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.GhiTangChiTiet
			        ( GhiTangId ,			TaiSanId ,			NgayBatDauSuDung ,
			          PhongBanId ,			NhanVienId ,		SoLuong
			        )
			SELECT	@GhiTangId				,@TaiSanId			,@NgayBatDauSuDung
					,@PhongBanId			,@NhanVienId		,@SoLuong

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
/****** Object:  StoredProcedure [dbo].[sp_HangSanXuat_cbxHangSanXuatByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_HangSanXuat_cbxHangSanXuatByCriteria]
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

	SELECT a.HangSanXuatId,a.MaHangSanXuat,a.TenHangSanXuat
	FROM HangSanXuat a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_HangSanXuat_GetListHangSanXuatByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
						 @Search			=	NULL
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.06 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON 
	SET @Search = ISNULL(@Search,'')
	SELECT	TOP 10 HTSD.*
	FROM	HienTrangSuDung HTSD
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSam_DeleteKeHoachMuaSamById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSam_GetListKeHoachMuaSamByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0021',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT,a.MuaSamId, a.Nam,a.NoiDung
	FROM KeHoachMuaSam a where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (Nam LIKE N''%' +@Search+ '%'' OR NoiDung LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSamChiTiet_DeleteKeHoachMuaSamChiTietById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSamChiTiet_GetKeHoachMuaSamChiTietByMuaSamId]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	SELECT a.MuaSamId,a.MuaSamChiTietId,a.TenTaiSan,a.LoaiId,b.TenLoai,CAST(c.PhuongThucId AS VARCHAR) PhuongThucId, c.TenPhuongThuc,a.DonViTinh,a.MoTa,Convert(varchar(10),CONVERT(date,a.Ngay,106),103) AS Ngay,a.SoLuong,a.DonGia,CAST(d.HinhThucId AS VARCHAR) HinhThucId,d.TenHinhThuc,a.DuToan,a.GhiChu  from KeHoachMuaSamChiTiet  a 
	left join LoaiTaiSan b on a.LoaiId=b.LoaiId left join PhuongThuc c on a.PhuongThucId=c.PhuongThucId left join HinhThuc d on a.HinhThucId=d.HinhThucId
	where MuaSamId= @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_KhachHang_cbxKhachHangByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_KhachHang_GetListKhachHangByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_KhoTaiSan_cbxKhoTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_KhoTaiSan_GetListKhoTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_KhoTaiSan_GetListKhoTaiSanByCriteria]
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, a.KhoTaiSanId,a.MaKhoTaiSan,a.TenKhoTaiSan,a.GhiChu,b.HoTen,a.NgayTao
	FROM KhoTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaKhoTaiSan LIKE N''%' +@Search+ '%'' OR TenKhoTaiSan LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]
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

	SELECT a.LoaiId,a.MaLoai,a.TenLoai
	FROM LoaiTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 


	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_LoaiTaiSan_GetListLoaiTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0005',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
/****** Object:  StoredProcedure [dbo].[sp_LoaiTaiSan_GetLoaiTaiSanById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_LogData_InsertLogData]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_NguonNganSach_cbxNguonNganSachByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_NguonNganSach_cbxNguonNganSachByCriteria]
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

	SELECT a.NguonNganSachId,a.MaNguonNganSach,a.TenNguonNganSach
	FROM NguonNganSach a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NguonNganSach_GetListNguonNganSachByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_NhaCungCap_cbxNhaCungCapByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROC [dbo].[sp_NhaCungCap_cbxNhaCungCapByCriteria]
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

	SELECT a.NhaCungCapId,a.MaNhaCungCap,a.TenNhaCungCap
	FROM NhaCungCap a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NhaCungCap_GetListNhaCungCapByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN00012',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_cbxNhanVienByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_GetListNhanVienByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0005',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, a.NhanVienId,a.MaNhanVien,a.TenNhanVien,b.TenPhongBan,a.DienThoai,a.GhiChu,c.HoTen,a.NgayTao
	FROM NhanVien a Inner join PhongBan b on a.PhongBanId=b.PhongBanId LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] c on a.NguoiTao=c.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search
	
	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (a.MaNhanVien LIKE N''%' +@Search+ '%'' OR a.TenNhanVien LIKE  N''%' +@Search+ '%'')';

		IF @IS_VIEW_ALL = '0' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and b.CoSoId =''' + @CoSoId + '''';	  
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
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_GetNhanVienById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_NhomTaiSan_cbxNhomTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_NhomTaiSan_GetListNhomTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROC [dbo].[sp_NhomTaiSan_GetListNhomTaiSanByCriteria]
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
/****** Object:  StoredProcedure [dbo].[sp_NuocSanXuat_cbxNuocSanXuatByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[sp_NuocSanXuat_cbxNuocSanXuatByCriteria]
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

	SELECT a.NuocSanXuatId,a.MaNuocSanXuat,a.TenNuocSanXuat
	FROM NuocSanXuat a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	

	

-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_NuocSanXuat_GetListNuocSanXuatByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_PhongBan_cbxPhongBanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_PhongBan_GetListPhongBanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, a.PhongBanId,a.MaPhongBan,a.TenPhongBan,a.GhiChu,b.HoTen,a.NgayTao
	FROM PhongBan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaPhongBan LIKE N''%' +@Search+ '%'' OR TenPhongBan LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW_ALL = '0' 
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
/****** Object:  StoredProcedure [dbo].[sp_PhuongThuc_cbxPhuongThucByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: DANH SÁCH PHƯƠNG THỨC
4. Function		: 
5. Example		: 
					EXEC [sp_PhuongThuc_cbxPhuongThucByCriteria]
						 @Search			=	''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_PhuongThuc_cbxPhuongThucByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SELECT *
	FROM PhuongThuc 
-----------------------------------------------------
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_cbxTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
						 @Search			=	NULL
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
CREATE PROCEDURE [dbo].[sp_TaiSan_cbxTaiSanByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON 
	SET @Search = ISNULL(@Search,'')
	SELECT	TOP 10 TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan, ISNULL(SUM(NG.GiaTri),0) NguyenGia, TS.DonViTinh
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
	WHERE	(TS.MaTaiSan LIKE N'%' + @Search + '%'
			OR TS.TenTaiSan LIKE N'%' + @Search + '%') AND TS.CoSoId=@CoSoId
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_cbxTaiSanSuDungByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
						 @Search			=	NULL
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
	
)
AS  
BEGIN
SET NOCOUNT ON 
	SET @Search = ISNULL(@Search,'')
		SELECT	TOP 10 TS.TaiSanId,TS.MaTaiSan,TS.DonViTinh,TS.TenTaiSan,PB.TenPhongBan, ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,  ISNULL(SUM(NG.GiaTri),0) NguyenGia
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN TheoDoi TD ON TS.TaiSanId = TD.TaiSanId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
	WHERE (TD.SLTon + TD.SLTang - TD.SLGiam) > 0  and (TS.MaTaiSan LIKE N'%' + @Search + '%'
			OR TS.TenTaiSan LIKE N'%' + @Search + '%') and TS.CoSoId=@CoSoId
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh,PB.TenPhongBan,TD.SLTon,TD.SLTang,TD.SLGiam
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_DeleteListTaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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

BEGIN TRANSACTION TAISAN_DELETE
BEGIN TRY
	-- XÓA NGUYÊN GIÁ
	DELETE		NguyenGia
	WHERE		CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0

	-- XÓA TÀI SẢN
	DELETE		TaiSan
	WHERE		CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0

	COMMIT TRANSACTION TAISAN_DELETE
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION TAISAN_DELETE
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
	SELECT * FROM TaiSan WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetListNguyenGiaByTaiSanId]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetListTaiSanByCriteria]    Script Date: 9/7/2017 4:52:35 PM ******/
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
						 @SEARCH_STRING		=	N''
						,@SKIP				=	''
						,@TAKE				=	''
						,@OrderClause		=	'MAXCNT ASC'
						,@CoSoId			=	0
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
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 

	SET @SKIP = ISNULL(@SKIP, 0)
	SET @TAKE = ISNULL(@TAKE, 0)
	IF @TAKE = 0
		SET @TAKE = 10
	
	SET @CoSoId = ISNULL(@CoSoId, '')
	IF @CoSoId = ''
		SET @CoSoId = 0

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

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0022',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT


	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @OrderClause = ISNULL(@OrderClause, '')
	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT	COUNT(TS.TaiSanId) OVER () AS MAXCNT, TS.*,ISNULL(NG.NguyenGia,0) NguyenGia 
	FROM	TaiSan TS 
			LEFT JOIN (
				select		TaiSanId, SUM(GiaTri) NguyenGia
				from		NguyenGia
				GROUP BY	TaiSanId
			) NG ON TS.TaiSanId = NG.TaiSanId
	WHERE	1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @SEARCH_STRING <> ''
	SET @V_SQL = @V_SQL + ' AND (TS.MaTaiSan LIKE N''' +@SEARCH_STRING+ ''' OR TS.TenTaiSan LIKE  N''' +@SEARCH_STRING+ ''')';

	IF @SEARCH_MATAISAN <> ''
	SET @V_SQL = @V_SQL + ' AND (TS.MaTaiSan LIKE N''%' + @SEARCH_MATAISAN + '%'')';

	IF @SEARCH_TENTAISAN <> ''
	SET @V_SQL = @V_SQL + ' AND (TS.TenTaiSan LIKE N''%' +@SEARCH_TENTAISAN+ '%'')';

	IF @IS_VIEW_ALL = '0' AND @CoSoId <> ''
	BEGIN			 
			SET @V_SQL = @V_SQL + ' AND TS.CoSoId =''' + @CoSoId + ''' ';	  
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
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetTaiSanById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
CREATE PROCEDURE [dbo].[sp_TaiSan_GetTaiSanById]
	 @TaiSanId			INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	TS.*
	FROM	TaiSan TS
	WHERE	TaiSanId = @TaiSanId
SET NOCOUNT OFF
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_GetTaiSanByMa]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_InsertTaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
						,@NgayGhiTang		=	'2018-08-31'
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
    ,@NgayGhiTang		DATETIME		=	NULL
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
	SET	@TaiSanId	=	ISNULL(@TaiSanId, 0)
	SET	@NgayTao	=	ISNULL(@NgayTao, GETDATE())
	SET	@CtrVersion	=	ISNULL(@CtrVersion, 1)
	SET	@NhanVienId	=	ISNULL(@NhanVienId, 0)
	SET @NguoiTao	=	ISNULL(@NguoiTao, @NhanVienId)

BEGIN TRANSACTION TAISAN_INSERT
BEGIN TRY
	-- INSERT DỮ LIỆU
	INSERT INTO TaiSan	(	MaTaiSan	,TenTaiSan	,DonViTinh	,LoaiId		,PhuongThucId	,NamSanXuat		,NuocSanXuatId	,HangSanXuatId	,SoQDTC		,NhanHieu	,DuAnId		,NgayMua	,NgayGhiTang	,NgayBDHaoMon	,SoNamSuDung	,TyLeHaoMon		,HaoMonLuyKe	,NgayBDKhauHao	,KyTinhKhauHao	,GiaTriKhauHao	,SoKyKhauHao	,TyLeKhauHao	,KhauHaoLuyKe	,LoaiKeKhai		,CoSoId		,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES				(	@MaTaiSan	,@TenTaiSan	,@DonViTinh	,@LoaiId	,@PhuongThucId	,@NamSanXuat	,@NuocSanXuatId	,@HangSanXuatId	,@SoQDTC	,@NhanHieu	,@DuAnId	,@NgayMua	,@NgayGhiTang	,@NgayBDHaoMon	,@SoNamSuDung	,@TyLeHaoMon	,@HaoMonLuyKe	,@NgayBDKhauHao	,@KyTinhKhauHao	,@GiaTriKhauHao	,@SoKyKhauHao	,@TyLeKhauHao	,@KhauHaoLuyKe	,@LoaiKeKhai	,@CoSoId	,@NguoiTao	,@NgayTao	,@CtrVersion	)

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
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_UpdateTaiSan]    Script Date: 9/7/2017 4:52:35 PM ******/
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
						,@MaTaiSan			=	'test'
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
						,@NgayGhiTang		=	'2018-08-31'
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
    ,@NgayGhiTang		DATETIME		=	NULL
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
	DECLARE	@V_CTRVERSION	INT		=	NULL
			,@V_ERROR		BIT		=	0
	-- INPUT DEFAULT
	SET	@CtrVersion	=	ISNULL(@CtrVersion, '')
	IF @CtrVersion = ''
		SET	@CtrVersion	=	-1

	-- KIỂM TRA @CtrVersion
	SET @V_CTRVERSION = (SELECT CtrVersion FROM TaiSan WHERE TaiSanId = @TaiSanId)
	IF @V_ERROR = 0 AND @V_CTRVERSION <> @CtrVersion
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người thay đổi thông tin'
		SET @V_ERROR = 1
	END

	IF @V_ERROR = 1
	BEGIN
		SELECT * FROM TaiSan WHERE TaiSanId = @TaiSanId
		RETURN
	END

BEGIN TRANSACTION TAISAN_UPDATE
BEGIN TRY
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
			,NgayGhiTang	=	@NgayGhiTang
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

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM TaiSan WHERE TaiSanId = @TaiSanId

	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinCongKhai_GetThongTinCongKhaiById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_ThongTinCongKhai_InsertThongTinCongKhai]    Script Date: 9/7/2017 4:52:35 PM ******/
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

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM ThongTinCongKhai WHERE TaiSanId = @TaiSanId
	SET NOCOUNT OFF;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiDat_GetThongTinKeKhaiDatById]    Script Date: 9/7/2017 4:52:35 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_ThongTinKeKhaiDat_InsertThongTinKeKhaiDat]    Script Date: 9/7/2017 4:52:35 PM ******/
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
USE [master]
GO
ALTER DATABASE [QLTS] SET  READ_WRITE 
GO
