const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data storage (Resets when server restarts)
let posts = [
    { id: 1, username: 'travel_bug', image: 'https://picsum.photos', caption: 'Chasing sunsets! 🌅', likes: 12 },
    { id: 2, username: 'foodie_chef', image: 'https://picsum.photos', caption: 'Homemade pasta night. 🍝', likes: 45 },
    { id: 3, username: 'tech_guru', image: 'https://picsum.photos', caption: 'Rate my desk setup setup setup! 💻', likes: 89 }
];

// Route to get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Route to increment likes on a specific post
app.post('/api/posts/:id/like', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        return res.json({ success: true, likes: post.likes });
    }
    res.status(404).json({ error: 'Post not found' });
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

