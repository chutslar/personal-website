import { SignJWT, jwtVerify } from "jose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const ISSUER = "https://chutslar.com";
const AUDIENCE = "https://chutslar.com";
const EXPIRATION_TIME = "1 day";

export async function createLoginJWT(
  secretKeyString: string,
  userName: string,
): Promise<string> {
  const secretKey = new TextEncoder().encode(secretKeyString);
  const token = await new SignJWT({
    sub: userName,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt(Date.now())
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(EXPIRATION_TIME)
    .sign(secretKey);
  return token;
}

export async function verifyLoginJWT(
  secretKeyString: string,
  token: string,
): Promise<string | undefined> {
  const secretKey = new TextEncoder().encode(secretKeyString);
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const issuedAt = dayjs.utc(payload.iat);
    const expAt = issuedAt.add(1, "day");
    const now = dayjs.utc();
    if (now.isBefore(issuedAt) || now.isAfter(expAt)) {
      // Token has expired or is not yet valid
      return undefined;
    }
    return payload.sub;
  } catch (e) {
    return undefined;
  }
}
