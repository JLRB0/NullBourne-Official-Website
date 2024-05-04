
"use strict";

var NEWS_ENDPOINT = "misc/news.json";
var NEWS_PINNED_ENDPOINT = "misc/news_pinned.json";
var NEWS_OLDEST_ENDPOINT = "misc/news_oldest.json";

var newsContainer = document.getElementById("newsContainer");
var newsTitle = document.getElementById("newsTitle");

// News Sort Menu
const news_Sort_Menu = document.querySelector("#newsSortMenu"),
        news_Sort_Button = news_Sort_Menu.querySelector("#newsSortButton"),
        news_Sort_Active = news_Sort_Menu.querySelector("#newsSortActive"),
        news_Sort_Options = news_Sort_Menu.querySelectorAll(".newsSortItem");

    news_Sort_Button.addEventListener("click", () => news_Sort_Menu.classList.toggle("active"));

    news_Sort_Options.forEach(newsSortItem => {
            newsSortItem.addEventListener("click", () => {
                let selectedItem = newsSortItem.querySelector(".newsSortItemText").innerText;

                news_Sort_Active.innerText = selectedItem;

                news_Sort_Menu.classList.remove("active");

                switch(selectedItem) {
                    case "Pinned":
                        fetchPosts(NEWS_PINNED_ENDPOINT);
                        break;
                    case "Newest":
                        fetchPosts(NEWS_ENDPOINT);
                        break;
                    case "Oldest":
                        fetchPosts(NEWS_OLDEST_ENDPOINT);
                        break;
                }
            })
    })

// When the document is loaded...
$(document).ready(function() {
    fetchPosts(NEWS_ENDPOINT); // Load the default news on page load
});
    // Make the AJAX request to news.json.
    function fetchPosts(url) {
        $.ajax({
            url: url,
            dataType: "json",
            success: function(data) {
                newsContainer.innerHTML = "";
                data.forEach(post => {
                    var postElement = `
                        <div class="post">
                            <a href="${post.pageLink}"><img class="thumbnail" src="${post.thumbnailUrl}"></img></a>
                            <div class="postInfo">
                                <h1 class="postTitle">${post.title}</h1>
                                <h4 class="postDate">${new Date(post.dateCreated).toLocaleDateString({
                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                })}</h4>
                                <p class="postContent">${post.content}</p>
                            </div>
                        </div>
                    `;
                    newsContainer.innerHTML += postElement;
                });
            }
        });
    }
