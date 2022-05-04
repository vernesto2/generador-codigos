import { _Jwt } from '../miscs';
//import { sgKey } from '../config/config'

/**
 * Checking if JWT is valid
 * @param req 
 * @param resp 
 * @param next 
 */
export const sendgrid = async (subject: string, sendTo: string, message: string) =>
{
	// using Twilio SendGrid's v3 Node.js Library
	// https://github.com/sendgrid/sendgrid-nodejs
	/*const sgMail = require('@sendgrid/mail')
	sgMail.setApiKey(sgKey)
	const msg = {
		to: sendTo, // Change to your recipient
		from: 'frivas0708@gmail.com', // Change to your verified sender
		subject: subject,
		//text: 'and easy to do anywhere, even with Node.js',
		html: message,
	}
	sgMail
	.send(msg)
	.then(() => { })
	.catch((error) => { })*/
}