import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { styles } from "../styles/styles";

export default function TelaAbertura() {
  return (
    <View style={styles.splashContainer}>
      <Image
        source={require("../../assets/meu-logo.jpg")}
        style={styles.splashLogo}
      />
      <Text style={styles.splashText}>
        Transforme ingredientes em pratos incríveis
      </Text>
      <ActivityIndicator size="large" color="#ea1d2c" />
    </View>
  );
}
