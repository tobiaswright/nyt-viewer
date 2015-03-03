var ArticleBox = React.createClass({
  render: function() {
    return (
      <ArticleList data={this.props.data} />
    );
  }
});

var converter = new Showdown.converter();

var Article = React.createClass({
  render: function() {
    console.log(this.props)

    return (
        <li id={this.props.assetID}>
          <p>{this.props.title}</p>
          <p>{this.props.byline}</p>
          <p>{this.props.children}</p>
        </li>
    );
  }
});

var ArticleList = React.createClass({
  render: function() {
    console.log(this.props.data.results)
    var commentNodes = this.props.data.results.map(function (results) {
      return (
        <Article assetID={results.asset_id}
          title={results.title}
          byline={results.byline}>
            {results.abstract}
        </Article>
      );
    });
    return (
      <ul className="articleList">
        {commentNodes}
      </ul>
    );
  }
});

React.render(
  <ArticleBox data={timesData}/>,
  document.getElementById('content')
);
