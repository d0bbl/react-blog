import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Create = () => {
  const [alert, setAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("yoshi");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setAlert(true);
    const res = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(blog)
    });
    setAlert(false);
    history.push("/");

  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text"/>
        <label>Blog Body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Blog Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="yoshi">yoshi</option>
          <option value="kenny">kenny</option>
        </select>
        {!alert && <button>Add Blog</button>}
        {alert && <button>Adding...</button>}
      </form>
    </div>
  );
}

export default Create;
