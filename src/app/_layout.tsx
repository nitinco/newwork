import { Link, Stack } from "expo-router";
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import SplashScreen from './SplashScreen';
import { Avatar, Icon, Div } from 'react-native-magnus';
import { ThemeContext } from '../context/ThemeContext';

export default function RootLayout() {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState('LIGHT');

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        if (colorScheme === 'dark') {
            setTheme('DARK')
        } else {
            setTheme('LIGHT')
        }

        // Add listener for theme changes
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        // Simulate any initialization process
        setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Show splash for 3 seconds
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Stack screenOptions={{ headerStyle: { backgroundColor: theme === 'DARK' ? 'black' : 'white' }, headerTintColor: theme === 'DARK' ? 'white' : 'black' }}>
                <Stack.Screen name="index" options={{ headerShown: true, title: 'Clubs', headerRight: () => <Div>
                        <Link href="/(auth)"><Icon name="user" fontFamily="Entypo" fontSize='2xl' color={theme === 'DARK' ? 'white' : 'black'} /></Link>
                    </Div> }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="ExploreMore" options={{ headerShown: true, title: 'Explore More' }} />
            </Stack>
        </ThemeContext.Provider>
    );
}
