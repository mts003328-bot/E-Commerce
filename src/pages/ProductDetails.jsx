import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getProduct } from "../api/products";
import { useCart } from "../context/CartContext";
import {
  getCommentsByPost,
  addComment,
  deleteComment,
  updateComment,
} from "../api/comments";


function ProductDetails() {

  const { id } = useParams();
const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editText, setEditText] = useState("");


  // Get product and comments
  useEffect(() => {

    async function loadData() {

      try {

        setLoading(true);

        const productData = await getProduct(id);

        const commentsData = await getCommentsByPost(id);

        setProduct(productData);

        setComments(commentsData);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }
    }

    loadData();

  }, [id]);


  // Add comment
  async function handleSubmit(event) {

    event.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {

      const newComment = await addComment(
        Number(id),
        commentText
      );

      setComments((previousComments) => [
        ...previousComments,
        newComment,
      ]);

      setCommentText("");

    } catch (error) {

      setError(error.message);

    }
  }


  // Delete comment
  async function handleDelete(commentId) {

    try {

      await deleteComment(commentId);

      setComments((previousComments) =>
        previousComments.filter(
          (comment) => comment.id !== commentId
        )
      );

    } catch (error) {

      setError(error.message);

    }
  }


  // Edit comment
  async function handleEdit(commentId) {

    if (!editText.trim()) {
      return;
    }

    try {

      await updateComment(commentId, {
        body: editText,
      });


      setComments((previousComments) =>
        previousComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                body: editText,
              }
            : comment
        )
      );


      setEditingId(null);

      setEditText("");

    } catch (error) {

      setError(error.message);

    }
  }


  if (loading) {
    return <h2>Loading...</h2>;
  }


  if (error) {
    return <h2>{error}</h2>;
  }


  if (!product) {
    return <h2>Product not found</h2>;
  }


  return (

    <div>

      <Link to="/products">
        ← Back to Products
      </Link>


      <h1>{product.title}</h1>


      <img
        src={product.thumbnail}
        alt={product.title}
        width="300"
      />


      <h2>${product.price}</h2>
<button
    type="button"
    className="btn btn-primary mb-3"
    onClick={() => addToCart(product)}
>
    Add to Cart
</button>

      <p>{product.description}</p>


      <hr />


      <h2>Comments</h2>


      {comments.length === 0 ? (

        <p>No comments yet.</p>

      ) : (

        comments.map((comment) => (

          <div key={comment.id}>

            <strong>
              {comment.user?.username || "User"}
            </strong>


            {editingId === comment.id ? (

              <>

                <textarea
                  value={editText}
                  onChange={(event) =>
                    setEditText(event.target.value)
                  }
                />


                <br />


                <button
                  onClick={() => handleEdit(comment.id)}
                >
                  Save
                </button>


                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditText("");
                  }}
                >
                  Cancel
                </button>

              </>

            ) : (

              <>

                <p>{comment.body}</p>


                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditText(comment.body);
                  }}
                >
                  Edit
                </button>


                <button
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>

              </>

            )}


            <hr />

          </div>

        ))

      )}


      <h2>Add a Comment</h2>


      <form onSubmit={handleSubmit}>

        <textarea
          value={commentText}
          onChange={(event) =>
            setCommentText(event.target.value)
          }
          placeholder="Write your comment..."
          rows="4"
        />


        <br />


        <button type="submit">
          Add Comment
        </button>

      </form>

    </div>

  );
}


export default ProductDetails;