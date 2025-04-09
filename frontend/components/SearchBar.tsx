'use client';

import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface Props {
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative w-full max-w-md mb-6"
    >
      <Input
        type="text"
        placeholder="Buscar productos..."
        className="pl-10 pr-4 py-2 rounded-full shadow-md"
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
    </motion.div>
  );
}