
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <h2>Loading posts...</h2>;

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>
        <button onClick={fetchPosts}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Blog Reader</h1>
      <p className="subtitle">Explore the latest blog posts</p>

      <div className="post-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body.slice(0, 90)}...</p>
            <Link to={`/post/${post.id}`}>Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
