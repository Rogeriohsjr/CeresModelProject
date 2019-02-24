using System;

namespace Ceres.Model
{
    public class User
    {
        public Int32 Id { get; set; }
        public String Username { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public User()
        {
        }

        public User(Int32 pId)
        {
            this.Id = pId;
        }
    }
}