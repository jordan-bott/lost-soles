import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const texts = [
        "Why did the sock go to the doctor? Because it had a hole in it!",
        "How do socks greet each other? With a sock to the shoulder!",
        "What did one sock say to the other sock? We make a great pair!",
        "Why did the socks stop playing basketball? They were afraid of getting worn out!",
        "How does a pirate like his socks? Arrrrgyle!",
        "What did the sock say when it got stuck in the dryer? Oh sheet!",
        "What did the grape say when it got stepped on by a sock? Nothing, it just let out a little wine!",
        "Why did the sock refuse to go to sleep? It didn't want to get lost in the sheets!",
        "Why don't socks make good pets? They always run away!",
        "Why did the sock cross the road? To get to the other foot!",
        "Why don't socks like going to the gym? They're afraid of getting washed out!",
        "What do you call a sock with a hole in it? Holy sock!",
        "Why did the sock get mad at the washing machine? It didn't want to be taken for a spin!",
        "What do you call a sock that sings? A sock-opera!",
        "What do you call a group of socks that perform together? A sock band!",
        "What do you get when you cross a sock and a clock? A tick-tock sockclock!",
        "Why did the sock refuse to be worn? It wanted to be footloose!",
        "What's a sock's favorite dessert? Foot-ernut squash!",
        "Why did the sock refuse to break up with its girlfriend? She was too hole-some!",
        "Why did the sock go to outer space? It wanted to ride the sock-et!",
        "Why did the sock go to the doctor? It was feeling worn down!",
        "How does a sock make money? It trades in the sock market!",
        "Why did the sock go on a diet? It wanted to fit better in its shoe!",
        "Why did the sock go to the movie theater? It heard the movie was toe-tally awesome!",
        "Why did the sock get a job as a detective? It wanted to solve the case of his missing partner!",
        "What do you call a sock that's really into fitness? A tight fitted-sock!",
        "Why did the sock go to the beach? It wanted to get a tan-line!",
        "What do you call a sock that's always getting lost? A normal sock!",
        "Why did the sock go to space camp? It wanted to be an astro-sock-naut!",
        "Why did the sock go to the library? It wanted to check out some sock-umentaries!",
        "Why did the sock go to the art museum? It wanted to see some sock-casso paintings!",
        "What do you call a sock drawer that's really messy? A dis-sock-aray!",
        "Why did the sock go to the theme park? It wanted to ride the sock-er coaster!",
        "Why did the sock go to the zoo? It wanted to see the sock-opototamus!",
        "Why did the sock go to the gym? It wanted to get ripped!",
        "The higher the sock the downer the fool.",
      ];
      const randomIndex = Math.floor(Math.random() * texts.length);
      setRandomText(texts[randomIndex]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const { pathname } = useLocation();
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/admin"
  ) {
    return null;
  }

  return (
    <footer className="z-[20] fixed bottom-0 left-0 right-0 flex items-center justify-between bg-tan text-white h-10 border-t-2 border-blue max-w-screen py-2">
      <div className="text-center pl-4">{randomText}</div>
      <div className="text-right ml-auto pr-4">2023 Lost Soles</div>
    </footer>
  );
}

export default Footer;
