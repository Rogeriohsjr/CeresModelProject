import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component({
  props: ["ppMessage"]
})
export default class PillMessageComponent extends Vue {
  MessageType: number = 0;
  Message: String = '';

  @Watch("ppMessage", { deep: true })
  onChildChanged(val: any, oldVal: any) {
    this.Message = this.$props.ppMessage;
    this.MessageType = 1;
  }

  updated() {
  }

  mounted() {
  }
}
