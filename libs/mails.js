import {mailtrapClient, mailtrapSender} from "../config/mailtrap.config.js";
import {EMAIL_TEMPLATE} from "./emailTemplate.js";

export  function sendEmail(email,reply) {
    const recipients = [
        {
            email,
        }
    ];
    mailtrapClient.send({
        from: mailtrapSender,
        to: recipients,
        subject: "در پاسخ به فرم تماس با ما سایت نورا پارت",
        html: EMAIL_TEMPLATE.replace('{reply}',reply) ,
    })
}