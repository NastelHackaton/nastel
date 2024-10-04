import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/Button';
import { WritingAnimatedText } from '@/Components/WritingAnimatedText';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen text-gray-100 bg-gradient-to-b from-gray-900 to-gray-800">
            <header className="flex fixed z-50 items-center px-4 w-full h-14 shadow-md lg:px-6 bg-gray-900/80 backdrop-blur-md">
                <div className="container flex justify-between items-center mx-auto">
                    <Link
                        className="flex justify-center items-center"
                        href={route('welcome')}
                    >
                        <ApplicationLogo />
                        <span className="ml-2 text-xl font-bold text-purple-400">
                            Nastel
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href={route('login')}>
                            <Button
                                variant="outline"
                                className="text-purple-400 border-purple-400 hover:text-gray-900 hover:bg-purple-400"
                            >
                                Get started
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1 pt-14">
                <HeroSection />
                <FeaturesSection />
                <ForDevelopersSection />
                <LanguageCarousel />
            </main>
            <footer className="py-6 w-full border-t border-gray-700 bg-gray-900/80 backdrop-blur-md">
                <div className="container flex flex-col gap-2 items-center px-4 mx-auto sm:flex-row md:px-6">
                    <p className="text-xs text-gray-400">
                        © 2024 Nastel.ai. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="py-12 w-full md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 mx-auto md:px-6">
                <div className="flex flex-col gap-8 justify-between items-center md:flex-row">
                    <div className="flex-1 text-center md:text-left">
                        <motion.h1
                            className="mb-4 text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-5xl md:text-6xl lg:text-7xl/none"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Refactor Your Legacy Code with AI
                        </motion.h1>
                        <motion.p
                            className="mx-auto mb-8 text-gray-300 md:mx-0 md:text-xl max-w-[700px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Modernize your codebase effortlessly using our
                            AI-powered refactoring service. Improve
                            documentation, testing, security, and performance.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link href={route('login')}>
                                <Button className="py-6 px-8 text-lg text-white bg-purple-600 hover:bg-purple-700">
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        className="relative flex-1 w-full max-w-xl aspect-square"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="AI Code Refactoring Illustration"
                            className="rounded-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section id="features" className="py-12 w-full md:py-24 lg:py-32">
            <div className="container px-4 mx-auto md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <motion.h2
                        className="text-3xl font-bold tracking-tighter text-purple-300 sm:text-5xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        AI-Powered{' '}
                        <WritingAnimatedText
                            texts={[
                                'Documentation',
                                'Testing',
                                'Bug Fixing',
                                'Security',
                                'Code Quality',
                                'Performance',
                            ]}
                        />
                    </motion.h2>
                    <p className="mx-auto text-gray-300 md:text-xl max-w-[700px]">
                        Our AI-driven refactoring service covers all aspects of
                        code improvement, from documentation to performance
                        optimization. Experience comprehensive code enhancement
                        with a single click.
                    </p>
                </div>
                <div className="mt-16">
                    <motion.h2
                        className="overflow-hidden relative w-full rounded-lg shadow-xl aspect-video"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="AI Code Refactor Service"
                        />
                    </motion.h2>
                </div>
            </div>
        </section>
    );
}

function ForDevelopersSection() {
    return (
        <section id="for-developers" className="py-12 w-full md:py-24 lg:py-32">
            <div className="container px-4 mx-auto md:px-6">
                <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2">
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter text-purple-300 sm:text-4xl">
                            Designed for Developers, by Developers
                        </h2>
                        <p className="text-gray-300 md:text-lg">
                            We understand the challenges developers face when
                            working with legacy code. Our AI-powered solution is
                            tailored to meet the specific needs of software
                            engineers, making code refactoring a breeze.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <ArrowRight className="w-5 h-5 text-purple-400" />
                                <span className="text-gray-300">
                                    Intelligent code analysis and suggestions
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <ArrowRight className="w-5 h-5 text-purple-400" />
                                <span className="text-gray-300">
                                    Automated bug detection and fixing
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <ArrowRight className="w-5 h-5 text-purple-400" />
                                <span className="text-gray-300">
                                    Performance optimization recommendations
                                </span>
                            </li>
                        </ul>
                        <Button className="mt-4 text-white bg-purple-600 hover:bg-purple-700">
                            Learn More
                        </Button>
                    </motion.div>
                    <motion.div
                        className="overflow-hidden relative rounded-lg shadow-xl h-[400px]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="Developers using AI Code Refactor"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function LanguageCarousel() {
    const languages = [
        { name: 'JavaScript', icon: '/icons/javascript.svg' },
        { name: 'Python', icon: '/icons/python.svg' },
        { name: 'Java', icon: '/icons/java.svg' },
        { name: 'C++', icon: '/icons/cpp.svg' },
        { name: 'Ruby', icon: '/icons/ruby.svg' },
        { name: 'Go', icon: '/icons/go.svg' },
        { name: 'TypeScript', icon: '/icons/typescript.svg' },
        { name: 'PHP', icon: '/icons/php.svg' },
        { name: 'Swift', icon: '/icons/swift.svg' },
        { name: 'Kotlin', icon: '/icons/kotlin.svg' },
        { name: 'Rust', icon: '/icons/rust.svg' },
    ];

    return (
        <section className="py-12 w-full md:py-24 lg:py-32">
            <div className="container px-4 mx-auto md:px-6">
                <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center text-purple-300 sm:text-5xl">
                    Supported Languages
                </h2>
                <div className="overflow-hidden relative py-10">
                    <motion.div
                        className="flex space-x-16"
                        animate={{
                            x: ['0%', '-50%'],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 20,
                                ease: 'linear',
                            },
                        }}
                        style={{
                            width: `${languages.length * 200}px`,
                        }}
                    >
                        {[...languages, ...languages].map((lang, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center space-y-4 w-40"
                            >
                                <div className="flex justify-center items-center w-32 h-32 bg-transparent rounded-full">
                                    <img
                                        src={lang.icon}
                                        alt={lang.name}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <span className="text-xl font-medium text-gray-300">
                                    {lang.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
