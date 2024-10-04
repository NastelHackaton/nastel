import { Button } from '@/Components/ui/Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/Dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/Select';
import { GitBranch } from 'lucide-react';
import { useState } from 'react';

interface Repository {
    id: string;
    name: string;
}

interface ConnectRepoModalProps {
    repositories: Repository[];
    onConnect: (repositoryId: string) => void;
}

export default function ConnectRepoModal({
    repositories,
    onConnect,
}: ConnectRepoModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedRepoId, setSelectedRepoId] = useState<string>('');

    const handleConnect = async () => {
        if (!selectedRepoId) return;

        onConnect(selectedRepoId);

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="text-purple-400 border-purple-400 transition-colors hover:text-white hover:bg-purple-400"
                >
                    <GitBranch className="mr-2 w-4 h-4" />
                    Connect New Repo
                </Button>
            </DialogTrigger>
            <DialogContent className="text-white bg-gray-900 border border-gray-800 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Connect New Repository
                    </DialogTitle>
                    <DialogDescription>
                        Select a repository to connect to Nastel.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <Select
                        value={selectedRepoId}
                        onValueChange={setSelectedRepoId}
                    >
                        <SelectTrigger className="w-full text-white bg-gray-800 border-gray-700 focus:border-purple-400">
                            <SelectValue placeholder="Select a repository" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-gray-800 border-gray-700">
                            {repositories.map((repo) => (
                                <SelectItem
                                    key={repo.id}
                                    value={repo.id}
                                    className="focus:bg-gray-700"
                                >
                                    {repo.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleConnect}
                        disabled={!selectedRepoId}
                        className="w-full text-purple-400 border-purple-400 transition-colors hover:text-white hover:bg-purple-400"
                        variant="outline"
                    >
                        Connect Repository
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
