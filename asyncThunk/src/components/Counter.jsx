import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCount } from '../features/slices/counterSlice';
import { Typewriter } from 'react-simple-typewriter';

const Counter = () => {
   
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };
  const services = [
  "Worktop Fitters",
  "Stone Repairs",
  "Worktop Fabricator",
  "Local Wall Tilers",
  "Stone Offcuts",
  "Trusted Stonemason",
  "Kitchen Installers",
  "Bathroom Designers",
  "Firehearth Fitters",
  "Remnant Slabs",
  "Wall Claddings",
  "Bathroom Tiling",
  "Wall Insulations",
  "Interior Decorators",
];
  return (
    <>
      <div className="text-6xl font-extrabold text-amber-400 text-center my-8">
      <Typewriter
        words={services}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1800}
      /></div>
      <section className="text-center">
        <h1 className="text-4xl my-16">Redux Toolkit Counter App</h1>
        <p>Count is : {count || 0}</p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDecrement}
        >
          -
        </button>
      </section>
    </>
  );
}

export default Counter

