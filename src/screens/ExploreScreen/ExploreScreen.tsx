import React, { useCallback, useEffect } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { RootStackScreenProps } from 'src/types'

import { markers } from '../../model/mapData'

const { width } = Dimensions.get('window')

const CARD_HEIGHT = 200

const CARD_WIDTH = width * 0.4

const SPACING_FOR_CARD_INSET = width * 0.1 - 10

export const ExploreScreen = ({ navigation }: RootStackScreenProps<'Explore'>) => {
  const gotBack = useCallback(() => navigation.goBack(), [navigation])

  const regionFrom = (lat: number, lon: number, _distance: number) => {
    const distance = _distance / 2

    const circumference = 40075

    const oneDegreeOfLatitudeInMeters = 111.32 * 1000

    const angularDistance = distance / circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters

    const longitudeDelta = Math.abs(
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(lat),
        Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
      )
    )

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta
    }
  }

  const initialMapState = {
    markers,
    region: regionFrom(-23.598125388634532, -46.680141902215276, 100)
  }

  const [state, setState] = React.useState(initialMapState)

  let mapIndex = 0

  const mapAnimation = new Animated.Value(0)

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3) // animate 30% away from landing on the next item

      if (index >= state.markers.length) {
        index = state.markers.length - 1
      }

      if (index <= 0) {
        index = 0
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index

          const { coordinate } = state.markers[index]

          _map?.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta
            },
            350
          )
        }
      }, 10)

      clearTimeout(regionTimeout)
    })
  })

  const interpolations = state.markers.map((_, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH]

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp'
    })

    return { scale }
  })

  const onMarkerPress = (mapEventData: any) => {
    const markerID = mapEventData._targetInst.return.key

    let x = markerID * CARD_WIDTH + markerID * 20

    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET
    }

    _scrollView?.current.scrollTo({ x, y: 0, animated: true })
  }

  const _map = React.useRef(null)

  const _scrollView = React.useRef(null)

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}>
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale
              }
            ]
          }

          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="contain"
                />
              </Animated.View>
            </MapView.Marker>
          )
        })}
      </MapView>

      <TouchableOpacity
        onPress={gotBack}
        style={{
          borderRadius: 50,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2B748E',
          position: 'absolute',
          top: 80,
          left: 10
        }}>
        <FontAwesome name="angle-left" size={30} color="white" />
      </TouchableOpacity>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}>
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image source={marker.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>

              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#FF6347',
                      borderWidth: 1
                    }
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#FF6347'
                      }
                    ]}>
                    Order Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconBack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  card: {
    // padding: 10,
    // elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    // shadowOpacity: 0.3,
    // shadowOffset: { width: 2, height: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH
    // overflow: 'hidden'
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  textContent: {
    flex: 2,
    padding: 10
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },
  marker: {
    width: 30,
    height: 30
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})
