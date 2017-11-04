
/*****************************************************************************
1. Create Date  : 2017.10.09
2. Creator      : HOI
3. Function     : QLDNKHO/KHOPHIEUBAOHANH/LIST
4. Description  : DANH SÁCH PHIẾU BẢO HÀNH
5. History      : 
*****************************************************************************/
using SongAn.QLDN.Biz.QLKho.KhoPhieuBaoHanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuBaoHanh
{
    public class sendEmailAction
    {

        #region PUBLIC
        public string phieuBaoHanhId { get; set; }
        public string email { get; set; }
        public string chiTietPhieuBaoHanh { get; set; }
        public string phieuBaoHanh { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        private int _phieuBaoHanhId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(loginId, 0);
            _phieuBaoHanhId = Protector.Int(phieuBaoHanhId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListKhoPhieuBaoHanhByIdBiz(context);
                biz.PHIEUBAOHANH_IDS = _phieuBaoHanhId.ToString();
                biz.LOGIN_ID = _LoginId;
                var result = await biz.Execute();

                if (result.Count() > 0)
                {
                    /*
                    foreach (IDictionary<string, object> row in result)
                    {
                        foreach (var pair in row)
                        {
                            Console.WriteLine("  {0} = {1}", pair.Key, pair.Value);
                        }
                    }   */             

                    System.Text.StringBuilder strBody = new System.Text.StringBuilder();

                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com", 587);
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Timeout = 10000;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    SmtpServer.UseDefaultCredentials = false;
                    SmtpServer.Credentials = new NetworkCredential("phuhoi@ehis.vn", "*837258*");

                    mail.From = new MailAddress("phuhoi@ehis.vn");
                    mail.To.Add(email);// "vanphuhoi@gmail.com");
                    mail.Subject = "Test Mail";

                    strBody.Append(phieuBaoHanh);
                    strBody.Append(chiTietPhieuBaoHanh);
                    mail.Body = strBody.ToString();

                    SmtpServer.Send(mail);
                }
                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region HELPERS

        #endregion
    }
}
