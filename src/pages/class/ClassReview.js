import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import './ClassReview.css';
import { textAlign } from '@mui/system';
import StarRatings from 'react-star-ratings';
import { Numbers } from '@mui/icons-material';

const ClassReview = ({ class_num, onDeleteReview }) => {
  const [data, setData] = useState([]);
  // const [ratingAvg, setRatingAvg] = useState('');
  const getReviews = () => {
    axios.get().then(res => {});
  };

  let photoUrl = process.env.REACT_APP_SPRING_URL + 'save/';
  let reviewListUrl =
    process.env.REACT_APP_SPRING_URL + 'review/alllist?class_num=' + class_num;
  let detailUrl =
    process.env.REACT_APP_SPRING_URL + 'class/detail?class_num=' + class_num;
  const ReviewList = () => {
    axios
      .get(reviewListUrl, {
        class_num,
      })
      .then(res => {
        setData(res.data);
        console.log(res.data);
      });
  };

  // const deleteUrl =
  //   process.env.REACT_APP_SPRING_URL + 'review/delete?classreview_num=';
  // const onDeleteReview = num => {
  //   axios.get(deleteUrl + num).then(res => {
  //     alert('삭제됬슴니돠아!');
  //     window.location.reload();
  //   });
  // };

  useEffect(() => {
    // onAvgReceive();
    ReviewList();
  }, [class_num]);
  // const onAvgReceive = () => {
  //   axios.get(detailUrl).then(res => {
  //     //res에 dto가 들어있음
  //     //console.log(res.data.sangpum); 상품명 출력 확인
  //     setData(res.data);
  //     setRatingAvg(res.data.class_price);
  //     console.log(res.data);
  //   });
  // };
  const reviewWriter = localStorage.getItem('username');

  return (
    <div className="class_reviewbox">
      <table
        className="table table-borderless"
        id="review_table"
        style={{ width: '100%' }}
      >
        {/* <thead>
          <tr
            style={{
              backgroundColor: -'#7814DC',
              borderBottom: '1px solid silver',
            }}
          >
            <th width="30" height="40px" style={{ textAlign: 'center' }}>
              <p>번호</p>
            </th>
            <th width="50px">
              <p>사진</p>
            </th>
            <th width="200">
              <p>내용</p>
            </th>
            <th width="100">
              <p>평점</p>
            </th>
            <th width="50">
              <p>작성자</p>
            </th>
            <th width="80">
              <p>작성일</p>
            </th>
            <th width="30">
              <p>삭제</p>
            </th>
          </tr>
        </thead> */}
        <tbody>
          {data &&
            data.map(row => (
              <tr
                style={{
                  height: '80px',
                  // borderTop: '1px solid black',
                  backgroundColor: 'background-color: rgba(255, 255, 255, 0.3)',
                }}
              >
                <td style={{ textAlign: 'center' }}>
                  {/* <p>{row.classreview_num}</p> */}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <img
                    alt=""
                    className="photo_small"
                    src={photoUrl + row.classreview_photo}
                    style={{ margin: '5px' }}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <p style={{ position: 'relative', bottom: '35px' }}>
                    {row.classreview_content}
                  </p>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <p>
                    {' '}
                    <Rating
                      name="size-medium"
                      size="large"
                      defaultValue={row.classreview_rate}
                      readOnly
                    />
                  </p>
                </td>

                <td style={{ textAlign: 'center' }}>
                  <p style={{ position: 'relative', bottom: '35px' }}>
                    {row.classreview_writer}
                  </p>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <p style={{ position: 'relative', bottom: '35px' }}>
                    {row.classreview_date}
                  </p>
                </td>
                <td>
                  {localStorage.loginok === 'yes' &&
                  localStorage.nickname === row.classreview_writer ? (
                    <button
                      style={{ border: 'none', backgroundColor: 'white' }}
                      onClick={() => {
                        if (window.confirm(`정말로 삭제하시겠습니까?`)) {
                          const deleteUrl =
                            process.env.REACT_APP_SPRING_URL +
                            'review/delete?classreview_num=' +
                            row.classreview_num;
                          axios.get(deleteUrl).then(res => {
                            alert('삭제됬슴니돠아!');
                            window.location.reload();
                          });
                        }
                      }}
                    >
                      ✖️
                    </button>
                  ) : localStorage.loginok === 'yes' &&
                    localStorage.username === 'admin' ? (
                    <button
                      style={{ border: 'none', backgroundColor: 'white' }}
                      onClick={() => {
                        if (window.confirm(`정말로 삭제하시겠습니까?`)) {
                          const deleteUrl =
                            process.env.REACT_APP_SPRING_URL +
                            'review/delete?classreview_num=' +
                            row.classreview_num;
                          axios.get(deleteUrl).then(res => {
                            alert('삭제됬슴니돠아!');
                            window.location.reload();
                          });
                        }
                      }}
                    >
                      ✖️
                    </button>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassReview;
