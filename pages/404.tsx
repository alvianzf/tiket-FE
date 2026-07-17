import React from 'react';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import AppLayout from '../src/layouts/AppLayout';

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
      >
        <div className="glass-card max-w-lg w-full p-12 text-center relative z-10">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h1 className="text-9xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-4">
            404
          </h1>
        </motion.div>
        
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 font-display">
          Oops! Page Not Found
        </h2>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="large"
            variant="contained"
            color="primary"
            component={Link}
            href="/"
            sx={{ fontWeight: 600 }}
          >
            {t('home', 'Back to Home')}
          </Button>

          <Button
            size="large"
            variant="text"
            onClick={() => router.back()}
            sx={{
              // Parity with NextUI `variant="flat"` + backdrop-blur-md border-white/20
              fontWeight: 600,
              color: '#3f3f46',
              backgroundColor: 'rgba(212,212,216,0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': { backgroundColor: 'rgba(212,212,216,0.55)' },
            }}
          >
            {t('back', 'Go Back')}
          </Button>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

Custom404.getLayout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Custom404;
