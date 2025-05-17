import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gppwnavdngkdpvwrfwzg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwcHduYXZkbmdrZHB2d3Jmd3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTU2MjYsImV4cCI6MjA2MzAzMTYyNn0.47QV09TbiRAt6ntv-wDsvbi3NN9D17Hk6L1L3z9IOo0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})