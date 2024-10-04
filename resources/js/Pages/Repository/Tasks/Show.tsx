import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/Avatar';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/Dialog';
import { Input } from '@/Components/ui/Input';
import { Label } from '@/Components/ui/Label';
import { ScrollArea } from '@/Components/ui/ScrollArea';
import { Textarea } from '@/Components/ui/TextArea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Bot,
    Code,
    File,
    Folder,
    GitBranch,
    GitPullRequest,
    Send,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface FileChange {
    id: string;
    name: string;
    path: string;
    type: 'file' | 'folder';
    content?: string;
}

const fileChanges: FileChange[] = [
    {
        id: '1',
        name: 'src',
        path: 'src',
        type: 'folder',
    },
    {
        id: '2',
        name: 'auth.ts',
        path: 'src/auth.ts',
        type: 'file',
        content: `@@ -1,7 +1,7 @@
 function authenticate(user: User) {
-  // Old authentication logic
-  return oldAuthMethod(user);
+  // New authentication logic
+  return newAuthMethod(user);
 }`,
    },
    {
        id: '3',
        name: 'user.ts',
        path: 'src/user.ts',
        type: 'file',
        content: `@@ -3,6 +3,7 @@
 interface User {
   id: string;
   name: string; +  email: string;
   // ... other properties
 }`,
    },
    {
        id: '4',
        name: 'components',
        path: 'src/components',
        type: 'folder',
    },
    {
        id: '5',
        name: 'LoginForm.tsx',
        path: 'src/components/LoginForm.tsx',
        type: 'file',
        content: `@@ -10,7 +10,7 @@
   return (
     <form onSubmit={handleSubmit}>
       <Input name="username" placeholder="Username" />
-      <Input name="password" placeholder="Password" />
+      <Input name="password" type="password" placeholder="Password" />
       <Button type="submit">Login</Button>
     </form>
   );`,
    },
];

