const DrinkDetail = () => {
  return (
    <div className="mx-auto max-w-md bg-gray-50">
      {/* Main Image */}
      <div className="relative">
        <button className="absolute left-2 top-2 text-lg">◀</button>
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-300">
          <p className="text-lg font-semibold">대표이미지</p>
        </div>
      </div>

      {/* Description */}
      <section className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">술 이름</h2>
          <div className="flex space-x-4">
            <button>❤️</button>
            <button>🔗</button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          부가 설명~~~~~~~~~~~~~~~~~~~~~~
        </p>
      </section>

      {/* Basic Info */}
      <section className="border-b p-4">
        <h3 className="text-lg font-bold">기본 정보</h3>
        <div className="mt-2 grid grid-cols-2 text-sm">
          <div>
            <p>주종</p>
            <p className="text-gray-700">주종</p>
          </div>
          <div>
            <p>도수</p>
            <p className="text-gray-700">도수</p>
          </div>
          <div>
            <p>용량</p>
            <p className="text-gray-700">용량</p>
          </div>
          <div>
            <p>지역</p>
            <p className="text-gray-700">지역</p>
          </div>
        </div>
      </section>

      {/* Taste Profile */}
      <section className="border-b p-4">
        <h3 className="text-lg font-bold">맛 프로필</h3>
        <div className="mt-2 space-y-2">
          {['단맛', '신맛', '청량감', '바디감'].map((taste) => (
            <div key={taste} className="flex items-center space-x-4">
              <span className="w-16 text-sm text-gray-700">{taste}</span>
              <div className="flex flex-1 space-x-1">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className={`h-4 flex-1 rounded ${index < 3 ? 'bg-gray-700' : 'bg-gray-200'}`}
                  ></div>
                ))}
              </div>
              <span className="w-16 text-right text-sm text-gray-700">
                강함
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pairing Food */}
      <section className="border-b p-4">
        <h3 className="text-lg font-bold">추천 페어링 음식</h3>
        <div className="mt-2 flex justify-center space-x-4">
          {['음식1', '음식2', '음식3'].map((food) => (
            <div
              key={food}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500"
            >
              {food}
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="p-4">
        <h3 className="text-lg font-bold">리뷰</h3>
        <div className="mt-4">
          <textarea
            className="h-20 w-full rounded-lg border p-2 text-sm"
            placeholder="리뷰를 작성해 주세요"
          ></textarea>
          <button className="mt-2 w-full rounded-lg bg-gray-700 py-2 text-sm text-white">
            등록
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {[1, 2].map((review) => (
            <div key={review} className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">닉네임 {review}</span>
                    <span className="text-xs text-gray-500">24.12.26</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <span
                          key={index}
                          className={`text-yellow-500 ${index < 4 ? 'text-xl' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-xs text-gray-500">수정</button>
                      <button className="text-xs text-gray-500">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full rounded-lg bg-gray-100 p-4 text-sm">
                <p>이거 진짜 맛있어요</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white">
        ▲
      </button>
    </div>
  );
};

export default DrinkDetail;
