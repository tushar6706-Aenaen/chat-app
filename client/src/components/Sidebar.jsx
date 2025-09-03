import React, { useState } from 'react';
import { Search, Settings, LogOut, User, MoreVertical } from 'lucide-react';

// Mock assets and data - replace with your actual imports
const assets = {
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTYwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIj5DaGl0Y2hhdDwvdGV4dD4KPC9zdmc+',
    avatar_icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAxMkM5LjUwOSAxMiA3LjUgOS45OTEgNy41IDcuNUM3LjUgNS4wMDkgOS41MDkgMyAxMiAzUzE2LjUgNS4wMDkgMTYuNSA3LjVTMTQuNDkxIDEyIDEyIDEyWk0xMiAyMUMxNS42NjggMjEgMTguNjk1IDE5LjIzNyAyMC4yNDMgMTYuNTg4QzE4LjU2OCAxNS4yIDEzLjk4MiAxNCA5IDEyLjk2N0M4LjQ4NiAxNC4zOTQgOS42MzMgMTYuNzI3IDEyIDIxWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
};

const userDummyData = [
    {
        _id: 1,
        fullName: "Alice Johnson",
        profilePic: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFQzQ4OTkiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAxMkM5LjUwOSAxMiA3LjUgOS45OTEgNy41IDcuNUM3LjUgNS4wMDkgOS41MDkgMyAxMiAzUzE2LjUgNS4wMDkgMTYuNSA3LjVTMTQuNDkxIDEyIDEyIDEyWk0xMiAyMUMxNS42NjggMjEgMTguNjk1IDE5LjIzNyAyMC4yNDMgMTYuNTg4QzE4LjU2OCAxNS4yIDEzLjk4MiAxNCA5IDEyLjk2N0M4LjQ4NiAxNC4zOTQgOS42MzMgMTYuNzI3IDEyIDIxWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
    },
    {
        _id: 2,
        fullName: "Bob Smith",
        profilePic: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM0Qjc2ODgiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAxMkM5LjUwOSAxMiA3LjUgOS45OTEgNy41IDcuNUM3LjUgNS4wMDkgOS41MDkgMyAxMiAzUzE2LjUgNS4wMDkgMTYuNSA3LjVTMTQuNDkxIDEyIDEyIDEyWk0xMiAyMUMxNS42NjggMjEgMTguNjk1IDE5LjIzNyAyMC4yNDMgMTYuNTg4QzE4LjU2OCAxNS4yIDEzLjk4MiAxNCA5IDEyLjk2N0M4LjQ4NiAxNC4zOTQgOS42MzMgMTYuNzI3IDEyIDIxWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
    },
    {
        _id: 3,
        fullName: "Charlie Davis",
        profilePic: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMxMEI5ODEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAxMkM5LjUwOSAxMiA3LjUgOS45OTEgNy41IDcuNUM3LjUgNS4wMDkgOS41MDkgMyAxMiAzUzE2LjUgNS4wMDkgMTYuNSA3LjVTMTQuNDkxIDEyIDEyIDEyWk0xMiAyMUMxNS42NjggMjEgMTguNjk1IDE5LjIzNyAyMC4yNDMgMTYuNTg4QzE4LjU2OCAxNS4yIDEzLjk4MiAxNCA5IDEyLjk2N0M4LjQ4NiAxNC4zOTQgOS42MzMgMTYuNzI3IDEyIDIxWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
    },
    {
        _id: 4,
        fullName: "Diana Wilson",
        profilePic: null
    },
    {
        _id: 5,
        fullName: "Emma Brown",
        profilePic: null
    },
    {
        _id: 6,
        fullName: "Frank Miller",
        profilePic: null
    }
];

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    
    const handleProfileClick = () => {
        console.log('Navigate to profile');
        setShowMenu(false);
    };

    const filteredUsers = userDummyData.filter(user => 
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`h-screen  backdrop-blur-3xl border-r border-white/10 shadow-2xl overflow-hidden relative ${selectedUser ? "max-md:hidden" : ""}`}>
            {/* Floating gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            
            <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className='p-6 border-b border-white/10  backdrop-blur-xl'>
                    <div className="flex justify-between items-center mb-6">
                        <img src={assets.logo} alt="logo" className='max-w-40 opacity-90' />
                        <div className='relative'>
                            <button 
                                onClick={() => setShowMenu(!showMenu)}
                                className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105'
                            >
                                <MoreVertical className='w-5 h-5 text-white/80' />
                            </button>
                            {showMenu && (
                                <div className="absolute top-full right-0 z-20 w-40 mt-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden animate-fade-in">
                                    <button 
                                        onClick={handleProfileClick}
                                        className='w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white text-sm'
                                    >
                                        <User className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                    <div className="h-px bg-white/10 mx-2" />
                                    <button 
                                        onClick={() => setShowMenu(false)}
                                        className='w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white text-sm'
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>
                                    <div className="h-px bg-white/10 mx-2" />
                                    <button className='w-full flex items-center gap-3 p-3 hover:bg-red-500/20 transition-all duration-200 text-red-400 hover:text-red-300 text-sm'>
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Search */}
                    <div className='bg-white/10 backdrop-blur-xl rounded-full flex items-center gap-3 px-4 py-3 border border-white/20 focus-within:border-white/40 transition-all duration-200'>
                        <Search className='w-4 h-4 text-white/60' />
                        <input 
                            type="text" 
                            className='bg-transparent border-none outline-none text-white text-sm placeholder-white/50 flex-1'
                            placeholder='Search conversations...' 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="text-white/50 hover:text-white/80 transition-colors"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* User List */}
                <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                    {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                        <div
                            onClick={() => { setSelectedUser(user) }}
                            className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden ${
                                selectedUser?._id === user._id 
                                    ? 'bg-white/15 border-white/20 shadow-lg' 
                                    : 'hover:bg-white/10 border-transparent'
                            } border backdrop-blur-sm`}
                            key={user._id}
                        >
                            <div className="relative flex-shrink-0">
                                <img 
                                    src={user?.profilePic || assets.avatar_icon} 
                                    alt="profile" 
                                    className='w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md' 
                                />
                                {index < 3 && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 animate-pulse" />
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <p className="text-white/90 font-medium text-sm truncate group-hover:text-white transition-colors">
                                    {user.fullName}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    {index < 3 ? (
                                        <>
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className='text-green-300 text-xs'>Online</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                            <span className='text-gray-400 text-xs'>Offline</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {index > 2 && (
                                <div className='flex-shrink-0'>
                                    <div className='w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-lg'>
                                        {index}
                                    </div>
                                </div>
                            )}

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Search className="w-12 h-12 text-white/30 mb-4" />
                            <p className="text-white/60 text-sm">No users found</p>
                            <p className="text-white/40 text-xs mt-1">Try a different search term</p>
                        </div>
                    )}
                </div>

                {/* Footer with user count */}
                <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span>{filteredUsers.length} conversation{filteredUsers.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>

            {/* Click outside to close menu */}
            {showMenu && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    )
}

export default Sidebar;