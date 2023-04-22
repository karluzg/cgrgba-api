
export class OperationExecption extends Error{
    
    public readonly statusCode:number
    public readonly errorClasse:string
    constructor(message:string, statusCode:number, errorClasse:string){
        super(message)
        this.statusCode=statusCode
        this.errorClasse=errorClasse;
    
    }  
}

