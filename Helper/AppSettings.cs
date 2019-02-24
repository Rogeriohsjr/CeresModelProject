// The app settings class contains properties defined in the appsettings.json file and is used for 
// accessing application settings via objects that injected into classes using the ASP.NET Core built 
// in dependency injection. For example the Users Controller accesses app settings via an 
// "IOptions<AppSettings> appSettings" object that is injected into the constructor.
namespace Ceres.Helper
{
    public class AppSettings
    {
        public string Secret { get; set; }
    }
}