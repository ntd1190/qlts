/*************************************************************  
1. Create Date	: 2017.04.18
2. Creator		: Tran Quoc Hung
3. Description	: Lấy CauSelect và CauSapXep theo MaForm
4. Function		: 
5. Example		: 
					Declare @MA_FORM VarChar(6) = 'FL0002';  
					Declare @FIELD VarChar(MAX) = '';  
					Declare @ORDER_CLAUSE VarChar(MAX) = '';  

					exec MSSQL_QLDN_MAIN.dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
					@MA_FORM = @MA_FORM,
					@FIELD = @FIELD OUTPUT,
					@ORDER_CLAUSE = @ORDER_CLAUSE OUTPUT;

					select @MA_FORM,@FIELD,@ORDER_CLAUSE ;	

6. Precaution	:
7. History		:
				  2017.04.18(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_CauHinhFormCot_GetInfoByMaForm]
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

