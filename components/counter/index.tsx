import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type CounterProps = {
  count: number;
  setCount: Function;
  min: number;
  max?: number;
};

function Counter({ count = 0, setCount, min = 0, max }: CounterProps) {
  return (
    <View style={styles.container}>
      {/* - */}
      <TouchableOpacity
        disabled={count === min}
        onPress={() => setCount(count - 1)}
        style={styles.button}
      >
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      {/* count */}
      <Text style={styles.count}>{count}</Text>
      {/* + */}
      <TouchableOpacity
        disabled={count === max}
        onPress={() => setCount(count + 1)}
        style={styles.button}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#3a86ff",
    borderRadius: 5,
  },
  count: {
    color: "#555",
  },
  text: {
    color: "#fff",
  },
});

export default Counter;
