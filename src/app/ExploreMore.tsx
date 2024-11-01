import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import CategoryData from './CategoryData'
import { useTheme } from '../context/ThemeContext'

const ExploreMore = () => {
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: useTheme().theme === 'DARK' ? 'black' : 'white',
        color: useTheme().theme === 'DARK' ? 'white' : 'black'
       
    },
   
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    itemContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: 10,
        color: useTheme().theme === 'DARK' ? 'white' : 'black'
    }
})
  return (
    <View style={styles.container}>
      <FlatList
        data={CategoryData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
            <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.image}/>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        )}
      />
    </View>
  )
}

  export default ExploreMore

