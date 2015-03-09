var ArticleBox = React.createClass({
  render: function() {
    return (
      <Articles data={this.props.data} />
    );
  }
});

var Articles = React.createClass({
  render: function() {
    var commentNodes = this.props.data.results.map(function (results) {
      return (
        <li id={results.asset_id}>
          <ArticleImage data={results} />
          <p>{results.title}</p>
          <p>{results.byline}</p>
          <p>{results.children}</p>
        </li>
      )
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
      media.media[0]["media-metadata"].map(function (format, i) {
        if (format.format === "superJumbo") {
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
