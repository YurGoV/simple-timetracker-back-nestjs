import { OAuth2Client, VerifyIdTokenOptions } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Call this function to validate the JWT credential sent from the client-side
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
    // throw new Error(`Validation failed: ${error.message}`);
  }
}

// export async function getUserByEmail(
//   email: string,
// ): Promise<any> {
//   try {
//     // const user = await
//   } catch (error: any) {
//     return false;
//     // throw new Error(`Validation failed: ${error.message}`);
//   }
// }
// Example usage
// verifyCredentials('JWT_CREDENTIAL_STRING_FROM_CLIENT_SIDE')
//   .then((userInfo) => {
//     // Use userInfo and perform your server-side logic here
//     console.log(userInfo);
//   })
//   .catch((error) => {
//     // Validation failed, and userinfo was not obtained
//     console.error(error.message);
//   });
