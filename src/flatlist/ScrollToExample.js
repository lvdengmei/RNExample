import React, {Component} from 'react';
import {Text, View, FlatList, Dimensions, Button, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 50,
    flex: 1,
    borderWidth: 1,
};

const COLORS = ['deepskyblue', 'fuchsia', 'lightblue '];

function getData(number) {
    let data = [];
    for (var i = 0; i < number; ++i) {
        data.push("" + i);
    }

    return data;
}

class ScrollToExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
        this.initialScrollIndex = 50;
    }


    getItemLayout = (data, index) => (
        {length: 50, offset: 50 * index, index}
    );

    getColor(index) {
        const mod = index % 3;
        return COLORS[mod];
    }

    scrollToIndex = () => {
        let randomIndex = Math.floor(Math.random(Date.now()) * this.state.data.length);
        this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
    };

    deleteItem = (item, index) => {
        this.initialScrollIndex = index > 1 ? index - 1 : 0;
        let filterDatas = this.state.data.filter(temp => {
            if (item != temp) {
                return true;
            }
        });
        this.setState({
            data: filterDatas
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button
                        onPress={this.scrollToIndex}
                        title="Tap to scroll to item"
                        color=" lightseagreen"
                    />
                </View>
                <FlatList
                    style={{flex: 1}}
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    keyExtractor={item => item}
                    getItemLayout={this.getItemLayout}
                    initialScrollIndex={this.initialScrollIndex}
                    initialNumToRender={2}
                    renderItem={({item, index}) => (
                        <View style={{...style, backgroundColor: this.getColor(index)}}>
                            <Text>{item}</Text>
                            <Button title="删除" onPress={()=>this.deleteItem(item,index)} />
                        </View>
                    )}
                    data={this.state.data}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 50,
        flex: 1,
        borderWidth: 1
    },
    header: {
        height: 80,
        backgroundColor: 'darkturquoise',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default class MyFlatList extends Component {
    render() {
        return <ScrollToExample
            data={getData(100)}
        />
    }
}
