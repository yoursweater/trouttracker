import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './components/Home';
import FlyType from './components/FlyType';
import FlySelect from './components/FlySelect';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  FlyType: {screen: FlyType},
  FlySelect: {screen: FlySelect},
},
{
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
  mode: 'card',
},);

const App = createAppContainer(MainNavigator);

export default App;