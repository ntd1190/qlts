
using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace VTSolution
{
    public class Util
    {
        public static string ReplaceSpecialCharacter(string input, string replaceString)
        {
            string[] specialChar = { "~", "`", "!", "@", "#", "$", "%", "&", "^", "*", "(", ")", "+", "=", "{", "}", "[", "]", ":", ";", "\"", "'", "|", "\\", "<", ",", ">", ".", "?", "/", "_", " " };
            //foreach (string s in specialChar)
            //{
            //    input = input.Replace(s, replaceString);
            //}
            //return input;
            return specialChar.Aggregate(input, (current, s) => current.Replace(s, replaceString));
        }
        private static readonly string[] VietnameseSigns = new string[]
        {
            "aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ","Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
        };
        public static string RemoveSignInVietnameseString(string str)
        {
            for (var i = 1; i < VietnameseSigns.Length; i++)
            {
                for (var j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }

            return str;
        }
        public static string GenerateUrl(string input)
        {

            return !string.IsNullOrEmpty(input)
                ? ReplaceSpecialCharacter(ConvertToUnsign3(input), "-").ToLower()
                : "no-title";
        }
        public static string ConvertToUnsign3(string str)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = str.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty)
                        .Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
        public static string GenerateUrl(string controller, string action)
        {
            return string.Format("/{0}/{1}", controller, action);
        }
        public static string GenerateUrl(string area, string controller, string action)
        {
            return string.Format("{0}/{1}/{2}", area, controller, action);
        }
        public static string GenerateRandomString(int length)
        {
            var r = new Random();
            string[] chars = { "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V",
                                         "W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m",
                                         "n","o","w","q","r","s","t","u","v","w","x","y","z"
                                     };
            var result = new StringBuilder();
            for (var i = 0; i < length; i++)
            {
                result.Append(chars[r.Next(62)]);
            }
            return result.ToString();
        }
        public static bool DownloadImage(string remoteUrl, string destPath)
        {
            var client = new WebClient();
            var result = false;
            try
            {
                client.DownloadFile(remoteUrl, destPath);
                result = true;
            }
            catch { }
            finally
            {
                client.Dispose();
            }
            return result;
        }
       
    }
}