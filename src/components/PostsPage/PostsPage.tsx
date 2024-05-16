import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, addPost, updatePost } from '../../features/posts/postsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { Layout } from '../Layout/Layout';
import { Modal } from '../Modal/Modal';
import { Loading } from '../Loading/Loading';
import { ErrorComponent } from '../ErrorComponent/Error';
import { NewPost } from '../../interface/newPost';

export const PostsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState<NewPost | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Post');

  useEffect(() => {
    if (userId) {
      dispatch(fetchPosts(parseInt(userId)));
    }
  }, [dispatch, userId]);

  const handleDetailsClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleAddNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPost?.title && currentPost?.body) {
      try {
        if (modalTitle === 'Edit Post' && currentPost.id !== undefined) {
          await dispatch(updatePost({
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
          }));
        } else {
          await dispatch(addPost({
            userId: parseInt(userId!),
            title: currentPost.title,
            body: currentPost.body,
          }));
        }
        setCurrentPost({ title: '', body: '' });
        setAddError(null);
        setIsModalOpen(false);
      } catch (error) {
        setAddError('Failed to save post');
      }
    } else {
      setAddError('Title and body cannot be empty');
    }
  };

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const openModal = (post?: NewPost) => {
    if (post) {
      setCurrentPost(post);
      setModalTitle('Edit Post');
    } else {
      setCurrentPost({ title: '', body: '' });
      setModalTitle('Add New Post');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    navigate('/users');
  };

  return (
    <Layout>
      <div className="text-black">
        <div className="flex justify-end w-full mb-4">
          <button 
            onClick={() => openModal()} 
            className="btn bg-slate-700 hover:bg-gray-500 mr-4"
          >
            Add New Post
          </button>
          <button 
            onClick={handleBackClick} 
            className="btn bg-slate-700 hover:bg-gray-500"
          >
            Back to Users
          </button>
        </div>

        {loading && <Loading />}
        {error && <ErrorComponent error={error} />}

        {!loading && !error && (
          <table className="table">
            <thead>
              <tr className='text-black font-bold text-base leading-relaxed'>
                <th>Title</th>
                <th>Description</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <button 
                      onClick={() => handleDetailsClick(post.id)} 
                      className='btn btn-sm border-gray-300 hover:bg-gray-500 bg-slate-600'
                    >
                      Details
                    </button>
                  </td>
                  <td>
                    <button 
                      onClick={() => openModal(post)} 
                      className='btn btn-sm border-gray-300 hover:bg-gray-500 bg-slate-600'
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDeletePost(post.id)} 
                      className='btn btn-sm border-gray-300 hover:bg-gray-500 bg-slate-600'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-black">No posts found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {currentPost && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={currentPost.title}
          body={currentPost.body}
          onTitleChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
          onBodyChange={(e) => setCurrentPost({ ...currentPost, body: e.target.value })}
          onSubmit={handleAddNewPost}
          error={addError}
          modalTitle={modalTitle}
        />
      )}
    </Layout>
  );
};
