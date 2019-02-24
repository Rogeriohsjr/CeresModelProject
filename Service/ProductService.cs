using System;
using System.Collections.Generic;
using System.Linq;
using Ceres.Model;
using Ceres.Helper;
using Ceres.Controllers.DTO;
using System.Data.SqlClient;
using AutoMapper;

namespace Ceres.Service
{
    public interface IProductService : ICRUD<Product>
    {
        List<ProductDTO> GetAllProductDTO();
        void Save(ProductDTO pProductDTO);
    }

    public class ProductService : IProductService
    {
        private ProductDAO _productDAO;
        private IMapper _mapper;

        public ProductService(DataContext pContext, IMapper mapper)
        {
            _productDAO = new ProductDAO(pContext);
            _mapper = mapper;
        }

        public void Create(Product pObj)
        {
            _productDAO.Create(pObj);
        }

        public void Delete(int pId)
        {
            _productDAO.Delete(pId);
        }

        public List<Product> GetAll()
        {
            return _productDAO.GetAll();
        }

        public Product GetById(int pId)
        {
            return _productDAO.GetById(pId);
        }

        public void Save(Product pObj)
        {
            _productDAO.Save(pObj);
        }

        public void Update(Product pObj)
        {
            _productDAO.Update(pObj);
        }

        public List<ProductDTO> GetAllProductDTO()
        {
            List<Product> listProduct = GetAll();
            List<ProductDTO> listProductDTO = _mapper.Map<List<Product>, List<ProductDTO>>(listProduct);
            return listProductDTO;
        }

        public void Save(ProductDTO pProductDTO)
        {
            Product saveProduct = _mapper.Map<Product>(pProductDTO);
            Save(saveProduct);
        }
    }
}