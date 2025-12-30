import fs from 'node:fs'

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogsSeverityLevel } from "../../domain/entities/log.entity.";

export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogshPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath);
        }

        [this.allLogsPath, this.mediumLogshPath, this.highLogsPath].forEach( path => {
            if( fs.existsSync(path) ){
                return;
            }
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newlog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newlog)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(newlog.level == LogsSeverityLevel.low) return;
        if(newlog.level == LogsSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogshPath, logAsJson);
        }else{
            fs.appendFileSync(this.highLogsPath, `${JSON.stringify(newlog)}\n`);
        }
        
    }

    private getLogsFromFile = ( path: string ):LogEntity[] =>{
        const content = fs.readFileSync(path, 'utf-8');
        
        const logs = content.split('\n').map(log => LogEntity.fromJson(log));
        return logs;

    }

    async getLog(severityLevel: LogsSeverityLevel): Promise<LogEntity[]> {
        switch( severityLevel ){
            case LogsSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogsSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogshPath);;

            case LogsSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);;
            default:
                throw new Error(` ${ severityLevel } not implemented `)
        }
    }

}