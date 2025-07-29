import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const RecipeCard = ({ id, title, thumbnailUrl, isPremium, bookmarkCount, writerNickname }) => {
  const navigate = useNavigate();
  const isPaid = isPremium === true || isPremium === 'true' || isPremium === 'premium';

  // ✅ 단일 이미지 경로 처리
  const imageSrc = thumbnailUrl
  ? thumbnailUrl.startsWith('http')
    ? thumbnailUrl
    : `${import.meta.env.VITE_IMAGE_BASE_URL}${thumbnailUrl}`
  : null;

  // ✅ 디버깅 로그
  console.log(`[RecipeCard]`, {
    title,
    thumbnailUrl,
    imageSrc,
  });

  return (
    <div
      onClick={() => navigate(`/recipes/${id}`)}
      className="w-[200px] cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition flex flex-col"
    >
      {/* 이미지 */}
      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded mb-3 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            이미지 없음
          </div>
        )}
      </div>

      {/* 제목 */}
      <div className="text-sm font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
        {title}
      </div>

      {/* 작가 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
        작가: {writerNickname || '알 수 없음'}
      </div>

      {/* 유/무료 상태 + 찜 수 */}
      <div className="flex justify-between items-center mt-auto">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded ${isPaid
            ? 'bg-amber-100 text-amber-700'
            : 'bg-green-100 text-green-700'
            }`}
        >
          {isPaid ? '유료' : '무료'}
        </span>

        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
          <Heart size={14} className="fill-red-400 text-red-400" />
          <span>{bookmarkCount}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;