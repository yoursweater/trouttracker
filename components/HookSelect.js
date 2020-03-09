import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'



class HookSelect extends React.Component {

  renderHooks = () => {
    const hookSizes = [
        '0',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '14',
        '16',
        '18',
        '20',
        '22',
        '24',
        '26'
    ]
    let cards = hookSizes.map((hook, idx) => {
      return (
        <TouchableOpacity onPress={() => this.props.selectHook({ hook })} key={idx} style={styles.cards}>
          <Text style={{ fontSize: 30, width: '100%', textAlign: 'center' }}>{hook}</Text>
        </TouchableOpacity>
      )
    })
    return cards
  }


  render() {
    return (
      <View style={styles.screenContainer}>
        {/* header */}
        <View style={{justifyContent: 'center', alignItems: 'center'}} >
          <Text >Select hook size</Text>
          <View style={{ width: '100%', height: 2, backgroundColor: 'grey', marginTop: 10, marginBottom: 10 }}></View>
        </View>
        {/* body */}
        <View style={styles.innerContainer}>

            <ScrollView style={{minHeight: '80%',}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {this.renderHooks()}
                </View>
            </ScrollView>

        </View>
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
      padding: 0,
      width: '100%',
    },
    header: {
      fontSize: 40,
      marginTop: 40
    },
    cards: {
      width: 200,
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

export default HookSelect;
