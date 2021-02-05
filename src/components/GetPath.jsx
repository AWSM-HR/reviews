import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import App from './App';

const GetPath = () => {
  const { id } = useParams();
  console.log('This is the id', id);

  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <App id={id} />
  );
};
export default GetPath;
