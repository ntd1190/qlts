using System;
using System.Globalization;

namespace SongAn.QLDN.Util.Common.Helper
{
    public class Protector
    {
        // Methods
        public static bool Bool(object value)
        {
            return Bool(value, false);
        }

        public static bool Bool(object value, bool defaultValue)
        {
            if (value != null)
            {
                bool.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static bool? Bool(object value, bool defaultValue, bool nullAble)
        {
            if (!nullAble)
            {
                return new bool?(Bool(value));
            }
            if (value == null)
            {
                return null;
            }
            if (!bool.TryParse(value.ToString(), out defaultValue))
            {
                return null;
            }
            return new bool?(defaultValue);
        }

        public static bool BoolByValue(object value)
        {
            return BoolByValue(value, false);
        }

        public static bool BoolByValue(object value, bool defaultValue)
        {
            if (value == null)
            {
                return defaultValue;
            }
            if (!Int(value, true).HasValue)
            {
                return defaultValue;
            }
            return (Int(value) == 1);
        }

        public static bool? BoolByValue(object value, bool defaultValue, bool nullAble)
        {
            if (!nullAble)
            {
                return new bool?(BoolByValue(value));
            }
            if (value == null)
            {
                return null;
            }
            if (!Int(value, true).HasValue)
            {
                return null;
            }
            return (Int(value) == 1);
        }

        public static byte Byte(object value)
        {
            return Byte(value, (byte)0);
        }

        public static byte? Byte(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new byte?(Byte(value));
            }
            if (value == null)
            {
                return null;
            }
            byte result = 0;
            if (!byte.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new byte?(result);
        }

        public static byte Byte(object value, byte defaultValue)
        {
            if (value != null)
            {
                byte.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static DateTime DateTime(object value)
        {
            return DateTime(value, new DateTime());
        }

        public static DateTime? DateTime(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new DateTime?(DateTime(value));
            }
            if (value == null)
            {
                return null;
            }
            DateTime result = new DateTime();
            if (!System.DateTime.TryParse(value.ToString(), out result))
            {
                return null;
            }
            if (result == System.DateTime.MinValue)
            {
                return null;
            }
            return new DateTime?(result);
        }

        public static DateTime DateTime(object value, DateTime defaultValue)
        {
            if (value != null)
            {
                System.DateTime.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static DateTime DateTime(object value, string format)
        {
            return DateTime(value, format, new DateTime());
        }

        public static DateTime? DateTime(object value, string format, bool nullAble)
        {
            if (!nullAble)
            {
                return new DateTime?(DateTime(value, format));
            }
            if (value == null)
            {
                return null;
            }
            DateTime result = new DateTime();
            if (!System.DateTime.TryParseExact(value.ToString(), format, null, DateTimeStyles.AllowWhiteSpaces, out result))
            {
                return null;
            }
            if (result == System.DateTime.MinValue)
            {
                return null;
            }
            return new DateTime?(result);
        }

        public static DateTime DateTime(object value, string format, DateTime defaultValue)
        {
            if (value != null)
            {
                System.DateTime.TryParseExact(value.ToString(), format, null, DateTimeStyles.AllowWhiteSpaces, out defaultValue);
            }
            return defaultValue;
        }

        public static decimal Decimal(object value)
        {
            return Decimal(value, (decimal)0M);
        }

        public static decimal? Decimal(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new decimal?(Decimal(value));
            }
            if (value == null)
            {
                return null;
            }
            decimal result = 0M;
            if (!decimal.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new decimal?(result);
        }

        public static decimal Decimal(object value, decimal defaultValue)
        {
            if (value != null)
            {
                decimal.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static double Double(object value)
        {
            return Double(value, (double)0.0);
        }

        public static double? Double(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new double?(Double(value));
            }
            if (value == null)
            {
                return null;
            }
            double result = 0.0;
            if (!double.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new double?(result);
        }

        public static double Double(object value, double defaultValue)
        {
            if (value != null)
            {
                double.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        internal static bool EnumTryParseByName<T>(string strType, ref T result)
        {
            string str = strType.Replace(' ', '_');
            if (Enum.IsDefined(typeof(T), str))
            {
                result = (T)Enum.Parse(typeof(T), str, true);
                return true;
            }
            foreach (string str2 in Enum.GetNames(typeof(T)))
            {
                if (str2.Equals(str, StringComparison.OrdinalIgnoreCase))
                {
                    result = (T)Enum.Parse(typeof(T), str2);
                    return true;
                }
            }
            return false;
        }

        internal static bool EnumTryParseByValue<T>(object value, ref T result)
        {
            foreach (int num in Enum.GetValues(typeof(T)))
            {
                if (num == Int(value, -1))
                {
                    string name = Enum.GetName(typeof(T), num);
                    result = (T)Enum.Parse(typeof(T), name);
                    return true;
                }
            }
            return false;
        }

        public static T EnumTypeByName<T>(object value)
        {
            return EnumTypeByName<T>(value, default(T));
        }

        public static T EnumTypeByName<T>(object value, T defaultValue)
        {
            if (value != null)
            {
                EnumTryParseByName<T>(value.ToString(), ref defaultValue);
            }
            return defaultValue;
        }

        public static T EnumTypeByValue<T>(object value)
        {
            return EnumTypeByValue<T>(value, default(T));
        }

        public static T EnumTypeByValue<T>(object value, T defaultValue)
        {
            EnumTryParseByValue<T>(value, ref defaultValue);
            return defaultValue;
        }

        public static int Int(object value)
        {
            return Int(value, 0);
        }

        public static int? Int(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new int?(Int(value));
            }
            if (value == null)
            {
                return null;
            }
            int result = 0;
            if (!int.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new int?(result);
        }

        public static int Int(object value, int defaultValue)
        {
            if (value != null)
            {
                int.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static long Long(object value)
        {
            return Long(value, (long)0L);
        }

        public static long? Long(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new long?(Long(value));
            }
            if (value == null)
            {
                return null;
            }
            long result = 0L;
            if (!long.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new long?(result);
        }

        public static long Long(object value, long defaultValue)
        {
            if (value != null)
            {
                long.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static object Object(object value, Type type, bool nullAble)
        {
            if ((value != null) && (value.GetType() == type))
            {
                return value;
            }
            if (!nullAble)
            {
                return Activator.CreateInstance(type);
            }
            return null;
        }

        public static short Short(object value)
        {
            return Short(value, (short)0);
        }

        public static short? Short(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new short?(Short(value));
            }
            if (value == null)
            {
                return null;
            }
            short result = 0;
            if (!short.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new short?(result);
        }

        public static short Short(object value, short defaultValue)
        {
            if (value != null)
            {
                short.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static string String(object value)
        {
            return String(value, string.Empty);
        }

        public static string String(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return String(value);
            }
            if (value == null)
            {
                return null;
            }
            string str = value.ToString().Trim();
            if (str == string.Empty)
            {
                return null;
            }
            return str;
        }

        public static string String(object value, string defaultValue)
        {
            if (value == null)
            {
                return defaultValue;
            }
            return value.ToString().Trim();
        }

        public static uint UInt(object value)
        {
            return UInt(value, (uint)0);
        }

        public static uint? UInt(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new uint?(UInt(value));
            }
            if (value == null)
            {
                return null;
            }
            uint result = 0;
            if (!uint.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new uint?(result);
        }

        public static uint UInt(object value, uint defaultValue)
        {
            if (value != null)
            {
                uint.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static ulong ULong(object value)
        {
            return ULong(value, (ulong)0L);
        }

        public static ulong? ULong(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new ulong?(ULong(value));
            }
            if (value == null)
            {
                return null;
            }
            ulong result = 0L;
            if (!ulong.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new ulong?(result);
        }

        public static ulong ULong(object value, ulong defaultValue)
        {
            if (value != null)
            {
                ulong.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }

        public static ushort UShort(object value)
        {
            return UShort(value, (ushort)0);
        }

        public static ushort? UShort(object value, bool nullAble)
        {
            if (!nullAble)
            {
                return new ushort?(UShort(value));
            }
            if (value == null)
            {
                return null;
            }
            ushort result = 0;
            if (!ushort.TryParse(value.ToString(), out result))
            {
                return null;
            }
            return new ushort?(result);
        }

        public static ushort UShort(object value, ushort defaultValue)
        {
            if (value != null)
            {
                ushort.TryParse(value.ToString(), out defaultValue);
            }
            return defaultValue;
        }
    }
}
