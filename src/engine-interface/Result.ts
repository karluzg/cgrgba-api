import { ResultInfo } from "../common/response/ResultInfo";

export class Result {
    
    private resultIInfo:ResultInfo
    constructor(){
        this.resultIInfo=new ResultInfo()
    }

    get getResultInfo(): ResultInfo{
        return this.resultIInfo
    }

     setResultInfo(resultInfo:ResultInfo): Result{
        this.resultIInfo=resultInfo
        return this;
    }
}