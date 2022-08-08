import React, { useState } from "react"
import styled from "styled-components"
// import { Button1 } from "antd"
import { Link } from "react-router-dom"
import Axios from "axios"
import { PlusCircleOutlined,MinusCircleOutlined } from "@ant-design/icons"
import DetailList from "../class/DetailList"
import { Button } from "@mui/material"

const CreateListDiv = styled.div`
    padding: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    `

    const CreateList = () => {
    const [countList, setCountList] = useState([0])
    
    //추가
    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }
    //삭제
    const onDelDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter -= 1
        countArr.pop(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }

    return (
        <CreateListDiv>
        <DetailList countList={countList} />
        <Button onClick={onAddDetailDiv}>
            <PlusCircleOutlined />추가
        </Button>
        <Button onClick={onDelDetailDiv}>
            <MinusCircleOutlined />삭제
        </Button>
        </CreateListDiv>
    )
}
export default CreateList