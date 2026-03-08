import React from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import AppLayout from '@layouts/AppLayout';

const Custom404 = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-lg w-full p-12 text-center relative z-10"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-9xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>
        
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 font-display">
          Oops! Page Not Found
        </h2>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="solid"
            color="primary"
            className="font-semibold shadow-lg shadow-primary/30"
            onClick={() => router.push('/')}
          >
            {t('home', 'Back to Home')}
          </Button>
          
          <Button
            size="lg"
            variant="flat"
            className="font-semibold backdrop-blur-md border border-white/20"
            onClick={() => router.back()}
          >
            {t('back', 'Go Back')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

Custom404.getLayout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Custom404;
