import React, { Component } from 'react'

export class NewsItem extends Component {
    
    //   Using "this.state" we can set the state inside a constructor
    // And we can set state using props also (this.props)
    // We use state when we change a variable regularly without reloading the page
    // In our news card, we will not set the state, we will pass it as a prop
    // We cannot change the props
    // If we want to set the state by passing props then we can set the state using it and later we can also change the state if we want  but we cannot change the props directly (props are read only)

    render() {
        let {title,description,imageUrl,newsUrl } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/9681/live/d1016790-9b94-11ef-b820-9d6a9f778374.jpg": imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem