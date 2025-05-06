

// src/lib/auth.ts

export function checkAdminAccess(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
}

export function login(username: string, password: string): boolean {
  if (username === 'admin' && password === '1234') {
    sessionStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem('isAuthenticated');
}