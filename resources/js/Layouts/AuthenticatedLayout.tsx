import ApplicationLogo from '@/Components/ApplicationLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import { Button } from '@/Components/ui/Button';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { user } = usePage().props.auth;

    const { flash } = usePage().props;

    return (
        <div className="min-h-screen text-gray-100 bg-gradient-to-b from-gray-900 to-gray-800">
            <header className="bg-gray-800 shadow-md">
                <div className="flex justify-between items-center py-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link href={route('dashboard')}>
                        <div className="flex items-center space-x-4">
                            <ApplicationLogo />
                            <h1 className="text-2xl font-bold text-purple-400">
                                Nastel
                            </h1>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative w-8 h-8 rounded-full"
                                >
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage
                                            src={user.github_image_url}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {user.name}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 bg-gray-700 border-gray-600"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none text-gray-300">
                                            {user.name}
                                        </p>
                                        <p className="text-xs leading-none text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-600" />
                                <Link href="/settings">
                                    <DropdownMenuItem className="text-gray-300 cursor-pointer focus:text-white focus:bg-gray-600">
                                        <Settings className="mr-2 w-4 h-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    className="text-gray-300 cursor-pointer focus:text-white focus:bg-gray-600"
                                    onClick={() => router.post(route('logout'))}
                                >
                                    <LogOut className="mr-2 w-4 h-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {!!flash && (
                    <div className="mb-4">
                        {flash.type === 'success' ? (
                            <div className="p-4 bg-green-800 rounded-md border border-green-700">
                                {flash['message'] as string}
                            </div>
                        ) : (
                            <div className="p-4 bg-red-800 rounded-md border border-red-700">
                                {flash.message}
                            </div>
                        )}
                    </div>
                )}

                {children}
            </main>
        </div>
    );
}
