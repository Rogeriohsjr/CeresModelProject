
export class MoneyUtil {
    private formatSimbol: string = '$';
    
    constructor() {
        this.formatSimbol = '$';
    }

    public getMoneyFormat(pNumber: string): any {
        return this.formatSimbol + ' ' + parseFloat(pNumber).toFixed(2);
    }

    
}
