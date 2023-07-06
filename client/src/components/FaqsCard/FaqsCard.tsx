import { useRef, useState } from 'react';
type FaqsCardProps = {
  faqsList: {
    id: number;
    a: string;
    q: string;
  };
};

const FaqsCard = ({ faqsList }: FaqsCardProps) => {
  const answerElRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState('0px');

  const handleOpenAnswer = () => {
    if (!answerElRef.current) return;
    const answerElH = answerElRef.current.offsetHeight;
    setState(!state);

    setAnswerH(`${answerElH + 180}px`);
  };

  return (
    <div
      className="mt-5 space-y-3 overflow-hidden border-b "
      onClick={handleOpenAnswer}
    >
      <h4 className="flex items-center justify-between pb-5 text-lg font-medium text-gray-700 cursor-pointer">
        {faqsList?.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: '0px' }}
      >
        <div>
          <p className="text-gray-500">{faqsList?.a}</p>
        </div>
      </div>
    </div>
  );
};

const Faqst = () => {
  const faqsList = [
    {
      id: 1,
      q: 'What are some random questions to ask?',
      a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
    },
    {
      id: 2,
      q: 'Do you include common questions?',
      a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
    },
    {
      id: 3,
      q: 'Can I use this for 21 questions?',
      a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
    },
    {
      id: 4,
      q: 'Are these questions for girls or for boys?',
      a: 'The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).',
    },
    {
      id: 5,
      q: 'What do you wish you had more talent doing?',
      a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
    },
  ];

  return (
    <section className="max-w-screen-xl px-4 mx-auto mt-12 leading-relaxed lg:px-8 ">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h1>
        <p className="max-w-lg mx-auto text-lg text-gray-600">
          Answered all frequently asked questions, Still confused? feel free to
          contact us.
        </p>
      </div>
      <div className="max-w-2xl mx-auto mt-14">
        {faqsList.map((item, index) => (
          <FaqsCard
            key={index}
            faqsList={item}
          />
        ))}
      </div>
    </section>
  );
};
export default Faqst;
