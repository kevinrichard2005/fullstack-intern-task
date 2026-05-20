import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template, isFavorite, onToggleFavorite }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    onToggleFavorite(template.id, isFavorite);
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={template.thumbnail_url} 
          alt={template.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full glass hover:scale-110 transition-transform ${isFavorite ? 'text-red-500' : 'text-slate-600 dark:text-slate-300 hover:text-red-500'}`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartSolid className="w-5 h-5" />
            ) : (
              <HeartOutline className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 rounded-full shadow-sm backdrop-blur-sm">
            {template.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{template.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-grow">{template.description}</p>
        
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            Preview
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
            Get Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
