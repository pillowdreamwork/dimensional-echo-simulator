
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { InputValidator, authRateLimiter } from '@/utils/inputValidation';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useSecureAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  });

  // Clean up auth state thoroughly
  const cleanupAuthState = useCallback(() => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });

    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  }, []);

  // Secure sign in with validation and rate limiting
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // Rate limiting check
      if (!authRateLimiter(email)) {
        throw new Error('Too many authentication attempts. Please try again later.');
      }

      // Validate email input
      const emailValidation = InputValidator.validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.errors.join(', '));
      }

      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.warn('Failed to sign out existing session:', err);
      }

      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailValidation.sanitizedValue,
        password
      });

      if (error) throw error;

      if (data.user) {
        // Force page reload for clean state
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to sign in'
      }));
    }
  }, [cleanupAuthState]);

  // Secure sign up with validation
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      // Rate limiting check
      if (!authRateLimiter(email)) {
        throw new Error('Too many authentication attempts. Please try again later.');
      }

      // Validate email input
      const emailValidation = InputValidator.validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.errors.join(', '));
      }

      // Password strength validation
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase.auth.signUp({
        email: emailValidation.sanitizedValue,
        password
      });

      if (error) throw error;

      // Success message or redirect
      console.log('Sign up successful:', data);
    } catch (error) {
      console.error('Sign up error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to sign up'
      }));
    }
  }, []);

  // Secure sign out
  const signOut = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.warn('Failed to sign out:', err);
      }
      
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to sign out'
      }));
    }
  }, [cleanupAuthState]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        error: null
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        });

        if (event === 'SIGNED_IN') {
          // Defer data fetching to prevent deadlocks
          setTimeout(() => {
            console.log('User signed in successfully');
          }, 0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    ...authState,
    signIn,
    signUp,
    signOut
  };
}
