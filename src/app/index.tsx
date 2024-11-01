import { StyleSheet, Text, View, FlatList, Image, Dimensions, StatusBar } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'expo-router'
import CategoryData from './CategoryData'
import crowserData from './crowserData'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow'
import { useTheme } from '../context/ThemeContext'

const index = () => {
    const windowWidth = Dimensions.get('window').width;
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const { theme } = useTheme();

    // Auto play effect
    useEffect(() => {
        const timer = setInterval(() => {
            if (currentIndex === crowserData.length - 1) {
                flatListRef.current?.scrollToIndex({
                    index: 0,
                    animated: true,
                });
                setCurrentIndex(0);
            } else {
                flatListRef.current?.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true,
                });
                setCurrentIndex(currentIndex + 1);
            }
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(timer);
    }, [currentIndex]);

    // Handle scroll end to update current index
    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / windowWidth);
        setCurrentIndex(index);
    };

    const renderViewAllButton = () => (
        <Link href='/ExploreMore'>
            <View style={styles.categoryContainer}>
                <View style={[styles.categoryImage, styles.viewAllButton]}>
                    <Text style={styles.viewAllText}>→</Text>
                </View>
                <Text style={styles.categoryTitle}>Explore More</Text>
            </View>
        </Link>
    );

    const styles = StyleSheet.create({
        crowserContainer: {
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
            
        },
        crowserImage: {
            width: '90%',
            height: 200,
            resizeMode: 'cover',
            borderRadius: 20,
        },
        crowserTitle: {
            fontSize: 16,
            marginTop: 5,
            textAlign: 'center',
            color: theme === 'DARK' ? 'white' : 'black'
        },
        categoryContainer: {
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        categoryImage: {
            width: 100,
            height: 100,
            borderRadius: 50
        },
        categoryTitle: {
            fontSize: 16,
            color: theme === 'DARK' ? 'white' : 'black'
        },
        viewAllButton: {
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
        },
        viewAllText: {
            fontSize: 24,
            color: '#666',
        },
        loginButton: {
            // backgroundColor: 'blue',
            color: theme === 'DARK' ? 'white' : 'black',
            padding: 10,
            borderRadius: 5,
        }
    });

    return (
        <GestureHandlerRootView style={{ flex:1, backgroundColor: theme === 'DARK' ? 'black' : 'white' }}>
        <View>
            <StatusBar barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'} backgroundColor={theme === 'DARK' ? 'black' : 'white'} />
            <View>
                <FlatList
                    ref={flatListRef}
                    horizontal={true}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    snapToInterval={windowWidth}
                    decelerationRate="fast"
                    pagingEnabled
                    data={crowserData}
                    onMomentumScrollEnd={handleScroll}
                    getItemLayout={(data, index) => ({
                        length: windowWidth,
                        offset: windowWidth * index,
                        index,
                    })}
                    renderItem={({ item }) => (
                        <View style={[styles.crowserContainer, { width: windowWidth }]}>
                            <Image source={item.image} style={styles.crowserImage} />
                            <Text style={styles.crowserTitle}>{item.title}</Text>
                        </View>
                    )}
                />
            </View>
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    data={CategoryData}
                    renderItem={({ item }) => (
                        <View style={styles.categoryContainer}>
                            <Image source={item.image} style={styles.categoryImage} />
                            <Text style={styles.categoryTitle}>{item.title}</Text>
                        </View>
                    )}
                    ListFooterComponent={renderViewAllButton}
                    ListFooterComponentStyle={{ justifyContent: 'center' }}
                />
            </View>
            
            <Link style={styles.loginButton} href="/(auth)">Login</Link>
            <View>
               <AppleStyleSwipeableRow/>
            </View>
        </View>
        </GestureHandlerRootView>
    )
}

export default index
