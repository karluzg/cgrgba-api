
export class ResultInfo {


    private userMessage: string;


    constructor(userMessage: string) {
        this.userMessage = userMessage;

    }

    get getUserMessage(): string {
        return this.userMessage;
    }
}