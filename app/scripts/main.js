var ArticleBox = React.createClass({
  render: function() {
    return (
      <ArticleList data={this.props.data} />
    );
  }
});

var Article = React.createClass({
  render: function() {
    console.log(this.props)
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
    console.log(this.props.data)
    var articleImage = this.props.data.media[0]["meta-metadata"].map(function (format) {
      console.log(format)

          if (format === "superJumbo") {
          return (
            url
          )
        }
      });
      return (
        <img src={articleImage} />
      )
  }
})

var ArticleList = React.createClass({
  render: function() {
    console.log(this.props.data.results)
    return (
        <Article data={this.props.data} />
    );
  }
});

React.render(
  <ArticleBox data={timesData}/>,
  document.getElementById('content')
);
