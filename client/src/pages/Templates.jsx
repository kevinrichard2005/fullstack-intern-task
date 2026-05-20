import { useState, useEffect } from 'react';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'E-commerce', 'Portfolio', 'Dashboard', 'Landing Page', 'Blog'];

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchTemplates();
    if (user) {
      fetchFavorites();
    }
  }, [search, category, user]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      
      const response = await api.get('/templates', { params });
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      const favoriteIds = new Set(response.data.map(f => f.id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleToggleFavorite = async (templateId, isFavorite) => {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${templateId}`);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(templateId);
          return newSet;
        });
        toast.success('Removed from favorites');
      } else {
        await api.post(`/favorites/${templateId}`);
        setFavorites(prev => new Set(prev).add(templateId));
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Discover beautiful templates
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Start your next project with our premium, carefully crafted React and Tailwind CSS templates.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === c 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 shadow-sm'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors shadow-sm dark:text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              isFavorite={favorites.has(template.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No templates found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
