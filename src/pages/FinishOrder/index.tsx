import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  };
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">;

export default function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function handleFinish() {
    try {
      await api.put("/order/send", {
        order_id: route.params?.order_id,
      });

      navigation.popToTop();
    } catch (err) {
      console.log("Erro ao finalizar pedido.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar este pedido ?</Text>
      <Text style={styles.title}>Mesa: {route.params?.number}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finalizar pedido</Text>
        <Feather name="check" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  alert: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 15,
  },
  button: {
    width: "65%",
    height: 50,
    backgroundColor: "#00ff5f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 15,
  },
  textButton: {
    fontSize: 20,
    marginRight: 8,
  },
});
