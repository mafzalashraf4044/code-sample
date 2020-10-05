/** @format */

namespace Types {
  export type RabbitMQConfig = {
    username: string;
    password: string;
    host: string;
    port: number;
  };

  export type getListOptions = {
    start: number | string;
    end: number | string;
  };

  export type pushToListOptions = {
    insertAtEnd: boolean;
  };

  export enum TokenTypes {
    PASSWORD_RESET = "passwordResetToken",
    CHANGE_EMAIL = "changeEmailToken",
    CHANGE_USERNAME = "changeUsernameToken",
  }

  export type TokenType = {
    key: string;
    expiresDtKey: string;
  };

  export type MongooseOptions = {
    sort?: { [key: string]: number };
    skip?: number;
    limit?: number;
  };
}

export default Types;
