import { UserTokenDTO } from "../dto/UserTokenDTO";

export class RestService {
    userToken: UserTokenDTO = new UserTokenDTO();
    constructor() {
        var vUserToken = localStorage.getItem('userToken');
        if (vUserToken != null) {
            this.userToken = JSON.parse(vUserToken) as UserTokenDTO;
        }
    }

    public getOption(pMethod: string): any {
        const options = {
            method: pMethod.toUpperCase(),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.userToken.Token
            }
        };

        return options;
    }

    public getOptionWithBody(pMethod: string, pBody: string): any {
        const options = {
            method: pMethod.toUpperCase(),
            body: pBody,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.userToken.Token
            }
        };

        return options;
    }

    public getOptionWithFormData(pMethod: string, pFormData: FormData): any {
        const options = {
            method: pMethod.toUpperCase(),
            body: pFormData,
            headers: {
                "Authorization": "Bearer " + this.userToken.Token
            }
        };

        return options;
    }
}
