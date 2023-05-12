
export class MailOptionsTemplate {

    private from: String;

    private to: String;

    private subject: String;

    private html: String;



    public get getFrom(): String {
        return this.from;
    }
    public set setFrom(value: String) {
        this.from = value;
    }

    public get getHtml(): String {
        return this.html;
    }
    public set setHtml(value: String) {
        this.html = value;
    }
    public get getSubject(): String {
        return this.subject;
    }
    public set setSubject(value: String) {
        this.subject = value;
    }

    public get getTo(): String {
        return this.to;
    }
    public set setTo(value: String) {
        this.to = value;
    }
}