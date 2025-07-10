document.addEventListener("DOMContentLoaded", () => {
    const portalButton = document.getElementById("portal_button");

    function feedItem(title, body, linkUrl, imageUrl) {
    this.title = title;
    this.body = body;
    this.linkUrl = linkUrl;
    this.imageUrl = imageUrl;
    }



    const currentStories = [
    new feedItem(
        "Jason Lezak's comeback against France in the Mens 4x100 Freestyle Relay",
        "An electrifying race forever etched in the annals of sports history. It was billed as one of the greatest comebacks of all time.",
        "https://shorturl.at/If4PY",
        "/images/Swimming_comeback.jpg"
    ),
    new feedItem(
        "Marist Story2",
        "This is the body of the story, it may be longer.",
        "http://my.marist.edu",
        "/images/news_pic.jpg"
    ),
    new feedItem(
        "Marist Story3",
        "This is the body of the story, it may be longer.",
        "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
        "/images/hancock.jpeg"
    )
];
const displayItem = (feedItem) => {
    const newsfeed = document.getElementById("newsfeed");

        newsfeed.innerHTML += `
        <div class="feed-item">
        <h2>${feedItem.title}</h2>
        <div class="media-row">
      <img src="${feedItem.imageUrl}" alt="${feedItem.title}" />
      <a href="${feedItem.linkUrl}" target="_blank" class="read-more">Read more</a>
        </div>
        <p>${feedItem.body}</p>
        </div>
`    ;
};


window.addEventListener("load", () => {
    currentStories.forEach(displayItem);
});

if (portalButton) {
        portalButton.addEventListener("click", () => {
            goToLocation("http://my.marist.edu");
        });
    }
});