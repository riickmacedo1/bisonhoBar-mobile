import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function ModalPicker({
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps) {
  function onPressItem(item: CategoryProps) {
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsHorizontalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: WIDTH - 31,
    height: HEIGHT / 2,
    backgroundColor: "#00ff5f",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
  option: {
    alignItems: "flex-start",
    borderBottomWidth: 0.8,
    borderColor: "#000",
  },
  item: {
    margin: 18,
    fontSize: 15,
    fontWeight: "bold",
  },
});
