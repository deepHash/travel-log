import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addNewLogEntry } from './API';

const FormEntry = (props) => {
  const { register, handleSubmit } = useForm();
  const [ loading, setLoading ] = useState();
  const [ error, setError ] = useState('');
  
  const onSubmit = async (data) => {

    try{
      setLoading(true);
      data.latitude = props.latLon.latitude;
      data.longitude = props.latLon.longitude;
      const created = await addNewLogEntry(data);
      console.log(created)
      props.onClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

   
  return (
    <form className="entryForm" onSubmit={handleSubmit(onSubmit)}>
      { error ? <h3>{error}</h3> : null}
      <label htmlFor="title">Title: </label>
      <input name="title" ref={register} />
      <label htmlFor="description">Description:</label>
      <textarea name="description" ref={register} /> 
      <label htmlFor="comments">Comments:</label>
      <textarea name="comments" ref={register} />
      <label htmlFor="rating">Rating:</label>
      <input type="number" name="rating" min="1" max="10" ref={register} />
      <label htmlFor="image">Image:</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date: </label>
      <input type="date" name="visitDate" ref={register} />
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
  );
}

export default FormEntry;