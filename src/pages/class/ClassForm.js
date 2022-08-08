import React, { useState, useRef, useEffect } from 'react';
import './ClassForm.css';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import LoupeIcon from '@mui/icons-material/Loupe';
import Editor from './EditorWithUseQuill';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Weather from '../../components/Weather';
import ClassGuide from './ClassGuide';
import GuideModal from './GuideModal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import './react-datepicker.css';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { ko } from 'date-fns/esm/locale';

const ClassForm = passData => {
  const navi = useNavigate();

  let url = process.env.REACT_APP_SPRING_URL + 'class/reivewsave';

  //url 등록
  let uploadUrl = process.env.REACT_APP_SPRING_URL + 'class/upload';
  let photoUrl = 'http://localhost:9009/save/';
  let insertUrl = process.env.REACT_APP_SPRING_URL + 'class/insert';
  let insertUrl2 = process.env.REACT_APP_SPRING_URL + 'class/insert2';
  let numUrl = process.env.REACT_APP_SPRING_URL + 'class/maxnum';

  //class table < optionnum
  const tutor_id = localStorage.username;
  const [class_category, setClass_category] = useState('스냅사진');
  const [class_location, setClass_location] = useState('반포');
  const [class_name, setClass_name] = useState('');
  const [class_num, setClass_num] = useState('');
  const [class_anounok, setClass_anounok] = useState(false);

  const class_photo1 = useRef('');
  const class_photo2 = useRef('');
  const class_photo3 = useRef('');
  const class_photo4 = useRef('');
  const class_photo5 = useRef('');

  const [class_target, setClass_target] = useState('입문');
  // const [class_price, setClass_price] = useState(0); 밑에서 사용
  // const [class_hour, setClass_hour] = useState(0); 밑에서 사용

  //const class_intro = useRef(''); 밑에서 사용
  const [class_curri, setClass_curri] = useState('');
  const [class_anoun, setClass_anoun] = useState('');
  const [class_confirm, setClass_confirm] = useState('');

  //classoption table <classnum 배열로 저장해야할듯?
  const [classoption_day, setClassoption_day] = useState(
    new Date().toLocaleDateString('ko-KR')
  );
  const [dateinput, setDateinput] = useState(new Date());
  //const [classoption_starttime, setClassoption_starttime] = useState(0); 밑에서 사용
  //const [classoption_endtime, setClassoption_endtime] = useState(0); 밑에서 사용
  //const [classoption_totalperson, setClassoption_totalperson] = useState(1); 밑에서 사용

  function maxnum() {
    axios.post(numUrl).then(res => {
      console.log(res.data);
      setClass_num(res.data + 1);
      console.log(class_num);
      //navi("/login")
    });
  }

  //옵션 일정추가후 DB전송
  function uploadOptions() {
    axios.post(insertUrl2, options).then(res => {
      alert('클래스가 등록되었습니다!');
      //navi("/login")
    });
  }

  //0712#################################################3

  const [showImages, setShowImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photos2, setPhotos2] = useState([]);

  // 이미지 추가
  // 이미지 상대경로 저장
  const handleAddImages = event => {
    const imageLists = event.target.files;
    let imageUrlLists = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      console.log(imageLists[i]); //찍히고
      console.log(imageUrlLists[i]); //찍히고
      //`setClass_photo${i+1}`(imageUrlLists[i]);

      const uploadFile = imageLists[i];
      const imageFile = new FormData();
      imageFile.append('uploadFiles', uploadFile); //uploadFile = spring에서 MultipartFile에서 받아주는 이름

      axios({
        method: 'post',
        url: uploadUrl,
        data: imageFile,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(res => {
          console.log('axios2 : ' + res.data);
          photos.push(res.data);
          console.log(photos);
          //setPhotos(photos.concat(res.data));
        })
        .catch(err => {
          alert(err);
        });

      setPhotos2(photos2.concat(imageUrlLists));
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
      alert('이미지는 최대 5장입니다!');
      return false;
    }
    console.log('setphoto : ' + imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setPhotos(photos.filter((_, index) => index !== id));
    setPhotos2(photos2.filter((_, index) => index !== id));
    console.log(photos);
  };

  //추가하는 #############################33
  function onInsert() {
    //axios.post(insertUrl, {sangpum:sangpum, su:su, dan:dan}) // a : b - a는 spring dto의 필드 명, b는 여기서 보내주는 필드명 같을 때는 생략 가능
    if (class_name == '') {
      alert('클래스명을 입력해주세용');
      class_intro.focus();
      return;
    }
    if (class_hour == 0) {
      alert('클래스시간을 정확히 입력해주세요!');
      return;
    }
    if (options.length == 0) {
      alert('일정을 추가해주세요!');
      return;
    }
    if (class_intro.current == '') {
      alert('클래스 소개 영역을 입력해주세용');
      class_intro.current.focus();
      return;
    }
    if (class_curri == '') {
      alert('클래스 커리큘럼 영역을 입력해주세용');
      return;
    }
    if (class_confirm == '') {
      alert('승인메세지를 입력해주세용');
      return;
    }

    axios
      .post(insertUrl, {
        class_category,
        class_location,
        class_name,
        tutor_id: tutor_id,
        tutor_name: localStorage.nickname,
        class_photo1: photos[0],
        class_photo2: photos[1],
        class_photo3: photos[2],
        class_photo4: photos[3],
        class_photo5: photos[4],
        class_target,
        class_price,
        class_hour,
        class_intro: class_intro.current,
        class_curri,
        class_anoun,
        class_confirm,
        classoption_day,
        classoption_starttime,
        classoption_endtime,
        classoption_totalperson,
        class_anounok,
      })
      .then(res => {
        uploadOptions();
        console.log('쩐송');
        //목록으로 이동
        navi('/class/list');
      })
      .catch(err => {
        alert(err);
      });
  }

  //클래스옵션 저장할 배열객체
  const [options, setOptions] = useState([]);

  //클래스 옵션 저장
  const optionsave = () => {
    setOptions(
      options.concat({
        classoption_day,
        classoption_starttime,
        classoption_endtime,
        classoption_totalperson,
        class_num,
      })
    );
  };

  const onDelete = id => {
    setOptions(options.filter((_, index) => index !== id));
    console.log(options);
  };

  useEffect(() => {
    // console.log("진짜로"+photos);
    // console.log(options)
    maxnum();
  }, [options, photos]);

  //popup modal (ClassGuide, ClassIntroGuide)
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen1, setModalOpen1] = useState(false);
  const openModal1 = () => {
    setModalOpen1(true);
  };
  const closeModal1 = () => {
    setModalOpen1(false);
  };

  const [modalOpen2, setModalOpen2] = useState(false);
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  //가격제한
  const moneymin = 0;
  const moneymax = 10000000;
  const [class_price, setClass_price] = useState(0);
  const moneyChange = event => {
    const value = Math.max(
      moneymin,
      Math.min(moneymax, Number(event.target.value))
    );
    setClass_price(value);
  };

  //클래스 날짜
  //Today
  //1)
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  // console.log('date'+date);
  //2)
  //const nowTime = moment().format('YYYY-MM-DD');
  //console.log('nowTime'+nowTime);

  //클래스시간제한
  const classtimemin = 0;
  const classtimemax = 24;
  const [class_hour, setClass_hour] = useState(0);

  const classtimeChange = event => {
    const value = Math.max(
      classtimemin,
      Math.min(classtimemax, Number(event.target.value))
    );
    setClass_hour(value);
    if (24 == value) {
      alert('클래스 수강시간을 정확히 입력해주세요');
      return;
    }
  };

  //시작시간제한1
  const time1min = 0;
  const time1max = 24;
  const [classoption_starttime, setClassoption_starttime] = useState(0);

  const time1Change = event => {
    const value = Math.max(
      time1min,
      Math.min(time1max, Number(event.target.value))
    );
    setClassoption_starttime(value);
  };

  //끝시간제한
  const time2min = 0;
  const time2max = 24;
  const [classoption_endtime, setClassoption_endtime] = useState(24);

  const time2Change = event => {
    if (classoption_starttime > classoption_endtime) {
      alert('시작시간이 끝시간보다 작을 수없습니다');
      setClassoption_endtime(classoption_starttime);
    }
    const value = Math.max(
      time2min,
      Math.min(time2max, Number(event.target.value))
    );
    setClassoption_endtime(value);
  };

  //정원제한
  const permin = 1;
  const permax = 30;
  const [classoption_totalperson, setClassoption_totalperson] = useState(1);
  const perChange = event => {
    const value = Math.max(
      permin,
      Math.min(permax, Number(event.target.value))
    );
    setClassoption_totalperson(value);
    if (value > 29) {
      alert('최대인원은 30명입니다!');
    }
  };

  //Editor 자식 data
  const class_intro = useRef('');
  //1-(1)
  const changeMessage = msg => {
    class_intro.current = msg;
    console.log('찐' + class_intro.current);
  };

  return (
    <Wrapper>
      <div style={{ width: '1605px' }}>
        <div style={{ maxWidth: '40px', maxHeight: '60px' }}></div>
        <div className="class_subtitle">
          {tutor_id}님의 클래스에 대한 기본정보를 입력해주세요!
        </div>
        <div className="class_subtitle2">
          <div style={{ width: '455px', float: 'left', marginTop: '15px' }}>
            클래스 제목과 커버 이미지가 고민된다면
          </div>
          <span
            style={{
              fontSize: '32px',
              color: '#fea948',
              width: '55px',
              float: 'left',
              height: '32px',
              marginLeft: '5px',
            }}
          >
            👉
          </span>

          <a
            href="/class/guide"
            target="_blank"
            rel="noreferrer"
            style={{
              float: 'right',
              alignItems: 'center',
              textAlign: 'center',
              marginRight: '540px',
            }}
          >
            <div className="btn1">클래스 가이드 &gt;</div>
          </a>
        </div>
        <br />
        <hr className="hr" />
        <br />
        <br />
        <div className="row">
          <div className="label1">카테고리</div>
          <select
            className="label2"
            value={class_category}
            onChange={e => {
              setClass_category(e.target.value);
            }}
          >
            <option value="스냅사진">스냅사진</option>
            <option value="스포츠">스포츠</option>
            <option value="댄스">댄스</option>
            <option value="뮤직">뮤직</option>
            <option value="드로잉">드로잉</option>
          </select>
        </div>
        <div className="row">
          <div className="label1">위치선택</div>
          <select
            className="label2"
            value={class_location}
            onChange={e => {
              setClass_location(e.target.value);
            }}
          >
            <option value="반포">반포 한강공원</option>
            <option value="잠실">잠실 한강공원</option>
            <option value="이촌">이촌 한강공원</option>
            <option value="여의도">여의도 한강공원</option>
            <option value="난지">난지 한강공원</option>
            <option value="뚝섬">뚝섬 한강공원</option>
          </select>
        </div>
        <div className="row">
          <div className="label1" style={{ float: 'left' }}>
            클래스명
          </div>
          <input
            type="text"
            className="label2"
            placeholder="클래스명을 입력해주세요"
            style={{ width: '490px', marginLeft: '20px' }}
            onChange={e => {
              setClass_name(e.target.value);
            }}
          />
          <span
            style={{
              fontSize: '35px',
              color: 'gray',
              width: '55px',
              height: '68px',
              marginRight: '470px',
              marginTop: '15px',
              float: 'right',
            }}
          >
            <div className="sdf" style={{ width: '90px' }}>
              <LoupeIcon
                className="que"
                style={{ fontSize: '35px', float: 'left' }}
              />
              <span className="asd" style={{ top: '393px', left: '960px' }}>
                Tip!
                <br />
                클래스의 주제를 연상시키는 제목을 작성해주세요.
                <br />
                튜터님의 전문성을 드러내면 좋습니다.
                <br />
                미사여구, 부사, 형용사는 최대한 지양해주세요.
              </span>
            </div>
          </span>
        </div>
        <div className="row">
          <div className="label1">대표사진</div>

          <label
            htmlFor="input-file"
            onChange={handleAddImages}
            style={{ width: '1000px', padding: '0px' }}
          >
            <input type="file" id="input-file" multiple className="label2" />
          </label>

          <div style={{ marginLeft: '60px' }}>
            {/* // 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
            {photos2.map((image, id) => (
              <div className="smphotod" key={id}>
                <img src={image} alt={`${image}-${id}`} className="smphoto" />
                <div onClick={() => handleDeleteImage(id)}>&nbsp; ❌&nbsp;</div>
              </div>
            ))}
          </div>
          <br />
        </div>
        <div className="row">
          <div className="label1">수강대상</div>
          <select
            className="label2"
            onChange={e => {
              setClass_target(e.target.value);
            }}
            value={class_target}
          >
            <option value="입문">입문</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>
        </div>
        <div className="row">
          <div className="label1">총 가격</div>
          <input
            type="number"
            className="label2"
            defaultValue="0"
            style={{ width: '490px' }}
            step="1000"
            onChange={moneyChange}
            value={class_price}
          />
          <span
            style={{
              fontSize: '20px',
              marginLeft: '20px',
              width: '100px',
              padding: '20px',
            }}
          >
            원
          </span>
        </div>
        <div className="row">
          <div className="label1">수강시간</div>
          <input
            type="number"
            className="label2"
            style={{ width: '330px' }}
            onChange={classtimeChange}
            value={class_hour}
          />
          <span
            style={{
              fontSize: '20px',
              marginLeft: '20px',
              width: '250px',
              padding: '20px',
            }}
          >
            시간 (
            {`시간당 ${
              isNaN(class_price / class_hour)
                ? '0원'
                : class_price / class_hour === Infinity
                ? '0원'
                : Math.floor(class_price / class_hour) + '원'
            }`}
            )
          </span>
        </div>
        {/* 일정 ROW추가*/}
        <div className="row">
          <div className="label1">일정 및 정원</div>
          <div style={{ marginLeft: '10px', float: 'left', width: '250px' }}>
            <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              selected={dateinput}
              onChange={date => {
                const d = new Date(date).toLocaleDateString('ko-KR');
                setDateinput(date);
                console.log(d);
                setClassoption_day(d);
              }}
              minDate={new Date()}
              showDisabledMonthNavigation
            />
          </div>
          <input
            type="number"
            className="label2"
            defaultValue="0"
            style={{ width: '60px' }}
            name="classoption_starttime"
            onChange={time1Change}
          />
          <span
            style={{
              fontSize: '20px',
              marginLeft: '0px',
              marginTop: '25px',
              width: '30px',
            }}
          >
            시&nbsp;~&nbsp;
          </span>

          <input
            type="number"
            className="label2"
            defaultValue="24"
            style={{ width: '70px' }}
            onChange={time2Change}
            name="classoption_endtime"
          />
          <span
            style={{
              fontSize: '20px',
              marginLeft: '2px',
              width: '60px',
              padding: '5px',
              marginTop: '20px',
            }}
          >
            시
          </span>
          <input
            type="number"
            className="label2"
            defaultValue="1"
            style={{ width: '60px', marginLeft: '-25px' }}
            name="classoption_totalperson"
            onChange={perChange}
          />
          <span
            style={{
              fontSize: '20px',
              marginLeft: '2px',
              width: '50px',
              padding: '5px',
              marginTop: '20px',
            }}
          >
            명
          </span>
          <br />

          {options.map((row, idx) => (
            <div className="class_planrow">
              {row.classoption_day} &nbsp;&nbsp;{row.classoption_starttime}시 ~{' '}
              {row.classoption_endtime}시 &nbsp;&nbsp;
              {row.classoption_totalperson}
              명&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div
                onClick={() => onDelete(idx)}
                className="xbtn"
                style={{
                  border: '0px soild gray',
                  backgroundColor: 'white',
                  float: 'right',
                }}
              >
                {' '}
                ❌{' '}
              </div>
            </div>
          ))}

          <div style={{ width: '760px', marginLeft: '50px' }}>
            <button className="btn2" onClick={optionsave}>
              + 일정추가
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="class_subtitle">
          수강생들에게 클래스에 대해 상세하게 소개해주세요!
        </div>
        <div className="class_subtitle2">
          <div style={{ width: '455px', float: 'left', marginTop: '15px' }}>
            인기 클래스가 되는 노하우가 궁금하다면?
          </div>
          <span
            style={{
              fontSize: '32px',
              color: '#fea948',
              width: '55px',
              float: 'left',
              height: '32px',
              marginLeft: '5px',
            }}
          >
            👉
          </span>
          <React.Fragment>
            <button onClick={openModal2} className="btn1">
              클래스 소개 가이드 &gt;
            </button>
            {/* //header 부분에 텍스트를 입력한다. */}
            <GuideModal
              open={modalOpen2}
              close={closeModal2}
              header="클래스가이드"
            >
              {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달
                            팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요! */}
            </GuideModal>
          </React.Fragment>
          {/* <button className="btn1"
                    onClick={()=>{
                        navi("/class/introguide")
                    }}>클래스 소개 가이드 &gt; </button> */}
        </div>
        <br />
        <hr className="hr" />
        <div className="row">
          <div className="editor" style={{ marginLeft: '50px' }}>
            <span className="class_minititle">클래스 소개</span>
            <span className="tulp">
              <HelpOutlineIcon
                style={{ fontSize: '20px', marginLeft: '10px' }}
              />
              <span className="tulc">
                튜티들이 가장 먼저 확인하는 부분입니다! 클래스를 선택해야 하는
                이유, 차별점을 중심으로 소개해주세요~
              </span>
            </span>
            <Editor onMessage={changeMessage} />
          </div>
        </div>
        <div className="row">
          <div className="editor" style={{ marginLeft: '50px' }}>
            <span className="class_minititle">클래스 커리큘럼</span>
            <textarea
              className="textarea1"
              placeholder="클래스의 '기본정보'를 포함하여 상세히 작성해주세요.
                            > 기본정보 : 클래스 진행방식, 클래스 목표, 클래스 결과물, 차별점"
              onChange={e => {
                setClass_curri(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="editor" style={{ marginLeft: '50px' }}>
            <span className="class_minititle">클래스 공지</span>
            <textarea
              className="textarea1"
              placeholder="클래스 전 숙지해야할 사항을 적어주세요.
                            대여비, 준비물 등 추가 비용이 있는 경우 반드시 적어주세요
                            (ex.시간당 1,000원~1,500원 정도의 장소대여비는 별도입니다.)"
              onChange={e => {
                setClass_anoun(e.target.value);
              }}
            ></textarea>
          </div>
          <div style={{ marginLeft: '610px', marginTop: '1px' }}>
            <label>
              <span className="anou">공지사항을 노출하시겠습니까?</span> &nbsp;
              <input
                type="checkbox"
                onChange={e => {
                  if (class_anounok == true) {
                    setClass_anounok(false);
                  } else {
                    setClass_anounok(true);
                  }
                }}
              ></input>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="editor" style={{ marginLeft: '50px' }}>
            <span className="class_minititle">튜터 승인 메세지</span>
            <textarea
              className="textarea1"
              placeholder="튜티와 클래스 연결 시에 해당 메세지가 전달됩니다"
              onChange={e => {
                setClass_confirm(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <br />
        <br />
        <br />
        <button
          class="w-btn w-btn-gra3 w-btn-gra-anim"
          type="submit"
          onClick={onInsert}
        >
          클래스 등록
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </Wrapper>
  );
};

export default ClassForm;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  margin-top: 80px;
  position: relative;
  padding-bottom: 20px;
  height: 4300px;
  margin-left: 470px;
`;
