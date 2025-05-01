const productivityTips = [
  {
    author: "Benjamin Franklin",
    quote: "Lost time is never found again.",
  },
  {
    author: "Peter Drucker",
    quote: "Until we can manage time, we can manage nothing else.",
  },
  {
    author: "David Allen",
    quote: "You can do anything, but not everything.",
  },
  {
    author: "Tim Ferriss",
    quote: "Focus on being productive instead of busy.",
  },
  {
    author: "Steve Jobs",
    quote: "Deciding what not to do is as important as deciding what to do.",
  },
  {
    author: "Thomas Edison",
    quote:
      "Genius is one percent inspiration and ninety-nine percent perspiration.",
  },
  {
    author: "Paul J. Meyer",
    quote:
      "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
  },
  {
    author: "Brian Tracy",
    quote:
      "The key to success is to focus our conscious mind on things we desire not things we fear.",
  },
  {
    author: "Tony Robbins",
    quote:
      "Setting goals is the first step in turning the invisible into the visible.",
  },
  {
    author: "Elon Musk",
    quote:
      "If you get up in the morning and think the future is going to be better, it is a bright day.",
  },
  {
    author: "Zig Ziglar",
    quote:
      "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.",
  },
  {
    author: "Jim Rohn",
    quote: "Either you run the day or the day runs you.",
  },
  {
    author: "Robin Sharma",
    quote:
      "Productivity is less about what you do with your time and more about how you run your mind.",
  },
  {
    author: "Chris Bailey",
    quote:
      "Busyness is no different from laziness when it doesn’t lead you to accomplish anything.",
  },
  {
    author: "Gary Keller",
    quote:
      "You need to be doing fewer things for more effect instead of doing more things with side effects.",
  },
  {
    author: "Cal Newport",
    quote: "Clarity about what matters provides clarity about what does not.",
  },
  {
    author: "James Clear",
    quote:
      "You do not rise to the level of your goals. You fall to the level of your systems.",
  },
  {
    author: "Stephen Covey",
    quote:
      "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
  },
  {
    author: "Mark Twain",
    quote: "The secret of getting ahead is getting started.",
  },
  {
    author: "Leo Babauta",
    quote:
      "Simplicity boils down to two steps: Identify the essential. Eliminate the rest.",
  },
  {
    author: "Jocko Willink",
    quote: "Discipline equals freedom.",
  },
  {
    author: "William James",
    quote:
      "Nothing is so fatiguing as the eternal hanging on of an uncompleted task.",
  },
  {
    author: "Marie Forleo",
    quote:
      "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  },
  {
    author: "Dale Carnegie",
    quote:
      "Do the hard jobs first. The easy jobs will take care of themselves.",
  },
  {
    author: "Unknown",
    quote: "Don’t watch the clock; do what it does. Keep going.",
  },
  {
    author: "Abraham Lincoln",
    quote:
      "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
  },
  {
    author: "Tony Schwartz",
    quote: "Energy, not time, is the fundamental currency of high performance.",
  },
  {
    author: "Greg McKeown",
    quote: "If you don’t prioritize your life, someone else will.",
  },
  {
    author: "Charles Buxton",
    quote:
      "You will never find time for anything. If you want time, you must make it.",
  },
  {
    author: "Florence Nightingale",
    quote: "I attribute my success to this: I never gave or took any excuse.",
  },
];

export const getRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * productivityTips.length);
  const { author, quote } = productivityTips[randomIndex];
  return { author, quote };
};
