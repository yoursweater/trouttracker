import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FlySelect from './FlySelect'


class Home extends React.Component {

  state = {
    trout: null,
    fly: null,
    date: null,
    weather: null,
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
