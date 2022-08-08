import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useWishList from '../../hooks/useWishList';

import Card from '../../components/Card/Card';

import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BASE_URL } from '../../config';

const LIMIT = 12;

const LectureList = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const filterDom = useRef();
  const wishList = useWishList();

  const [cardList, setCardList] = useState([]);
  const [isContentsShowed, setIsContentsShowed] = useState(false);
  const [clickedCategory, setClickedCategory] = useState();
  const [clickedCheckList, setClickedCheckList] = useState([]);
  const [pageNum, setPageNum] = useState({ limit: LIMIT, offset: 0 });
  const { limit, offset } = pageNum;

  const getCardListData = useCallback(async () => {
    const res = await fetch(
      `${BASE_URL}/main/search${search}&offset=${offset}&limit=${limit}`
    );

    const data = await res.json();

    setCardList(data.result);
  }, [search, offset, limit]);

  useEffect(() => {
    getCardListData();
  }, [getCardListData]);

  const updatePageNum = buttonIndex => {
    const offset = buttonIndex * LIMIT;
    setPageNum({ ...pageNum, limit: LIMIT + offset, offset: offset });
  };

  const makeQueryString = () => {
    const queryString = clickedCheckList
      .map(({ id, content, sortType }) => {
        return sortType === 'category' || sortType === 'types'
          ? `${sortType}_id=${parseInt(id) + 1}`
          : `${sortType}=${content}`;
      })
      .map((item, idx) => {
        return idx === 0 ? item : '&' + item;
      })
      .join('');

    navigate(`?${queryString}`);
  };

  const handleCheckList = (e, content, idx, sort_type) => {
    e.target.checked
      ? setClickedCheckList([
          ...clickedCheckList,
          { id: idx, content, sortType: sort_type },
        ])
      : setClickedCheckList(
          clickedCheckList.filter(list => list.content !== content)
        );
  };

  useOutsideClick(filterDom, () => setIsContentsShowed(false));
  return (
    <Wrapper>
      <FilterList ref={filterDom}>
        {FILTER_CATEGORYS.map(({ sort_type, title, contents }, idx) => {
          return (
            <Filter key={idx}>
              <Category
                className={clickedCategory === idx && 'show'}
                onClick={() => {
                  setClickedCategory(idx);
                  setIsContentsShowed(true);
                }}
              >
                {title}
              </Category>
              <Contents
                className={
                  clickedCategory === idx && isContentsShowed && 'show'
                }
              >
                {contents.map((content, idx) => (
                  <Content
                    key={idx}
                    onClick={e => handleCheckList(e, content, idx, sort_type)}
                  >
                    <input type="checkbox" />
                    {content}
                  </Content>
                ))}

                <Btns>
                  <Button
                    bgColor={theme.red}
                    onClick={() => {
                      makeQueryString();
                      setIsContentsShowed(false);
                    }}
                  >
                    필터 적용
                  </Button>
                </Btns>
              </Contents>
            </Filter>
          );
        })}
      </FilterList>

      <CardList>
        {cardList &&
          wishList &&
          cardList.map(card => {
            return (
              <Card
                type="big"
                key={card.id}
                card={card}
                isWishList={wishList.includes(card.lecture_id)}
                getCardListData={getCardListData}
              />
            );
          })}
      </CardList>
      {((limit === 24 && offset === 12) || cardList?.length === 12) && (
        <PageBtns>
          <PageBtn onClick={() => updatePageNum(0)}>1</PageBtn>
          <PageBtn onClick={() => updatePageNum(1)}>2</PageBtn>
        </PageBtns>
      )}
    </Wrapper>
  );
};

export default LectureList;

const FILTER_CATEGORYS = [
  {
    sort_type: 'category',
    title: '카테고리',
    contents: [
      '국내',
      '일본',
      '유럽',
      '미국',
      '한식',
      '양식',
      '일식',
      '커피·디저트',
      '드로잉',
      '미술',
      '글쓰기',
      '사진',
      '러닝',
      '피트니스',
      '등산',
      '수영',
    ],
  },
  {
    sort_type: 'types',
    title: '클래스 진행 방식',
    contents: ['오프라인', 'VOD', '전자책'],
  },
  {
    sort_type: 'regions',
    title: '지역',
    contents: [
      '서울',
      '경기',
      '인천',
      '부산',
      '경상',
      '대전',
      '걍원',
      '광주',
      '제주',
    ],
  },
  {
    sort_type: 'schedules',
    title: '일정',
    contents: [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ],
  },
];

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  position : relative;
  padding-bottom: 20px;
`;

const CardList = styled.div`
  display: flex;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const FilterList = styled.ul`
  display: flex;
`;

const Filter = styled.li`
  position: relative;
`;

const Category = styled.div`
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  cursor: pointer;

  &:hover,
  &.show {
    background-color: #e6e9ed;
  }
`;

const Contents = styled.div`
  position: absolute;
  display: none;
  padding: 20px;
  top: 37px;
  left: 5px;
  width: 240px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: white;
  z-index: 200;

  &.show {
    display: block;
  }
`;

const Content = styled.div`
  margin: 10px 0;
  cursor: pointer;
`;

const Btns = styled.div`
  padding-top: 20px;
  text-align: right;
  border-top: 1px solid #dbdbdb;
`;

const Button = styled.button`
  background-color: ${props => props.bgColor};
  margin: 2px;
  padding: 5px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
`;

const PageBtns = styled.div`
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
`;

const PageBtn = styled.button`
  border: 1px solid gray;
  padding: 3px 6px;
  margin: 10px 3px;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
