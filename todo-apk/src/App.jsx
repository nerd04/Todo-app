import { useState, useEffect } from 'react'
import Head from './components/Head';
import Input from './components/Input';
import Time from './components/Time';

import axios from 'axios';
function App() {



  return (
    <>
      <Head></Head>
      <Time></Time>
      <Input></Input>
    </>
  )
}

export default App;
