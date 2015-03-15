var converter = new Showdown.converter();

var ArticleBox = React.createClass({
  render: function() {
    return (
      <Articles data={this.props.data} />
    );
  }
});

var Captions = React.createClass({
  
  render: function() {
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
    var results = this.props.data.results;
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
  <ArticleBox data={timesData}/>,
  document.getElementById('content')
);
