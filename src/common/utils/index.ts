import { sign, verify } from 'jsonwebtoken';

const createToken = (id: number) => {
  const token = sign({ id }, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, process.env.JWT_SECRET);
  return decoded;
};

export { createToken, verifyToken };
