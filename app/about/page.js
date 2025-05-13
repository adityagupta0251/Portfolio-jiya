import React from 'react';

const about = () => {
  return (
    <div className='height01 mt-100'>
        <h1 className="text-4xl font-bold text-center mt-10">
            About Us
        </h1>
        <p className="mt-4 text-center text-lg">
            We are a team of passionate developers dedicated to creating innovative solutions through technology.
        </p>
        <div className="flex justify-center mt-6">
            <img
            src="https://avatars.githubusercontent.com/u/208905135?v=4"
            alt="About Us"
            className="rounded-full w-32 h-32"
            />
        </div>
      
    </div>
  );
}

export default about;
