// utils/verifyToken.ts
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (token: string): JwtPayload & { id: string } | null => {
  try {
    if (!token) {
      return null;
      
    }
    console.log(' verify token',token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: string;
    };

  //  console.log('decoded',decoded);
    return decoded;
  } catch (error) {
    console.error("Token verify error", error);
    return null;
  }
};
