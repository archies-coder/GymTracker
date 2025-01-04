import AboutScreen from "@/app/about";
import { Link, useNavigation, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import "../global.css";
import { GluestackUIProvider } from "@/components/ui";
import global from "@/assets/styles/global";

const DAYS = {
  LEGS: "LEGS",
  CHEST_AND_SHOULDERS: "CHEST_AND_SHOULDERS",
  BACK: "BACK",
  ARMS: "ARMS",
};

const LIFTS = {
  [DAYS.LEGS]: ["HAMSTRING_CURLS", "LEG_EXTENSION"],
  [DAYS.CHEST_AND_SHOULDERS]: [
    "INCLINE_SM_PRESS",
    "CABLE_LATERAL_RAISE",
    "CABLE_BENCH_FLYS",
  ],
  [DAYS.BACK]: ["LAT_PULLDOWN", "DB_ROW", "SM_SHRUGS"],
  [DAYS.ARMS]: ["ROPE_PUSHDOWN", "MACHINE_PREACHER_CURL"],
};

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <GluestackUIProvider>
      <View style={global.container}>
        <Text style={global.greeting}>Welcome Back, Archie!!</Text>
        {/* Previous Lifts card */}
        <View style={global.card}>
          <Text style={global.cardTitle}>Previous Workout</Text>
          <Text style={global.cardContent}>
            Incline SM press (Plates x Reps):{" "}
          </Text>
          <Text style={global.cardContent}>3x5</Text>
          <Text style={global.cardContent}>2.5x5</Text>
          <Text style={global.cardContent}>2x6</Text>
        </View>

        {/* Start Workout button */}
        <TouchableOpacity
          style={global.button}
          onPress={() => router.navigate("record/chest")}
        >
          <Text style={global.buttonText}>Start Training</Text>
        </TouchableOpacity>
      </View>
    </GluestackUIProvider>
  );
}
