using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Util.Common.CustomException
{
    public class BaseException : System.Exception
    {
        public BaseException()
        {
        }

        public BaseException(string message)
        : base(message)
        {
        }

        public BaseException(string message, System.Exception inner)
        : base(message, inner)
        {
        }
    }
}
