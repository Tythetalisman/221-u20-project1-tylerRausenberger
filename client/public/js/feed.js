document.addEventListener("DOMContentLoaded", () => {
    const portalButton = document.getElementById("portal_button");
    const newsfeed = document.getElementById("newsfeed");

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
            "Newburgh Captures Section IX Swim Title",
            "The Newburgh Free Academy boys swim team clinched the NYSPHSAA Section IX championship on February 20‑22 at Valley Central, showcasing remarkable depth and teamwork.",
            "https://www.timeshudsonvalley.com/mid-hudson-times/mid-hudson-times/stories/newburgh-captures-section-ix-swim-title%2C159115",
            "/images/Homepage1.jpeg"
        ),
        new feedItem(
            "Marist Story3",
            "This is the body of the story, it may be longer.",
            "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
            "/images/hancock.jpeg"
        ),
        new feedItem(
            "Marist Story4",
            "This is the body of the story, it may be longer.",
            "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
            "/images/hancock.jpeg"
        ),
        new feedItem(
            "Marist Story5",
            "This is the body of the story, it may be longer.",
            "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
            "/images/hancock.jpeg"
        ),
        new feedItem(
            "Marist Story6",
            "This is the body of the story, it may be longer.",
            "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
            "/images/hancock.jpeg"
        )
    ];

    function displayItem(feedItem) {
  const box = document.createElement("div");
  box.className = "feed-item";
  box.draggable = true;

  box.innerHTML = `
    <h2>${feedItem.title}</h2>
    <div class="media-row">
      <img src="${feedItem.imageUrl}" alt="${feedItem.title}" />
      <a href="${feedItem.linkUrl}" target="_blank" class="read-more">Read more</a>
    </div>
    <p>${feedItem.body}</p>
    <div class="feed-controls">
      <button class="color-toggle">🎨</button>
      <button class="delete-button">🗑️</button>
    </div>
  `;

 
  box.addEventListener("dragstart", () => box.classList.add("dragging"));
  box.addEventListener("dragend", () => box.classList.remove("dragging"));

  
  const deleteBtn = box.querySelector(".delete-button");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this post?")) {
        deleteFeedItem(feedItem.id);  
      }
    });
  }

  
  const container = document.getElementById("feed_container");
  if (container) {
    container.appendChild(box);
  } else {
    console.error("Missing #feed_container in HTML");
  }
}
const container = document.getElementById("feed_container");
if (container) {
    container.innerHTML = '';
}
    
    if (newsfeed) {
        currentStories.forEach(displayItem);
    }

    
    if (newsfeed) {
        newsfeed.addEventListener("dragover", (e) => {
            e.preventDefault();
            const dragging = document.querySelector(".dragging");
            const afterElement = getDragAfterElement(newsfeed, e.clientY);
            if (!dragging) return;

            if (afterElement == null) {
                newsfeed.appendChild(dragging);
            } else {
                newsfeed.insertBefore(dragging, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(".feed-item:not(.dragging)")];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    if (portalButton) {
        portalButton.addEventListener("click", () => {
            window.location.href = "https://www.usaswimming.org/";
        });
    }

    
    const title = document.getElementById("site_title");
    if (title) {
        title.addEventListener("click", () => {
            window.location.href = "/";
        });
    }

   
    function getCurrentFeed() {
        fetch('/api/feed')
            .then(res => res.json())
            .then(feedItems => {
                newsfeed.innerHTML = '';
                feedItems.forEach(item => displayItem(item));
            });
    }

    
    function deleteFeedItem(id) {
        fetch(`/api/feed/${id}`, { method: 'DELETE' })
            .then(() => getCurrentFeed());
    }

   
    function submitNewPost() {
        const title = document.getElementById('post-title').value.trim();
        const body = document.getElementById('post-body').value.trim();
        const linkUrl = document.getElementById('post-link').value.trim();
        const imageUrl = document.getElementById('post-image').value.trim();

        if (!title || !body || !linkUrl || !imageUrl) {
            alert("Please fill out all fields.");
            return;
        }

        const newPost = { title, body, linkUrl, imageUrl };

        fetch('/api/feed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to create post");
            return res.json();
        })
        .then(data => {
            console.log("Post created:", data);
            clearForm();
            getCurrentFeed();
        })
        .catch(err => {
            console.error("Error creating post:", err);
            alert("There was an error creating the post.");
        });
    }

    
    function clearForm() {
        document.getElementById('post-title').value = '';
        document.getElementById('post-body').value = '';
        document.getElementById('post-link').value = '';
        document.getElementById('post-image').value = '';
    }

  
    window.getCurrentFeed = getCurrentFeed;
    window.deleteFeedItem = deleteFeedItem;
    window.submitNewPost = submitNewPost;
});

