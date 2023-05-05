import { middleware } from '@/api/middleware';

export const config = {
  matcher: ['/api/auth/me'],
};

export default middleware;
