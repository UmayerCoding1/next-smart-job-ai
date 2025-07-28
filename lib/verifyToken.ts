// utils/verifyToken.ts
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (token: string): JwtPayload & { id: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: string;
    };

   
    return decoded;
  } catch (error) {
    console.error("Token verify error", error);
    return null;
  }
};
