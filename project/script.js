// Retrieve data from localStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// DOM Elements
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBlogBtn = document.getElementById("addBlogBtn");
const blogsContainer = document.getElementById("blogs-container");

// Add a new blog
addBlogBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Please fill in both fields!");
    return;
  }

  const newBlog = {
    id: Date.now(),
    title,
    content,
    comments: []
  };

  blogs.push(newBlog);
  saveAndRender();
  titleInput.value = "";
  contentInput.value = "";
});

// Save blogs to localStorage and render
function saveAndRender() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
  displayBlogs();
}

// Display all blogs
function displayBlogs() {
  blogsContainer.innerHTML = "";
  blogs.forEach(blog => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog");
    blogDiv.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>

      <div class="action-buttons">
        <button onclick="deleteBlog(${blog.id})" class="delete">Delete</button>
      </div>

      <div class="comment-box">
        <h4>Comments:</h4>
        <div id="commentList-${blog.id}">
          ${blog.comments.map(c => `<div class="comment">${c}</div>`).join('')}
        </div>
        <div class="comment-input">
          <input type="text" id="commentInput-${blog.id}" placeholder="Add a comment...">
          <button onclick="addComment(${blog.id})">Post</button>
        </div>
      </div>
    `;
    blogsContainer.appendChild(blogDiv);
  });
}

// Add comment
function addComment(blogId) {
  const commentInput = document.getElementById(`commentInput-${blogId}`);
  const commentText = commentInput.value.trim();

  if (commentText === "") return;

  const blog = blogs.find(b => b.id === blogId);
  blog.comments.push(commentText);
  commentInput.value = "";

  saveAndRender();
}

// Delete blog
function deleteBlog(blogId) {
  if (confirm("Are you sure you want to delete this blog?")) {
    blogs = blogs.filter(b => b.id !== blogId);
    saveAndRender();
  }
}

// Initial render
displayBlogs();
