import { useState, useEffect } from 'react';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (templateId, isFavorite) => {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${templateId}`);
        // Remove from local state
        setFavorites(prev => prev.filter(t => t.id !== templateId));
        toast.success('Removed from favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Your Favorites
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Templates you've saved for later.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <HeartIcon className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No favorites yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            You haven't saved any templates yet. Browse our collection and click the heart icon to save your favorites here.
          </p>
          <Link 
            to="/templates"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Browse Templates
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
