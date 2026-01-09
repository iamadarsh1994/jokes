import React, { useState, useEffect } from 'react';

function RandomGif() {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    fetch('/api/random-gif?tag=cat')
      .then(res => res.json())
      .then(data => setGif(data.data.images.original.url))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='flex justify-center items-center rounded-full p-10'>
      {gif ? <img src={gif} alt="Random GIF" className='rounded-full p-4 w-48 h-18'/> : <p>Loading...</p>}
    </div>
  );
}

export default RandomGif;   