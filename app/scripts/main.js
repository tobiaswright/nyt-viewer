var converter = new Showdown.converter();

var ArticleBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var that = this
    var options = {
      url: 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json',
      source: "nytimes"
    };

    $.getJSON( "https://radiant-bayou-8874.herokuapp.com/proxy", options, function(data){
      data = JSON.parse(data);
      that.setState({data: data.results});
      console.log(this, that)
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
    console.log(this.props.data)
    var rawMarkup = converter.makeHtml('###'+this.props.data.title.toString());
    return (
      <div>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <p>{this.props.data.byline}</p>
      </div>
    );
  }
});


var Articles = React.createClass({
  render: function() {
    console.log("allo", this.props.data)
    var results = this.props.data;
    console.log("allo", results)
    var commentNodes = results.map(function (result) {
      if (result.section !== "Opinion" && result.media.length ) {
        return (
          <li>
            <ArticleImage data={result} />
            <Captions data={result} />
          </li>
        )
      }
    });
    return (
      <ul className="article">{commentNodes}</ul>
    );
  }
});

var ArticleImage = React.createClass({
  render: function() {
    var media = this.props.data;
    var superImages = [];

    if (media.media.length) {
      media.media[0]["media-metadata"].map(function (format) {
        if (format.format === "superJumbo" ) {
          superImages.push(format.url)
        }
      });
    }

    return (
      <img className="img" src={superImages.map( function(img){ return img })} />
    )
  }
});

React.render(
  <ArticleBox />,
  document.getElementById('content')
);
