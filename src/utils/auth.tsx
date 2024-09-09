import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string || '';

export type Token = {
  email: string,
  work: string
}

export function readTokenFromCookie(): Token | null {
  const authCookie = Cookies.get('JWT');
  let token: Token | null = null;

  if (!authCookie || authCookie?.length === 0) {
    return token;
  } else {
    jwt.verify(authCookie, SECRET_KEY, (err: any, user: any) => {
      if (err) {
        console.error(err);
        return null;
      }
      token = user;
      return user;
    });
  }
  return token;
}

export const useCheckAuth = (): string | null => {
  const [workName, setWorkName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = readTokenFromCookie();

    if (token == null) {
      router.push('/login');
      return;
    }

    // Update last connection of a coach
    if (token.work == "Coach") {
      axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/is_connected`, {}, { withCredentials: true });
    }

    setWorkName(token.work);
    return;
  }, [router]);

  return workName;
};
