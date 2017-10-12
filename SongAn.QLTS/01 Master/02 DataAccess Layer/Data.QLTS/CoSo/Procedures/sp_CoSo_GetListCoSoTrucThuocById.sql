/**************************************************
1. Create Date	: 2017.10.12
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE  @MESSAGE		NVARCHAR(MAX)
							,@COSOID_OUT	NVARCHAR(MAX)

					EXEC [sp_CoSo_GetListCoSoTrucThuocById]
						 @COSOID		=	16
						,@COSOID_OUT	=	@COSOID_OUT	OUTPUT

					SELECT	@COSOID_OUT COSOID
6. Precaution	:
7. History		:
				  2017.10.12 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
( 
	 @COSOID		NVARCHAR(MAX)	=	NULL
	,@COSOID_OUT	NVARCHAR(MAX)		OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
--------------------------------------------------
	DECLARE @COSO TABLE (MAXCNT INT,CoSoId INT,TenCoSo NVARCHAR(MAX),TrucThuoc INT,COSOIDS VARCHAR(MAX))
	SET @COSOID = ISNULL(@COSOID,0)
	SET @COSOID_OUT = @COSOID

	WHILE 1 = 1
	BEGIN
		INSERT INTO @COSO (MAXCNT,CoSoId,TenCoSo,TrucThuoc,COSOIDS)
		select COUNT(CoSoId) OVER () AS MAXCNT,CoSoId,TenCoSo,TrucThuoc,@COSOID_OUT COSOIDS
		from ( 		SELECT		*
					FROM		CoSo
					where		charindex(','+cast(CoSoId as varchar(10))+',',','+@COSOID_OUT+',') > 0
		union		select		*
					from		CoSo
					where		charindex(','+cast(TrucThuoc as varchar(10))+',',','+@COSOID_OUT+',') > 0
					) Menu

		SET @COSOID_OUT = NULL
		SELECT @COSOID_OUT = COALESCE(@COSOID_OUT + ',', '') + cast(CoSoId as varchar(10))
		FROM @COSO

		IF @COSOID_OUT = cast(@COSOID as varchar(10)) OR @COSOID_OUT = (SELECT TOP 1 COSOIDS FROM @COSO)
		BEGIN
			BREAK
		END
		DELETE FROM @COSO
	END

	SET @COSOID_OUT = NULL
	SELECT @COSOID_OUT = COALESCE(@COSOID_OUT + ',', '') + cast(CoSoId as varchar(10))
	FROM @COSO
--------------------------------------------------
SET NOCOUNT OFF
END

