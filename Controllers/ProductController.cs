using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ceres.Controllers.DTO;
using Ceres.Service;
using Ceres.Helper;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace Ceres.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private IProductService _productService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ProductController(
            IProductService productService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _productService = productService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult get()
        {
            try
            {
                List<ProductDTO> listProductDTO = _productService.GetAllProductDTO();
                
                return Ok(listProductDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult save([FromBody] ProductDTO pProduct)
        {
            _productService.Save(pProduct);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult delete(int id)
        {
            _productService.Delete(id);

            return Ok("Record deleted!");
        }
    }
}
