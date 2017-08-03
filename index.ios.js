/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

// var MOCKED_MOVIES_DATA = [
//   {title: 'Title', year: '2015', posters: {thumbnail: 'https://i.imgur.com/UePbdph.jpg'}},
// ];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'
// var REQUEST_URL = 'https://api.themoviedb.org/3/movie/550?api_key=0d0111855494f219cf2098a5c34ee5d6'


export default class ReactMovieProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
}

componentDidMount() {
  this.fetchData();
}

// fetchData() {
//   fetch(REQUEST_URL)
//     .then((response) => response.json())
//     .then((responseData) => {
//       console.log(responseData.movies);
//       const movies = responseData.movies.map((movie) => {
//         console.log(movie);
//         movie.posters.thumbnail = movie.posters.thumbnail.replace('http:', 'https:');
//         return movie
//       })
//
//       this.setState({ movies });
//     })
//     .done();
// }

  // render() {
  //   var movie = MOCKED_MOVIES_DATA[0];
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{uri: movie.posters.thumbnail}}
  //         style={styles.thumbnail}
  //       />
  //       <View style={styles.rightContainer}>
  //         <Text style={styles.title}>{movie.title}</Text>
  //         <Text style={styles.year}>{movie.year}</Text>
  //       </View>
  //     </View>
  //   );
  // }

  // render() {
  //   if (!this.state.movies) {
  //     return this.renderLoadingView();
  //   }
  //
  //   var movie = this.state.movies[0];
  //   return this.renderMovie(movie);
  // }



  fetchData() {
  fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
            const movies = responseData.movies.map((movie) => {
              console.log(movie);
              movie.posters.thumbnail = movie.posters.thumbnail.replace('http:', 'https:');
              return movie
            })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
        loaded: true,
      });
    })
    .done();
}

  render() {
   if (!this.state.loaded) {
     return this.renderLoadingView();
   }

   return (
     <ListView
       dataSource={this.state.dataSource}
       renderRow={this.renderMovie}
       style={styles.listView}
     />
   );
 }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
  flex: 1,
  },
  title: {
  fontSize: 20,
  marginBottom: 8,
  textAlign: 'center',
  },
  year: {
  textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
  paddingTop: 20,
  backgroundColor: '#F5FCFF',
}

});

AppRegistry.registerComponent('ReactMovieProject', () => ReactMovieProject);
