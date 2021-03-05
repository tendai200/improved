import React, { Component } from 'react';
import { Alert, Button,Text,Image, TextInput,View, StyleSheet,ActivityIndicator } from 'react-native';
import logo from './assets/wc.png';
import { StatusBar } from 'expo-status-bar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stand: '',
      surburb: '',
      location: '',
      isLoading: true,
      error: null,
      data: null
    };
  }
  baseURL = 'http://open-notify.org/astros/.json';
  
  getData = (ev)=>{
      this.setState({isLoading:false,error:null});
      let url = this.baseURL + '/name';
      let h = new Headers();
      h.append('stand','surburb');
      h.append('X-Client','Location ');

      let req = new Request(url, {
      headers: h,
      method: 'GET'  
      });

      fetch(req)
      .then(response=>response.json())
      .then(this.showData)
      .catch(this.badStuff)
  }

  showData = (data)=>{
    this.setState({isLoading:true,data});
    console.log(data);
  }
  badStuff = (err) => {
    this.setState({isLoading: true,error:err.message});
  }
componentDidMount(){
  
  return fetch('https://api.randomuser.me/')

}
  
  onLogin() {
    const { stand, surburb, location} = this.state;

    Alert.alert('Data entered', `${stand} + ${surburb} + ${location}`);
  }
  render() {
    return (
        <View style = {styles.container}>
        <Text style={{ color: "#60605e",fontSize:22 }}>Housing management App vs</Text>
        <StatusBar style="dark" />
            { !this.state.isLoading && (
                <Text>LOADING</Text>
            )}
        <Image source={logo} style={{ width: 305, height: 250 }}/> 
            <Text style={styles.txt}>HTENG VS OO1</Text>
            <TextInput
          value={this.state.stand}
          onChangeText={(stand) => this.setState({ stand })}
          placeholder="stand number"
          placeholderTextColor="#60605e"
          keyboardType={'numeric'}
          style={styles.input}
        />
        <TextInput
          value={this.state.surburb}
          onChangeText={(surburb) => this.setState({ surburb })}
          placeholder={'Surbub'}
          placeholderTextColor="#60605e"
          //secureTextEntry={true}
          style={styles.input}
        />
          <TextInput
          value={this.state.location}
          onChangeText={(location) => this.setState({ location })}
          placeholder={'Town'}
          placeholderTextColor="#60605e"
          style={styles.input}
        />

            <Button title="Submit"
                onPress={this.getData} />

            { this.state.error && (
                <Text style={styles.err}>{this.state.error}</Text>
            )}
            { this.state.data && this.state.data.length > 0 && (
                this.state.data.map( name => (
                    <Text key={name.id} style={styles.txt}>
                       { name.gender}    
                    </Text>
                ))
            )}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  err:{
    color: 'red',
    fontSize:20,
    fontWeight: 'bold'
}
});
