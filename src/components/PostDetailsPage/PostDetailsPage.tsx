import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../features/posts/postsSlice';
import axios from 'axios';
import { AppDispatch } from '../../store/store';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import { Layout } from '../Layout/Layout';
import { Modal } from '../Modal/Modal';
import { Loading } from '../Loading/Loading';
import { ErrorComponent } from '../ErrorComponent/Error';
import { Post } from '../../interface/post';

export const PostDetailsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [post, setPost] = useState<Post>({ title: '', body: '', userId: 0 });
  const [comments, setComments] = useState<{ id: number; name: string; body: string, email: '' }[]>([]);
  const [editPost, setEditPost] = useState({ title: '', body: '', userId: 0 });
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        setPost(response.data);
        setEditPost(response.data);
      } catch (error) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        setComments(response.data);
      } catch (error) {
        setError('Failed to load comments');
      }
    };
    fetchPost();
    fetchComments();
  }, [postId]);

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editPost.title && editPost.body) {
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, editPost);
        setPost(editPost);
        setEditError(null);
        setIsModalOpen(false);
      } else {
        setEditError('Title and body cannot be empty');
      }
    } catch (error) {
      setEditError('Failed to edit post');
    }
  };

  const handleDeletePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      await dispatch(deletePost(Number(postId)));
      navigate(`/posts/${post.userId}`, { state: { deletedPostId: Number(postId) } });
    } catch (error) {
      setDeleteError('Failed to delete post');
    }
  };

  const handleBackClick = () => {
    navigate(`/posts/${post.userId}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <Layout>
      <div className="flex justify-end mb-4 space-x-4">
        <button 
          onClick={handleBackClick} 
          className="btn bg-slate-700 hover:bg-gray-500 w-32"
        >
          Back to Posts
        </button>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn bg-slate-700 hover:bg-gray-500 w-32"
        >
          Edit
        </button>
        <button 
          onClick={handleDeletePost} 
          className="btn btn-error w-32"
        >
          Delete
        </button>
        {deleteError && <div className="text-red-500 mt-2">{deleteError}</div>}
      </div>
      <div className="container mx-auto mt-5 p-4">
        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body">
            <h2 className="card-title">
              {post.title}
            </h2>
            <p>
              {post.body}
            </p>
          </div>
        </div>
        <h3 className="text-2xl mb-4">
          {`Comments: ${comments.length}`}
        </h3>
        {comments.map((comment) => (
        <div 
          key={comment.id} 
          className="card bg-base-100 shadow-xs m-2 transition-transform transform hover:scale-105 text-black p-2"
        >
          <div className="card-body p-2">
            <p className="text-xs leading-tight text-right">
              {comment.email}
            </p>
            <h3 className="card-title text-base leading-tight">
              {comment.name}
            </h3>
            <p className="text-sm leading-tight">
              {comment.body}
            </p>
          </div>
        </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editPost.title}
          body={editPost.body}
          onTitleChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
          onBodyChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
          onSubmit={handleEditPost}
          error={editError}
          modalTitle="Edit Post"
        />
      </div>
    </Layout>
  );
};
