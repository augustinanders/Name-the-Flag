import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("https://restcountries.com/v3.1/all", fetcher);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const messageBackgroundColorClass = isCorrect ? "bg-green-400" : "bg-red-400";
  const messageTextColorClass = isCorrect ? "text-green-800" : "text-red-800";

  let optionsCount = 2;

  useEffect(() => {
    if (data) {
      randomizeOptions();
    }
  }, [data]);

  const randomizeOptions = () => {
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

  const handleOptionClick = (option) => {
    if (option === selectedCountry.name.common) {
      setMessage("Correct! You guessed the country name.");
      setIsCorrect(true);
    } else {
      setMessage("Incorrect. Try again!");
      setIsCorrect(false);
    }
  };

  const handleValueChange = (e) => {
    optionsCount = e.target.value;
    randomizeOptions();
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
      {message && (
        <div
          className={`${messageBackgroundColorClass} ${messageTextColorClass} px-4 py-2 my-4 rounded-lg inline-block`}
        >
          {message}
        </div>
      )}
      <div className="space-x-4">
        <button
          onClick={() => setMessage(false)}
          className="mt-4 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
        >
          Retry!
        </button>
        <button
          onClick={() => {
            randomizeOptions();
            setMessage(false);
          }}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>
      <div className="flex flex-col items-center m-4 mt-10">
        <label
          htmlFor="slider"
          className="block text-lg font-semibold mb-2 text-color-foreground text-opacity-20"
        >
          Choose Answer Options:
        </label>
        <input
          type="range"
          min="2"
          max="10"
          defaultValue="2"
          step="1"
          onChange={(e) => {
            handleValueChange(e);
          }}
          id="slider"
          name="slider"
          className="w-10/12 appearance-none bg-yellow-500 h-2 rounded-md outline-none focus:outline-none active:outline-none "
        />
      </div>
    </div>
  );
}
