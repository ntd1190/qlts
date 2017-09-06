USE [master]
GO
/****** Object:  Database [QLTS_MAIN]    Script Date: 9/5/2017 4:55:28 PM ******/
CREATE DATABASE [QLTS_MAIN]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLTS_MAIN', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QLTS_MAIN.mdf' , SIZE = 20480KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QLTS_MAIN_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QLTS_MAIN_log.ldf' , SIZE = 10240KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [QLTS_MAIN] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QLTS_MAIN].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QLTS_MAIN] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET ARITHABORT OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QLTS_MAIN] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QLTS_MAIN] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QLTS_MAIN] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QLTS_MAIN] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET RECOVERY FULL 
GO
ALTER DATABASE [QLTS_MAIN] SET  MULTI_USER 
GO
ALTER DATABASE [QLTS_MAIN] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QLTS_MAIN] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QLTS_MAIN] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QLTS_MAIN] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [QLTS_MAIN] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'QLTS_MAIN', N'ON'
GO
USE [QLTS_MAIN]
GO
/****** Object:  Table [dbo].[CauHinhForm]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CauHinhForm](
	[CauHinhFormId] [int] IDENTITY(1,1) NOT NULL,
	[MaForm] [nvarchar](64) NOT NULL,
	[TenForm] [nvarchar](128) NOT NULL,
	[ChoPhepInYN] [bit] NULL,
	[ChoPhepXuatPdfYN] [bit] NULL,
	[KhoGiayIn] [varchar](8) NULL,
	[MoTa] [nvarchar](256) NULL,
	[TieuDe] [nvarchar](128) NULL,
	[ChoPhepSapXepYN] [bit] NULL,
	[TieuDeRex] [nvarchar](16) NULL,
	[NgayTaoDT] [datetime] NULL,
	[NgaySuaDT] [datetime] NULL,
	[NguoiTao] [nvarchar](128) NULL,
	[NguoiSua] [nvarchar](128) NULL,
	[CtrVersion] [int] NOT NULL,
 CONSTRAINT [PK_CauHinhForm_1] PRIMARY KEY CLUSTERED 
(
	[CauHinhFormId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CauHinhFormCot]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CauHinhFormCot](
	[CauHinhFormCotId] [int] IDENTITY(1,1) NOT NULL,
	[MaForm] [nvarchar](64) NOT NULL,
	[MaCot] [nvarchar](64) NOT NULL,
	[TenCot] [nvarchar](128) NULL,
	[TenCotMacDinh] [nvarchar](128) NULL,
	[HienThiYN] [bit] NOT NULL,
	[MacDinhYN] [bit] NOT NULL,
	[LaCongThucYN] [bit] NOT NULL,
	[CongThuc] [nvarchar](1024) NULL,
	[CauSapXep] [nvarchar](64) NULL,
	[MoTa] [nvarchar](128) NULL,
	[DoRong] [int] NULL,
	[CauSelect] [nvarchar](256) NULL,
	[ThuTu] [smallint] NULL,
	[TenCotMacDinhRex] [nvarchar](16) NULL,
	[NgayTaoDT] [datetime] NULL,
	[NgaySuaDT] [datetime] NULL,
	[NguoiTao] [nvarchar](128) NULL,
	[NguoiSua] [nvarchar](128) NULL,
	[CtrVersion] [int] NOT NULL,
 CONSTRAINT [PK_CauHinhForm_Cot_1] PRIMARY KEY CLUSTERED 
(
	[CauHinhFormCotId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CauHinhHeThong]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CauHinhHeThong](
	[CauHinhHeThongId] [int] IDENTITY(1,1) NOT NULL,
	[MaCauHinhHeThong] [nvarchar](64) NOT NULL,
	[GiaTri] [nvarchar](256) NOT NULL,
	[MoTa] [nvarchar](256) NULL,
	[ThuocNhom] [nvarchar](64) NULL,
	[DSMaVaiTro] [nvarchar](1024) NULL,
	[ThuTu] [smallint] NULL,
	[NgayTaoDT] [datetime] NULL,
	[NgaySuaDT] [datetime] NULL,
	[NguoiTao] [nvarchar](128) NULL,
	[NguoiSua] [nvarchar](128) NULL,
	[CtrVersion] [int] NOT NULL,
 CONSTRAINT [PK_CauHinhHeThong_1] PRIMARY KEY CLUSTERED 
(
	[CauHinhHeThongId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ChucNang]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChucNang](
	[ChucNangId] [int] IDENTITY(1,1) NOT NULL,
	[MaChucNang] [nvarchar](64) NOT NULL,
	[TenChucNang] [nvarchar](128) NULL,
	[MoTa] [nvarchar](256) NULL,
	[DSQuyen] [nvarchar](128) NULL,
	[DuongDan] [nvarchar](128) NULL,
	[ThuTu] [smallint] NULL,
	[SuperLevel] [int] NULL,
	[MidLevel] [nchar](10) NULL,
	[Icon] [nvarchar](64) NULL,
	[KhoaYN] [bit] NOT NULL CONSTRAINT [DF_ChucNang_Khoa]  DEFAULT ((0)),
	[TenChucNangRex] [nvarchar](16) NULL,
	[NgayTaoDT] [datetime] NULL CONSTRAINT [DF_ChucNang_NgayTao]  DEFAULT (getdate()),
	[NgaySuaDT] [datetime] NULL CONSTRAINT [DF_ChucNang_NgaySua]  DEFAULT (getdate()),
	[NguoiTao] [nvarchar](128) NULL,
	[NguoiSua] [nvarchar](128) NULL,
	[CtrVersion] [int] NOT NULL CONSTRAINT [DF__ChucNang__ctr_ve__3D2915A8]  DEFAULT ((0)),
 CONSTRAINT [PK_ChucNang_1] PRIMARY KEY CLUSTERED 
(
	[ChucNangId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Client]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[ClientId] [nvarchar](32) NOT NULL,
	[Base64Secret] [nvarchar](80) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ApplicationType] [int] NULL,
	[ActiveYN] [bit] NOT NULL CONSTRAINT [DF_Audience_BlockedYN]  DEFAULT ((1)),
	[RefreshTokenLifeTime] [int] NULL,
	[AllowedOrigin] [nvarchar](100) NULL,
	[Description] [nvarchar](256) NULL,
	[CtrVersion] [int] NOT NULL CONSTRAINT [DF_Audience_CtrVersion]  DEFAULT ((0)),
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NguoiDung]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDung](
	[NguoiDungId] [int] IDENTITY(1,1) NOT NULL,
	[MaNguoiDung] [nvarchar](64) NOT NULL,
	[Email] [nvarchar](128) NOT NULL,
	[EmailDaXacNhanYN] [bit] NOT NULL CONSTRAINT [DF_NguoiDung_EmailDaXacNhan]  DEFAULT ((0)),
	[PasswordHash] [nvarchar](256) NULL,
	[SecurityStamp] [nvarchar](256) NULL,
	[DienThoai] [nvarchar](256) NULL,
	[DienThoaiDaXacNhanYN] [bit] NOT NULL CONSTRAINT [DF_NguoiDung_DienThoaiDaXacNhan]  DEFAULT ((0)),
	[BaoMatHaiLopYN] [bit] NOT NULL CONSTRAINT [DF_NguoiDung_BaoMatHaiLop]  DEFAULT ((0)),
	[KhoaDen] [datetime] NULL,
	[KhoaYN] [bit] NOT NULL CONSTRAINT [DF_NguoiDung_Khoa]  DEFAULT ((0)),
	[LanDangNhapSai] [int] NOT NULL CONSTRAINT [DF_NguoiDung_LanDangNhapSai]  DEFAULT ((0)),
	[UserName] [nvarchar](128) NOT NULL,
	[VaiTroId] [int] NOT NULL,
	[HoTen] [nvarchar](128) NULL,
	[NhanVienId] [int] NULL,
	[CoSoId] [int] NULL,
	[NguoiTao] [nvarchar](128) NULL,
	[NgayTao] [datetime] NULL,
	[CtrVersion] [int] NOT NULL CONSTRAINT [DF__NguoiDung__ctr_v__46B27FE2]  DEFAULT ((0)),
 CONSTRAINT [PK_NguoiDung_1] PRIMARY KEY CLUSTERED 
(
	[NguoiDungId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuyenTacVu]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyenTacVu](
	[VaiTroId] [int] NOT NULL,
	[ChucNangId] [int] NOT NULL,
	[DSQuyenTacVu] [nvarchar](128) NULL,
 CONSTRAINT [PK_QuyenTacVu] PRIMARY KEY CLUSTERED 
(
	[VaiTroId] ASC,
	[ChucNangId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RefreshToken]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshToken](
	[RefreshTokenId] [nvarchar](32) NOT NULL,
	[Subject] [nvarchar](50) NOT NULL,
	[ClientId] [nvarchar](50) NOT NULL,
	[IssuedUtc] [datetime] NOT NULL,
	[ExpiresUtc] [datetime] NOT NULL,
	[ProtectedTicket] [nvarchar](100) NOT NULL,
	[CtrVersion] [int] NOT NULL,
 CONSTRAINT [PK_RefreshToken] PRIMARY KEY CLUSTERED 
(
	[RefreshTokenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[VaiTro]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTro](
	[VaiTroId] [int] IDENTITY(1,1) NOT NULL,
	[MaVaiTro] [nvarchar](64) NOT NULL,
	[TenVaiTro] [nvarchar](128) NOT NULL,
	[MoTa] [nvarchar](256) NULL,
	[KhoaYN] [bit] NOT NULL CONSTRAINT [DF_VaiTro_Khoa]  DEFAULT ((0)),
	[TenVaiTroRex] [nvarchar](16) NULL,
	[NgayTaoDT] [datetime] NULL CONSTRAINT [DF_Role_DateCreated]  DEFAULT (getdate()),
	[NgaySuaDT] [datetime] NULL CONSTRAINT [DF_Role_DateModified]  DEFAULT (getdate()),
	[NguoiTao] [nvarchar](128) NULL,
	[NguoiSua] [nvarchar](128) NULL,
	[CtrVersion] [int] NOT NULL CONSTRAINT [DF__VaiTro__ctr_vers__625A9A57]  DEFAULT ((0)),
 CONSTRAINT [PK_VaiTro_1] PRIMARY KEY CLUSTERED 
(
	[VaiTroId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[CauHinhFormCot] ON 

INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1, N'FL0009', N'MaNguoiDung', N'Mã người dùng', N'Mã người dùng', 1, 1, 0, NULL, NULL, NULL, NULL, N'a.MaNguoiDung', 70, NULL, NULL, NULL, NULL, NULL, 17)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (2, N'FL0009', N'HoTen', N'Người dùng', N'Người dùng', 1, 1, 0, NULL, NULL, NULL, NULL, N'a.HoTen', 70, NULL, NULL, NULL, NULL, NULL, 17)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (3, N'FL0009', N'TenNhanVien', N'Nhân viên', N'Nhân viên', 1, 1, 0, NULL, NULL, NULL, NULL, N'b.TenNhanVien', 70, NULL, NULL, NULL, NULL, NULL, 17)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (4, N'FL0009', N'Email', N'Email', N'Email', 1, 1, 0, NULL, NULL, NULL, NULL, N'a.Email', 70, NULL, NULL, NULL, NULL, NULL, 17)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (5, N'FL0009', N'DienThoai', N'Điện thoại', N'Điện thoại', 0, 1, 0, NULL, NULL, NULL, NULL, N'a.DienThoai', 70, NULL, NULL, NULL, NULL, NULL, 17)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (6, N'FL0009', N'TenVaiTro', N'Vai trò', N'Vai trò', 1, 1, 0, NULL, NULL, NULL, NULL, N'c.TenVaiTro', 70, NULL, NULL, NULL, NULL, NULL, 17)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (7, N'FL0009', N'NgayTao', N'Ngày tạo', N'Ngày tạo', 1, 1, 0, NULL, NULL, NULL, NULL, N'Convert(varchar(10),CONVERT(date,a.NgayTao,106),103) AS NgayTao', 70, NULL, NULL, NULL, NULL, NULL, 15)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (9, N'FL0018', N'SoPhieu', N'Số phiếu', N'Số phiếu', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.SoPhieu', 1, NULL, NULL, NULL, NULL, NULL, 32)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (10, N'FL0018', N'Ngay', N'Ngày lập', N'Ngày lập', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.NgayTao', 2, NULL, NULL, NULL, NULL, NULL, 32)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (11, N'FL0018', N'TenPhongBan', N'Bộ phận đề nghị', N'Bộ phận đề nghị', 1, 1, 0, NULL, NULL, NULL, NULL, N'PB.TenPhongBan', 3, NULL, NULL, NULL, NULL, NULL, 32)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (12, N'FL0018', N'NoiDung', N'Nội dung đề nghị', N'Nội dung', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.NoiDung', 4, NULL, NULL, NULL, NULL, NULL, 32)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (14, N'FL0018', N'TenPhanLoai', N'Phân loại', N'Phân loại', 0, 1, 0, NULL, NULL, NULL, NULL, N'PL.TenPhanLoai', 5, NULL, NULL, NULL, NULL, NULL, 32)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (15, N'FL0018', N'TenNhanVien', N'Người tạo', N'Người tạo', 0, 1, 0, NULL, NULL, NULL, NULL, N'nv.TenNhanVien', 6, NULL, NULL, NULL, NULL, NULL, 12)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (16, N'FL0018', N'NgayTao', N'Ngày tạo', N'Ngày tạo', 0, 1, 0, NULL, NULL, NULL, NULL, N'H.NgayTao', 7, NULL, NULL, NULL, NULL, NULL, 12)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1003, N'FL0019', N'SoChungTu', N'Số chứng từ', N'Số chứng từ', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.SoChungTu', 1, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1005, N'FL0019', N'NgayChungTu', N'Ngày chứng từ', N'Ngày chứng từ', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.NgayChungTu', 2, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1006, N'FL0019', N'NgayGhiTang', N'Ngày ghi tăng', N'Ngày ghi tăng', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.NgayGhiTang', 3, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1007, N'FL0019', N'NoiDung', N'Nội dung', N'Nội dung', 1, 1, 0, NULL, NULL, NULL, NULL, N'H.NoiDung', 4, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1008, N'FL0019', N'TongNguyenGia', N'Tổng nguyên giá', N'Tổng nguyên giá', 1, 1, 0, NULL, NULL, NULL, NULL, N'TongNguyenGia', 5, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1009, N'FL0019', N'TenNguoiTao', N'Người tạo', N'Người tạo', 0, 1, 0, NULL, NULL, NULL, NULL, N'H.TenNguoiTao', 6, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1010, N'FL0019', N'NgayTao', N'Ngày tạo', N'Ngày tạo', 0, 1, 0, NULL, NULL, NULL, NULL, N'H.NgayTao', 7, NULL, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[CauHinhFormCot] ([CauHinhFormCotId], [MaForm], [MaCot], [TenCot], [TenCotMacDinh], [HienThiYN], [MacDinhYN], [LaCongThucYN], [CongThuc], [CauSapXep], [MoTa], [DoRong], [CauSelect], [ThuTu], [TenCotMacDinhRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1012, N'FL0019', N'TenNguoiDuyet', N'Người duyệt', N'Người duyệt', 0, 1, 0, NULL, NULL, NULL, NULL, N'H.TenNguoiDuyet', 8, NULL, NULL, NULL, NULL, NULL, 5)
SET IDENTITY_INSERT [dbo].[CauHinhFormCot] OFF
SET IDENTITY_INSERT [dbo].[ChucNang] ON 

INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1, N'CN0001', N'Quản trị hệ thống', N'Quản trị hệ thống', N'V,N,D,M,A,View All', N'', 4, 1, NULL, N'fa fa-user-secret', 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (2, N'CN0002', N'Người dùng', N'Người dùng', N'V,N,D,M,A,View All', N'/QLTSMAIN/nguoidung/list', 1, NULL, N'1         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (3, N'CN0003', N'Vai trò', N'Quan Ly Vai Tro', N'V,N,D,M,A,View All', N'/QLTSMAIN/vaitro/list', 2, NULL, N'1         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (4, N'CN0004', N'Phòng ban', N'Danh sách phòng ban', N'V,N,D,M,A,View All', N'/QLTSMAIN/phongban/list', 7, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (5, N'CN0005', N'Nhân viên', N'Danh sách nhân viên', N'V,N,D,M,A,View All', N'/QLTSMAIN/nhanvien/list', 6, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1004, N'CN0006', N'Nhóm tài sản', N'Danh sách nhóm tài sản', N'V,N,D,M,A,View All', N'/QLTSMAIN/nhomtaisan/list', 2, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1005, N'CN0007', N'Loại tài sản', N'Danh sách loại tài sản', N'V,N,D,M,A,View All', N'/QLTSMAIN/loaitaisan/list', 3, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1006, N'CN0008', N'Nước sản xuất', N'Danh sách nước sản xuất', N'V,N,D,M,A,View All', N'/QLTSMAIN/nuocsanxuat/list', 4, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1007, N'CN0009', N'Hãng sản xuất', N'Danh sách hãng sản xuất', N'V,N,D,M,A,View All', N'/QLTSMAIN/hangsanxuat/list', 5, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1008, N'CN0010', N'Khách hàng', N'Danh sách Khách hàng', N'V,N,D,M,A,View All', N'/QLTSMAIN/khachhang/list', 8, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1009, N'CN0011', N'Nguồn ngân sách', N'Danh sách Nguồn ngân sách', N'V,N,D,M,A,View All', N'/QLTSMAIN/nguonngansach/list', 9, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1010, N'CN0012', N'Nhà cung cấp', N'Danh sách Nhà cung cấp', N'V,N,D,M,A,View All', N'/QLTSMAIN/nhacungcap/list', 10, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1011, N'CN0013', N'Kho tài sản', N'Danh sách Kho tài sản', N'V,N,D,M,A,View All', N'/QLTSMAIN/khotaisan/list', 13, NULL, N'3         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1012, N'CN0014', N'Dự án', N'Danh sách Dự án', N'V,N,D,M,A,View All', N'/QLTSMAIN/duan/list', 14, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1013, N'CN0015', N'Cơ sở', N'Danh sách Cơ sở', N'V,N,D,M,A,View All', N'/QLTSMAIN/coso/list', 15, NULL, N'2         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1014, N'CN0016', N'Khai báo danh mục', N'Khai báo danh mục', N'V,N,D,M,A,View All', N'', 1, 2, NULL, N'fa fa-list', 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1015, N'CN0017', N'Tài sản lâu bền', N'Tài sản lâu bền', N'V,N,D,M,A,View All', N'', 3, 3, NULL, N'fa fa-cubes', 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1017, N'CN0018', N'Phân quyền', N'Phân quyền', N'V,N,D,M,A,View All', N'/QLTSMAIN/phanquyen/list', 3, NULL, N'1         ', NULL, 0, NULL, CAST(N'2017-06-13 15:53:22.817' AS DateTime), CAST(N'2017-06-13 15:53:22.817' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1018, N'CN0019', N'Đề nghị trang cấp', N'Đề nghị trang cấp', N'V,N,D,M,A,View All', N'/QLTSMAIN/denghitrangcap/list', 3, NULL, N'4         ', NULL, 0, NULL, CAST(N'2017-08-29 08:09:31.550' AS DateTime), CAST(N'2017-08-29 08:09:31.550' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1019, N'CN0020', N'Tài sản cố định', N'Tài sản cố định', N'V,N,D,M,A,View All', NULL, 2, 4, NULL, N'fa fa-hospital-o', 0, NULL, CAST(N'2017-08-29 08:09:31.550' AS DateTime), CAST(N'2017-08-29 08:09:31.550' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1020, N'CN0021', N'Kê hoạch mua sắm', N'Kê hoạch mua sắm', N'V,N,D,M,A,View All', N'/QLTSMAIN/kehoachmuasam/list', 1, NULL, N'4         ', NULL, 0, NULL, CAST(N'2017-08-29 08:09:31.550' AS DateTime), CAST(N'2017-08-29 08:09:31.550' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1021, N'CN0022', N'Danh mục tài sản', N'Danh mục tài sản', N'V,N,D,M,A,View All', N'/QLTSMAIN/taisan/list', 2, NULL, N'4         ', NULL, 0, NULL, CAST(N'2017-08-29 08:09:31.550' AS DateTime), CAST(N'2017-08-29 08:09:31.550' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (2004, N'CN0023', N'Ghi giảm', N'Ghi giảm', N'V,N,D,M,A,View All', N'/QLTSMAIN/ghigiam/list', 3, NULL, N'4         ', NULL, 0, NULL, CAST(N'2017-08-29 08:09:31.550' AS DateTime), CAST(N'2017-08-29 08:09:31.550' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[ChucNang] ([ChucNangId], [MaChucNang], [TenChucNang], [MoTa], [DSQuyen], [DuongDan], [ThuTu], [SuperLevel], [MidLevel], [Icon], [KhoaYN], [TenChucNangRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (2005, N'CN0024', N'Ghi tăng', N'Ghi tăng', N'V,N,D,M,A,View All', N'/QLTSMAIN/ghitang/list', 4, NULL, N'4         ', NULL, 0, NULL, CAST(N'2017-09-05 11:41:44.427' AS DateTime), CAST(N'2017-09-05 11:41:44.427' AS DateTime), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[ChucNang] OFF
INSERT [dbo].[Client] ([ClientId], [Base64Secret], [Name], [ApplicationType], [ActiveYN], [RefreshTokenLifeTime], [AllowedOrigin], [Description], [CtrVersion]) VALUES (N'33ecac27c905425eb81595dc0d54684d', N't9mT2uuQvXREm5KW42W_6mZVCUwjWBjWZyNtAqoDlJ4', N'web api', 1, 1, 60, N'*', N'abc', 1)
SET IDENTITY_INSERT [dbo].[NguoiDung] ON 

INSERT [dbo].[NguoiDung] ([NguoiDungId], [MaNguoiDung], [Email], [EmailDaXacNhanYN], [PasswordHash], [SecurityStamp], [DienThoai], [DienThoaiDaXacNhanYN], [BaoMatHaiLopYN], [KhoaDen], [KhoaYN], [LanDangNhapSai], [UserName], [VaiTroId], [HoTen], [NhanVienId], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (3, N'ND0016', N'ngoctan@ehis.vn', 0, N'89aa1e580023722db67646e8149eb246c748e180e34a1cf679ab0b41a416d904', N'123456', N'2', 0, 0, CAST(N'2017-05-11 11:41:15.080' AS DateTime), 0, 0, N'Tân Nguyễn', 1, N'Tân Nguyễn', 3, 1, N'Hung', NULL, 9)
INSERT [dbo].[NguoiDung] ([NguoiDungId], [MaNguoiDung], [Email], [EmailDaXacNhanYN], [PasswordHash], [SecurityStamp], [DienThoai], [DienThoaiDaXacNhanYN], [BaoMatHaiLopYN], [KhoaDen], [KhoaYN], [LanDangNhapSai], [UserName], [VaiTroId], [HoTen], [NhanVienId], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (9, N'songan', N'songan@ehis.vn', 0, N'89aa1e580023722db67646e8149eb246c748e180e34a1cf679ab0b41a416d904', NULL, NULL, 0, 0, NULL, 0, 0, N'songan@ehis.vn', 7, N'songan', 4, 1, N'3', CAST(N'2017-08-23 15:50:26.830' AS DateTime), 1)
INSERT [dbo].[NguoiDung] ([NguoiDungId], [MaNguoiDung], [Email], [EmailDaXacNhanYN], [PasswordHash], [SecurityStamp], [DienThoai], [DienThoaiDaXacNhanYN], [BaoMatHaiLopYN], [KhoaDen], [KhoaYN], [LanDangNhapSai], [UserName], [VaiTroId], [HoTen], [NhanVienId], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (10, N'ND0018', N'tiendat@ehis.vn', 0, N'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae', NULL, NULL, 0, 0, NULL, 0, 0, N'tiendat@ehis.vn', 1, N'Nguyễn Tiến Đạt', 7, 1, N'3', CAST(N'2017-08-28 09:53:07.573' AS DateTime), 2)
INSERT [dbo].[NguoiDung] ([NguoiDungId], [MaNguoiDung], [Email], [EmailDaXacNhanYN], [PasswordHash], [SecurityStamp], [DienThoai], [DienThoaiDaXacNhanYN], [BaoMatHaiLopYN], [KhoaDen], [KhoaYN], [LanDangNhapSai], [UserName], [VaiTroId], [HoTen], [NhanVienId], [CoSoId], [NguoiTao], [NgayTao], [CtrVersion]) VALUES (11, N'ND001', N'thanhbinh@ehis.vn', 0, N'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', NULL, NULL, 0, 0, NULL, 0, 0, N'thanhbinh@ehis.vn', 1, N'Nguyễn Thanh Bình', 6, 1, N'3', CAST(N'2017-08-28 09:52:08.823' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[NguoiDung] OFF
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 2, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 3, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 4, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 5, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1004, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1005, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1006, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1007, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1008, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1009, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1010, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1011, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1012, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1013, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1014, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1015, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1017, N'V,N,D,M,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1018, N'V,N,D,M,A,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1020, N'V,N,D,M,A,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 1021, N'V,N,D,M,A,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (1, 2005, N'V,N,D,M,A,View All')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (7, 2, NULL)
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (7, 1004, N'V')
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (7, 1007, NULL)
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (7, 1013, NULL)
INSERT [dbo].[QuyenTacVu] ([VaiTroId], [ChucNangId], [DSQuyenTacVu]) VALUES (7, 1017, NULL)
SET IDENTITY_INSERT [dbo].[VaiTro] ON 

INSERT [dbo].[VaiTro] ([VaiTroId], [MaVaiTro], [TenVaiTro], [MoTa], [KhoaYN], [TenVaiTroRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (1, N'AdminHeThong', N'Quản trị hệ thống', N'Quản trị hệ thống', 0, NULL, CAST(N'2017-01-01 00:00:00.000' AS DateTime), CAST(N'2017-06-17 10:47:29.027' AS DateTime), N'hung', N'hung', 2)
INSERT [dbo].[VaiTro] ([VaiTroId], [MaVaiTro], [TenVaiTro], [MoTa], [KhoaYN], [TenVaiTroRex], [NgayTaoDT], [NgaySuaDT], [NguoiTao], [NguoiSua], [CtrVersion]) VALUES (7, N'Admin', N'Admin', N'Quản trị', 0, NULL, CAST(N'2017-08-23 15:44:15.820' AS DateTime), CAST(N'2017-08-23 15:44:15.820' AS DateTime), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[VaiTro] OFF
ALTER TABLE [dbo].[RefreshToken] ADD  CONSTRAINT [DF_RefreshToken_IssuedUtc]  DEFAULT (getdate()) FOR [IssuedUtc]
GO
ALTER TABLE [dbo].[RefreshToken] ADD  CONSTRAINT [DF_RefreshToken_ExpiresUtc]  DEFAULT (getdate()) FOR [ExpiresUtc]
GO
ALTER TABLE [dbo].[RefreshToken] ADD  CONSTRAINT [DF_RefreshToken_CtrVersion]  DEFAULT ((0)) FOR [CtrVersion]
GO
ALTER TABLE [dbo].[QuyenTacVu]  WITH CHECK ADD  CONSTRAINT [FK_QuyenTacVu_ChucNang] FOREIGN KEY([ChucNangId])
REFERENCES [dbo].[ChucNang] ([ChucNangId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[QuyenTacVu] CHECK CONSTRAINT [FK_QuyenTacVu_ChucNang]
GO
ALTER TABLE [dbo].[QuyenTacVu]  WITH CHECK ADD  CONSTRAINT [FK_QuyenTacVu_VaiTro] FOREIGN KEY([VaiTroId])
REFERENCES [dbo].[VaiTro] ([VaiTroId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[QuyenTacVu] CHECK CONSTRAINT [FK_QuyenTacVu_VaiTro]
GO
/****** Object:  StoredProcedure [dbo].[csp_LayDanhSach_QuyenTacVuBangVaiTroId]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : Lay Danh Sach Quyen Tac Vu voi VaiTroId
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
CREATE PROCEDURE [dbo].[csp_LayDanhSach_QuyenTacVuBangVaiTroId]
@VaiTroId int
AS
-- selects all rows from the table
SELECT 
VT.VaiTroId
,[MaVaiTro]
,MaChucNang
,QTV.DSQuyenTacVu
FROM [dbo].[VaiTro] VT
inner join [dbo].[QuyenTacVu] QTV on VT.VaiTroId = QTV.VaiTroId
inner join [dbo].[ChucNang] CN on CN.ChucNangId = QTV.ChucNangId
WHERE 
VT.VaiTroId = @VaiTroId








GO
/****** Object:  StoredProcedure [dbo].[Helper_CreatePocoFromTableName]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
EXEC [dbo].[Helper_CreatePocoFromTableName] @tableName = 'NguoiDung'
*/

