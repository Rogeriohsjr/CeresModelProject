
export class UserDTO {
    Id:number;
    FirstName:string;
    LastName:string;
    Email:string;
    Username:string;
    Password:string;

    constructor() {
        this.Id = 0;
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.Username = '';
        this.Password = '';
    }
}
