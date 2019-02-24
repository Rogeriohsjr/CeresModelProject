import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { ProductDTO } from "../../../dto/ProductDTO";
import { RestService } from "../../../service/RestService";

@Component({
  props: ["pProduct"]
})
export default class EditProductComponent extends Vue {
  pProductEdit: ProductDTO = new ProductDTO;
  newRecord: Boolean = true;
  restService: RestService = new RestService();

  @Watch("pProduct", { deep: true })
  onChildChanged(val: ProductDTO, oldVal: ProductDTO) {
    console.log("Watcher.pProduct...");
    console.log(this.$props.pProduct);
    this.pProductEdit = this.$props.pProduct as ProductDTO;

    if (this.pProductEdit.Id != 0) {
      this.newRecord = false;
    } else {
      this.newRecord = true;
    }
  }

  created() {
    console.log("[created] Rogerio -->");
    console.log(this.$props.pProduct);
    this.pProductEdit = this.$props.pProduct as ProductDTO;
  }

  updated() {
    console.log("[Updated] Test");
  }

  mounted() {
    console.log("[mounted] Rogerio -->");
    console.log(this.$props.pProduct);
  }

  addObject() {
    this.updateObject();
  }

  updateObject() {
    var vData = this.pProductEdit;
    console.log('[updateObject] Starts...');
    console.log(vData);

    fetch("api/product",
      this.restService.getOptionWithBody("POST", JSON.stringify(vData)))
      .then(res => {
        if (res.ok) {
          this.closeEditor();
          return res.json();
        } else {
          console.log('[updateObject] else.');
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log("Error, with message:", err.statusText));
  }

  closeEditor() {
    this.pProductEdit = new ProductDTO;
    this.$emit("closePopup", true);
  }
}
