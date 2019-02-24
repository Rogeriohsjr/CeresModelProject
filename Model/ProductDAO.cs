using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Ceres.Model
{
    public class ProductDAO : ICRUD<Product>
    {
        private DataContext _context;
 
        public ProductDAO(DataContext context)
        {
            _context = context;
        }

        public void Create(Product pObj)
        {
            _context.Product.Add(pObj);
            _context.SaveChanges();
        }

        public void Delete(int pId)
        {
            Product objectToDelete = _context.Product.Find(pId);
            if (objectToDelete != null)
            {
                _context.Product.Remove(objectToDelete);
                _context.SaveChanges();
            }
        }

        public List<Product> GetAll()
        {
            return _context.Product.AsNoTracking().ToList();
        }

        public Product GetById(int pId)
        {
            return _context.Product.Find(pId);
        }

        public void Save(Product pObj)
        {
            Product existentProduct = GetById(pObj.Id);
 
            if (existentProduct == null){
                Create(pObj);
            } else {
                Update(pObj);
            }
        }

        public void Update(Product pObj)
        {
            _context.Product.Update(pObj);
            _context.SaveChanges();
        }
    }
}