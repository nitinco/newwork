import { Stack } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerStyle: { backgroundColor: useTheme().theme === 'DARK' ? 'black' : 'white' },
            headerTintColor: useTheme().theme === 'DARK' ? 'white' : 'black', title: 'Profile', headerShown: true}} />
        </Stack>
    );
}