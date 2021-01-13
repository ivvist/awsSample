import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createBlog } from '../graphql/mutations'
import { listBlogs } from '../graphql/queries'

export default function Chat(props) {

  const styles = {
	  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
	  blog: {  marginBottom: 15 },
	  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
	  blogName: { fontSize: 20, fontWeight: 'bold' },
	  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
	}

  const [formState, setFormState] = React.useState(React.initialState)
  const [blogs, setBlogs] = React.useState([])

  React.useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const blogData = await API.graphql(graphqlOperation(listBlogs))
      const blogs = blogData.data.listBlogs.items
      setBlogs(blogs)
    } catch (err) { 
        console.log('error fetching blogs') 
      }
  }
   
  function setInput(key, value) {      	
    setFormState({ ...formState, [key]: value })
  }
  
  async function addBlog() {
    try {
      if (!formState.name) return
      const blog = { ...formState }
      setBlogs([...blogs, blog])
      setFormState(React.initialState)
      await API.graphql(graphqlOperation(createBlog, {input: blog}))
    } catch (err) {
      console.log('error creating blog:', err)
    }
  }

  const { uname } = props;
  return (
      <div className="App">
          <div>
		        Welcome - {uname}
	        </div>
          <div>
            <AmplifySignOut />
          </div>

        	<h2>Click button to create new Blog</h2>
        	<input
          	onChange={event => setInput('name', event.target.value)}
          	style={styles.input}
        	  placeholder="Enter new Blog name"
	        />
          <button style={styles.button} onClick={addBlog}> Create Blog </button>
          {
            blogs.map((blog, index) => (
              <div key={blog.id ? blog.id : index} style={styles.blog}>
                <p style={styles.blogName}>{blog.name}</p>
              </div>
            ))
          }

    </div>
  );


}

