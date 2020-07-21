import React, { useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';



const AppCarasoul = ({ renderItem, pagination = false, data }) => {

    const [activeSlide, setActiveSlide] = useState(0);

    let width = useWindowDimensions().width;

    return (
        <>
            <Carousel
                autoplay={true}
                autoplayInterval={5000}
                loop={true}
                indicatorStyle="white"
                data={data}
                renderItem={renderItem}
                enableSnap={true}
                sliderWidth={width}
                itemWidth={width / 1.2}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            {pagination &&
                <Pagination
                    dotContainerStyle={{ marginTop: -7 }}
                    containerStyle={{ marginTop: -10 }}
                    dotsLength={data.length}
                    activeDotIndex={activeSlide}
                    animatedTension={200}

                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)'
                    }}
                    inactiveDotStyle={{
                        backgroundColor: "gray"
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            }
        </>
    )
}

export default AppCarasoul

const styles = StyleSheet.create({})
