import { UserDTO } from "../dto/UserDTO";
import { UserTokenDTO } from "../dto/UserTokenDTO";

export class UserService {
    constructor() {
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }

    public register(pUserDTO: UserDTO): any {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pUserDTO)
        };

        return fetch('api/user/register', requestOptions).then(response => {
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        location.reload(true);
                    }

                    const error = (data && data.message) || response.statusText;
                    return error;
                }

                return data;
            });
        });
    }

    public isUserLoggedIn(){
        if(localStorage.getItem('userToken')){
            return true;
        } else {
            return false;
        }
    }
}
