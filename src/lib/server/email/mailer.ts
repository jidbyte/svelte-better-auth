import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

export interface SMTPSettings {
	host: string;
	port: number;
	fromEmail: string;
	user?: string;
	password?: string;
}

export interface SendEmailInput {
	to: string;
	subject: string;
	html: string;
}

const transporter = nodemailer.createTransport({
	host: env.MAILER_HOST,
	port: Number(env.MAILER_PORT),
	secure: false
});

export async function sendEmail(input: SendEmailInput): Promise<void> {
	await transporter.sendMail({
		from: env.MAILER_SENDER,
		to: input.to,
		subject: input.subject,
		html: input.html
	});
}
