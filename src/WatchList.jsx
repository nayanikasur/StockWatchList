import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;

  tr:nth-of-type(odd) {
    background: #eee;
  }

  th {
    background: #333;
    color: white;
    font-weight: bold;
  }

  td, th {
    padding: 6px;
    border: 1px solid #ccc;
    text-align: left;
  }

  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin: 0 0 1rem 0;
    }

    tr:nth-child(odd) {
      background: #ccc;
    }

    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }

    td:before {
      position: absolute;
      top: 0;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
    }

    td:nth-of-type(1):before { content: "Symbol"; }
    td:nth-of-type(2):before { content: "Name"; }
    td:nth-of-type(3):before { content: "Type"; }
    td:nth-of-type(4):before { content: "Region"; }
    td:nth-of-type(5):before { content: "Market Open"; }
    td:nth-of-type(6):before { content: "Market Close"; }
    td:nth-of-type(7):before { content: "Timezone"; }
    td:nth-of-type(8):before { content: "Currency"; }
    td:nth-of-type(9):before { content: "Match Score"; }
    td:nth-of-type(10):before { content: "Add to Watch"; }
  }
`;

const AddToStocks = styled.button`
background-color: #add8e6;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;

  &:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  }
`;

const EmptyWatchList = styled.div`
height: 50vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

text-align: justify;
text-justify: inter-word
`;

const EmptyWatchListHeader = styled.h1`
text-align: center;
word-wrap: break-word;
`;

const ClearWatchListButton = styled.button`
float: right;
margin-top: 1rem;
`;


function WatchList() {
  const [newdata, setNewData] = useState([]);

  useEffect(() => {
    let data = [];
    Object.keys(localStorage).forEach(key => {
      const jsonString = localStorage.getItem(key);
      const parsedData = JSON.parse(jsonString);
      data.push(parsedData);
    });
    console.log(data);
    setNewData(data);
  }, [])

  console.log(newdata);
  const RemoveWatchList = (k) => {
    console.log(k);
    localStorage.removeItem(k);
    const currentdata = newdata.filter((item) => item["1. symbol"] !== k);
    setNewData(currentdata);
  }

  const ClearWatchList = () => {
    localStorage.clear();
    setNewData([]);
  }

  return (
    <>
      {newdata.length > 0 ?
        <>
          <StyledTable>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Type</th>
                <th>Region</th>
                <th>Market Open</th>
                <th>Market Close</th>
                <th>Timezone</th>
                <th>Currency</th>
                <th>Match Score</th>
                <th>Add to Watch</th>
              </tr>
            </thead>
            <tbody>
              {newdata.map((item) => (
                <tr>
                  <td>{item['1. symbol']}</td>
                  <td>{item['2. name']}</td>
                  <td>{item['3. type']}</td>
                  <td>{item['4. region']}</td>
                  <td>{item['5. marketOpen']}</td>
                  <td>{item['6. marketClose']}</td>
                  <td>{item['7. timezone']}</td>
                  <td>{item['8. currency']}</td>
                  <td>{item['9. matchScore']}</td>
                  <td onClick={() => RemoveWatchList(item["1. symbol"])}><div style={{ textAlign: "center", cursor: "pointer" }}><span>-</span></div></td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          <ClearWatchListButton onClick={ClearWatchList}>Clear Watchlist</ClearWatchListButton>
        </> :
        <>
          <EmptyWatchList>
            <EmptyWatchListHeader>Your watchlist is empty!!</EmptyWatchListHeader>
            <Link to="/">
              <AddToStocks>ADD STOCKS</AddToStocks>
            </Link>
          </EmptyWatchList>
        </>}
    </>
  );
}

export default WatchList;
