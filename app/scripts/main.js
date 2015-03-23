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
                'img':image.url
              };
              articles.push(article);
            }
          });
        }
      });

      return articles;
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var that = this;
    var options = {
      url: 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json',
      source: 'nytimes'
    };

    $.getJSON( 'https://radiant-bayou-8874.herokuapp.com/proxy', options, function(data){
      var articles = that.sortData(data);
      that.setState({data: articles});
    });
  },
  render: function() {
    return (
      <Articles data={this.state.data} />
    );
  }
});

var Captions = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml('###'+this.props.title);
    return (
      <div>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <p className="byline">{this.props.byline}</p>
      </div>
    );
  }
});

var Articles = React.createClass({
  render: function() {
    var results = this.props.data;
    var commentNodes = results.map(function (result) {
        return (
          <li>
            <ArticleImage image={result.img} />
            <Captions title={result.title} byline={result.byline} />
          </li>
        )
    });
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
