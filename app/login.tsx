import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit() {
    if(isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
      } else {
        router.replace('/');
      }
    }else{
      const { error } = await supabase.auth.signUp({
            email,
            password,
        });

      if (error) {
      } else {
          router.replace('/');
      }
    }
  }

  async function handleSignup() {
  }

  

  return (

    <View className="pt-48 pl-10 pr-10 flex-1">
        <Image
            source={require('../assets/images/project-ropa-logo.png')}
            className=" object-contain mb-5"
        />
        <View className="mb-5">
            <TextInput className="p-5 text-2xl text-textprimary bg-gray-200 rounded-[20px] mb-5" placeholder="Email" placeholderTextColor="#000000" value={email} onChangeText={setEmail}/>
            <TextInput className="p-5 text-2xl text-textprimary bg-gray-200 rounded-[20px] mb-5" placeholder="Password" placeholderTextColor="#000000" value={password} onChangeText={setPassword} secureTextEntry />
            {/* FIXME: enable forgot password functionality */}
            <TouchableOpacity className="self-end"><Text>Forgot Password?</Text></TouchableOpacity>
        </View>
        <TouchableOpacity
            className="bg-lightsecondary-100 rounded-[20px] p-4 justify-content items-center mb-10"
            onPress={handleSubmit}
          >
              <Text>Submit</Text>
          </TouchableOpacity>
        <View className="flex-row bg-gray-200 justify-center items-center rounded-[20px]">
          <TouchableOpacity
            className={`${isLogin ? "bg-white" : "bg-gray-200"}  w-1/2 rounded-[20px] p-4 justify-content items-center`}
            onPress={() => setIsLogin(true)}
          >
              <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`${!isLogin ? "bg-white" : "bg-gray-200"}  w-1/2 rounded-[20px] p-4 justify-content items-center`} onPress={() => setIsLogin(false)}><Text>Register</Text></TouchableOpacity>
        </View>
    </View>
  );
}