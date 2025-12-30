import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogsSeverityLevel } from "../../domain/entities/log.entity.";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpementation implements LogRepository{
    

    constructor(private readonly logDataSource: LogDatasource){}
    
    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log)
    }
    async getLog(severityLevel: LogsSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLog(severityLevel);
    }

}