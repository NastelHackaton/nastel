import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ApplicationLogo({ size = 32 }: { size?: number }) {
    const [stars, setStars] = useState<
        { id: number; x: number; delay: number }[]
    >([]);

    useEffect(() => {
        const starCount = 5;
        const newStars = Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 64,
            delay: Math.random() * 5,
        }));
        setStars(newStars);
    }, []);

    const gradientVariants = {
        initial: { rotate: 0 },
        animate: {
            rotate: 360,
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    const nPathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2, ease: 'easeInOut' },
                opacity: { duration: 0.5 },
            },
        },
    };

    const starVariants = {
        initial: { y: -5, opacity: 0 },
        animate: (delay: number) => ({
            y: 69,
            opacity: [0, 1, 1, 0],
            transition: {
                y: { duration: 5, repeat: Infinity, ease: 'linear', delay },
                opacity: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay,
                },
            },
        }),
    };

    return (
        <div style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <motion.linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                        variants={gradientVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <stop offset="0%" stopColor="#4C1D95" />
                        <stop offset="33%" stopColor="#6D28D9" />
                        <stop offset="66%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#4C1D95" />
                    </motion.linearGradient>
                </defs>

                {/* Distinct border */}
                <circle
                    cx="32"
                    cy="32"
                    r="31"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                />

                {/* Background circle with gradient */}
                <circle cx="32" cy="32" r="29" fill="url(#gradient)" />

                {/* Falling stars */}
                {stars.map((star) => (
                    <motion.path
                        key={star.id}
                        d="M0 0L1 2L0 4L2 3L4 4L3 2L4 0L2 1L0 0Z"
                        fill="#E9D5FF"
                        variants={starVariants}
                        initial="initial"
                        animate="animate"
                        custom={star.delay}
                        style={{ translateX: star.x }}
                    />
                ))}

                {/* Hand-drawn style "N" */}
                <motion.path
                    d="M22 42c0.5-1 1-19 0-20 0.5 0 1 0 1.5 0.5 2 2 15 17.5 17 19 0.5-0.5 1-18.5 0.5-19.5"
                    stroke="#E9D5FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#softGlow)"
                    variants={nPathVariants}
                    initial="hidden"
                    animate="visible"
                />

                {/* Soft glow filter */}
                <defs>
                    <filter
                        id="softGlow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                    >
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite
                            in="SourceGraphic"
                            in2="blur"
                            operator="over"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
