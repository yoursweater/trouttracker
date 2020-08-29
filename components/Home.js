import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert   } from 'react-native'
import GetLocation from 'react-native-get-location'
import FlySelect from './FlySelect'
import HookSelect from './HookSelect'
import { API_KEY } from './utils/WeatherKeyAPI'
import { ScrollView } from 'react-native-gesture-handler'
import uuid4 from 'uuid4'
import Geolocation from '@react-native-community/geolocation';


class Home extends React.Component {

  state = {
    trout: null,
    fly: null,
    hooksize: null,
    location: null,
    date: null,
    weather: null,
    caughtFish: [],
    startWizard: true
  }

  componentDidMount() {

    // Geolocation.getCurrentPosition(info => console.log(info));

    // this.findCoordinates()
    this.loadFish()
  }

  loadFish = () => {
    fetch('https://xvjn5cyjk4.execute-api.us-east-1.amazonaws.com/dev/getfish')
      .then(res => res.json())
      .then(fish => {
        // NEED TO POST A REAL FISH UP WITH LOCATION AND TIME DATA
        // console.log(fish)
        let caughtFish = fish.map(fish => {
        let locParse = JSON.parse(fish.location.S)
        
          let tmp = {
            type: fish.trout.S,
            longitude: locParse["longitude"],
            latitude: locParse["latitude"]
          }
          return tmp
        })
        console.log('========= CAUGHT FISH =================')
        // console.log(caughtFish)

        this.setState({caughtFish}, () => console.log(this.state.caughtFish))
      })
  }

  renderCards = () => {
    const troutTypes = ['Rainbow', 'Brook', 'Brown', 'Golden', 'Cutthroat', 'Lake',]
    let cards = troutTypes.map((trout, idx) => {
      return (
        <TouchableOpacity onPress={() => this.setState({ trout })} key={uuid4()} style={styles.cards}>
          <Text style={{ fontSize: 30 }}>{trout} Trout</Text>
        </TouchableOpacity>
      )
    })
    return cards
  }

  selectFly = (fly) => {
    this.setState({ fly })
  }

  selectHook = (hooksize) => {
    this.setState({ hooksize: hooksize.hook }, () => this.submitFish())
  }

  submitFish = async () => {
    try {
      await this.findCoordinates()
    } catch (err) {
      Alert.alert('Had trouble getting weather/geolocation coordinates!')
    }
    console.log(this.state)
    let fish = {
      trout: this.state.trout,
      fly: this.state.fly,
      date: (this.state.date).toISOString(),
      weather: JSON.stringify(this.state.weather),
      location: JSON.stringify(this.state.location),
      hooksize: this.state.hooksize
    }
    fetch('https://xvjn5cyjk4.execute-api.us-east-1.amazonaws.com/dev/addfish', {
      method: 'post',
      body: JSON.stringify(fish)
    })
    .then(res => {
      console.log(res)
      // this.updateFlies()
      this.setState({
        trout: null,
        fly: null,
        hooksize: null,
        location: null,
        date: null,
        weather: null,
      })
    })
    .catch(err => {
      console.log(err)
      Alert.alert('Had trouble posting new fish to the database!')
      this.setState({
        trout: null,
        fly: null,
        hooksize: null,
        location: null,
        date: null,
        weather: null,
      })
    })

  }

  findCoordinates = () => {
    let result = new Promise((res, rej) => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
      .then(location => {
          console.log(location);
          this.setState({ location }, async () => {
            await this.getWeather(location.latitude, location.longitude)
            res()
          })
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
          rej()
      })
    })
    return result
  };
  
  getWeather = (lat = 25, lon = 25) => {
    let result = new Promise((res, rej) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(weather => {
          console.log(weather)
          this.setState({ 
            weather,
            date: new Date()
          }, () => res());
        })
        .catch(err => {
          console.log(err)
          rej()
        })
    })
    return result
  }

  renderCaughtFish = () => {
    let caughtFish = this.state.caughtFish.map((fish, idx) => {
      return(
      <View key={uuid4()}>
        <Text>{fish['type']}</Text>
      </View>
      )
    })
    
    return caughtFish
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        {/* header */}
        <View >
          <Text style={styles.header}>TroutTracker</Text>
          <View style={{ width: '90%', height: 2, backgroundColor: 'grey', marginTop: 10, marginBottom: 10 }}></View>
        </View>
        {/* body */}
        <ScrollView style={styles.innerContainer}>

          {/* 1. select a trout type */}
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            {(this.state.trout === null && this.state.startWizard === true) && this.renderCards()}
            {(this.state.trout === null && this.state.startWizard === false) && this.renderCaughtFish()}
          </View>

          {/* 2. select a fly */}
          {(this.state.trout && (this.state.fly === null)) && <FlySelect selectFly={this.selectFly} />}

          {/* 3. select a hook size */}
          {(this.state.trout && this.state.fly && this.state.hooksize === null) && <HookSelect selectHook={this.selectHook} />}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    padding: 40,
    paddingTop: 0,
    width: '100%',
  },
  header: {
    fontSize: 40,
    marginTop: 40
  },
  cards: {
    width: '90%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default Home;
