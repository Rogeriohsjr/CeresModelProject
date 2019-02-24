using System;

namespace Ceres.Model
{
    public class Product
    {
        public Int32 Id { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public User User { get; set; }

        public Product()
        {
        }
    }
}