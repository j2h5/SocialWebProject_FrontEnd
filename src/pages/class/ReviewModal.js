import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './Modal.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import img4 from './classImage/guide4.JPG';
import axios from 'axios';

const ReviewModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const { class_num } = useParams();
  const navi = useNavigate();

  const [classreview_rate, setClassreview_rate] = useState('');
  const [classreview_content, setClassreview_content] = useState('');
  const [classreview_photo, setClassreview_photo] = useState('');
  const classreview_writer = localStorage.nickname;

  let url = process.env.REACT_APP_SPRING_URL + 'review/insert';
  let uploadUrl = process.env.REACT_APP_SPRING_URL + 'review/upload';

  //file change시 호출 이벤트

  const uploadImage = e => {
    const uploadFile = e.target.files[0];
    const imageFile = new FormData();
    imageFile.append('uploadFile', uploadFile);

    axios({
      method: 'post',
      url: uploadUrl,
      data: imageFile,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        setClassreview_photo(res.data); //백엔드에서 보낸 변경된 이미지명을 photo 변수에 넣는다
      })
      .catch(err => {
        alert(err);
      });
  };

  const saveReview = () => {
    axios
      .post(url, {
        classreview_rate,
        class_num,
        classreview_content,
        classreview_photo,
        classreview_writer,
      })
      .then(res => {
        console.log(classreview_writer);
        window.location.reload();
      });
  };

  const resetValues = () => {
    setClassreview_rate('');
    setClassreview_content('');
    setClassreview_photo('');
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      작성자
                    </TableCell>
                    <TableCell align="left" style={{ width: '500px' }}>
                      {classreview_writer}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      별 점
                    </TableCell>
                    <TableCell align="left" style={{ width: '500px' }}>
                      <Rating
                        name="size-medium"
                        size="large"
                        onChange={e => {
                          setClassreview_rate(e.target.value);
                          console.log(classreview_rate);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      사 진
                    </TableCell>
                    <TableCell>
                      <Input type="file" onChange={uploadImage} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      내 용
                    </TableCell>
                    <TableCell align="left">
                      <TextareaAutosize
                        style={{ width: '500px', height: '200px' }}
                        onChange={e => {
                          setClassreview_content(e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <Button color="primary" align="rignt">
                        작성하기
                      </Button>
                    </TableCell>
                  </TableRow> */}
                </TableHead>
              </Table>
            </TableContainer>
          </main>
          <footer>
            <button className="close" onClick={saveReview}>
              작성하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default ReviewModal;
