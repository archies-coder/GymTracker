import RecordWorkoutScreen from "@/app/record/RecordWorkoutScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function RecordWorkoutScreenLayout() {
  const { day } = useLocalSearchParams();
  return <RecordWorkoutScreen day={day} />;
}
