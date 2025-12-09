'use client';

import Link from 'next/link';
import TypingScrollAnimation from '../ui/TypingScrollAnimation';

const MANIFESTO_TEXTS = [
  "Natural State is a strategy agency specialising in place development, place economy, and sustainable economics. By implementing circular and local economic principles, we help develop lasting value creation at each location.",
  "Place Economy and Values of Place\nAt the core of Natural State's method for sustainable place development",
  "The Natural State Method\nNatural State always start a project with a analysis that maps the total value potential within the categories of nature, people, society and market — and provide a plan for how these values can be achieved through a development strategy.",
  "The neutral and natural balance and sustainable state of an urban market sphere, is the sum of all transactions, connections and effects of value creation.",
  "The holistic market sphere consists of all the values of a place, and all the value chains forming value systems between all the value spheres. It is the dynamics of transactions that are the interesting element to see and work with in any market sphere, of any place. From local to global context."
];

export default function NaturalStateInfo() {
  return (
    <div className="w-full bg-white py-24 font-inter">
      <div className="mx-auto max-w-[2100px] px-[4vw]">
        <div className="flex flex-col items-center justify-center text-center gap-12">

          {/* Header (Text Only) */}
          <Link href="https://naturalstate.no" target="_blank" className="group block opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Natural State</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest">nature, human, society</p>
            </div>
          </Link>

          {/* Typing Animation (Large Font) */}
          <div className="w-full max-w-4xl min-h-[200px]">
            <TypingScrollAnimation
              texts={MANIFESTO_TEXTS}
              typingSpeed={20}
              pauseBeforeScroll={3000}
              scrollSpeed={30}
              className="text-center"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
