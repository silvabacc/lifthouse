import LandingPage from "@/app/landingPage";

const getQuote = async () => {
  const quoteReponse = await fetch("https://stoic-quotes.com/api/quote");
  const quote = (await quoteReponse.json()) as {
    text: string;
    author: string;
  };
  return quote;
};

export default async function App() {
  const quote = await getQuote();
  return <LandingPage quote={quote.text} author={quote.author} />;
}
