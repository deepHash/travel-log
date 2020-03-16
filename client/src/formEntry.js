import React from 'react'
import { useForm } from 'react-hook-form'
import { addNewLogEntry } from './API';

export default function App(LatLan) {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => (
    [data.latitude, data.longitude] = LatLan,
    async () => {
        const response = await addNewLogEntry(data);
        console.log(response);
    }
  );
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title: </label>
      <input name="title" ref={register} />
      <label htmlFor="comments">Comments:</label>
      <textarea name="comments" ref={register} />
      <label htmlFor="rating">Rating:</label>
      <input type="number" name="rating" min="1" max="10" ref={register} />
      <label htmlFor="visitDate">Visit Date: </label>
      <input type="date" name="visitDate" ref={register} />
      <input type="submit" />
    </form>
  );
}