import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteSocialProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  platformName: string;
}

const DeleteSocial: React.FC<DeleteSocialProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  platformName 
}) => {
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
            className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Purple header */}
            <div className="bg-[#7030A0] px-6 py-4">
              <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-800 text-center mb-6">
                Are you sure you want to remove <span className="font-bold text-[#7030A0]">{platformName}</span> from your Socials List?
              </p>
              
              <div className="flex justify-center space-x-4 mt-6">
                <button 
                  type="button" 
                  className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteSocial;