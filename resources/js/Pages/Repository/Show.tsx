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
                    <Link
                        href={route('repositories.tasks.index', {
                            repository: repository.id,
                        })}
                    >
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
};

export default function RepositoryShow({
    repository,
    categories,
    overallHealth,
    healthData,
    additionalData,
}: PageProps<RepositoryShowProps>) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">
                    Repository: {repository.name}
                </h2>

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
                                    {overallHealth}%
                                </div>
                                <div className="mt-2 text-xl text-gray-400">
                                    Good
                                </div>
                            </div>
                            <HealthGraph data={healthData} />{' '}
                            {/* Passato data */}
                        </div>
                        <Progress value={overallHealth} className="h-2" />
                    </CardContent>
                </Card>

                <h2 className="text-xl font-bold text-white">Categories</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.name}
                            category={category}
                            repository={repository}
                        />
                    ))}
                </div>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent>
                        <h3 className="text-xl font-bold text-white">
                            Additional Data
                        </h3>
                        <ul className="mt-4 text-gray-400">
                            <li>Contributors: {additionalData.contributors}</li>
                            <li>Issues: {additionalData.issues}</li>
                            <li>
                                Pull Requests: {additionalData.pullRequests}
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
