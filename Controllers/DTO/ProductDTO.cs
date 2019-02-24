using System;
using System.Collections.Generic;

namespace Ceres.Controllers.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CreatedDate { get; set; }
    }
}