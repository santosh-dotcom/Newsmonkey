import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  // articles= [{"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com","description":"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg","publishedAt":"2020-04-27T11:41:47Z","content":"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"},{"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com","description":"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg","publishedAt":"2020-03-30T15:26:05Z","content":"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"}]

  constructor(){
    super();
    console.log("Hello i am a constructor from news component");
    this.state ={
      articles: [],
      loading: false
    }    
  }

 async componentDidMount(){
    console.log('cdm');
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=d738c6652e08427dbb2c1b9dfe7347a4";
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles: parseData.articles})
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewMonkey - Top Headlines</h1> 
        <div className="row">  
        {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 86):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>         
        })}
          
        </div> 
      </div>
    )
  }
}

export default News