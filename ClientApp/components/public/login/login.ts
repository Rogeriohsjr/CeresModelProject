import Vue from "vue";
import { Component } from "vue-property-decorator";
import { UserTokenDTO } from "../../../dto/UserTokenDTO";
import { UserDTO } from "../../../dto/UserDTO";


@Component({
    components: {
        loader: require("../../loader/loader.vue.html").default,
        pillMessage: require("../../pillMessage/pillMessage.vue.html").default
    }
})
export default class FetchDataComponent extends Vue {
    username: string = '';
    password: string = '';
    errorMessage: string = '';
    listProcess: String[] = [];

    created() {
        console.log("[created] Rogerio -->");
    }

    updated() {
        console.log("[Updated] Test");
    }

    mounted() {
        console.log("[mounted] Rogerio -->");
    }

    loginClick() {
        console.log('[LoginClick] Start...');
        this.listProcess.push("Authenticating");
        const userDTO = new UserDTO();
        userDTO.Username = this.username;
        userDTO.Password = this.password;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDTO)
        };

        fetch('api/user/authenticate', requestOptions)
            .then(response => response.json() as Promise<UserTokenDTO>)
            .then(userToken => {
                console.log('Returning.... - Authenticate');
                console.log(userToken);
                // login successful if there's a jwt token in the response
                if (userToken.Token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userToken', JSON.stringify(userToken));
                    this.$router.push('home');
                    return;
                }

                throw userToken;
            })
            .catch(err => {
                console.log("Error unexpected! Method[loadDropdowns.Category] Error[" + err.statusText + "]");
                this.errorMessage = err.message;
            })
            .then(data => {
                this.listProcess = this.listProcess.filter(
                    obj => obj !== "Authenticating"
                );
            });;
    }

    registerClick() {
        this.$router.push('register');
    }
}
