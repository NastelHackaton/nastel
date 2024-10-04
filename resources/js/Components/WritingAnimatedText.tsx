import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface WritingAnimatedTextProps
    extends React.TextareaHTMLAttributes<HTMLSpanElement> {
    texts: string[];
}

const WritingAnimatedText = React.forwardRef<
    HTMLSpanElement,
    WritingAnimatedTextProps
>(({ texts, className, ...props }, ref) => {
    const [currentText, setCurrentText] = useState(0);
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIndex = 0;
        const currentWord = texts[currentText];

        const animateText = () => {
            if (currentIndex <= currentWord.length) {
                setDisplayText(currentWord.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setCurrentText((prev) => (prev + 1) % texts.length);
                }, 1000);
            }
        };

        interval = setInterval(animateText, 100);

        return () => clearInterval(interval);
    }, [currentText]);

    return (
        <span className={cn('text-purple-400', className)} ref={ref} {...props}>
            {displayText}
        </span>
    );
});

WritingAnimatedText.displayName = 'WritingAnimatedText';

export { WritingAnimatedText };
