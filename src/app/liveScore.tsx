import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class AppleStyleSwipeableRow extends Component {
  close = () => {
    if (this.swipeableRow) {
      this.swipeableRow.close();
    }
  };

  private swipeableRow: Swipeable | null = null;

  renderLeftActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>
  ) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  render() {
    return (
      <Swipeable renderLeftActions={this.renderLeftActions}>
        <Text style={{ color: 'black', fontSize: 20, flex:1, alignContent: 'center',justifyContent: 'center' }}>"hello"</Text>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
});

// export default AppleStyleSwipeableRow;
