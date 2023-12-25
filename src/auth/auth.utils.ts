import { OAuth2Client, VerifyIdTokenOptions } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function verifyGoogleCredentials(
  credential: string,
): Promise<any> {
  try {
    const options: VerifyIdTokenOptions = {
      idToken: credential,
    };

    const ticket = await client.verifyIdToken(options);
    const payload = ticket.getPayload();
    return payload;
  } catch (error: any) {
    return false;
  }
}
