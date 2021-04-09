import { useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
  const {idy:id} = useParams();

  const {info:blog,
    isPending,
    error} = useFetch(`http://localhost:8000/blogs/${id}`);

  return (
    <div className="blog-deets">
      {error && <div>{ error }</div>}
      { isPending && <div>Loading...</div> }
        { blog && (
          <article key={blog.id}>
          <h2>{blog.title}</h2>
          <p>written by - {blog.author}</p>
            <div>
              { blog.body }
            </div>
          </article>
        )}
    </div>
  );
}

export default BlogDetails;
