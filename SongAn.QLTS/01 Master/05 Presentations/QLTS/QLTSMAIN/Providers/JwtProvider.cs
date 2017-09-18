using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.UI.QLTSMAIN.Providers
{
    public class JwtProvider
    {
        private static string _tokenUri;

        //default constructor
        public JwtProvider() { }

        public static JwtProvider Create(string tokenUri)
        {
            _tokenUri = tokenUri;
            return new JwtProvider();
        }

        public async Task<string> GetTokenAsync(string username, string password, string clientId, string deviceId)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_tokenUri);
                client.DefaultRequestHeaders.Accept
                    .Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new FormUrlEncodedContent(new[]
                {
                        new KeyValuePair<string, string>("username", username),
                        new KeyValuePair<string, string>("password", password),
                        new KeyValuePair<string, string>("grant_type", "password"),
                        new KeyValuePair<string, string>("device_id", deviceId),
                        new KeyValuePair<string, string>("client_id", clientId),
                    });
                var response = await client.PostAsync(string.Empty, content);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else if(response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    //return null if unauthenticated
                    var result = await response.Content.ReadAsStringAsync();
                    return result;
                }else { return null; }
            }
        }

        public JObject DecodePayload(string token)
        {
            var parts = token.Split('.');
            var payload = parts[1];

            var payloadJson = Encoding.UTF8.GetString(Base64UrlDecode(payload));
            return JObject.Parse(payloadJson);
        }

        //public ClaimsIdentity CreateIdentity(bool isAuthenticated, string userName, dynamic payload)
        //{
        //    //decode the payload from token
        //    //in order to create a claim            
        //    string userId = payload.unique_name;
        //    string[] roles = payload.role.ToObject(typeof(string[]));

        //    var jwtIdentity = new ClaimsIdentity(new JwtIdentity(
        //        isAuthenticated, userName, DefaultAuthenticationTypes.ApplicationCookie
        //            ));

        //    //add user id
        //    jwtIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, userId));
        //    //add roles
        //    foreach (var role in roles)
        //    {
        //        jwtIdentity.AddClaim(new Claim(ClaimTypes.Role, role));
        //    }

        //    return jwtIdentity;
        //}

        private byte[] Base64UrlDecode(string input)
        {
            var output = input;
            output = output.Replace('-', '+'); // 62nd char of encoding
            output = output.Replace('_', '/'); // 63rd char of encoding
            switch (output.Length % 4) // Pad with trailing '='s
            {
                case 0: break; // No pad chars in this case
                case 2: output += "=="; break; // Two pad chars
                case 3: output += "="; break; // One pad char
                default: throw new System.Exception("Illegal base64url string!");
            }
            var converted = Convert.FromBase64String(output); // Standard base64 decoder
            return converted;
        }
    }
}