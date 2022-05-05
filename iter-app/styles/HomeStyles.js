import { StyleSheet, Dimensions } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

const ScreenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: 45,
        width: 45,

        borderRadius: 3,
        backgroundColor: LightColors.background,
    },

    map: {
        width: ScreenWidth,
        // height: Dimensions.get('window').height,
        height: '100%',
        zIndex: 0,
    },
    
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',

        // height: 45,
        width: ScreenWidth,
        top: 44,
        position: 'absolute',
        paddingHorizontal: 15,
        zIndex: 1,
    },

    loading: {
        position: 'absolute',
        top: 104,
        zIndex: 1,

        width: ScreenWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '15%',

        borderRadius: 3,
        backgroundColor: LightColors.background,
    },
    
    buttonsContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        width: 45,
        position: 'absolute',
        bottom: 100,
        right: 15,
        zIndex: 3,
    },
    timelineContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,

        height: 45,
        width: ScreenWidth - 30,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        zIndex: 1,

        borderRadius: 3,
        backgroundColor: LightColors.background,
    },
    play: {
        width: 24,
        height: 45,
    },
    timeline: {
        flexGrow: 1,
        marginHorizontal: 15,
    },
    timeContainer: {
        // width: 40,
    },
    time: {
        fontSize: 16,
        color: LightColors.text,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    button: {
        ...styles.button,
        backgroundColor: DarkColors.background,
    },
    loadingInner: {
        ...styles.loadingInner,
        backgroundColor: DarkColors.background,
    },
    timelineContainer: {
        ...styles.timelineContainer,
        backgroundColor: DarkColors.background,
    },
    time: {
        ...styles.time,
        color: DarkColors.text,
    },
});

export const darkMapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
];