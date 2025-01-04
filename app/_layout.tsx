import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AboutScreen from "@/app/about";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="record/[day]" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
