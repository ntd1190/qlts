/*************************************************************  
1. Create Date	: 2017.06.21
2. Creator		: Van Phu Hoi
3. Description	: 
4. Function		: QLDNKHO/PhieuNhap/List
5. Example		: sp_KhoGetSoPhieu_Auto 	@LOAI_PHIEU='n', @SOPHIEU='', @LOGIN_ID='0'
6. Precaution	:
7. History		:
				  2017.06.21(HOI) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoGetSoPhieu_Auto]
	@LOAI_PHIEU CHAR(1)='N'		-- N: phieu nhap, X: phieu Xuat, C: phieu chuyen
	,@SOPHIEU VARCHAR(20) =NULL OUTPUT -- ma so phieu
	, @LOGIN_ID VARCHAR(20) ='0'
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
DECLARE @V_SOPHIEU VARCHAR(20)
DECLARE @V_DAY VARCHAR(2)
DECLARE @V_MONT VARCHAR(2)
DECLARE @V_YEAR VARCHAR(4)

SET @V_DAY = convert( VARCHAR(20), DATEPART( DAY,GETDATE()))
IF LEN(@V_DAY)=1
	SET @V_DAY= '0'+@V_DAY

SET @V_MONT = convert( VARCHAR(20), DATEPART( MONTH,GETDATE()))
IF LEN(@V_MONT)=1
	SET @V_MONT= '0'+@V_MONT

SET @V_YEAR = convert( VARCHAR(20), DATEPART( YEAR,GETDATE()))
SET @V_YEAR=substring(@V_YEAR,3,2)

IF @LOAI_PHIEU ='N'
BEGIN
	SET @V_SOPHIEU='NM'+ @V_DAY+@V_MONT+@V_YEAR

	SELECT @SOPHIEU = @V_SOPHIEU+'-'+ convert( varchar(20), max( cast(substring(SoPhieu,10,10) as int) +1))  
	FROM  KhoPhieuNhap  WITH(NOLOCK, READUNCOMMITTED)
	WHERE SoPhieu LIKE @V_SOPHIEU+'%'
END
ELSE IF @LOAI_PHIEU ='X'
BEGIN
	SET @V_SOPHIEU='XB'+ @V_DAY+@V_MONT+@V_YEAR

	SELECT @SOPHIEU= @V_SOPHIEU+'-'+ convert( varchar(20), max( cast(substring(SoPhieu,10,10) as int) +1))  
	FROM  KhoPhieuXuat WITH(NOLOCK, READUNCOMMITTED)
	WHERE SoPhieu LIKE @V_SOPHIEU+'%'
END
ELSE --IF @LOAI_PHIEU='C'
BEGIN
	SET @V_SOPHIEU='CK'+ @V_DAY+@V_MONT+@V_YEAR

	SELECT @SOPHIEU= @V_SOPHIEU+'-'+ convert( varchar(20), max( cast(substring(SoPhieu,10,10) as int) +1))  
	FROM  KhoPhieuChuyen WITH(NOLOCK, READUNCOMMITTED)
	WHERE SoPhieu LIKE @V_SOPHIEU+'%'
END

SET  @SOPHIEU = ISNULL(@SOPHIEU, @V_SOPHIEU+'-1')
select @SOPHIEU AS SOPHIEU

-----------------------------------------------------
SET NOCOUNT OFF
END


