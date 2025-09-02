import React, { useState } from 'react';
import { 
  Phone, 
  Video, 
  Search, 
  Bell, 
  BellOff, 
  Image, 
  FileText, 
  Link, 
  Star,
  Settings,
  ChevronRight,
  Shield,
  Palette,
  Download
} from 'lucide-react';

// Mock assets
const mockMedia = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center'
];

const RightSidebar = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState('media');

  const userProfile = {
    name: "Martin Johnson",
    status: "Online",
    phone: "+1 (555) 123-4567",
    email: "martin.j@example.com",
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM0Qjc2ODgiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNTA5IDEyIDcuNSA5Ljk5MSA3LjUgNy41UzcuNSA1LjAwOSA5LjUwOSAzIDEyIDNTMTYuNSA1LjAwOSAxNi41IDcuNVMxNC40OTEgMTIgMTIgMTJaTTEyIDIxQzE1LjY2OCAyMSAxOC42OTUgMTkuMjM3IDIwLjI0MyAxNi41ODhDMTguNTY4IDE1LjIgMTMuOTgyIDE0IDkgMTIuOTY3QzguNDg2IDE0LjM5NCA5LjYzMyAxNi43MjcgMTIgMjFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+'
  };

  const MenuItem = ({ icon: Icon, label, onClick, active = false }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-white/15 border-white/20 text-white' 
          : 'hover:bg-white/10 border-transparent text-white/70 hover:text-white'
      } border backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
    </button>
  );

  return (
    <div className="h-full w-auto\backdrop-blur-3xl border-l border-white/10  shadow-2xl overflow-hidden relative">
      {/* Floating gradient background */}
      <div className="absolute inset-0  pointer-events-none" />
      
      <div className="relative h-full flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 border-b border-white/10  backdrop-blur-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt="Profile" 
                className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white/20 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white/90 mb-1">{userProfile.name}</h3>
              <p className="text-sm text-green-300">{userProfile.status}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105">
                <Phone className="w-5 h-5 text-white/80" />
              </button>
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105">
                <Video className="w-5 h-5 text-white/80" />
              </button>
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105">
                <Search className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Settings */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Quick Settings</h4>
            <div className="space-y-2">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
              >
                <div className="flex items-center gap-3">
                  {notificationsEnabled ? (
                    <Bell className="w-5 h-5 text-white/70" />
                  ) : (
                    <BellOff className="w-5 h-5 text-white/70" />
                  )}
                  <span className="text-sm text-white/70">Notifications</span>
                </div>
                <div className={`w-12 h-6 rounded-full border transition-all duration-200 relative ${
                  notificationsEnabled ? 'bg-blue-500 border-blue-400' : 'bg-white/10 border-white/20'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200 ${
                    notificationsEnabled ? 'left-6' : 'left-0.5'
                  }`} />
                </div>
              </button>
              <MenuItem icon={Star} label="Starred Messages" />
              <MenuItem icon={Shield} label="Privacy Settings" />
              <MenuItem icon={Palette} label="Theme Settings" />
            </div>
          </div>

          {/* Media Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Shared Media</h4>
              <button className="text-xs text-blue-300 hover:text-blue-200 transition-colors">View All</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockMedia.map((src, idx) => (
                <div key={idx} className="relative group cursor-pointer">
                  <img 
                    src={src} 
                    alt={`Media ${idx + 1}`} 
                    className="w-full h-20 object-cover rounded-lg border border-white/10 group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">File Types</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                    <Image className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90">Images</p>
                    <p className="text-xs text-white/50">142 files</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/50" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                    <FileText className="w-4 h-4 text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90">Documents</p>
                    <p className="text-xs text-white/50">28 files</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/50" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                    <Link className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90">Links</p>
                    <p className="text-xs text-white/50">15 shared</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/50" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <p className="text-xs text-white/50 mb-1">Phone</p>
                <p className="text-sm text-white/90">{userProfile.phone}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">Email</p>
                <p className="text-sm text-white/90">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl">
          <MenuItem icon={Settings} label="Chat Settings" />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;