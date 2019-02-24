import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class FetchDataComponent extends Vue {

    created() {
        console.log("[created] Rogerio -->");
    }

    updated() {
        console.log("[Updated] Test");
    }

    mounted() {
        localStorage.removeItem('userToken');
        this.$router.push('login');
    }
}
