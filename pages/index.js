import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("https://restcountries.com/v3.1/all", fetcher);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (data) {
      randomizeOptions();
    }
  }, [data]);

  const randomizeOptions = () => {
    const optionsCount = 10;
    const randomIndexes = [];

    while (randomIndexes.length < optionsCount) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    const selectedRandomIndex = Math.floor(Math.random() * optionsCount);
    const selectedCountry = data[randomIndexes[selectedRandomIndex]];
    console.log(selectedRandomIndex);

    const randomOptions = randomIndexes.map((index) => data[index].name.common);
    randomOptions.sort(() => Math.random() - 0.5);

    setSelectedCountry(selectedCountry);
    setOptions(randomOptions);
  };

  /*   const randomizeOptions = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setSelectedCountry(data[randomIndex]);

    // Randomize the options array with country names
    const randomOptions = [
      data[randomIndex].name.common,
      data[(randomIndex + 1) % data.length].name.common,
      data[(randomIndex + 2) % data.length].name.common,
    ].sort(() => Math.random() - 0.5);
    setOptions(randomOptions);
  }; */

  const handleOptionClick = (option) => {
    if (option === selectedCountry.name.common) {
      setIsMessage("Correct! You guessed the country name.");
      setIsCorrect(true);
    } else {
      setIsMessage("Incorrect. Try again!");
      setIsCorrect(false);
    }
  };

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className="bg-gradient-to-b from-transparent to-foreground-end bg-background-start min-h-screen flex flex-col justify-center items-center">
      <div className="mb-4">
        <span className="text-8xl">{selectedCountry?.flag}</span>
      </div>
      <div className="flex flex-wrap justify-center space-x-4 max-w-screen-md ">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg my-2"
          >
            {option}
          </button>
        ))}
      </div>
      {isMessage && (
        <div
          className={`bg-${isCorrect ? "green" : "red"}-600 text-${
            isCorrect ? "green" : "red"
          }-800 px-4 py-2 my-4 rounded-lg inline-block`}
        >
          {isMessage}
        </div>
      )}
      <div className="space-x-4">
        <button
          onClick={() => setIsMessage(false)}
          className="mt-4 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
        >
          Retry!
        </button>
        <button
          onClick={() => {
            randomizeOptions();
            setIsMessage(false);
          }}
          className="mt-4 bg-yellow-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
