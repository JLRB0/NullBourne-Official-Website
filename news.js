
"use strict";

var NEWS_ENDPOINT = "misc/news.json";

var newsContainer = document.getElementById("newsContainer");
var newsTitle = document.getElementById("newsTitle");

// When the document is loaded...
$(document).ready(function() {
    // Make the AJAX request to news.json.
    $.ajax({
        url: NEWS_ENDPOINT,
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var post = data[i];

                var postElement = `
                    <div class="post">
                        <a href="${post.pageLink}"> <img class="thumbnail" src="${post.thumbnailUrl}" ></img> </a>
                        <div class="postInfo">
                            <h1 class="postTitle">${post.title}</h1>
                            <h4 class="postDate">${new Date(post.dateCreated).toLocaleDateString({
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</h4>
                            <p class="postContent">${post.content}</p>
                        </div>
                    </div>
                `;

                newsContainer.innerHTML += postElement;
            }
        }
    });

});





