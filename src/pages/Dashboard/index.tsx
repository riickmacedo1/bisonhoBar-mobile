import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [number, setNumber] = useState("");

  async function openOrder() {
    if (number === "") {
      return;
    }

    const response = await api.post("/order", {
      table: Number(number),
    });

    navigation.navigate("Order", {
      number: number,
      order_id: response.data.id,
    });

    setNumber("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça um novo pedido</Text>

      <TextInput
        style={styles.input}
        placeholder="Número da mesa"
        placeholderTextColor="#fff"
        keyboardType="numeric"
        maxLength={8}
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    textAlign: "center",
    height: 60,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 22,
    color: "#fff",
    backgroundColor: "transparent",
    borderColor: "#00ff5f",
    borderWidth: 1,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#00ff5f",
    borderRadius: 4,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
