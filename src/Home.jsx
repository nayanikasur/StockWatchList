import styled from 'styled-components';
import { useState } from "react";

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

const SearchBar = styled.input`
height: 3rem;
max-width: 70%; 
width: 100%; 
border-radius: 2rem;
padding: 0.3rem;
border: none;
font-size: larger;
&:focus {
  outline: none;
}
`;

const Search = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
margin-top: 10%;
`;

const SearchBox = styled.form`
width: 50%;
display: flex;
justify-content: flex-start;
align-items: center;
border: 1px solid;
border-radius: 2rem;
padding: 0.5rem;
-webkit-transition: box-shadow linear 0.2s;
transition: box-shadow linear 0.2s;

&:hover{
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
}

@media (max-width: 768px) {
  width: 70%; 
}
`;

const Icon = styled.img`
height: 3rem;
width: 3rem;
`;

const LeftIcon = styled(Icon)`
left: 1rem;
`;

const RightIcon = styled(Icon)`
margin-left: auto;
right: 0.5rem; 
`;

function Home() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [delButton, setDelButtion] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = async (event) => {
        const inputValue = event.target.value;
        setSearch(inputValue);


        if (inputValue.trim() === '') {
            setDelButtion(false);
            setSearchResult([]);
        } else {
            await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=30UNOGI4Z8BSXE74`)
                .then((response) => {
                    setDelButtion(true);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const allData = data.bestMatches;
                    allData.forEach((item) => {
                        if (Object.keys(localStorage).includes(item["1. symbol"])) {
                            item.isAdded = true;
                        }
                        else {
                            item.isAdded = false;
                        }
                    })
                    setSearchResult(allData);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    };

    function handleDeleteSearch() {
        setSearch('');
        setSearchResult([]);
        setDelButtion(false);
    }


    const addToWatchList = (item, index) => {

        const updatedItem = item;
        if (item.isAdded) {
            updatedItem.isAdded = false;
            localStorage.removeItem(item["1. symbol"]);
        } else {
            updatedItem.isAdded = true;
            const serializedItem = JSON.stringify(item);
            console.log(serializedItem);
            localStorage.setItem(item["1. symbol"], serializedItem);
        }

        const updatedSearchResult = [...searchResult];
        updatedSearchResult[index] = updatedItem;
        setSearchResult(updatedSearchResult);
    }

    return (
        <>
            <Search>
                <h1>Investment ka Search Engine</h1>
                <p>Discover investments at your fingertips.</p>
                <SearchBox onSubmit={handleSubmit}>
                    <LeftIcon onClick={handleSubmit} src="https://cdn-icons-png.flaticon.com/128/622/622669.png" alt="search-button" />
                    <SearchBar value={search} onChange={handleChange} placeholder="search-bar" />
                    {delButton ? <RightIcon onClick={handleDeleteSearch} src="https://cdn-icons-png.flaticon.com/128/2723/2723639.png" alt="delete" /> : null}
                </SearchBox>
            </Search>

            {searchResult && searchResult.length > 0 ? (

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
                        {searchResult.map((item, index) => (
                            <tr key={index}>
                                <td>{item['1. symbol']}</td>
                                <td>{item['2. name']}</td>
                                <td>{item['3. type']}</td>
                                <td>{item['4. region']}</td>
                                <td>{item['5. marketOpen']}</td>
                                <td>{item['6. marketClose']}</td>
                                <td>{item['7. timezone']}</td>
                                <td>{item['8. currency']}</td>
                                <td>{item['9. matchScore']}</td>
                                <td onClick={() => addToWatchList(item, index)}>{item.isAdded ? "-" : "+"}</td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>

            ) : null}
        </>
    );
}
export default Home;