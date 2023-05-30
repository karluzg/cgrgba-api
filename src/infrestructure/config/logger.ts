import {getLogger, configure} from "log4js";
import { PlataformConfig } from "./plataform";


const logFilename = PlataformConfig.log.file; // Certifique-se de que PlataformConfig.log.file esteja corretamente definida


configure({
  appenders: {
    app: { type: 'dateFile', filename:logFilename, pattern: 'yyyy-MM-dd.log', alwaysIncludePattern: true }
  },
  categories: {
    default: {
      appenders: ['app'],
      level: PlataformConfig.log.level
    },
  },
});

const logger = getLogger();

export default logger;
