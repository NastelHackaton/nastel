import { Button } from '@/Components/ui/Button';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Login() {
    return (
        <div className="flex min-h-screen text-gray-100 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="p-8 m-auto w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-8"
                >
                    <Link
                        href={route('welcome')}
                        className="flex justify-center items-center mb-4"
                    >
                        <ApplicationLogo />
                        <span className="ml-2 text-3xl font-bold text-purple-400">
                            Nastel
                        </span>
                    </Link>
                    <p className="mt-2 text-center text-gray-400">
                        Sign in with GitHub to start refactoring your code
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <a href={route('login.github')}>
                        <Button
                            variant="outline"
                            className="py-6 w-full text-lg text-white bg-gray-800 hover:bg-gray-700"
                        >
                            <svg
                                className="mr-2 w-5 h-5"
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            Sign in with GitHub
                        </Button>
                    </a>
                </motion.div>

                <motion.p
                    className="mt-8 text-sm text-center text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    By signing in, you agree to our{' '}
                    <a
                        href="#"
                        className="underline hover:text-purple-400 underline-offset-2"
                    >
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                        href="#"
                        className="underline hover:text-purple-400 underline-offset-2"
                    >
                        Privacy Policy
                    </a>
                    .
                </motion.p>

                <motion.div
                    className="mt-8 text-sm text-center text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p>Why do we need access to your GitHub repositories?</p>
                    <p className="mt-2">
                        Nastel.ai requires access to your repositories to
                        analyze and refactor your code. We only access the
                        repositories you explicitly choose to refactor.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
