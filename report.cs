WHILEPRINTINGRECORDS;   
GLOBAL NUMBERVAR CountNumber;   
CountNumber := CountNumber + 1;  


WHILEPRINTINGRECORDS;   
GLOBAL NUMBERVAR CountNumber;   
CountNumber := 0;   

whilereadingrecords;
stringvar array x := ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
numbervar i := i + 1;
stringvar y;
if i <= 26 then (
redim preserve x[i];
y := x[i]
);
y

whilereadingrecords;
stringvar array xx := ["I","II","III","IV","V","VI","VII","VII","VIII","IX","X"];
GLOBAL numbervar ii;
ii := ii + 1;
stringvar yy;
if ii <= 11 then (
redim preserve xx[ii];
yy := xx[ii]
);
yy

WHILEPRINTINGRECORDS;   
GLOBAL NUMBERVAR ii;   
ii := 0;   

'<p align="center"><b>' + {Tables.TenTaiSan} + '</b>' + '<br>' + 
"Hãng SX: " + {Tables.TenHangSanXuat} + '<br>' +
"Nước SX: " + {Tables.TenNuocSanXuat} + '<br>' +
"Người sử dụng: " + {Tables.TenNhanVien} + '</p>'