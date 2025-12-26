interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}


type SuccesCallback = () => void;
type ErrorCallback = (erros: string) => void;


export class CheckService implements CheckServiceUseCase{

    constructor(private readonly succesCallback: SuccesCallback, private readonly errorCallback: ErrorCallback){

    }

     async execute(url: string): Promise<boolean> {

        try{
            const req = await fetch(url);
            if( !req.ok){
                throw new Error(`Error on check service ${url}`);
            }

            this.succesCallback();
            return true;

        }catch(error){

            this.errorCallback(`${error}`);
            return false;
        }

     }
}