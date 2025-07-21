import { useState, useEffect } from 'react'
import Head from './components/Head';
import Input from './components/Input';
import Time from './components/Time';

import axios from 'axios';
function App() {

  const [TodosList, setTodosList] = useState([]);


  //  feching data from server
  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        const list = response.data;
        console.log(list)
        setTodosList(list);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);



  return (
    <>
      <Head></Head>
      <Time></Time>
      <Input
        setTodosList={setTodosList}
        TodosList={TodosList}
      ></Input>
    </>
  )
}

export default App;
