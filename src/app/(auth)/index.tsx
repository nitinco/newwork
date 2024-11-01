import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Div, Icon, Image, Text, Button } from 'react-native-magnus';
import profileData from './profileData';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const index = () => {
    const router = useRouter();

    const handleEditProfile = () => {
        router.push('/edit-profile');
    };
    const styles = StyleSheet.create({
    
        card: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
    
        },
        card2: {
            flex: 1,
            width: '100%',
            height: 400,
            // backgroundColor: 'white',
            // padding: 20,
            
        },
        flatlist: {
            backgroundColor: useTheme().theme === 'DARK' ? 'black' : 'white',
            borderColor: useTheme().theme === 'DARK' ? 'white' : 'black',
            borderWidth: 1,
        },
        icon: {
            color: useTheme().theme === 'DARK' ? 'white' : 'black'
        },
        text: {
            color: useTheme().theme === 'DARK' ? 'white' : 'black'
        }
    
    })
    

    return (
        <View style={{ flex:1, alignItems: 'center', backgroundColor: useTheme().theme === 'DARK' ? 'black' : 'white' }}>
            <Div style={styles.card} borderColor='white' borderWidth={1} shadow="2xl" bg={useTheme().theme === 'DARK' ? 'black' : 'white'} h={200} w={200} rounded="md" mt={20} >
                <Image rounded="circle" w={100} h={100} source={require('../../../assets/images/image1.jpg')} />
                <Text fontSize={20} fontWeight="bold" color={useTheme().theme === 'DARK' ? 'white' : 'black'}>John Doe</Text>
            </Div>
            <Div style={styles.card2}>
                <FlatList
                    data={profileData}
                    renderItem={({ item }) => (
                        <Div style={styles.flatlist} m={20} p={10} rounded="md" flexDir="row" alignItems="center">
                            <Icon style={styles.icon} name={item.icon} fontFamily="Entypo" fontSize={20} mr={10} />
                            <Div>
                                <Text style={styles.text} fontSize={16} fontWeight="bold">{item.title}</Text>
                                <Text style={styles.text}>{item.value}</Text>
                            </Div>
                        </Div>
                    )}
                />
                <Button 
                    bg="blue500" 
                    h={50} 
                    w={300} 
                    alignSelf="center" 
                    mb={20} 
                    rounded="circle"
                    onPress={handleEditProfile}
                >
                    Edit Profile
                </Button>
            </Div>
        </View>
    )
}

export default index

