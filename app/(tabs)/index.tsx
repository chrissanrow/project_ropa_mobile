import { router } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Index() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/login');
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login');
      }
    });
  }, []);

  return null; // Redirect logic only
}