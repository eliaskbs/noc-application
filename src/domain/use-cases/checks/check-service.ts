import { LogEntity, LogsSeverityLevel } from "../../entities/log.entity.";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = ()=> void;
type ErrorCallback = (errors: string) => void;


export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback, 
        private readonly errorCallback: ErrorCallback
    ){}

    public async execute( url: string ): Promise<boolean>{
        try{
            const req = await fetch( url )
            if( !req.ok ){
                throw new Error(`Error on check service ${ url }`);
            }

            this.logRepository.saveLog(new LogEntity(`Serivce ${ url } working`, LogsSeverityLevel.low));
            this.successCallback();
            return true;
        }catch(error){
            const errorMessage = `${error}`;
            this.logRepository.saveLog(new LogEntity( errorMessage, LogsSeverityLevel.high));
            this.errorCallback(`${error}`);
            return false;
        }
    }
}