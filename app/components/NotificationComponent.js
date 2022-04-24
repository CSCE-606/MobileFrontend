import React from 'react';
import ReactDOM from 'react-dom';
import { View, Text, Button, Touchable } from 'react-native';
import { Directions, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export class NotificationComponent extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    'friend name' Request
                </Text>
                
                    
                
                <View style={{flexDirection: 'row'}}>
                    <Icon name='check' color='green' />
                    <Icon name='close' color='red' />
                    
                </View>

            </View>
        )
    }
};

