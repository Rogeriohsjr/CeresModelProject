export interface IUser{
    Id: number;
    Name: string;
    Login: string;
    Password: string;
    Email: string;
    IsBlock: Boolean;
    DateRegister: string;
    DateLastAcess: string;
    DataAcess: string;
}

export class User implements IUser {
    Id: number;
    Name: string;
    Login: string;
    Password: string;
    Email: string;
    IsBlock: Boolean;
    DateRegister: string;
    DateLastAcess: string;
    DataAcess: string;

    constructor(pUser: IUser = { Id: 0, Name: "", Login: "", Password: "", Email: "", IsBlock: false, DateRegister: "", DateLastAcess: "", DataAcess: ""  }) {
        this.Id = pUser.Id;
        this.Name = pUser.Name;
        this.Login = pUser.Login;
        this.Password = pUser.Password;
        this.Email = pUser.Email;
        this.IsBlock = pUser.IsBlock;
        this.DateRegister = pUser.DateRegister;
        this.DateLastAcess = pUser.DateLastAcess;
        this.DataAcess = pUser.DataAcess;
    }
}