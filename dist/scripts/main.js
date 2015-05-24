'use strict';

//bring in converter
var converter = new Showdown.converter();

var ArticleBox = React.createClass({
  sortData: function(data) {
      var articles = [];
      var results;

      data = JSON.parse(data);

      results = data.results;
      results.map( function(result) {
        var article = {};
        if (result.section !== 'Opinion' && result.media.length ) {
          result.media[0]['media-metadata'].map(function (image) {
            if (image.format === 'superJumbo' ) {
              article = {
                'title':result.title,
                'url':result.url,
                'byline':result.byline,
                'img':image.url,
                'abstract':result.abstract
              };
              articles.push(article);
            }
          });
        }
      });

      return articles;
  },
  getInitialState: function() {
    return {data: [], isLoading: true};
  },
  componentDidMount: function() {
    var self = this;
    var options = {
      url: 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json',
      source: 'nytimes'
    };

    $.getJSON( 'https://radiant-bayou-8874.herokuapp.com/proxy', options, function(data){
      var articles = self.sortData(data);
      self.onUpdate(articles);
    });
  },
  render: function() {
    return (
      <Articles data={this.state.data} isLoading={this.state.isLoading} />
    );
  },
  onUpdate: function(val){
    this.setState({data: val, isLoading: false});
  }
});

var Captions = React.createClass({

  render: function() {
    var titleMarkup = converter.makeHtml('###'+this.props.article.title);
    var abstractMarkup = converter.makeHtml(this.props.article.abstract);
    return (
      <div>
        <span dangerouslySetInnerHTML={{__html: titleMarkup}} />
        <p className="byline">{this.props.article.byline}</p>
        <span dangerouslySetInnerHTML={{__html: abstractMarkup}} />
        <a href={this.props.article.url} target="_blank">READ ARTICLE</a>
      </div>
    );
  }
});

var Articles = React.createClass({
  render: function() {
    var results = this.props.data;
    var commentNodes;
    if (!this.props.isLoading) {
      commentNodes = results.map(function (result) {
        var article = {title:result.title, abstract:result.abstract, byline:result.byline, url:result.url}
        return (
          <li>
            <ArticleImage image={result.img} />
            <Captions article={article} />
          </li>
        )
    });
    } else {
      commentNodes = 

          <li>
            Loading ...
          </li>

    }

    return (
      <ul className='article'>{commentNodes}</ul>
    );
  }
});

var ArticleImage = React.createClass({
  render: function() {
    return (
      <img className='img' src={this.props.image} />
    )
  }
});

React.render(
  <ArticleBox />,
  document.getElementById('content')
);
