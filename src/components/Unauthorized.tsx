import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface UnauthorizedProps {
  message?: string;
  redirectPath?: string;
  redirectLabel?: string;
}

const Unauthorized = ({
  message = "You don't have permission to access this page",
  redirectPath = "/login",
  redirectLabel = "Go to Login"
}: UnauthorizedProps) => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-purple-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        {/* Top decorative element */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
          >
            <Lock size={40} className="text-white" />
          </motion.div>
        </div>
        
        {/* Warning badge */}
        <div className="mb-6 mt-12 flex items-center justify-center">
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-1 text-red-600"
          >
            <AlertCircle size={16} />
            <span className="text-sm font-medium">Unauthorized Access</span>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="space-y-6 text-center">
          <h1 className="text-2xl font-bold text-purple-900">Access Denied</h1>
          <p className="text-gray-600">{message}</p>
          
          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={() => router.push(redirectPath)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              {redirectLabel}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-purple-100 opacity-70"></div>
        <div className="absolute -right-6 top-1/2 h-24 w-24 rounded-full bg-pink-100 opacity-50"></div>
        
        {/* Ticket-shaped decorative element */}
        <div className="absolute -z-10 h-full w-full left-0 top-0 opacity-5">
          <div className="absolute h-full w-full border-2 border-purple-500 rounded-xl">
            {/* Ticket notches */}
            <div className="absolute left-1/4 -top-2 h-4 w-4 rounded-full bg-purple-50"></div>
            <div className="absolute left-1/4 -bottom-2 h-4 w-4 rounded-full bg-purple-50"></div>
            <div className="absolute right-1/4 -top-2 h-4 w-4 rounded-full bg-purple-50"></div>
            <div className="absolute right-1/4 -bottom-2 h-4 w-4 rounded-full bg-purple-50"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;