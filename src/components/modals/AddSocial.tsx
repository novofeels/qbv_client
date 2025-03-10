import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialMedia {
  platform: string;
  link: string;
}

interface AddSocialProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (socialMedia: SocialMedia) => void;
}

// Social media platform data with their URL structures
const socialMediaPlatforms = [
  { name: 'Facebook', urlPattern: 'https://www.facebook.com/' },
  { name: 'Instagram', urlPattern: 'https://www.instagram.com/' },
  { name: 'Twitter', urlPattern: 'https://twitter.com/' },
  { name: 'LinkedIn', urlPattern: 'https://www.linkedin.com/company/' },
  { name: 'YouTube', urlPattern: 'https://www.youtube.com/c/' },
  { name: 'TikTok', urlPattern: 'https://www.tiktok.com/@' },
  { name: 'Pinterest', urlPattern: 'https://www.pinterest.com/' },
  { name: 'Reddit', urlPattern: 'https://www.reddit.com/user/' },
  { name: 'Medium', urlPattern: 'https://medium.com/@' },
  { name: 'GitHub', urlPattern: 'https://github.com/' },
  { name: 'Dribbble', urlPattern: 'https://dribbble.com/' },
  { name: 'Behance', urlPattern: 'https://www.behance.net/' },
  { name: 'Snapchat', urlPattern: 'https://www.snapchat.com/add/' },
  { name: 'Discord', urlPattern: 'https://discord.gg/' },
  { name: 'Twitch', urlPattern: 'https://www.twitch.tv/' },
  { name: 'Vimeo', urlPattern: 'https://vimeo.com/' },
  { name: 'Spotify', urlPattern: 'https://open.spotify.com/user/' },
  { name: 'SoundCloud', urlPattern: 'https://soundcloud.com/' },
];

const AddSocial: React.FC<AddSocialProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredPlatforms, setFilteredPlatforms] = useState(socialMediaPlatforms);
  const [searchTerm, setSearchTerm] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedPlatform('');
      setUsername('');
      setSearchTerm('');
      setFilteredPlatforms(socialMediaPlatforms);
    } else {
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  // Filter platforms when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = socialMediaPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlatforms(filtered);
    } else {
      setFilteredPlatforms(socialMediaPlatforms);
    }
  }, [searchTerm]);

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setSearchTerm(platform);
    setIsDropdownOpen(false);
  };

  // Function to clear search and show all platforms
  const showAllPlatforms = () => {
    // Don't clear the selected platform, just the search term
    if (selectedPlatform) {
      setSearchTerm(selectedPlatform);
    } else {
      setSearchTerm('');
    }
    setFilteredPlatforms(socialMediaPlatforms);
    setIsDropdownOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedPlatform && username.trim()) {
      const platformData = socialMediaPlatforms.find(p => p.name === selectedPlatform);
      if (platformData) {
        const link = `${platformData.urlPattern}${username.trim()}`;
        onAdd({ platform: selectedPlatform, link });
        setSelectedPlatform('');
        setUsername('');
        setSearchTerm('');
        onClose();
      }
    }
  };

  // Modal animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Get the URL pattern for the selected platform
  const getUrlPattern = () => {
    const platform = socialMediaPlatforms.find(p => p.name === selectedPlatform);
    return platform ? platform.urlPattern : 'https://';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div 
            className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-100 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Purple header */}
            <div className="bg-[#7030A0] px-6 py-4">
              <h3 className="text-lg font-bold text-white">Add Social Media</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="form-control w-full mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-[#6f30a0] focus:ring-2 focus:ring-[#7030A0] focus:border-[#7030A0] focus:ring-opacity-50"
                    placeholder="Select or type to search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      // Only open dropdown if it was closed
                      if (!isDropdownOpen) {
                        setIsDropdownOpen(true);
                      }
                      if (selectedPlatform && e.target.value !== selectedPlatform) {
                        setSelectedPlatform('');
                      }
                    }}
                    onFocus={showAllPlatforms}
                    autoFocus
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={showAllPlatforms}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <motion.div 
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 h-50 overflow-auto"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ul className="py-1">
                        {filteredPlatforms.length > 0 ? (
                          filteredPlatforms.map((platform) => (
                            <li 
                              key={platform.name}
                              className="px-4 py-1  hover:bg-purple-50 cursor-pointer text-sm text-gray-700 hover:text-[#7030A0]"
                              onClick={() => handlePlatformSelect(platform.name)}
                            >
                              {platform.name}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-gray-500">No platforms found</li>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="form-control w-full mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username or Handle
                </label>
                <div className="relative">
                  <div className="flex flex-col w-full">
                    <div className="bg-gray-100 text-gray-600 px-3 py-2 mb-2 rounded-full border border-gray-800 text-sm w-full">
                      {getUrlPattern()}
                    </div>
                    <input 
                      type="text" 
                      placeholder="yourusername"
                      className="peer block w-full px-4 py-2 border border-gray-800 rounded-full bg-white text-black focus:outline-[#6f30a0] focus:ring-2 focus:ring-[#7030A0] focus:border-[#7030A0] focus:ring-opacity-50"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={!selectedPlatform}
                    />
                  </div>
                  {!selectedPlatform && (
                    <p className="text-xs text-gray-500 mt-1 ml-1">Select a platform first</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-full bg-[#7030A0] text-white hover:bg-[#8040B0] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={!selectedPlatform || !username.trim()}
                >
                  Add
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSocial;