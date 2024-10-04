import { Badge } from '@/Components/ui/Badge';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/Components/ui/Dropdown';
import { Input } from '@/Components/ui/Input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Filter } from 'lucide-react';
import { useState } from 'react';

const allTasks = [
    {
        id: 1,
        name: 'Refactor authentication system',
        status: 'in-progress',
        isNew: false,
        category: 'Security',
    },
    {
        id: 2,
        name: 'Optimize database queries',
        status: 'todo',
        isNew: true,
        category: 'Performance',
    },
    {
        id: 3,
        name: 'Implement error logging',
        status: 'todo',
        isNew: true,
        category: 'Developer Experience',
    },
    {
        id: 4,
        name: 'Update React to version 18',
        status: 'in-progress',
        isNew: false,
        category: 'Dependency Updates',
    },
    {
        id: 5,
        name: 'Write end-to-end tests',
        status: 'todo',
        isNew: false,
        category: 'End-to-End Tests',
    },
    {
        id: 6,
        name: 'Improve API documentation',
        status: 'completed',
        isNew: false,
        category: 'Documentation',
    },
    {
        id: 7,
        name: 'Fix cross-browser compatibility issues',
        status: 'in-progress',
        isNew: false,
        category: 'Bug Fixes',
    },
    {
        id: 8,
        name: 'Implement user feedback system',
        status: 'todo',
        isNew: true,
        category: 'Feature Development',
    },
];

export default function RepositoryTasksComponent() {
    const [tasks, setTasks] = useState(allTasks);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

    const filterTasks = () => {
        return allTasks.filter(
            (task) =>
                (searchQuery === '' ||
                    task.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) &&
                (statusFilter.length === 0 ||
                    statusFilter.includes(task.status)) &&
                (categoryFilter.length === 0 ||
                    categoryFilter.includes(task.category)),
        );
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setTasks(filterTasks());
    };

    const handleStatusFilter = (status: string) => {
        const updatedFilter = statusFilter.includes(status)
            ? statusFilter.filter((s) => s !== status)
            : [...statusFilter, status];
        setStatusFilter(updatedFilter);
        setTasks(filterTasks());
    };

    const handleCategoryFilter = (category: string) => {
        const updatedFilter = categoryFilter.includes(category)
            ? categoryFilter.filter((c) => c !== category)
            : [...categoryFilter, category];
        setCategoryFilter(updatedFilter);
        setTasks(filterTasks());
    };

    const statuses = ['todo', 'in-progress', 'completed'];
    const categories = Array.from(
        new Set(allTasks.map((task) => task.category)),
    );

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">
                    Repository Tasks
                </h2>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Task Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <Input
                                type="text"
                                placeholder="Search tasks..."
                                className="text-white bg-gray-700 border-gray-600 focus:border-purple-500"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="text-white bg-gray-700 border-gray-600 hover:bg-gray-600"
                                    >
                                        Status{' '}
                                        <Filter className="ml-2 w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-700 border-gray-600">
                                    {statuses.map((status) => (
                                        <DropdownMenuCheckboxItem
                                            key={status}
                                            checked={statusFilter.includes(
                                                status,
                                            )}
                                            onCheckedChange={() =>
                                                handleStatusFilter(status)
                                            }
                                            className="text-gray-300 cursor-pointer focus:text-white focus:bg-gray-600"
                                        >
                                            {status.charAt(0).toUpperCase() +
                                                status.slice(1)}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="text-white bg-gray-700 border-gray-600 hover:bg-gray-600"
                                    >
                                        Category{' '}
                                        <Filter className="ml-2 w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-700 border-gray-600">
                                    {categories.map((category) => (
                                        <DropdownMenuCheckboxItem
                                            key={category}
                                            checked={categoryFilter.includes(
                                                category,
                                            )}
                                            onCheckedChange={() =>
                                                handleCategoryFilter(category)
                                            }
                                            className="text-gray-300 cursor-pointer focus:text-white focus:bg-gray-600"
                                        >
                                            {category}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">
                        Tasks ({tasks.length})
                    </h3>
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="p-4 bg-gray-800 rounded-lg"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <div>
                                        <h4 className="font-medium text-white">
                                            {task.name}
                                        </h4>
                                        <div className="flex items-center mt-2 space-x-2">
                                            <Badge
                                                variant="secondary"
                                                className="text-gray-200 bg-gray-700"
                                            >
                                                {task.category}
                                            </Badge>
                                            <Badge
                                                variant="secondary"
                                                className={` ${task.status === 'todo' ? 'bg-blue-600 text-blue-100' : ''} ${task.status === 'in-progress' ? 'bg-yellow-600 text-yellow-100' : ''} ${task.status === 'completed' ? 'bg-green-600 text-green-100' : ''} `}
                                            >
                                                {task.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    task.status.slice(1)}
                                            </Badge>
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
                                        className="mt-2 text-white bg-purple-600 sm:mt-0 hover:bg-purple-700"
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    'repositories.tasks.show',
                                                    {
                                                        repository: '234',
                                                        task: task.id,
                                                    },
                                                ),
                                            )
                                        }
                                    >
                                        {task.status === 'completed'
                                            ? 'View Details'
                                            : 'Work on it'}
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
