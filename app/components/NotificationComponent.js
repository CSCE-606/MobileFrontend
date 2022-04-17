import React from 'react';
import ReactDOM from 'react-dom';
import { View, Text, Button, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export class NotificationComponent extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Notification Component
                </Text>
                <TouchableOpacity>
                    <Icon name='book' color='green' />
                    
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='stepbackward' color='red' />
                    
                </TouchableOpacity>

            </View>
        )
    }
};

