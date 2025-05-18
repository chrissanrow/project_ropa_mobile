import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUp() {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
        } else {
            router.replace('/');
        }
    }
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                className="text-3xl text-textprimary bg-lightprimary-100"
                placeholder="Email"
                placeholderTextColor="#000000"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="text-3xl text-textprimary"
                placeholder="Password"
                placeholderTextColor="#000000"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
}

