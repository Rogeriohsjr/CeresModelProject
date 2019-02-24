

export class ProductDTO {
    Id:number;
    Name:string;
    Description:string;
    CreatedDate:string;

    constructor() {
        this.Id = 0;
        this.Name = '';
        this.Description = '';
        this.CreatedDate = '';
    }
}
