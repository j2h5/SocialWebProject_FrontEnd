import React, {useState} from "react";

import styled from "styled-components"
import Editor2 from "./Editor"
import Editor from "./EditorWithUseQuill"

const DetailDiv = styled.div`
    div {
        margin-bottom: 2rem;
        width: 700px;
    }
    `
    

    const DetailList = (props) => {

    return (
        <DetailDiv>
        {props.countList && props.countList.map((item, i) => (
            <div key={i}>
                <div className="row">
                    <input type='date'className="label2" 
                    style={{width:'200px'}}
                    onChange={(e)=>{
                        // setClassoption_day(e.target.value)    
                    }}/>
                    <input type='number'className="label2"
                    style={{width:'60px'}}
                    // onChange={time1Change}
                    // value={classoption_starttime}
                    />
                    <span style={{fontSize:'20px', marginLeft:'2px'}}>시</span>
                    <span style={{fontSize:'20px', marginLeft:'20px'}}>~</span>
                    <input type='number'className="label2"
                    style={{width:'60px'}}
                    // onChange={time2Change}
                    // value={classoption_endtime}
                    />
                    <span style={{fontSize:'20px', marginLeft:'2px'}}>시</span>
                    <input type='number'className="label2" defaultValue='1'
                    style={{width:'60px'}}
                    // onChange={perChange}
                    // value={classoption_totalperson}
                    />
                    <span style={{fontSize:'20px', marginLeft:'2px'}}
                    >명</span>
                </div>
            </div>
        ))}
        <Editor/>
        <Editor2/>
        </DetailDiv>
    )
}

export default DetailList