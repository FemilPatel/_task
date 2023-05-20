import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const Screen2 = ({ navigation }) => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  useEffect(() => {
    // console.log("location", location);
    if (location !== null && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [location]);

  const hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }

    return false;
  };

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert("Unable to open settings");
      });
    };
    const status = await Geolocation.requestAuthorization("whenInUse");

    if (status === "granted") {
      return true;
    }

    if (status === "denied") {
      Alert.alert("Location permission denied");
    }

    if (status === "disabled") {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        "",
        [
          { text: "Go to Settings", onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ]
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
      },
      {
        accuracy: {
          android: "high",
          ios: "best",
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        // forceLocationManager: useLocationManager,
        showLocationDialog: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 23.7603,
            longitude: 90.4125,
          },
          heading: 0,
          pitch: 0,
          zoom: 11,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        // style={{height: hp(25), width: wp(100)}}
        rotateEnabled={false}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        // region={{
        //   latitude: location?.coords.latitude,
        //   longitude: location?.coords.longitude,
        //   latitudeDelta: 0.015,
        //   longitudeDelta: 0.0121,
        // }}
      >
        {location != null && (
          <View>
            <Marker
              anchor={{ x: 0.5, y: 0.6 }}
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              flat
              style={{
                ...(location.coords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${location.coords.heading}deg`,
                    },
                  ],
                }),
              }}
            >
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={location.coords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
          </View>
        )}
      </MapView>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  dotContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "rgb(0, 120, 255)",
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb(0, 120, 255)",
  },
});
