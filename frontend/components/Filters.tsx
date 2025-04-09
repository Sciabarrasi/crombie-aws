'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categorias = ['Remeras', 'Pantalones', 'Camperas', 'Accesorios'];

export default function Filters() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2 mb-6"
    >
      {categorias.map((cat) => (
        <Button key={cat} variant="outline" className="rounded-full text-sm">
          {cat}
        </Button>
      ))}
    </motion.div>
  );
}
