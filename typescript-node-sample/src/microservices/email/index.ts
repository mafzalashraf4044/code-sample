/** @format */

import fs from "fs";
import ejs from "ejs";
import nodemailer from "nodemailer";
import config from "config";

const user: string = config.get("nodemailer.user");
const pass: string = config.get("nodemailer.pass");

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-2.amazonaws.com",
  port: 587,
  auth: {
    user,
    pass,
  },
  secure: false,
  debug: false, // show debug output
  logger: true, // log information in console
});

const logger = (err: any, info: object) => {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
};

export default class EmailMicroservice {
  static send = (subject: string, template: any, payload: any) => {
    const options = {
      from: `Mooodi App <info@mooodi-app.com>`, // sender address
      to: payload.email, // list of receivers
      subject, // subject line
      html: ejs.render(template, payload),
    };

    transporter.sendMail(options, logger);
  };

  static signupVerification = (channel: any, message: any, payload: any) => {
    const template = fs.readFileSync(
      process.cwd() +
        "/src/microservices/email/templates/signup-verification.ejs",
      "utf-8",
    );

    EmailMicroservice.send("Sign Up Verification", template, payload);
  };

  static forgotPassword = (channel: any, message: any, payload: any) => {
    const template = fs.readFileSync(
      process.cwd() + "/src/microservices/email/templates/reset-password.ejs",
      "utf-8",
    );

    EmailMicroservice.send("Reset Password", template, payload);
  };

  static verificationToken = (channel: any, message: any, payload: any) => {
    const template = fs.readFileSync(
      process.cwd() +
        "/src/microservices/email/templates/verification-token.ejs",
      "utf-8",
    );

    EmailMicroservice.send("Verification Token", template, payload);
  };

  static reviewPost = (channel: any, message: any, payload: any) => {
    const template = fs.readFileSync(
      process.cwd() +
        "/src/microservices/email/templates/review-post-acknowledgement.ejs",
      "utf-8",
    );

    EmailMicroservice.send("Review Post Acknowledgement", template, payload);
  };
}
