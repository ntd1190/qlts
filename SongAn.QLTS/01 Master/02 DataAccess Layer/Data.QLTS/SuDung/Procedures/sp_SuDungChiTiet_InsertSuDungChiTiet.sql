USE [QLTS]
GO


ALTER proc [dbo].[sp_SuDungChiTiet_InsertSuDungChiTiet]
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
