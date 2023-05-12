
import { OperationTemplate } from "./OperationTemplate";
import * as nodemailer from 'nodemailer';
import logger from "../config/logger";
import { MailOptionsTemplate } from "./MailOptionsTemplate";
import { EmailResultTemplate } from "./EmailResultTemplate";

export class EmailTemplate{

    private mailTransporter = require('../../infrestructure/config/mailTransporter');

    public async sendEmail(params: MailOptionsTemplate):Promise<EmailResultTemplate> {

        try {
            logger.info("[EmailTemplate] Try to send emai")
            // Send the email
            const info = await this.mailTransporter.transporter.sendMail(params);
            logger.info('[EmailTemplate] Email sent:', info.response); 6
            const result= new EmailResultTemplate()
            result.setSetResult = info;

            return result;
        } catch (error) {
            logger.error("[EmailTemplate] Error while executing operation" + error)
            throw error
        }

    }


    public async createMailOption( to:string,subject:String, body:String):Promise<MailOptionsTemplate>
    {
        const mailOptionsTemplate = new MailOptionsTemplate();

        mailOptionsTemplate.setFrom=this.mailTransporter.host;
        mailOptionsTemplate.setSubject=to;
        mailOptionsTemplate.setSubject= subject;
        mailOptionsTemplate.setHtml=body;

        return await mailOptionsTemplate;

    }

}