using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using SongAn.QLDN.Api.QLDNAPI.Formats;
using SongAn.QLDN.Api.QLDNAPI.Providers;
using QLDNAPI;
using System.Configuration;

[assembly: OwinStartup(typeof(SongAn.QLDN.Api.QLDNAPI.Startup))]

namespace SongAn.QLDN.Api.QLDNAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            // Web API routes
            //config.MapHttpAttributeRoutes();

            WebApiConfig.Register(config);

            ConfigureOAuth(app);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(config);

        }

        public void ConfigureOAuth(IAppBuilder app)
        {

            var issuer = ConfigurationManager.AppSettings["issuer"];
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var AccessTokenExpireTimeSpan = 30.0;

            double.TryParse(ConfigurationManager.AppSettings["AccessTokenExpireTimeSpan"], out AccessTokenExpireTimeSpan);

            var audience = ConfigurationManager.AppSettings["audience"];
            var secret = TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["secret"]);

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                //For Dev enviroment only (on production should be AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString(endpoint),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(AccessTokenExpireTimeSpan),
                Provider = new CustomOAuthProvider(),
                AccessTokenFormat = new CustomJwtFormat(issuer),
                //RefreshTokenProvider = 
            };

            // OAuth 2.0 Bearer Access Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);

            // Api controllers with an [Authorize] attribute will be validated with JWT
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    //TokenValidationParameters = tvps,
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audience },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
                    }
                });

        }
    }
}
