/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import {
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  InitiateAuthCommand,
  AdminGetUserCommand,
  AttributeType,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
    this.userPoolId = process.env.COGNITO_USER_POOL_ID ?? '';
    this.clientId = process.env.COGNITO_CLIENT_ID ?? '';
  }

  async registerUser(email: string, userName: string, password: string) {
    try {
      const signUpCommand = new SignUpCommand({
        ClientId: this.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'custom:userName',
            Value: userName,
          },
        ],
      });

      const response = await this.cognitoClient.send(signUpCommand);
      return {
        succes: true,
        message:
          'Registrado con éxito! Por favor ve a tu email para ver el código de verificacion',
        userSub: response.UserSub,
      };
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new Error(`Error al registrar el usuario: ${error.message}`);
    }
  }

  //método para confirmar el registro
  async confirmSignUp(email: string, code: string) {
    try {
      const confirmCommand = new ConfirmSignUpCommand({
        ClientId: this.clientId,
        Username: email,
        ConfirmationCode: code,
      });

      await this.cognitoClient.send(confirmCommand);
      return {
        success: true,
        message: 'Email verificado con éxito',
      };
    } catch (error) {
      console.error('Error al confirmar el registro:', error);
      throw new Error(`Error al confirmar el registro: ${error.message}`);
    }
  }

  //metodo para reenviar el código de confirmación
  async resendConfirmationCode(email: string) {
    try {
      const resendCommand = new ResendConfirmationCodeCommand({
        ClientId: this.clientId,
        Username: email,
      });

      await this.cognitoClient.send(resendCommand);
      return {
        success: true,
        message: 'Código de confirmación reenviado con éxito',
      };
    } catch (error) {
      console.error('Error al reenviar el código de confirmación:', error);
      throw new Error(
        `Error al reenviar el código de confirmación: ${error.message}`,
      );
    }
  }

  //metodo de login modificado para usar initiateAuth
  async loginUser(email: string, password: string) {
    try {
      const authCommand = new InitiateAuthCommand({
        ClientId: this.clientId,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await this.cognitoClient.send(authCommand);

      return {
        access_token: response.AuthenticationResult?.AccessToken,
        id_token: response.AuthenticationResult?.IdToken,
        refresh_token: response.AuthenticationResult?.RefreshToken,
        expires_in: response.AuthenticationResult?.ExpiresIn,
      };
    } catch (error) {
      console.error('Error autenticando usuario: ', error);
      throw new Error('Invalid credentials');
    }
  }

  //mantenemos igual el metodo getUserByEmail
  async getUserByEmail(email: string) {
    try {
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: this.userPoolId,
        Username: email,
      });

      const response = await this.cognitoClient.send(getUserCommand);
      const attributes = {};
      response.UserAttributes?.forEach((attr: AttributeType) => {
        if (attr.Name) {
          attributes[attr.Name] = attr.Value;
        }
      });

      return {
        username: response.Username,
        status: response.UserStatus,
        enabled: response.Enabled,
        ...attributes,
      };
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }
}
