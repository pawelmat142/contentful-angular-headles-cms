import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.prod";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { from, Observable } from "rxjs";
import { DateUtil } from "../utils/date-util";

export type EmailForm = {
    name: string,
    date: Date,
    email: string,
    details?: string,
    files?: File[],
}

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    
    private readonly env = environment.email;
  
    public sendEmail(form: EmailForm, urls?: string[]): Observable<EmailJSResponseStatus> {
        const title = `${form.name} - ${DateUtil.formatDDMMYYYY(form.date)}`
        const html = this.prepareHtml(form, urls)
        return this.send(html, title, form.email, form.name)
    }

    private prepareHtml(form: EmailForm, urls?: string[]): string {
        const now = new Date()
        let lines = [
            `<h1>${form.name}</h1>`,
            `<br/>`,
            `<p><strong>Email:</strong> ${form.email}</p>`,
            `<br/>`,
            `<p><strong>Date:</strong> ${DateUtil.formatDDMMYYYY(form.date)}</p>`,
            `<br/>`,
        ]
        if (form.details) {
            lines.push(`<p><strong>Details:</strong></p>`)
            lines.push(`<p>${form.details}</p>`)
            lines.push(`<br/>`)
        }

        if (urls?.length) {
            lines.push(`<p><strong>Attachments:</strong></p>`)
            urls.forEach(url => {
                lines.push(`<div><a href=${url} target="_blank">${url}</a></div>`)
                lines.push(`<br/>`)
            })
            lines.push(`<br/>`)
        }
        return lines.join('\n')
    }

    private send(html: string, title: string, email: string, name: string): Observable<EmailJSResponseStatus> {
        return from(emailjs.send(
            this.env.serviceId,
            this.env.templateId,
            { 
                html,
                title,
                email,
                name
            },
            this.env.publicKey
        ))
    }
}
  