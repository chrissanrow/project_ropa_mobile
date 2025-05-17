import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/');
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput className="text-3xl text-textprimary bg-lightprimary-100" placeholder="Email" placeholderTextColor="#000000" value={email} onChangeText={setEmail}/>
      <TextInput className="text-3xl text-textprimary" placeholder="Password" placeholderTextColor="#000000" value={password} onChangeText={setPassword} secureTextEntry />r
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => router.push('/signup')} /> {/* Navigate to Sign Up */}
    </View>
  );
}