import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '@/services/recipeAPI';
import { createReport } from '@/services/reportAPI';
import CommentSection from '@/components/Comment/CommentSection';
import { isBookmarked, addBookmark, removeBookmark } from '@/services/bookmarkAPI';
import { Heart, Flag, Check } from 'lucide-react';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const res = await isBookmarked(recipeId);
        setBookmarked(res.data === true);
      } catch (err) {
        console.error('찜 여부 확인 실패:', err);
      }
    };
    if (recipeId) checkBookmark();
  }, [recipeId]);

  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await removeBookmark(recipeId);
      } else {
        await addBookmark(recipeId);
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error('찜 토글 실패:', err);
      alert('찜 처리 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        const response = await getRecipeDetail(recipeId);
        setRecipe(response.data);
      } catch {
        setError('레시피를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeData();
  }, [recipeId]);

  const handleReport = async () => {
    if (reported) return; // 중복 방지

    try {
      await createReport({
        targetType: 'RECIPE',
        targetId: recipe.recipeId,
        reason: '부적절한 콘텐츠입니다.', // 또는 사용자 선택으로 확장 가능
      });
      setReported(true);
      alert('신고가 접수되었습니다.');
    } catch (err) {
      console.error('신고 실패:', err);
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-gray-500'>레시피를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-red-500'>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-gray-500'>레시피를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto my-8 p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          {recipe.title}
        </h1>

        <div className="flex items-center mb-6 text-gray-600">
          <span>
            By <span className="font-semibold text-gray-800">{recipe.writerNickname}</span> · {recipe.createdAt?.split(' ')[0]}
          </span>
        </div>

        {recipe.imageUrls?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {recipe.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`레시피 이미지 ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
            ))}
          </div>
        )}

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-4 md:gap-8 justify-center text-center mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              카테고리
            </p>
            <p className="text-2xl font-bold text-gray-800">{recipe.category}</p>
          </div>
          <div className="border-l border-gray-200"></div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              프리미엄 여부
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {recipe.isPremium === 'premium' ? '유료' : '무료'}
            </p>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-amber-800 border-b-2 border-amber-200 pb-2">
            재료
          </h2>
          <ul className="space-y-3 text-gray-700">
            {recipe.ingredients ? (
              recipe.ingredients.split(',').map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.trim()}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">재료 정보가 없습니다.</li>
            )}
          </ul>
        </div>

        <div className="md:col-span-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
            조리 방법
          </h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {recipe.content || '조리 방법이 없습니다.'}
          </p>
        </div>

        {/* 대표 이미지 */}
        {recipe.imageUrls?.[0] && (
          <div className="mb-8">
            <img
              src={recipe.imageUrls[0]}
              alt="대표 이미지"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* 나머지 이미지 */}
        {recipe.imageUrls?.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {recipe.imageUrls.slice(1).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`레시피 이미지 ${index + 2}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        )}

        <div className="text-sm text-gray-400 mt-8 text-right">
          마지막 수정일: {recipe.updatedAt?.split(' ')[0]}
        </div>
        {/* 🆕 찜 & 신고 버튼 */}
        <div className="mt-4 flex gap-4 justify-end">
          <button
            onClick={toggleBookmark}
            className={`flex items-center gap-1 px-4 py-2 rounded-md border transition 
      ${bookmarked ? 'border-amber-500 text-amber-600 bg-amber-50' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
          >
            {bookmarked ? <Check size={16} /> : <Heart size={16} />}
            {bookmarked ? '찜 완료' : '찜하기'}
          </button>

          <button
            onClick={handleReport}
            className={`flex items-center gap-1 px-4 py-2 rounded-md border transition 
      ${reported ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
          >
            {reported ? <Check size={16} /> : <Flag size={16} />}
            {reported ? '신고 완료' : '신고하기'}
          </button>
        </div>

        {/* 댓글 영역 */}
        <CommentSection recipeId={recipe.recipeId} />
      </div>
    </div>
  );
};

export default RecipeDetail;
