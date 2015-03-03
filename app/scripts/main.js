


var ArticleBox = React.createClass({
  render: function() {
    return (
      <ArticleList timesData={this.props.timesData} />
    );
  }
});
var converter = new Showdown.converter();
var Article = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var ArticleList = React.createClass({
  render: function() {
  	console.log(this.props.timesData)
    var commentNodes = this.props.timesData.results.map(function (results) {
      return (
        <Article author={results.author}>
          {results.title}
        </Article>
      );
    });
    return (
      <div className="articleList">
        {commentNodes}
      </div>
    );
  }
});

React.render(
  <ArticleBox timesData={timesData}/>,
  document.getElementById('content')
);


// var nykey = "nytfeed.php";

// var buildImage = function(reseultURL) {
// 	var j = 0,
// 		newPathname = "";

// 	imgurl = reseultURL.url;
// 	imgurl = imgurl.split('/');
// 	imgurl.splice(imgurl.length-1, 2);

// 	for ( j = 0; j < imgurl.length; j++ ) {

// 		if (j === imgurl.length-1){
// 			newPathname += imgurl[j];
// 			newPathname += "/";
// 			newPathname += imgurl[j];
// 			newPathname += "-superjumbo.jpg"
// 		} else {							
// 			newPathname += imgurl[j];
// 			newPathname += "/";							
// 		}
// 	}

// 	return newPathname;
// }


// $().ready(function(){
// 	$.getJSON( nykey , function(data) {
// 		//console.log(data)

// 		$.each(data.results, function(i){
// 			var imgurl,
// 				newPathname,
// 				imgcontent = "",
// 				result = data.results[i];
			
// 			if (
// 				result.media !== '' &&
// 				result.section !== "Opinion" &&
// 				typeof result.media[0]["media-metadata"][1] !== "undefined" &&
// 				typeof result.media !== "undefined"
// 			)
// 			{	

// 				newPathname = buildImage(result.media[0]["media-metadata"][1]);
						

// 				imgcontent = "<li class='article'>";
// 				imgcontent += "<p class='byline'>" + result.section + "</p>";
				
// 				imgcontent += "<div id='imgdiv"+i+"' class='loading'>";
// 				imgcontent += "<img class='hideimage' src='" + newPathname + "' id='jumbo" +i+ "'>";
// 				imgcontent += "</div>";
				
// 				imgcontent += "<p><strong>" + result.title + ".</strong> ";
// 				imgcontent += result.abstract + " ";
// 				imgcontent += "<a href='" + result.url + "' class='readmore'>Read Story</a></p>";
// 				imgcontent += "<p class='byline'>" + result.byline
// 				//if (data.results[i].media[0].copyright) {"/ Photo Credit: " + data.results[i].media[0].copyright + "</p>"};
// 				imgcontent += "</li>";
				
// 				$( imgcontent ).appendTo("#content");
						
// 			}


// 			$('#jumbo'+i).load(function() {
				
// 				//centers images less then the 1024px, the common size for nyt jumbo sizes - usually a portrait
// 				var img_width = this.width;
				
// 				//wanted a nice fade in despite loading time
// 				setTimeout (function () {
// 					$("#imgdiv"+i).removeClass("loading");
// 					$("#jumbo"+i).fadeIn("slow").removeClass("hideimage").addClass("showImage");

// 					if (img_width < 1280) {
// 						$('#jumbo'+i).css({"width":img_width,"display":"block"})
// 					}

// 				}, 3000);
// 			});		
// 		});
// 	});
// });
