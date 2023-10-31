import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }

    await signIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          placeholderTextColor="#9e9e9e"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor="#9e9e9e"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#000" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 18,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "transparent",
    marginBottom: 12,
    borderRadius: 5,
    borderColor: "#00ff5f",
    borderWidth: 1,
    color: "#fff",
    paddingHorizontal: 8,
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#00ff5f",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
