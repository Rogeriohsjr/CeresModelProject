using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;
using System.Data.SqlClient;

namespace Ceres.Model
{
    public class UserDAO : ICRUD<User>
    {
        private DataContext _context;
 
        public UserDAO(DataContext context)
        {
            _context = context;
        }

        public void Create(User pObj)
        {
            _context.User.Add(pObj);
            _context.SaveChanges();
        }

        public void Delete(int pId)
        {
            User objectToDelete = _context.User.Find(pId);
            if (objectToDelete != null)
            {
                _context.User.Remove(objectToDelete);
                _context.SaveChanges();
            }
        }

        public List<User> GetAll()
        {
            return _context.User.ToList();
        }

        public User GetById(int pId)
        {
            return _context.User.Find(pId);
        }

        public void Save(User pObj)
        {
            User existentUser = GetById(pObj.Id);
 
            if (existentUser == null){
                Create(pObj);
            } else {
                Update(pObj);
            }
        }

        public void Update(User pObj)
        {
            _context.User.Update(pObj);
            _context.SaveChanges();
        }

        public User GetUserByUserName(String pUsername)
        {
            var user = _context.User.SingleOrDefault(x => x.Username == pUsername);
            return user;
        }
    }
}