import ConnectRepoModal from '@/Components/ConnectRepoModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '../types';
import { Repository } from '../types/repository';

function timeAgo(date: string) {
    const now = new Date();
    const past = new Date(date);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = now.getTime() - past.getTime();

    if (elapsed < msPerMinute) {
        return 'just now';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }
}

type DashboardProps = {
    availableRepos: Repository[];
    connectedRepos: Repository[];
};

export default function Dashboard({
    availableRepos,
    connectedRepos,
}: PageProps<DashboardProps>) {
    const getLanguageColor = (language: string) => {
        const colors: { [key: string]: string } = {
            JavaScript: 'bg-yellow-300',
            Swift: 'bg-orange-500',
            Python: 'bg-blue-500',
            TypeScript: 'bg-blue-400',
            Ruby: 'bg-red-500',
            Rust: 'bg-orange-500',
            Go: 'bg-blue-400',
            Java: 'bg-red-600',
            C: 'bg-blue-600',
            Cpp: 'bg-blue-500',
            Shell: 'bg-green-500',
            PHP: 'bg-purple-400',
            HTML: 'bg-yellow-300',
            CSS: 'bg-blue-400',
            Vue: 'bg-green-500',
        };
        return colors[language] || 'bg-gray-500';
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Repositories</h2>

                <ConnectRepoModal
                    repositories={availableRepos}
                    onConnect={(repoId) => {
                        router.post(
                            route('repositories.store', {
                                github_repo_id: repoId,
                            }),
                        );
                    }}
                />
            </div>

            <div className="space-y-4">
                {connectedRepos.length === 0 && (
                    <div className="p-4 text-center bg-gray-800 rounded-md border border-gray-700">
                        <h3 className="mb-4 text-xl font-semibold text-gray-400">
                            No repositories connected yet.
                        </h3>

                        <ConnectRepoModal
                            repositories={availableRepos}
                            onConnect={(repoId) => {
                                router.post(
                                    route('repositories.store', {
                                        github_repo_id: repoId,
                                    }),
                                );
                            }}
                        />
                    </div>
                )}

                {connectedRepos.map((repo) => (
                    <div
                        key={repo.id}
                        className="p-4 bg-gray-800 rounded-md border border-gray-700 transition-colors duration-200 hover:border-purple-400"
                    >
                        <div>
                            <Link
                                href={route('repositories.show', {
                                    repository: repo.id,
                                })}
                            >
                                <h3 className="text-xl font-semibold text-purple-400 cursor-pointer hover:underline">
                                    {repo.name}
                                </h3>
                            </Link>
                            <p className="mt-1 text-sm text-gray-400">
                                {repo.description}
                            </p>
                        </div>
                        <div className="flex items-center mt-4 space-x-4 text-xs text-gray-400">
                            <div className="flex items-center">
                                <div
                                    className={`mr-1 h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`}
                                ></div>
                                <span>{repo.language}</span>
                            </div>
                            <div className="flex items-center">
                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${repo.visibility === 'Public' ? 'bg-green-800 text-green-200' : 'bg-gray-700 text-gray-300'}`}
                                >
                                    {repo.visibility}
                                </span>
                            </div>
                            <div>Updated {timeAgo(repo.lastUpdated)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
