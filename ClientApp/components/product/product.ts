import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ProductDTO } from "../../dto/ProductDTO";
import { RestService } from "../../service/RestService";

@Component({
  components: {
    editProduct: require("./edit/edit.vue.html").default
  }
})
export default class ProductComponent extends Vue {
  listProducts: ProductDTO[] = [];
  productSelected: ProductDTO = new ProductDTO();
  openEditMode: Boolean = false;
  pageLoading: Boolean = true;
  restService: RestService = new RestService();

  mounted() {
    this.loadAllRecords();
  }

  loadAllRecords() {
    this.pageLoading = true;

    fetch("api/product",
      this.restService.getOption("GET"))
      .then(response => response.json() as Promise<ProductDTO[]>)
      .then(data => {
        this.pageLoading = false;

        this.listProducts = data;
      });
  }

  deleteClick(pProductDTO: ProductDTO) {

    fetch("api/product/" + pProductDTO.Id,
      this.restService.getOption("DELETE"))
      .then(res => {
        if (res.ok) {
          this.loadAllRecords();
          return res.json();
        } else {
          //return Promise.reject({ status: res.status, statusText: res.statusText });
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log("Error, with message:", err.statusText));
  }

  editClick(pProduct: ProductDTO) {
    console.log("[openPoup] Starts..");
    this.productSelected = pProduct as ProductDTO;
    this.openEditMode = true;
  }

  closePopup() {
    console.log("[closePopup] Starts..");
    this.productSelected = new ProductDTO();
    this.openEditMode = false;
    this.loadAllRecords();
  }

  addNewProduct() {
    console.log("[addNewProduct] Starts..");
    this.productSelected = new ProductDTO();
    this.openEditMode = true;
  }
}
