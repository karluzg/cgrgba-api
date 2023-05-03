
export class ResultInfo {


    private userMessage: string;
    private details?:any


    constructor(userMessage: string,  details?:any) {
        this.userMessage = userMessage;
        this.details = details;

    }

    get getUserMessage(): string {
        return this.userMessage;
    }
}