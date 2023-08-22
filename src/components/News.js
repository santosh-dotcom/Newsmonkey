import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {  
  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[totalResults, setTotalResults] = useState(0)
  

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  


const updateNews = async () => {
  props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  let parseData = await data.json()
  props.setProgress(70);
  setArticles(parseData.articles)
  setTotalResults(parseData.totalResults)
  setLoading(false)  
  props.setProgress(100);
}

useEffect(() => { 
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
  updateNews();
}, [])


 const handleNextClick = async() =>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){     
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d738c6652e08427dbb2c1b9dfe7347a4&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading: false
    //   })
    // }
    
    setPage(page + 1);
    updateNews();
  }

 const handlePrevClik = async() =>{

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d738c6652e08427dbb2c1b9dfe7347a4&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parseData.articles,
    //     loading: false
    //   })

    setPage(page - 1);
    updateNews();
  }


  const fetchMoreData = async () => {   
   
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;  
    setPage(page + 1);
  setLoading(true)
  let data = await fetch(url);
  let parseData = await data.json()
  setArticles(articles.concat(parseData.articles))
  setTotalResults(parseData.totalResults)  
  };

  
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: "35px 0" , marginTop:"90px"}}>NewMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1> 
       {loading && <Spinner/>}

       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">  
        {articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 86):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>         
        })}       
          
        </div> 
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClik}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  
}

News.defaultProps = {
  country: 'in',
  pagesize: 8,
  category: 'general',
}

News.protoTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
}

export default News