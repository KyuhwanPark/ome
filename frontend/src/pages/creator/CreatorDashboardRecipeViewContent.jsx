import React, { useState, useEffect } from 'react';
import { getRecipeList, deleteRecipe } from '@/services/recipeAPI';
import Paginationbar from '@/components/Pagenationbar';
import ProgressSearchBar from '@/components/ProgressSearchBar';
import { useAuth } from '@/hooks/useAuth';

let debounceTimer;

export default function CreatorDashboardRecipeViewContent() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();  // 레시피 필터링 임시로 프론트단에서 필터링하기 위함.
  const PAGE_SIZE = 10;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getRecipeList({ page, size: PAGE_SIZE, keyword: debouncedSearch });

      // 🔥 프론트에서 필터링
      const myRecipes = res.data.content.filter(
        (r) => r.writerNickname === user?.username
      );

      setRecipes(myRecipes);
      setTotalPages(1); // 페이지네이션은 임시로 무효화
      setCheckedItems([]);
    } catch (err) {
      console.error('레시피 목록 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch]);

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const isAllChecked = recipes.length > 0 && recipes.every((r) => checkedItems.includes(r.recipeId));

  const toggleAll = () => {
    if (isAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(recipes.map((r) => r.recipeId));
    }
  };

  const toggleItem = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (!window.confirm(`${checkedItems.length}개 레시피를 삭제하시겠습니까?`)) return;
    try {
      await Promise.all(checkedItems.map((id) => deleteRecipe(id)));
      fetchData();
    } catch (err) {
      console.error('레시피 삭제 실패:', err);
    }
  };

  return (
    <div className="p-6 flex-1">
      <h1 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">레시피 목록</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <ProgressSearchBar
          search={search}
          setSearch={setSearch}
          loading={loading}
        />

        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm"
        >
          삭제 ({checkedItems.length}개)
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-200 dark:bg-gray-900 text-xs uppercase text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3">
                <input type="checkbox" checked={isAllChecked} onChange={toggleAll} />
              </th>
              <th className="p-3">제목</th>
              <th className="p-3">레시피 사진</th>
              <th className="p-3">찜 수</th>
              <th className="p-3">최종 수정일</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((r, i) => (
              <tr
                key={r.recipeId}
                className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(r.recipeId)}
                    onChange={() => toggleItem(r.recipeId)}
                  />
                </td>
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3">
                  {r.imageUrl ? (
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">이미지 없음</span>
                  )}
                </td>
                <td className="p-3">
                  <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                    {r.bookmarkCount}
                  </span>
                </td>
                <td className="p-3">{r.createdAt?.split('T')[0] || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Paginationbar
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}