import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
const Spinner = require("vue-simple-spinner").default;

@Component({
  components: {
    spinner: Spinner
  },
  props: ["ppListProcessName"]
})
export default class LoaderComponent extends Vue {
  ShowSpinner: Boolean = false;
  ListProcessing : String[] = [];

  @Watch("ppListProcessName", { deep: true })
  onChildChanged(val: any, oldVal: any) {
    this.ListProcessing = this.$props.ppListProcessName;

    if(this.ListProcessing.length > 0){
        this.ShowSpinner = true;
    } else {
        this.ShowSpinner = false;
    }
    
  }

  updated() {
  }

  mounted() {
  }
}
