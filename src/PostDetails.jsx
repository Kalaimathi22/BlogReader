
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      setPost(null);

      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!response.data.id) {
          setError("Post not found.");
        } else {
          setPost(response.data);
        }
      } catch (err) {
        setError("Failed to load post details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <h2>Loading post details...</h2>;
  }

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>
        <button onClick={() => navigate("/")}>
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <article className="detail-card">
        <button onClick={() => navigate("/")}>
          ← Back to Posts
        </button>

        <h1>{post.title}</h1>
        <p className="post-id">Post ID: {post.id}</p>
        <p className="full-content">{post.body}</p>
      </article>
    </div>
  );
}

export default PostDetails;
