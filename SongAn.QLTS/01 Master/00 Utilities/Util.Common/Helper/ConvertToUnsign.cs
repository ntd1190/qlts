/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Nguyen Ngoc Tan
3. Function     :
4. Description  : Mot so ham helper dung trong action class
5. History      : 2017.04.15(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Net;
using System.Security.Cryptography;
using System.Text;
namespace SongAn.QLTS.Util.Common.Helper
{
    public static class ConvertToUnsign
    {
        public static string ConvertToUnsign2(string str)
        {
            string strFormD = str.Normalize(NormalizationForm.FormD);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < strFormD.Length; i++)
            {
                System.Globalization.UnicodeCategory uc =
                System.Globalization.CharUnicodeInfo.GetUnicodeCategory(strFormD[i]);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(strFormD[i]);
                }
            }
            sb = sb.Replace('Đ', 'D');
            sb = sb.Replace('đ', 'd');
            return (sb.ToString().Normalize(NormalizationForm.FormD));
        }
    }
}
