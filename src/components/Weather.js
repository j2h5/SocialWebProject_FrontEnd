import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
  // 상태 변수 정의
  constructor(props) {
    super(props);
    this.state = { temp: 0, desc: '', icon: '', loading: true };
  }
  // 컴포넌트 생성 후 날씨 정보 조회
  componentDidMount() {
    const cityName = 'Seoul';
    const apiKey = '8049ce55f7fd94f1eeabf2499015697e';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    // fetch() 함수를 이용
    // fetch(url)
    //     .then(response => response.json())
    //     .then(responseData => {
    //         this.setState({
    //             temp: responseData.main.temp,
    //             desc: responseData.weather[0].description,
    //             icon: responseData.weather[0].icon,
    //             loading: false
    //         });
    //     })
    //     .catch(error => console.log(error));

    // axios 라이브러리 이용
    axios
      .get(url)
      .then(responseData => {
        console.log(responseData);
        const data = responseData.data;
        this.setState({
          temp: data.main.temp,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          loading: false,
        });
      })
      .catch(error => console.log(error));
  }
  // 날씨 정보 출력
  render() {
    const imgSrc = `http://openweathermap.com/img/w/${this.state.icon}.png`;
    if (this.state.loading) {
      return <p>Loading</p>;
    } else {
      return (
        <div className="App">
          <img src={imgSrc} />
          <p>{this.state.temp}C</p>
          <p>{this.state.desc}</p>
        </div>
      );
    }
  }
}

export default Weather;
