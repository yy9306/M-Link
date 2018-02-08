/**
 * Created by shaotingzhou on 2017/4/13.
 */

import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'

import Header from './pages/header'
import SingerDetail from './pages/singerDetail'
import Play from './pages/player/play'
import RankDetail from './pages/rankDetail'

const App = StackNavigator({
  
  Header: {screen: Header},
  SingerDetail: {screen: SingerDetail},
  Play: {screen: Play},
  RankDetail: {screen: RankDetail}
},{
  navigationOptions: {
    gesturesEnabled: true,
  },
  headerMode: 'none'
})

export default App