CREATE PROCEDURE [dbo].[Helper_CreatePocoFromTableName]    
    @tableName varchar(100)
AS
BEGIN
SET NOCOUNT ON
DECLARE @tbl as varchar(255)
SET @tbl = @tableName

DECLARE @flds as varchar(8000)
SET @flds=''

SELECT -1 as f0, 'public class ' + @tbl + ' {' as f1 into #tmp

INSERT #tmp
SELECT 
    ORDINAL_POSITION, 
    '    public ' + 
    CASE 
        WHEN DATA_TYPE = 'varchar' THEN 'string'
        WHEN DATA_TYPE = 'nvarchar' THEN 'string'
        WHEN DATA_TYPE = 'text' THEN 'string'
        WHEN DATA_TYPE = 'ntext' THEN 'string'
        WHEN DATA_TYPE = 'char' THEN 'string'
        WHEN DATA_TYPE = 'xml' THEN 'string'
        WHEN DATA_TYPE = 'datetime' AND IS_NULLABLE = 'NO' THEN 'DateTime'
        WHEN DATA_TYPE = 'datetime' AND IS_NULLABLE = 'YES' THEN 'DateTime?'
        WHEN DATA_TYPE = 'int' AND IS_NULLABLE = 'YES' THEN 'int?'
        WHEN DATA_TYPE = 'int' AND IS_NULLABLE = 'NO' THEN 'int'
        WHEN DATA_TYPE = 'smallint' AND IS_NULLABLE = 'NO' THEN 'Int16'
        WHEN DATA_TYPE = 'smallint' AND IS_NULLABLE = 'YES' THEN 'Int16?'
        WHEN DATA_TYPE = 'decimal' AND IS_NULLABLE = 'NO' THEN 'decimal'
        WHEN DATA_TYPE = 'decimal' AND IS_NULLABLE = 'YES' THEN 'decimal?'
        WHEN DATA_TYPE = 'numeric' AND IS_NULLABLE = 'NO' THEN 'decimal'
        WHEN DATA_TYPE = 'numeric' AND IS_NULLABLE = 'YES' THEN 'decimal?'
        WHEN DATA_TYPE = 'money' AND IS_NULLABLE = 'NO' THEN 'decimal'
        WHEN DATA_TYPE = 'money' AND IS_NULLABLE = 'YES' THEN 'decimal?'
        WHEN DATA_TYPE = 'bigint' AND IS_NULLABLE = 'NO' THEN 'long'
        WHEN DATA_TYPE = 'bigint' AND IS_NULLABLE = 'YES' THEN 'long?'
        WHEN DATA_TYPE = 'tinyint' AND IS_NULLABLE = 'NO' THEN 'byte'
        WHEN DATA_TYPE = 'tinyint' AND IS_NULLABLE = 'YES' THEN 'byte?'
        WHEN DATA_TYPE = 'timestamp' THEN 'byte[]'
        WHEN DATA_TYPE = 'varbinary' THEN 'byte[]'
        WHEN DATA_TYPE = 'bit' AND IS_NULLABLE = 'NO' THEN 'bool'
        WHEN DATA_TYPE = 'bit' AND IS_NULLABLE = 'YES' THEN 'bool?'
    END + ' ' + COLUMN_NAME + ' {get;set;}'
FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = @tbl

INSERT #tmp SELECT 999, '}'

SELECT @flds=@flds + f1 +'
' from #tmp order by f0

DROP TABLE #tmp

PRINT @flds
END








GO
/****** Object:  StoredProcedure [dbo].[sp_CauHinhFormCot_GetInfoByMaForm]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.04.18
2. Creator		: Tran Quoc Hung
3. Description	: Lấy CauSelect và CauSapXep theo MaForm
4. Function		: 
5. Example		: 
					Declare @MA_FORM VarChar(6) = 'FL0002';  
					Declare @FIELD VarChar(MAX) = '';  
					Declare @ORDER_CLAUSE VarChar(MAX) = '';  

					exec [QLTS_MAIN].dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
					@MA_FORM = @MA_FORM,
					@FIELD = @FIELD OUTPUT,
					@ORDER_CLAUSE = @ORDER_CLAUSE OUTPUT;

					select @MA_FORM,@FIELD,@ORDER_CLAUSE ;	

6. Precaution	:
7. History		:
				  2017.04.18(Tran Quoc Hung) - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_CauHinhFormCot_GetInfoByMaForm]
( 
	@MA_FORM			VarChar(6)					-- Mã Form
	, @FIELD			nvarchar(2000)	OUTPUT		-- Chuỗi các CauSelect trả về
	, @ORDER_CLAUSE		nvarchar(2000)	OUTPUT		-- Chuỗi các CauSapXep trả về

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD,'')

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE,'')
	----------
    
---- Xây dựng nội dung câu SQL  

select @FIELD = 
    case when @FIELD = ''
        then coalesce(CauSelect, '')
        else @FIELD + coalesce(',' + CauSelect, '')
    end
from CauHinhFormCot  WITH(NOLOCK, READUNCOMMITTED) 
where MaForm = @MA_FORM AND HienThiYN = 1;

select @ORDER_CLAUSE = 
    case when @ORDER_CLAUSE = ''
        then coalesce(CauSapXep, '')
        else @ORDER_CLAUSE + coalesce(',' + CauSapXep, '')
    end
from CauHinhFormCot  WITH(NOLOCK, READUNCOMMITTED) 
where MaForm = @MA_FORM;

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END





GO
/****** Object:  StoredProcedure [dbo].[sp_CauHinhFormCot_GetListCauHinhFormCotByCriteria]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.04.20
2. Creator		: Nguyen Thanh Binh
3. Description	: Lấy danh sách cột theo form
4. Function		: 
5. Example		: 
					EXEC	[dbo].[sp_CauHinhFormCot_GetListCauHinhFormCotByCriteria]
							@MA_FORM = N'FM0001',
							@SEARCH_STRING = N'',
							@FIELD = N'',
							@ORDER_CLAUSE = N'ThuTu asc',
							@SKIP = 0,
							@TAKE = 0
6. Precaution	:
7. History		:
				  2017.04.20(Nguyen Thanh Binh) - Tạo mới
				  2017.04.21(Nguyen Thanh Binh) - viết nội dung sp
*************************************************************/
CREATE PROC [dbo].[sp_CauHinhFormCot_GetListCauHinhFormCotByCriteria]
( 
	  @MA_FORM			varchar(10)			=	NULL		-- Mã Form
	, @SEARCH_STRING	nvarchar(2000)		=	NULL		-- Chuỗi tìm kiếm nhanh
	, @FIELD			nvarchar(2000)		=	NULL		-- danh sách column
	, @ORDER_CLAUSE		nvarchar(2000)		=	NULL		-- câu sắp xếp

	, @SKIP				int					=	NULL		-- Số dòng skip (để phân trang)
	, @TAKE				int					=	NULL		-- Số dòng take (để phân trang)

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000)
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) 

	SET @V_WHERE_CLAUSE = N' 1=1 ';

