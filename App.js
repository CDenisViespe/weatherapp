import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';
import LocationSearch from './src/components/LocationSearch';
import WeatherDisplay from './src/components/WeatherDisplay';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [location, setLocation] = useState('Ipswich, UK');
  const [weatherData, setWeatherData] = useState();

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const getWeather = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=' + apiKey)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setWeatherData({
          temp: json.main.temp,
          humidity: json.main.humidity,
          pressure: json.main.pressure,
          feelsLike: json.main.feels_like,
          description: json.weather[0].description,
          icon: json.weather[0].icon,
          windSpeed: json.wind.speed,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getWeather();
  }, [location]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('./assets/weather-backgrounds/rain.jpg')}
        style={styles.imageBackground}
      >
        <LocationSearch updateLocation={updateLocation} />
        <WeatherDisplay weatherData={weatherData} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
});