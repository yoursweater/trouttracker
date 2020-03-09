import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import GetLocation from 'react-native-get-location'
import FlySelect from './FlySelect'
import { API_KEY } from './utils/WeatherKeyAPI'


class Home extends React.Component {

  state = {
    trout: null,
    fly: null,
    size: null,
    location: null,
    date: null,
    weather: null,
    caughtFish: []
  }

  componentDidMount() {
    this.findCoordinates()
    this.loadFish()
  }

  loadFish = () => {
    fetch('https://xvjn5cyjk4.execute-api.us-east-1.amazonaws.com/dev/getfish')
      .then(res => res.json())
      .then(fish => {
        // NEED TO POST A REAL FISH UP WITH LOCATION AND TIME DATA
        console.log(fish)
        // let caughtFish = fish.map(fish => {
        //   let tmp = {
        //     type: fish.trout.S,
        //     location: fish.location.S
        //   }
        //   return tmp
        // })
        // this.setState({caughtFish})
      })
  }

  renderCards = () => {
    const troutTypes = ['Rainbow', 'Brook', 'Brown', 'Golden', 'Cutthroat', 'Lake']
    let cards = troutTypes.map((trout, idx) => {
      return (
        <TouchableOpacity onPress={() => this.setState({ trout })} key={idx} style={styles.cards}>
          <Text style={{ fontSize: 30 }}>{trout} Trout</Text>
        </TouchableOpacity>
      )
    })
    return cards
  }

  selectFly = (fly) => {
    this.setState({ fly })
  }

  findCoordinates = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        console.log(location);
        this.setState({ location }, () => this.getWeather(location.latitude, location.longitude))
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  };
  
  getWeather = (lat = 25, lon = 25) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
			.then(res => res.json())
			.then(weather => {
        console.log(weather)
				this.setState({ weather });
			})
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.innerContainer}>
          {/* start header */}
          <Text style={styles.header}>TroutTracker</Text>
          <View style={{ width: '90%', height: 2, backgroundColor: 'grey', marginTop: 10, marginBottom: 10 }}></View>
          {/* end header */}

          {/* select a trout type */}
          {this.state.trout === null && this.renderCards()}

          {/* select a fly */}
          {(this.state.trout && (this.state.fly === null)) && <FlySelect selectFly={this.selectFly} />}


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    padding: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40
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
