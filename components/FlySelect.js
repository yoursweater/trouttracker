
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';


class FlySelect extends React.Component {

  state = {
    flies: [],
    addfly: ''
  }

  componentDidMount() {
    fetch('https://xvjn5cyjk4.execute-api.us-east-1.amazonaws.com/dev/getflies')
      .then(res => res.json())
      .then(flies => {
        let newflies = flies.map(fly => {
          return fly.flyname.S
        })
        this.setState({flies: newflies})
      })
  }

  renderCards = () => {
    let cards = this.state.flies.map((fly, idx) => {
      return (
        <TouchableOpacity onPress={() => this.props.selectFly(fly)} key={idx} style={styles.cards}>
          <Text style={{ fontSize: 30 }}>{fly}</Text>
        </TouchableOpacity>
      )
    })
    return cards
  }

  onChangeText = (e) => {
    // console.log(e)
    this.setState({ addfly: e })
  }

  submit = () => {
    console.log('POSTING')
    let fly = {flyname: this.state.addfly}
    console.log(fly)
    fetch('https://xvjn5cyjk4.execute-api.us-east-1.amazonaws.com/dev/addfly', {
      method: 'post',
      body: JSON.stringify(fly)
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    // let newflies = [...this.state.flies]
    // newflies.push(this.state.addfly)
    // this.setState({
    //   addfly: '',
    //   flies: newflies
    // })
  }

  render() {
    return (
      <>
        <Text style={{ marginBottom: 10 }}>Add a fly:</Text>
        <TextInput
          style={{ height: 40, width: '100%', borderRadius: 8, padding: 10, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.addfly}
          returnKeyType='done'
          onSubmitEditing={this.submit}
        />
        <Text style={{ paddingBottom: 10, marginTop: 20 }}>Select a fly:</Text>
        {this.renderCards()}
      </>
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

export default FlySelect;
