
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 9,
        category: 'general',
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor() {
        super();
        console.log("This is a constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 35,
        }; // Add semicolon here
    }

    async componentDidMount() {
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3185dcc67af42079fa72db21b2b7bb9&page=1&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles || [],
                totalResults: parsedData.totalResults || 0,
                loading:false,
            });
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3185dcc67af42079fa72db21b2b7bb9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        });
    };

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3185dcc67af42079fa72db21b2b7bb9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        });
    };

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: '40px 0px', marginTop:'90px' }}>
                    <span style={{ color: 'yellow' }}>SnapNewz</span>
                    <span style={{ color: 'white' }}> - Top Headlines</span>
                </h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem
                                title={element.title || " "}
                                description={element.description || " "}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                            />
                        </div>
                    ))}
                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-warning"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page * this.props.pageSize >= this.state.totalResults}
                        type="button"
                        className="btn btn-warning"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;