export default function AiTaskInterface() {
    const [task] = useState('Refactor authentication system');
    const [branch] = useState('feature/auth-refactor');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [prTitle, setPrTitle] = useState('');
    const [prDescription, setPrDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<FileChange | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        // Simulating AI response
        setTimeout(() => {
            const aiResponse: Message = {
                role: 'ai',
                content: `AI response to: "${input}"`,
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
    };

    const createPR = () => {
        // Simulating PR creation
        console.log('Creating PR:', {
            title: prTitle,
            description: prDescription,
        });
        // In a real application, this would call an API to create the PR
    };

    const renderFileTree = (files: FileChange[], parentPath: string = '') => {
        return files
            .filter(
                (file) =>
                    file.path.startsWith(parentPath) &&
                    file.path.split('/').length ===
                    parentPath.split('/').length + 1,
            )
            .map((file) => (
                <div key={file.id} className="ml-4">
                    {file.type === 'folder' ? (
                        <div>
                            <div className="flex items-center py-1 text-gray-300 cursor-pointer hover:text-white">
                                <Folder className="mr-2 w-4 h-4" />
                                {file.name}
                            </div>
                            {renderFileTree(files, file.path)}
                        </div>
                    ) : (
                        <div
                            className={`flex cursor-pointer items-center py-1 text-gray-300 hover:text-white ${selectedFile?.id === file.id ? 'bg-gray-700 text-white' : ''}`}
                            onClick={() => setSelectedFile(file)}
                        >
                            <File className="mr-2 w-4 h-4" />
                            {file.name}
                        </div>
                    )}
                </div>
            ));
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4 min-h-screen text-gray-100 bg-gradient-to-b from-gray-900 to-gray-950">
                <div className="mx-auto space-y-4 max-w-[1600px]">
                    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg">
                        <div>
                            <h1 className="mb-1 text-2xl font-bold text-white">
                                {task}
                            </h1>
                            <div className="flex items-center text-sm text-gray-400">
                                <GitBranch className="mr-1 w-4 h-4" />
                                {branch}
                            </div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-purple-400 border-purple-400 transition-colors hover:text-white hover:bg-purple-400"
                                >
                                    <GitPullRequest className="mr-2 w-4 h-4" />
                                    Create PR
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="text-white bg-gray-900 border border-gray-800">
                                <DialogHeader>
                                    <DialogTitle>
                                        Create Pull Request
                                    </DialogTitle>
                                    <DialogDescription>
                                        Create a PR based on AI suggestions
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 gap-4 items-center">
                                        <Label
                                            htmlFor="pr-title"
                                            className="text-right"
                                        >
                                            Title
                                        </Label>
                                        <Input
                                            id="pr-title"
                                            value={prTitle}
                                            onChange={(e) =>
                                                setPrTitle(e.target.value)
                                            }
                                            className="col-span-3 text-white bg-gray-800 border-gray-700 focus:border-purple-400"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 items-center">
                                        <Label
                                            htmlFor="pr-description"
                                            className="text-right"
                                        >
                                            Description
                                        </Label>
                                        <Textarea
                                            id="pr-description"
                                            value={prDescription}
                                            onChange={(e) =>
                                                setPrDescription(e.target.value)
                                            }
                                            className="col-span-3 text-white bg-gray-800 border-gray-700 focus:border-purple-400"
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={createPR}
                                    className="bg-purple-600 transition-colors hover:bg-purple-700"
                                >
                                    Create PR
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="overflow-hidden bg-gray-800 border-gray-700 shadow-lg">
                        <CardHeader className="border-b border-gray-700">
                            <CardTitle className="flex items-center text-xl font-bold text-white">
                                <Bot className="mr-2 w-6 h-6 text-purple-400" />
                                AI Assistant
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="p-4 h-[300px]">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                                    >
                                        <div
                                            className={`flex max-w-[80%] items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <Avatar className="w-8 h-8">
                                                {message.role === 'user' ? (
                                                    <AvatarImage
                                                        src="/avatars/01.png"
                                                        alt="User"
                                                    />
                                                ) : (
                                                    <AvatarImage
                                                        src="/avatars/ai.png"
                                                        alt="AI"
                                                    />
                                                )}
                                                <AvatarFallback>
                                                    {message.role === 'user'
                                                        ? 'U'
                                                        : 'AI'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`mx-2 rounded-lg p-3 ${message.role === 'user'
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-700 text-gray-100'
                                                    } shadow-lg`}
                                            >
                                                <p className="text-sm">
                                                    {message.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start mb-4">
                                        <div className="flex items-center p-3 bg-gray-700 rounded-lg shadow-lg">
                                            <div className="flex space-x-2 animate-pulse">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </ScrollArea>
                            <form
                                onSubmit={handleSubmit}
                                className="p-4 border-t border-gray-700 bg-gray-750"
                            >
                                <div className="relative">
                                    <Textarea
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        placeholder="Type your message here..."
                                        className="pr-12 w-full text-white bg-gray-700 border-gray-600 resize-none focus:border-purple-400"
                                        rows={3}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="absolute right-2 bottom-2 p-2 bg-purple-600 rounded-full transition-colors hover:bg-purple-700"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden bg-gray-800 border-gray-700 shadow-lg">
                        <CardHeader className="border-b border-gray-700">
                            <CardTitle className="flex items-center text-xl font-bold text-white">
                                <Code className="mr-2 w-6 h-6 text-purple-400" />
                                Code Changes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex h-[400px]">
                                <div className="w-1/4 border-r border-gray-700">
                                    <ScrollArea className="h-full">
                                        <div className="p-2">
                                            <h3 className="mb-2 text-sm font-semibold text-gray-400">
                                                File Explorer
                                            </h3>
                                            {renderFileTree(fileChanges)}
                                        </div>
                                    </ScrollArea>
                                </div>
                                <div className="w-3/4">
                                    <ScrollArea className="h-full">
                                        {selectedFile ? (
                                            <div className="p-4">
                                                <h3 className="mb-2 text-sm font-semibold text-gray-400">
                                                    {selectedFile.path}
                                                </h3>
                                                <pre className="overflow-x-auto p-4 bg-gray-900 rounded-md">
                                                    <code className="text-sm text-gray-300">
                                                        {selectedFile.content}
                                                    </code>
                                                </pre>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center h-full">
                                                <p className="text-gray-400">
                                                    Select a file from the file
                                                    explorer to view changes
                                                </p>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
