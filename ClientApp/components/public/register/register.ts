import Vue from "vue";
import { Component } from "vue-property-decorator";
import { UserDTO } from "../../../dto/UserDTO";
import { RestUtil, RestError } from "../../../service/RestUtil";

@Component({
    components: {
        loader: require("../../loader/loader.vue.html").default,
        pillMessage: require("../../pillMessage/pillMessage.vue.html").default
    }
})
export default class FetchDataComponent extends Vue {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    username: string = '';
    password: string = '';
    errorMessage: string = '';
    listProcess: String[] = [];
    restUtil: RestUtil = new RestUtil();

    created() {
        console.log("[created] Rogerio -->");
    }

    updated() {
        console.log("[Updated] Test");
    }

    mounted() {
        console.log("[mounted] Rogerio -->");
    }

    createUserClick() {
        this.listProcess.push("CreatingNewUser");
        const userDTO = new UserDTO();
        userDTO.FirstName = this.firstName;
        userDTO.LastName = this.lastName;
        userDTO.Email = this.email;
        userDTO.Username = this.email;
        userDTO.Password = this.password;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDTO)
        };

        fetch('api/user/register', requestOptions)
            .then(response => {
                if (response.status == this.restUtil.Ok) {
                    this.$router.push('login');
                } else {
                    response.json()
                        .then(pResponse => pResponse as Promise<RestError>)
                        .then(restError => {
                            this.errorMessage = restError.Message;
                        });
                }
            })
            .catch(err => {
                console.log("Error unexpected! Method[createUserClick] Error[" + err.statusText + "]");
                this.errorMessage = "Something happened! [Fetch.user.register] [" + err.statusText + "]";
            })
            .then(data => {
                this.listProcess = this.listProcess.filter(
                    obj => obj !== "CreatingNewUser"
                );
            });;
    }

    backToLoginClick() {
        this.$router.push('login');
    }
}
