export class HttpApi {
  static refreshToken = 'auth/refresh-tokens';
  static userLogout = 'user/revoketoken';
  static oauthLogin = 'auth/login';
  static me = 'user/me';

  //Users
  static getUsers = 'users';

  // Forget Password
  static forgetPassword = 'auth/email-send-otp';
  static verifyemailotp = 'auth/verifyemailotp';
  static resetPassword = 'auth/reset-password';
}
