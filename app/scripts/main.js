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
    var commentNodes = this.props.data.results.map(function (results) {
      return (
        <li id={results.asset_id}>
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
