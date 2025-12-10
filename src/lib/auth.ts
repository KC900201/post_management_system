export interface User {
  userId: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export const parseToken = (token: string): User | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
};

export const getStoredUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return parseToken(token);
};

export const isAuthenticated = (): boolean => {
  return !!getStoredUser();
};

export const isAdmin = (): boolean => {
  const user = getStoredUser();
  return user?.role === 'admin';
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