---- kiểm tra biến đầu vào
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
	SET @FIELD = '*';

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	

	-- Chuẩn bị biến @SKIP & @TAKE
	SET @SKIP = ISNULL(@SKIP, 0)

	SET @TAKE = ISNULL(@TAKE, 0)
	IF(@TAKE <= 0)
		SET @TAKE = 50

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE,'')

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = '
	SELECT COUNT(*) OVER () AS MAXCNT, ' + @FIELD + '
	FROM CauHinhFormCot FC WITH(NOLOCK, READUNCOMMITTED)
	'

---- Build Where clause
	-- Quick search
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (MaForm LIKE ''' + @V_SEARCH_STRING + ''' OR MaCot LIKE N''' + @V_SEARCH_STRING + ''' OR TenCot LIKE N''' + @SEARCH_STRING + ''' OR TenCotMacDinh LIKE N''' + @SEARCH_STRING + ''') '
	END
	
	-- lọc theo mã form
		IF @MA_FORM <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (MaForm = ''' + @MA_FORM + ''') '
	END

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

---- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

---- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

---- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)
---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END





GO
/****** Object:  StoredProcedure [dbo].[sp_Menu_GetListMenu]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_Menu_GetListMenu]
( 
	@UserId			VarChar(6)					-- Level
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

SELECT	TenChucNang,DuongDan,ThuTu,Icon,SuperLevel,MidLevel FROM ChucNang
where ChucNangId in (
select a.ChucNangId from QuyenTacVu a inner join NguoiDung b on a.VaiTroId=b.VaiTroId 
where b.NguoiDungId= @UserId and a.DSQuyenTacVu like 'V%'
union 
select ChucNangId from ChucNang where SuperLevel in (select c.MidLevel from QuyenTacVu a inner join NguoiDung b on a.VaiTroId=b.VaiTroId inner join ChucNang c on a.ChucNangId=c.ChucNangId
where b.NguoiDungId= @UserId and a.DSQuyenTacVu like 'V%')
)
order by ThuTu,SuperLevel 

SET NOCOUNT OFF
END




GO
/****** Object:  StoredProcedure [dbo].[sp_NguoiDung_GetListNguoiDungByCriteria]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLTSMAIN/NguoiDung/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_NguoiDung_GetListNguoiDungByCriteria]
( 
	@MA_FORM			    varchar(6)		= 'FL0009'			-- Mã Form
	, @FIELD			    nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @SEARCH_TUNGAY		nvarchar(500)	= null
	, @SEARCH_DENNGAY		nvarchar(500)	= null
	, @SEARCH_NHANVIEN		nvarchar(500)	= null
	, @SEARCH_VAITRO		nvarchar(500)	= null
	, @CoSoId				nvarchar(500)	= null
	, @ORDER_CLAUSE		nvarchar(500)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)

	, @SKIP				int				= null			-- Số dòng skip (để phân trang)
	, @TAKE				int				= null			-- Số dòng take (để phân trang)
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
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) = N' 1 = 1 ';
	DECLARE @V_FIELD NVARCHAR(4000) = ''
	DECLARE @V_ORDER_CLAUSE NVARCHAR(4000) = ''
	DECLARE @IS_VIEW_ALL varchar = '0'
	-- Chuẩn bị biến @MA_FORM
	SET @MA_FORM = ISNULL(@MA_FORM,'')
	----------

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD,'*')

	IF (@FIELD = '')
		SET @FIELD = '*';
	----------


	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = ' MAXCNT ';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';
	----------

	---- Gọi SP lấy thông tin Cấu Hình
	IF (@MA_FORM <> '')
	BEGIN
		exec QLTS_MAIN.dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
		@MA_FORM = @MA_FORM,
		@FIELD = @V_FIELD OUTPUT,
		@ORDER_CLAUSE = @V_ORDER_CLAUSE OUTPUT;

		IF (@FIELD = '*' AND @V_FIELD <> '')
		BEGIN
			SET @FIELD = @V_FIELD;
		END

		IF (@ORDER_CLAUSE = ' MAXCNT ' AND @V_ORDER_CLAUSE <> '')
		BEGIN
			SET @ORDER_CLAUSE = @V_ORDER_CLAUSE;
		END
	END

    ----------
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0004',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

		
	---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.NguoiDungId,a.CtrVersion, a.MaNguoiDung, a.Email, a.DienThoai,a.HoTen,b.TenNhanVien,c.TenVaiTro,Convert(varchar(10),CONVERT(date,a.NgayTao,106),103) AS NgayTao
	FROM NguoiDung a left join [QLTS].[DBO].NhanVien b on a.NhanVienId = b.NhanVienId 
	left join VaiTro c on c.VaiTroId=a.VaiTroId ';

	IF( @SEARCH_TUNGAY <> '' AND @SEARCH_DENNGAY <> '')
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and a.NgayTao BETWEEN  ''' + @SEARCH_TUNGAY + ''' AND '''+ @SEARCH_DENNGAY + '  ''';
	END
	ELSE IF @SEARCH_TUNGAY <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and  a.NgayTao >=  ''' + @SEARCH_TUNGAY + '  ''';
	END
	ELSE IF @SEARCH_DENNGAY <>''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and a.NgayTao <=  ''' + @SEARCH_DENNGAY + '  ''';
	END
		

	IF @SEARCH_NHANVIEN <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.NhanVienId in(' + @SEARCH_NHANVIEN + ') ' ;
	END

	IF @SEARCH_VAITRO<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' C.VaiTroId in(' + @SEARCH_VAITRO + ') ' ;
	END
	
		IF @IS_VIEW_ALL = '0' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	END
	-- Build Where clause	
	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
					

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE;

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS';

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY';

---- Thực thi câu SQL
	
	EXEC(@V_SQL);

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END




GO
/****** Object:  StoredProcedure [dbo].[sp_NguoiDung_GetListNguoiDungById]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLTSMAIN/NguoiDung/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_NguoiDung_GetListNguoiDungById]
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
	SELECT COUNT(*) OVER () AS MAXCNT,a.MaNguoiDung,a.NguoiDungId,a.HoTen,a.NhanVienId,a.Email,a.DienThoai,a.VaiTroId,b.TenNhanVien,b.MaNhanVien,c.TenVaiTro,a.CtrVersion
	FROM NguoiDung a left join [QLTS].[DBO].NhanVien b on a.NhanVienId = b.NhanVienId 
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




GO
/****** Object:  StoredProcedure [dbo].[sp_PhanQuyen_GetListChucNang]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*************************************************************  
1. Create Date	: 2017.03.30
2. Creator		: Nguyen Ngoc Tan
3. Description	: Lấy Quyền tác vụ theo MaChucNang và MaVaiTro
4. Function		: QLTSMAIN/NghiPhep/List
5. Example		: 
					exec [dbo].[sp_PhanQuyen_GetListChucNang]
					@VAITROID = 1, @LOAI=2
					
6. Precaution	:
7. History		:
				  2017.03.30(Nguyen Ngoc Tan) - Tạo mới
				  2017.07.08 (TAN) add more parameter @LOAI
*************************************************************/
CREATE PROC [dbo].[sp_PhanQuyen_GetListChucNang]
( 
	@VAITROID			int					-- VaiTroId
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước



		SELECT 	a.ChucNangId,a.MaChucNang,a.TenChucNang,a.DSQuyen,Isnull(b.DSQuyenTacVu,'') as DSQuyenTacVu,a.SuperLevel,a.MidLevel,a.Icon 
		FROM ChucNang a 
		LEFT JOIN QuyenTacVu b on a.ChucNangId=b.ChucNangId AND b.VaiTroId = @VAITROID
		LEFT JOIN VaiTro c on b.VaiTroId=c.VaiTroId
		ORDER BY a.ThuTu


---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END




GO
/****** Object:  StoredProcedure [dbo].[sp_PhanQuyen_GetListQuyenTacVuBangVaiTroId]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.03.30
2. Creator		: Tran Quoc Hung
3. Description	: Lấy Quyền tác vụ theo MaChucNang và MaVaiTro
4. Function		: QLTSMAIN/NghiPhep/List
5. Example		: 
					exec [dbo].[sp_PhanQuyen_GetListQuyenTacVuBangVaiTroId]
					@VAITROID = 1
					
6. Precaution	:
7. History		:
				  2017.03.30(Tran Quoc Hung) - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_PhanQuyen_GetListQuyenTacVuBangVaiTroId]
( 
	@VAITROID			int					-- VaiTroId
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước

   
---- Thực thi câu SQL
	SELECT 
	VT.VaiTroId
	,[MaVaiTro]
	,MaChucNang
	,QTV.DSQuyenTacVu
	FROM [dbo].[VaiTro] VT
	inner join [dbo].[QuyenTacVu] QTV on VT.VaiTroId = QTV.VaiTroId
	inner join [dbo].[ChucNang] CN on CN.ChucNangId = QTV.ChucNangId
	WHERE 
	VT.VaiTroId = @VAITROID
	

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END





GO
/****** Object:  StoredProcedure [dbo].[sp_PhanQuyen_GetQuyenTacVuByMaChucNangAndMaVaiTro]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.04.27
2. Creator		: Tran Quoc Hung
3. Description	: Lấy Quyền tác vụ theo MaChucNang và MaVaiTro
4. Function		: QLTSMAIN/NghiPhep/List
5. Example		: 
					exec [dbo].[sp_QuyenTacVu_GetByMaChucNangAndMaVaiTro]
					@MACHUCNANG = 'CN0006'
					,@MAVAITRO = 'Admin'

6. Precaution	:
7. History		:
				  2017.04.27(Tran Quoc Hung) - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_PhanQuyen_GetQuyenTacVuByMaChucNangAndMaVaiTro]
( 
	@MACHUCNANG			nvarchar(64)			-- Mã Chức Năng
	, @MAVAITRO			nvarchar(64)			-- Mã Vai trò

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước

	-- Chuẩn bị biến @MACHUCNANG
	SET @MACHUCNANG = ISNULL(@MACHUCNANG,'')

	-- Chuẩn bị biến @MAVAITRO
	SET @MAVAITRO = ISNULL(@MAVAITRO, '')

   
---- Thực thi câu SQL
	SELECT TOP 1
	VT.VaiTroId
	,[MaVaiTro]
	,MaChucNang
	,QTV.DSQuyenTacVu
	FROM [dbo].[VaiTro] VT WITH(NOLOCK, READUNCOMMITTED)
		inner join [dbo].[QuyenTacVu] QTV on VT.VaiTroId = QTV.VaiTroId
		inner join [dbo].[ChucNang] CN on CN.ChucNangId = QTV.ChucNangId
	WHERE 
	[MaVaiTro] = @MAVAITRO and MaChucNang = @MACHUCNANG
	

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END





GO
/****** Object:  StoredProcedure [dbo].[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*************************************************************  
1. Create Date	: 2017.05.18
2. Creator		: Văn Phú Hội
3. Description	: kiểm tra quyền theo chức năng
4. Function		: 
5. Example		: 
					

6. Precaution	:
7. History		:
				  2017.05.18(Văn Phú Hội) - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
( 
	@LOGINID			VARCHAR(50)		
	, @CHUC_NANG		VARCHAR(20)	
	, @QUYEN_TAC_VU		VARCHAR(200)
	, @YES_NO			VARCHAR(20)='0' OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  


	SELECT @YES_NO= COUNT(*)  
	FROM [QLTS_MAIN].DBO.QuyenTacVu q
	JOIN [QLTS_MAIN].DBO.NguoiDung n ON n.VaiTroId=q.VaiTroId 
	JOIN [QLTS_MAIN].DBO.ChucNang c ON q.ChucNangId=c.ChucNangId 
	WHERE n.CoSoId=@LOGINID AND c.MaChucNang=@CHUC_NANG AND q.DSQuyenTacVu LIKE '%'+@QUYEN_TAC_VU+'%'


-----------------------------------------------------
SET NOCOUNT OFF
END




GO
/****** Object:  StoredProcedure [dbo].[sp_VaiTro_SelectAllByCriteria]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

------------------------------------------------------------
-- Stored procedure generated by CodeTrigger
-- This script was generated on 3/26/2017 9:09:15 PM
------------------------------------------------------------
create PROCEDURE [dbo].[sp_VaiTro_SelectAllByCriteria]
@WhereClause varchar(500) = null
, @OrderClause varchar(500) = null
, @SkipClause varchar(50) = null
, @TakeClause varchar(50) = null
AS
-- selects all rows from the table according to search criteria
DECLARE @SQL VARCHAR(4000) 
SET @SQL = '
SELECT 
[VaiTroId],
[MaVaiTro],
[TenVaiTro],
[MoTa],
[KhoaYN],
[TenVaiTroRex],
[NgayTaoDT],
[NgaySuaDT],
[NguoiTao],
[NguoiSua],
[CtrVersion]
FROM [dbo].[VaiTro]
'
IF @WhereClause > ''
SET @SQL = @SQL + ' WHERE ' + @WhereClause
IF @OrderClause > ''
SET @SQL = @SQL + ' ORDER BY ' + @OrderClause
IF @SkipClause > ''
SET @SQL = @SQL + ' ' + @SkipClause
IF @TakeClause > ''
SET @SQL = @SQL + ' ' + @TakeClause
EXEC(@SQL)







GO
/****** Object:  StoredProcedure [dbo].[sp_VaiTro_SelectOne]    Script Date: 9/5/2017 4:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


------------------------------------------------------------
-- Stored procedure generated by CodeTrigger
-- This script was generated on 3/26/2017 9:09:15 PM
------------------------------------------------------------
create PROCEDURE [dbo].[sp_VaiTro_SelectOne]
@VaiTroId int
AS
-- selects all rows from the table
SELECT 
[VaiTroId]
,[MaVaiTro]
,[TenVaiTro]
,[MoTa]
,[KhoaYN]
,[TenVaiTroRex]
,[NgayTaoDT]
,[NgaySuaDT]
,[NguoiTao]
,[NguoiSua]
,[CtrVersion]
FROM [dbo].[VaiTro]
WHERE 
[VaiTroId] = @VaiTroId







GO
USE [master]
GO
ALTER DATABASE [QLTS_MAIN] SET  READ_WRITE 
GO
