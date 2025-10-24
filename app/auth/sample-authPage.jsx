// Example Next.js auth page wiring (TSX) - update your existing file to use loginUser
// Minimal snippet to show integration. Place inside app/auth/page.tsx replacing relevant parts.

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser } from '@/lib/api/backend';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/dashboard';
  const { toast } = useToast();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(loginData.email, loginData.password);
      toast({ title: 'Welcome', description: 'Login successful', variant: 'success' });
      router.push(next);
    } catch (err) {
      toast({ title: 'Login failed', description: err?.message || 'Unknown error', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        type="email"
        placeholder="Email"
      />
      <input
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        type="password"
        placeholder="Password"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}