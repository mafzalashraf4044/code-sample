/** @format */

import RabbitMQHelper from "../util/helpers/rabbitmq";
import EmailMicroservice from "./email";

RabbitMQHelper.subscribe(
  RabbitMQHelper.Queues.signup_verification_code_email,
  EmailMicroservice.signupVerification,
);

RabbitMQHelper.subscribe(
  RabbitMQHelper.Queues.forgot_password_email,
  EmailMicroservice.forgotPassword,
);

RabbitMQHelper.subscribe(
  RabbitMQHelper.Queues.verification_token_email,
  EmailMicroservice.verificationToken,
);
