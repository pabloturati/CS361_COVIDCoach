$(document).ready(function () {
  let url = `http://newsapi.org/v2/top-headlines?q=COVID&country=us&apiKey=859544f6579f40a2aaf1474bee4c6356`
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'Json',
    beforeSend: function () {
      $('.progress').show()
    },

    complete: function () {
      $('.progress').hide()
    },

    success: function (news) {
      let output = ''
      let latestNews = news.articles

      for (var i in latestNews) {
        output += `
        <div class="row">
        <div class="col col s12 m9 l10">
          <div class="card medium hoverable">
            <div class="card-image">
              <img src="${latestNews[i].urlToImage}" class="responsive-img">
            </div>
            <div class="card-content">
              <span class="card-title activator"><i class="material-icons right">more_vert</i></span>
              <h6>${latestNews[i].title}</h6>

              <div class="card-source">
                <p>Published on : ${latestNews[i].publishedAt}</p>
              </div>

              <div class="card-published">
                <p>${latestNews[i].source.name}</p>
              </div>

            </div>

            <div class="card-reveal">
            <span class="card-title"><i class="material-icons right">close</i></span>
              <p>${latestNews[i].description}</p>
            </div>

            <div class="card-action">
              <a href="${latestNews[i].url}" target="_blank" class="btn" style="background-color:#6796A5;">Read More</a>
            </div>

          </div>
        </div>
        </div>
        `
      }
      if (output !== '') {
        $('#newsResults').html(output)
      }
    },

    error: function () {
      console.log('error')
      $('#newsResults').html('Some error occured')
    },
  })
})
