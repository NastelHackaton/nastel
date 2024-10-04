import { Badge } from '@/Components/ui/Badge';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Progress } from '@/Components/ui/Progress';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Repository } from '@/types/repository';
import { Link } from '@inertiajs/react';
import {
    Bug,
    Code,
    FileText,
    FolderTree,
    Gauge,
    Package,
    Shield,
    TestTube,
    Wrench,
    Zap,
} from 'lucide-react';

const categories = [
    {
        name: 'Documentation',
        icon: FileText,
        color: 'from-blue-500 to-blue-600',
        value: 75,
        tasks: 3,
    },
    {
        name: 'Unit Tests',
        icon: TestTube,
        color: 'from-green-500 to-green-600',
        value: 60,
        tasks: 2,
    },
    {
        name: 'End-to-End Tests',
        icon: Gauge,
        color: 'from-yellow-500 to-yellow-600',
        value: 40,
        tasks: 1,
    },
    {
        name: 'Performance',
        icon: Zap,
        color: 'from-purple-500 to-purple-600',
        value: 85,
        tasks: 4,
    },
    {
        name: 'Developer Experience',
        icon: Wrench,
        color: 'from-indigo-500 to-indigo-600',
        value: 70,
        tasks: 2,
    },
    {
        name: 'Project Structure',
        icon: FolderTree,
        color: 'from-pink-500 to-pink-600',
        value: 55,
        tasks: 3,
    },
    {
        name: 'Code Quality',
        icon: Code,
        color: 'from-teal-500 to-teal-600',
        value: 80,
        tasks: 5,
    },
    {
        name: 'Security',
        icon: Shield,
        color: 'from-red-500 to-red-600',
        value: 90,
        tasks: 2,
    },
    {
        name: 'Bug Fixes',
        icon: Bug,
        color: 'from-orange-500 to-orange-600',
        value: 30,
        tasks: 6,
    },
    {
        name: 'Dependency Updates',
        icon: Package,
        color: 'from-cyan-500 to-cyan-600',
        value: 50,
        tasks: 1,
    },
];

function getQualityColor(value: number) {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
}

function CategoryCard({ category }: { category: (typeof categories)[0] }) {
    const Icon = category.icon;
    const qualityColor = getQualityColor(category.value);

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-white">
                    {category.name}
                </CardTitle>
                <Icon className="w-4 h-4 text-gray-400" />
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
                <div className="flex justify-between items-center mt-4">
                    <Link href="/repository/tasks">
                        <Button
                            size="sm"
                            className="text-white bg-purple-600 hover:bg-purple-700"
                        >
                            View Tasks{' '}
                            <span className="py-0.5 px-1.5 ml-1 text-xs bg-purple-700 rounded-full">
                                {category.tasks}
                            </span>
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

const tasks = [
    {
        name: 'Refactor authentication system',
        status: 'in-progress',
        isNew: false,
        category: 'Security',
    },
    {
        name: 'Optimize database queries',
        status: 'todo',
        isNew: true,
        category: 'Performance',
    },
    {
        name: 'Implement error logging',
        status: 'todo',
        isNew: true,
        category: 'Developer Experience',
    },
    {
        name: 'Update React to version 18',
        status: 'in-progress',
        isNew: false,
        category: 'Dependency Updates',
    },
    {
        name: 'Write end-to-end tests',
        status: 'todo',
        isNew: false,
        category: 'End-to-End Tests',
    },
];

function HealthGraph() {
    const data = [60, 65, 70, 68, 72];
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
};

export default function RepositoryShow({
    repository,
}: PageProps<RepositoryShowProps>) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">
                        Repository: {repository.name}
                    </h2>
                </div>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">
                            Overall Repository Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="text-6xl font-bold text-white">
                                    72%
                                </div>
                                <div className="mt-2 text-xl text-gray-400">
                                    Good
                                </div>
                                <p className="text-sm text-gray-400">
                                    Room for improvement
                                </p>
                            </div>
                            <div className="w-1/2">
                                <HealthGraph />
                            </div>
                        </div>
                        <Progress
                            value={72}
                            className="h-4"
                            indicatorClassName="bg-gradient-to-r from-yellow-500 via-green-500 to-green-600"
                        />
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard key={category.name} category={category} />
                    ))}
                </div>

                <Card className="bg-gray-800 border-gray-700">
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
                                    className="flex justify-between items-center p-4 bg-gray-700 rounded-lg"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium text-white">
                                            {task.name}
                                        </span>
                                        <div className="flex items-center mt-1 space-x-2">
                                            <Badge
                                                variant="secondary"
                                                className="text-gray-200 bg-gray-600"
                                            >
                                                {task.category}
                                            </Badge>
                                            {task.status === 'in-progress' && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-yellow-100 bg-yellow-600"
                                                >
                                                    In Progress
                                                </Badge>
                                            )}
                                            {task.isNew && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-purple-100 bg-purple-600"
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="text-white bg-purple-600 hover:bg-purple-700"
                                    >
                                        Work on it
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        <Link href="/repository/tasks">
                            <Button
                                size="lg"
                                className="mt-10 text-white bg-purple-600 hover:bg-purple-700"
                            >
                                View All
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
