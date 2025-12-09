'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingScrollAnimationProps {
    texts: string[];
    typingSpeed?: number;
    pauseBeforeScroll?: number;
    scrollSpeed?: number;
    className?: string;
}

export default function TypingScrollAnimation({
    texts,
    typingSpeed = 30,
    pauseBeforeScroll = 2000,
    scrollSpeed = 50,
    className = '',
}: TypingScrollAnimationProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isTyping) {
            const fullText = texts[currentTextIndex];
            if (displayedText.length < fullText.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(fullText.slice(0, displayedText.length + 1));
                }, typingSpeed);
            } else {
                // Finished typing - use setTimeout to avoid synchronous setState in effect
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 0);
            }
        } else if (isScrolling) {
            // Scroll animation
            timeout = setTimeout(() => {
                if (containerRef.current) {
                    // Scroll until text is out of view
                    if (scrollOffset < 100) {
                        setScrollOffset(prev => prev + 1);
                    } else {
                        // Reset for next text
                        setIsScrolling(false);
                        setScrollOffset(0);
                        setDisplayedText('');
                        setIsTyping(true);
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                    }
                }
            }, scrollSpeed);
        } else {
            // Waiting state (neither typing nor scrolling)
            timeout = setTimeout(() => {
                setIsScrolling(true);
            }, pauseBeforeScroll);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isTyping, isScrolling, scrollOffset, currentTextIndex, texts, typingSpeed, pauseBeforeScroll, scrollSpeed]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden h-48 ${className}`} // Increased height
        >
            <div
                className="transition-transform duration-75 ease-linear"
                style={{ transform: `translateY(${scrollOffset}px)`, opacity: Math.max(0, 1 - scrollOffset / 40) }}
            >
                <p className="font-inter text-3xl font-light leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {displayedText}
                    {isTyping && <span className="animate-pulse font-light">|</span>}
                </p>
            </div>
        </div>
    );
}
