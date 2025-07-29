import React, { useState } from 'react';
import { Users, Calendar, ChefHat, AlertTriangle, ExternalLink } from 'lucide-react';

const SubscribedCreators = () => {
  const [subscribedCreators, setSubscribedCreators] = useState([
    {
      id: 1,
      name: "김요리사",
      avatar: "🧑‍🍳",
      description: "한식 전문 요리사",
      recipesCount: 24,
      subscribersCount: 1250,
      subscribedDate: "2024.01.10"
    },
    {
      id: 2,
      name: "박셰프",
      avatar: "👩‍🍳", 
      description: "양식 전문 셰프",
      recipesCount: 18,
      subscribersCount: 890,
      subscribedDate: "2024.01.20"
    },
    {
      id: 3,
      name: "이마스터",
      avatar: "🧑‍🍳",
      description: "중식 전문가",
      recipesCount: 32,
      subscribersCount: 1680,
      subscribedDate: "2024.01.15"
    }
  ]);

  // 사용자 여정: 작가의 레시피 보기
  const handleViewRecipes = (creatorId) => {
    const creator = subscribedCreators.find(c => c.id === creatorId);
    if (creator) {
      // 실제 구현: 작가 페이지로 이동
      const confirmView = window.confirm(`${creator.name}의 레시피 페이지로 이동하시겠습니까?`);
      if (confirmView) {
        // 실제로는 router.push(`/creator/${creatorId}/recipes`) 같은 방식으로 구현
        window.open(`/creator/${creatorId}/recipes`, '_blank');
      }
    }
  };

  // 사용자 여정: 구독 취소
  const handleUnsubscribe = (creatorId) => {
    const creator = subscribedCreators.find(c => c.id === creatorId);
    if (creator) {
      const confirmUnsubscribe = window.confirm(
        `정말로 '${creator.name}'의 구독을 취소하시겠습니까?\n\n구독 취소 후에는:\n- 새로운 레시피 알림을 받을 수 없습니다\n- 구독자 전용 콘텐츠에 접근할 수 없습니다`
      );
      
      if (confirmUnsubscribe) {
        // API 호출 시뮬레이션
        setTimeout(() => {
          setSubscribedCreators(prev => prev.filter(c => c.id !== creatorId));
          alert(`'${creator.name}'의 구독이 취소되었습니다.`);
        }, 500);
      }
    }
  };

  // 빈 상태 처리
  if (subscribedCreators.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">구독한 작가가 없습니다</h3>
          <p className="text-gray-500 mb-6">관심있는 작가를 구독하고 맛있는 레시피를 받아보세요!</p>
          <button 
            onClick={() => window.open('/creators', '_blank')}
            className="bg-ome-primary text-white px-6 py-3 rounded-lg hover:bg-ome-primary/90 transition-colors font-medium"
          >
            작가 둘러보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">구독한 작가</h2>
        <div className="text-sm text-gray-500">
          총 {subscribedCreators.length}명의 작가를 구독 중
        </div>
      </div>

      <div className="grid gap-6">
        {subscribedCreators.map((creator) => (
          <div key={creator.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-ome-primary to-ome-secondary rounded-full flex items-center justify-center text-2xl">
                  {creator.avatar}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{creator.name}</h3>
                  <p className="text-gray-600 mb-3">{creator.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ChefHat className="w-4 h-4" />
                      <span>레시피 {creator.recipesCount}개</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>구독자 {creator.subscribersCount.toLocaleString()}명</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>구독일 {creator.subscribedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleViewRecipes(creator.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-ome-secondary text-white rounded-lg hover:bg-ome-secondary/90 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>레시피 보기</span>
                </button>
                <button
                  onClick={() => handleUnsubscribe(creator.id)}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>구독 취소</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 작가 찾기 섹션 */}
      <div className="mt-8 p-6 bg-gradient-to-r from-ome-primary/10 to-ome-secondary/10 rounded-xl border border-ome-primary/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">더 많은 작가를 찾아보세요!</h3>
          <p className="text-gray-600 mb-4">새로운 요리 스타일과 레시피를 발견해보세요.</p>
          <button 
            onClick={() => window.open('/creators', '_blank')}
            className="bg-ome-primary text-white px-6 py-2 rounded-lg hover:bg-ome-primary/90 transition-colors font-medium"
          >
            작가 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribedCreators; 