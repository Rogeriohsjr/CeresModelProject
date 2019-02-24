import * as moment from 'moment';


export class DateUtil {
    private fromendDateFormat: string = 'DD/MM/YYYY';
    private backendDateFormat: string = 'YYYY-MM-DD';
    constructor() {
        this.fromendDateFormat = 'DD/MM/YYYY';
        this.backendDateFormat = 'YYYY-MM-DD';
    }

    public getStartOfDateNow(): any {
        return moment().startOf('month').format(this.fromendDateFormat);
    }

    public getEndOfMonthDate(): any {
        return moment().endOf('month').format(this.fromendDateFormat);
    }

    public getDateFormatted(pDate: string){
        if(pDate == null || pDate == ''){
            return '';
        }
        return moment(pDate, this.backendDateFormat).format(this.fromendDateFormat);
    }

    public convertDateToSubmit(pDate: string): any{
        if(pDate == null || pDate == ''){
            return '';
        }
        return moment(pDate, this.fromendDateFormat).format(this.backendDateFormat);
    }
}
