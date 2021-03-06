import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'

import HttpMusic from '../api/api'
import Swiper from 'react-native-swiper'
import {jumpPager, width} from '../base/Utils'

export default class Recommend extends Component{
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      bannerData: {},
      decList: []
    }
    this.bgColor = '#222'
    this.HttpMusic = new HttpMusic()
    this.requestData()
    this.requestDisc()
    this.bgColor = '#222222'
  }
  
  requestDisc() {
    this.HttpMusic.getDiscUrl()
      .then((request) => {
        if(request.code === 0) {
          this.setState({decList: request.data.list})
        }else {
          console.log(error)
        }
      })
  }
  
  requestData() {
    this.HttpMusic.getBanner()
      .then((request) => {
        if(request.code === 0) {
          this.setState({bannerData: request.data})
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.bannerData.slider && this.state.bannerData.slider.length &&
          <View style={styles.swiper}>
            <Swiper style={styles.wrapper} height={200}
                    dot={<View style={{
                      backgroundColor: '#fff',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3
                    }}/>}
                    activeDot={<View style={{
                      backgroundColor: 'hsla(0,0%,100%,.8)',
                      width: 16,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3
                    }}/>} loop
            >
              {this.state.bannerData.slider.map((item, index) => {
                let reg = /(?=\:)/g
                let imgUrl = item.picUrl.replace(reg, 's')
                return (
                  <View key={index} style={styles.slide}>
                    <Image style={styles.image} resizeMode='stretch'
                           source={{uri: imgUrl}}/>
                  </View>
                )
              })}
            </Swiper>
          </View>
          }
          <View style={styles.hotRecomment}>
            <Text style={styles.hot}>热门推荐歌单</Text>
          </View>
          {this.state.decList.length > 0 && <View style={styles.scrollLists} ref="scrollLists">
            {this.state.decList.map((item, index) => {
              let reg = /(?=\:)/g
              let image = item.imgurl.replace(reg, 's')
              // console.log(item)
              return (
                <TouchableOpacity key={index} onPress={() => {
                  jumpPager(this.props.navigate, 'SingerDetail', {
                    title: item.dissname,
                    avatar: item.imgurl.replace(/(?=\:)/g, 's'),
                    id: item.dissid,
                    page: 'Recommend'
                  })
                }}>
                  <View style={styles.scrollList}>
                    <Image style={styles.scroll_list_image} source={{uri: image}} />
                    <View style={styles.scroll_right_list}>
                      <Text numberOfLines={1} style={styles.scroll_name}>{item.creator.name}</Text>
                      <Text numberOfLines={1} style={styles.scroll_desc}>{item.dissname}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222'
  },
  swiper: {
    width: width,
    height:200,
    // backgroundColor: 'red'
  },
  swiper_children_view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  swiper_children_image: {
    width,
    height: 200,
    flex: 1
  },
  swiper_dot: {
    backgroundColor: 'red',
    width: 16,
    height: 2,
    borderRadius: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  swiper_activeDot: {
    backgroundColor: '#fff',
    width: 16,
    height: 2,
    borderRadius: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  swiper_pagination: {
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  
  image: {
    width,
    height: 200,
    flex: 1
  },
  hotRecomment: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hot: {
    fontSize: 16,
    color: '#ffcd32',
  },
  scrollLists: {
    flex: 1,
    width: width,
  },
  scrollList: {
    width: width,
    padding: 20,
    paddingTop: 0,
    flexDirection: 'row'
  },
  scroll_list_image: {
    width: 60,
    height: 60,
  },
  scroll_right_list: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center'
  },
  scroll_name: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 14,
  },
  scroll_desc: {
    color: 'hsla(0,0%,100%,.3)',
    fontSize: 14
  }
})