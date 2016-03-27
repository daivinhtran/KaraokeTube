//Copyright: Sim Kieu, Vinh Tran, Anh Thai, Son Nguyen
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
        getVideo();
    });

});


function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBZsVLTMScOiyXsdNF_BCNVkOwPF__LDto");
    gapi.client.load("youtube", "v3").then(function() {
      getVideo();
    });
}

function getVideo() {
    var request = gapi.client.youtube.search.list({
         part: "snippet",
         type: "video",
         q: $("#search").val().replace(" ", "+") + "+karaoke",
         maxResults: 10,
         order: "relevance",
    });
    // execute the request
    request.execute(function(response) {
       var results = response.result;
       $("#results").find('li:not(:first)').remove();
       $.each(results.items, function(index, item) {
         $.get("tpl/item.html", function(data) {
              var newtitle = beautify(item.snippet.title);
             $("#results").append(tplawesome(data, [{"title":newtitle, "videoid":item.id.videoId, "pic":item.snippet.thumbnails.high.url}]));
         });
       });
       resetVideoHeight();
    });
    $(window).on("resize", resetVideoHeight);
}



function insertList(id,title) {
  console.log(title);
  console.log(videoid);
  var videoid = id;

  var songDiv = '<div id="' + id + 'song"' + ' class="waves-effect card-panel col s12 hoverable"><h6>' + beautify(title) + '</h6></div>';
  var songDivID = "#" + id + "song";
  
  $("#playlist").append(songDiv);
    $(songDivID).click(function(){
    play(id);
  });
}

function play(id) {
  $("#player").children().remove();
  
  
  var element = '<div class="video-container"><iframe id="YTplayer" width="853" height="700" src="//www.youtube.com/embed/' + id + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';


  $("#player").append(element);

  

    var songDiv = "#" + id + 'song';
  console.log(songDiv);
  $(songDiv).remove();
}

function beautify(s) {
    s = s.toLowerCase();
    var arr = ['<', '>', '/', '\\', '~', '|', '+', '-', '=', '^', '[', ']', '{', '}', '(', ')', '*', '?', '.', '@', '!', '#', '%', '&', ' karaoke', 'karaoke ','\"', '"', '\'', "'"];
    for (var i = 0; i < arr.length; i++) {
        s = s.replace(arr[i], '');
    }
  s = s.replace('karaoke','');
    var r = '';
    for (var i = 0; i < s.length; i++) {
        if (i == 0) {
            r += s[i].toUpperCase();
        } else if (s[i-1] == ' ') {
            r += s[i].toUpperCase();
        } else {
            r += s[i];
        }
    }
    return s;
}














 