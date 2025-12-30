import { LogEntity, LogsSeverityLevel } from "../entities/log.entity.";

export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLog( severityLevel: LogsSeverityLevel ): Promise<LogEntity[]>;
}