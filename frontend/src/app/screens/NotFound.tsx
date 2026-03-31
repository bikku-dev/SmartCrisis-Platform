import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { AlertCircle, Home, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block bg-primary/10 rounded-full p-8 mb-8"
        >
          <AlertCircle className="w-24 h-24 text-primary" strokeWidth={2} />
        </motion.div>

        <h1 className="text-6xl mb-4 text-primary">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/dashboard')} size="lg">
            <Home className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/emergency/new')}>
            <Phone className="w-4 h-4 mr-2" />
            Report Emergency
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
