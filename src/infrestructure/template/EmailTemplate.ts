
import { OperationTemplate } from "./OperationTemplate";
import * as nodemailer from 'nodemailer';
import logger from "../config/logger";
import { MailOptionsTemplate } from "./MailOptionsTemplate";
import { EmailResultTemplate } from "./EmailResultTemplate";
import { mailTransporter } from "../config/mailTransporter";
import { EmailMessageTemplate } from "./EmailMessageTemplate";

export class EmailTemplate{

   

    public async sendEmail(params: MailOptionsTemplate):Promise<EmailResultTemplate> {

        try {
            logger.info("[EmailTemplate] Try to send emai")
            // Send the email

            const mailOptions = {
                from: params.getFrom,
                to: params.getTo, // specify the email address of the recipient(s)
                subject: params.getSubject,
                html:params.getHtml
              };

            const info = await mailTransporter.transporter.sendMail(mailOptions);
            logger.info('[EmailTemplate] Email sent:', info.response); 6
            const result= new EmailResultTemplate()
            result.setSetResult = info;

            return result;
        } catch (error) {
            logger.error("[EmailTemplate] Error while executing operation" + error)
            console.log(error)
            throw error
        }

    }


    public async createMailOption( to:string,emailMessage:EmailMessageTemplate):Promise<MailOptionsTemplate>
    {
        const mailOptionsTemplate = new MailOptionsTemplate();

        mailOptionsTemplate.setFrom=mailTransporter.email;
        mailOptionsTemplate.setTo=to;
        mailOptionsTemplate.setSubject= emailMessage.getSubject;
        mailOptionsTemplate.setHtml=emailMessage.getMessage;

        return await mailOptionsTemplate;

    }

}