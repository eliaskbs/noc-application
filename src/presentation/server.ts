import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpementation } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron";

const fileSystemLogRepository = new LogRepositoryImpementation(new FileSystemDatasource()); 

export class Server{
    public static start(){
        console.log( 'Server run...' );

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://google.com';
            new CheckService(fileSystemLogRepository, ()=>{console.log(` ${url} success`)}, (error) => console.log(error)).execute( url );
        })
    }
}