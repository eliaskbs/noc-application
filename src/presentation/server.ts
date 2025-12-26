import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
    public static start(){
        console.log('Server run...');

        CronService.createJob('*/5 * * * * *' , () => {
            const url = 'http://localhost:3000';
            new CheckService(
                ()=> console.log( `${ url } success` ), 
                (error) => console.log( error )
            ).execute( url );
        });
    }
}