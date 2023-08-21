#   🌍 Name The Flag! 🏁

This is a Country Quiz application built with [Next.js](https://nextjs.org/). Test your knowledge of world countries by guessing the correct country name based on its flag. The app is interactive and provides instant feedback on your answers.

## Technologies Used 🛠️

- [Next.js](https://nextjs.org/): Next.js is a React framework that enables server-side rendering, static site generation, and other advanced features for building modern web applications.
- [SWR](https://swr.vercel.app/): SWR is used for data fetching. It provides a simple and efficient way to fetch and manage remote data in the app.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS is utilized for styling the app components. It offers a utility-first approach to CSS, making it easy to create consistent and responsive designs.

## Key Learnings 🧠

- **Data Fetching:** The app demonstrates how to fetch data from a remote API using the SWR library. The `useSWR` hook is employed to fetch country data asynchronously and efficiently.

- **Dynamic UI Updates:** The app leverages state management using the `useState` hook to dynamically update UI components based on user interactions, such as selecting answer options and adjusting the number of options using the slider.

- **Tailwind CSS Styling:** The code showcases the use of Tailwind CSS classes to style various components. The styling is organized using utility classes, allowing for quick and consistent design adjustments.

- **Conditional Rendering:** The app uses conditional rendering to display loading indicators, error messages, and correct/incorrect feedback messages based on user interactions and data availability.

## Live Version 🌐

[Vercel](https://your-vercel-deployment-url.vercel.app/) - Test your country knowledge now!

## Getting Started  🚀

To run the app locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using the command: `npm install` or `yarn install`.
4. Start the development server using: `npm run dev` or `yarn dev`.
5. Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

