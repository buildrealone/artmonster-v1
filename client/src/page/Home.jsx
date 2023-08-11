import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-rose-500 text-base uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://artmonster-v1-server.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /////////////////////////////////////////// SEARCH FUNCTIONALITY
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };
  ///////////////////////////////////////////

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-light text-[#222328] text-3xl">ArtMonster: Create AI-generated Images</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">아트몬스터에서 생성된 이미지들을 감상해 보세요</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="이미지 검색하기"
          type="text"
          name="text"
          placeholder="이미지 키워드를 입력해 주세요 (ex. whale)"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-light text-gray-800 text-xl mb-3">
                이미지 검색 결과 <span className="text-gray-800">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="검색 결과가 없습니다."
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="포스팅이 없습니다."
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
