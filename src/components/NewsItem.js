import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div>
        <span className="display-flex badge rounded-pill bg-danger" style={{right: '0', zindex:"1" }}> {source}
            </span></div>
          <img src={!imageUrl?"https://images.hindustantimes.com/tech/img/2023/08/15/1600x900/bgmi_1688952381443_1692063446647.png":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="-blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
