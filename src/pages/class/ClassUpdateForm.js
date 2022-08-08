import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ClassUpdateForm = () => {
  const { num } = useParams();

  const [photo, setPhoto] = useState('');
  const [sangpum, setSangpum] = useState('');
  const [su, setSu] = useState('');
  const [dan, setDan] = useState('');

  const navi = useNavigate();

  //url 등록
  let uploadUrl = 'http://localhost:9001/class/upload';
  let photoUrl = 'http://localhost:9001/save/';
  let detailUrl = 'http://localhost:9001/class/detail?num=' + num;
  let updateUrl = 'http://localhost:9001/class/update';

  //file change 시 호출 이벤트
  const uploadImage = e => {
    const uploadFile = e.target.files[0];
    const imageFile = new FormData();
    imageFile.append('uploadFile', uploadFile); //uploadFile = spring에서 MultipartFile에서 받아주는 이름

    axios({
      method: 'post',
      url: uploadUrl,
      data: imageFile,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        setPhoto(res.data); //백엔드에서 보낸 변경된 이미지명을 photo 변수에 넣는다
      })
      .catch(err => {
        alert(err);
      });
  };

  //스프링에서 num에 해당하는 data 받기
  //한 묶음으로 가져오려면 위에서 변수 선언하고 그 변수에 전체 데이터 담고 아래에서 data.sangpum 이런식으로 출력
  const onDataReceive = () => {
    axios
      .get(detailUrl)
      .then(res => {
        setSangpum(res.data.sangpum);
        setPhoto(res.data.photo);
        setSu(res.data.su);
        setDan(res.data.dan);
      })
      .catch(err => {
        alert(err);
      });
  };

  //처음 랜더링 시 위 함수 호출
  useEffect(() => {
    onDataReceive();
  }, []);

  //수정하는 함수 이벤트
  const onUpdate = e => {
    axios.post(updateUrl, { num, sangpum, su, dan }).then(res => {
      navi(`/class/detail/${num}`);
    });
  };

  return (
    <div>
      <table className="table table-bordered" style={{ width: '600px' }}>
        <caption>
          <b>상품 수정 (상품번호 : {num} )</b>
        </caption>
        <tbody>
          <tr>
            <th width="100" style={{ backgroundColor: '#d5bbdd' }}>
              상품명
            </th>
            <td width="300">
              <input
                type="text"
                className="form-control"
                style={{ width: '250px' }}
                defaultValue={sangpum}
                onChange={e => {
                  setSangpum(e.target.value);
                }}
              />
            </td>
            <th>{sangpum}</th>
          </tr>
          <tr>
            <th width="100" style={{ backgroundColor: '#d5bbdd' }}>
              상품사진
            </th>
            <td width="300">
              <input
                type="file"
                className="form-control"
                style={{ width: '250px' }}
                onChange={uploadImage}
              />
            </td>
            <th></th>
          </tr>
          <tr>
            <th width="100" style={{ backgroundColor: '#d5bbdd' }}>
              수 량
            </th>
            <td width="300">
              <input
                type="text"
                className="form-control"
                style={{ width: '120px' }}
                defaultValue={su}
                onChange={e => {
                  setSu(e.target.value);
                }}
              />
            </td>
            <th>{su}</th>
          </tr>
          <tr>
            <th width="100" style={{ backgroundColor: '#d5bbdd' }}>
              단 가
            </th>
            <td width="300">
              <input
                type="text"
                className="form-control"
                style={{ width: '150px' }}
                defaultValue={dan}
                onChange={e => {
                  setDan(e.target.value);
                }}
              />
            </td>
            <th>{dan}</th>
          </tr>
          <tr style={{ height: '160px' }}>
            <td colSpan="2">
              <img
                alt=""
                src={photoUrl + photo}
                style={{ width: '120px', marginLeft: '130px' }}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-success"
                style={{ width: '120px', height: '120px', marginLeft: '30px' }}
                onClick={onUpdate}
              >
                수정
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClassUpdateForm;
