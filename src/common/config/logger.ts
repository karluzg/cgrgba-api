import {getLogger, configure} from "log4js";


configure({
  appenders: { 
    app: { type: 'file', filename: 'Server.log' }
  },
  categories: {
    default: {
     appenders: ['app'],
     level: 'info'
   },
  },
  
});
const logger = getLogger();

export default logger;
