using System;
using System.Collections.Generic;
using System.Linq;
using Ceres.Model;
using Ceres.Helper;
using Ceres.Controllers.DTO;
using System.Data.SqlClient;

namespace Ceres.Service
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User credential, string password);
        void Update(User credential, string password = null);
        void Delete(int id);
    }
 
    public class UserService : IUserService
    {
        private UserDAO _userDAO;
 
        public UserService(DataContext context)
        {
            _userDAO = new UserDAO(context);
        }
 
        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;
 
            var user = _userDAO.GetUserByUserName(username);
 
            // check if username exists
            if (user == null)
                return null;
 
            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
 
            // authentication successful
            return user;
        }
 
        public IEnumerable<User> GetAll()
        {
            return _userDAO.GetAll();
        }
 
        public User GetById(int id)
        {
            return _userDAO.GetById(id);
        }

        public User Create(User pUser, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");
 
            if (_userDAO.GetUserByUserName(pUser.Username) != null)
                throw new AppException("Username \"" + pUser.Username + "\" is already taken");
 
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
 
            pUser.PasswordHash = passwordHash;
            pUser.PasswordSalt = passwordSalt;
 
            _userDAO.Create(pUser);
 
            return pUser;
        }
 
        public void Update(User pUser, string password = null)
        {
            User existentUser = _userDAO.GetById(pUser.Id);
 
            if (existentUser == null)
                throw new AppException("User not found");
 
            if (pUser.Username != existentUser.Username)
            {
                // username has changed so check if the new username is already taken
                if (_userDAO.GetUserByUserName(pUser.Username) != null)
                    throw new AppException("Username " + pUser.Username + " is already taken");
            }
 
            // update user properties
            existentUser.Username = pUser.Username;
 
            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);
 
                existentUser.PasswordHash = passwordHash;
                existentUser.PasswordSalt = passwordSalt;
            }
 
            _userDAO.Update(existentUser);
        }
 
        public void Delete(int id)
        {
           _userDAO.Delete(id);
        }
 
        // private helper methods
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
 
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
 
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");
 
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }
 
            return true;
        }
    }
}