import React from 'react';

const UserInfo = ({ onEdit }) => {
  // 임시 데이터 (나중에 API에서 가져올 예정)
  const userInfo = {
    nickname: "오메오메",
    email: "user@ome.com",
    membership: "Premium",
    profileImage: null
  };

  return (
    <div className="space-y-8">
      {/* 프로필 섹션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-8">
          <div className="w-24 h-24 bg-gradient-to-br from-ome-secondary/20 to-ome-primary/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            {userInfo.profileImage ? (
              <img src={userInfo.profileImage} alt="프로필" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-3xl">👤</span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-ome-text-primary">{userInfo.nickname}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                userInfo.membership === 'Premium' 
                  ? 'bg-ome-primary text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {userInfo.membership} 멤버
              </span>
            </div>
            <p className="text-ome-text-secondary text-lg mb-1">{userInfo.email}</p>
            <p className="text-sm text-ome-text-secondary">가입일: 2024.01.15</p>
          </div>
          
          <button
            onClick={onEdit}
            className="px-6 py-3 bg-ome-secondary text-white rounded-lg hover:bg-ome-secondary/90 transition-colors font-medium shadow-sm"
          >
            정보 수정
          </button>
        </div>
      </div>
      
      {/* 회원 정보 상세 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-ome-text-primary mb-6">상세 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ome-text-secondary uppercase tracking-wide">닉네임</label>
            <p className="text-lg text-ome-text-primary font-medium">{userInfo.nickname}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ome-text-secondary uppercase tracking-wide">이메일</label>
            <p className="text-lg text-ome-text-primary font-medium">{userInfo.email}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ome-text-secondary uppercase tracking-wide">멤버십</label>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                userInfo.membership === 'Premium' 
                  ? 'bg-ome-primary text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {userInfo.membership}
              </span>
              {userInfo.membership === 'Premium' && (
                <span className="text-sm text-ome-text-secondary">• 무제한 레시피 이용 가능</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ome-text-secondary uppercase tracking-wide">가입일</label>
            <p className="text-lg text-ome-text-primary font-medium">2024.01.15</p>
          </div>
        </div>
      </div>

      {/* 활동 통계 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-ome-text-primary mb-6">내 활동</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-sm font-medium text-blue-700">구독한 작가</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl">
            <div className="text-3xl font-bold text-rose-600 mb-2">12</div>
            <div className="text-sm font-medium text-rose-700">찜한 레시피</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
            <div className="text-3xl font-bold text-emerald-600 mb-2">28</div>
            <div className="text-sm font-medium text-emerald-700">본 레시피</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo; 