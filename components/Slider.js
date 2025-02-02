import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { Dimensions, Text, Image, StyleSheet } from 'react-native';
import {
    View,
} from 'react-native';

import { theme } from './core/theme';

const { width: screenWidth } = Dimensions.get('window')

export default class MyCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: props.item,
            activeSlide: props.index,
            images: props.item
        }
        
    }

   
    componentDidUpdate(prevProps){ 

       if (this.state.images != prevProps.item){
           this.setState({images: prevProps.item})
           this.setState({entries: prevProps.item})
           this.setState({activeSlide: prevProps.index})
       }
    }

    _renderItem({ item, index }) {
        return (
            <View key={index} style={styles.container}>
                <Image
                    source={{
                        uri: `data:image/jpeg;base64,${item.base64}`,
                    }}
                    alt="Image Alt"
                    style={styles.image}
                />
            </View>
        )
    }

    get pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    backgroundColor: theme.colors.black
                }}
                containerStyle={{
                    paddingTop: 10,
                    paddingBottom: 0,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        const sliderWidth = Dimensions.get('window').width;
        const itemHeight = Dimensions.get('window').height;
        return (
            <View>
                <Carousel
                    layout='tinder'
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 10}
                    data={this.state.images}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeSlide: index })}
                    hasParallaxImages={true}
                    lockScrollWhileSnapping={true}
                />
                {this.pagination}
            </View>
        );

    }
}

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        borderRadius: 8,
        // borderWidth: 1
    },
    image: {
        width: 350,
        height: 400,
        maxHeight: 400
    },
    container: {
        height: 400,
        width: 400
    }
})