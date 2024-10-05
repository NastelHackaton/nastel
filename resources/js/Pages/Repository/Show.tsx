import { Badge } from '@/Components/ui/Badge';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Progress } from '@/Components/ui/Progress';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Repository } from '@/types/repository';
import { Link } from '@inertiajs/react';

type Category = {
    name: string;
    icon: React.ElementType;
    color: string;
    value: number;
    tasks: number;
};

function getQualityColor(value: number) {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
}

function CategoryCard({
    repository,
    category,
}: {
    repository: Repository;
    category: Category;
}) {
    const Icon = category.icon;
    const qualityColor = getQualityColor(category.value);

    return (
        <Card className="border-gray-700 bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                    {category.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">
                    {category.value}%
                </div>
                <Progress
                    value={category.value}
                    className="mt-4 h-2"
                    indicatorClassName={qualityColor}
                />
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={route('repositories.tasks.index', {
                            repository: repository.id,
                        })}
                    >
                        <Button
                            size="sm"
                            className="bg-purple-600 text-white hover:bg-purple-700"
                        >
                            View Tasks{' '}
                            <span className="ml-1 rounded-full bg-purple-700 px-1.5 py-0.5 text-xs">
                                {category.tasks}
                            </span>
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

type HealthGraphProps = {
    data: number[];
};

function HealthGraph({ data }: HealthGraphProps) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const height = 100;
    const width = 200;
    const points = data
        .map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg width={width} height={height} className="text-purple-400">
            <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={points}
            />
            {data.map((value, index) => (
                <circle
                    key={index}
                    cx={(index / (data.length - 1)) * width}
                    cy={height - ((value - min) / range) * height}
                    r="4"
                    fill="currentColor"
                />
            ))}
        </svg>
    );
}

type RepositoryShowProps = {
    repository: Repository;
    categories: Category[];
    overallHealth: number;
    healthData: number[];
    additionalData: {
        contributors: number;
        issues: number;
        pullRequests: number;
    };
    tasks: {
        id: BigInteger;
        name: string;
        category: string;
        status: string;
        isNew: boolean;
    }[];
};

export default function RepositoryShow({
    repository,
    categories,
    overallHealth,
    healthData,
    additionalData,
    tasks,
}: PageProps<RepositoryShowProps>) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white">
                        Repository: {repository.name}
                    </h2>
                </div>

                {/* Repository Health Card */}
                <Card className="border-gray-700 bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">
                            Overall Repository Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <div className="text-6xl font-bold text-white">
                                    {overallHealth}%
                                </div>
                                <div className="mt-2 text-xl text-gray-400">
                                    Good
                                </div>
                            </div>
                            <div>
                                <HealthGraph data={healthData} />{' '}
                            </div>
                            {/* Passato data */}
                        </div>
                        <Progress
                            value={overallHealth}
                            className="h-4"
                            indicatorClassName="bg-gradient-to-r from-yellow-500 via-green-500 to-green-600"
                        />
                    </CardContent>
                </Card>

                {/* Categories Section */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.name}
                            category={category}
                            repository={repository}
                        />
                    ))}
                </div>

                {/* Tasks Section */}
                <Card className="border-gray-700 bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Tasks to Improve Codebase
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between rounded-lg bg-gray-700 p-4"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium text-white">
                                            {task.name}
                                        </span>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <Badge
                                                variant="secondary"
                                                className="bg-gray-600 text-gray-200"
                                            >
                                                {task.category}
                                            </Badge>
                                            {task.status === 'in-progress' && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-yellow-600 text-yellow-100"
                                                >
                                                    In Progress
                                                </Badge>
                                            )}
                                            {task.isNew && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-purple-600 text-purple-100"
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        href={`/repositories/${repository.id}/tasks/${task.id}`}
                                    >
                                        <Button
                                            size="sm"
                                            className="bg-purple-600 text-white hover:bg-purple-700"
                                        >
                                            Work on it
                                        </Button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="/repository/tasks">
                            <Button
                                size="lg"
                                className="mt-10 bg-purple-600 text-white hover:bg-purple-700"
                            >
                                View All
                            </Button>
                        </Link>
                        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                            <CardTitle className="text-white">
                                Additional Data:
                            </CardTitle>
                        </CardHeader>
                        <div className="mt-4 flex justify-center space-x-4 text-gray-400">
                            <span>
                                Contributors: {additionalData.contributors}
                            </span>
                            <span>Issues: {additionalData.issues}</span>
                            <span>
                                Pull Requests: {additionalData.pullRequests}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}