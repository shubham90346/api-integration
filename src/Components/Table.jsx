import React, { useEffect, useState } from 'react';

function Table(props) {

  const [Data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Viewmore, setviewmore] = useState(false);
  console.log(Viewmore)
  const [body] = Data;


  const filteredArray = Data?.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  })


  const GetallData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) {
        console.log(` Error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    }
    catch (err) {
      console.log(err)
    };
  }

  useEffect(() => {
    GetallData()
  }, [])

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  }

  const handleclick = (() => {
    setviewmore(!Viewmore)
  })



  return (
    <div className='container mt-5 cdcd'>
      <h2 className='text-center p-4   t1 fw-bold  '>API's Integration Table  </h2>
      <input type="text" className='form-label tb2' placeholder='Search APIs' onChange={handleSearch} />
      <table className="table table-striped  ">
        <thead>
          <tr>
            <th scope="col" className='rtr'>UserId</th>
            <th scope="col" className='rtr'>Id</th>
            <th scope="col" className='rtr'>Title</th>
            <th scope="col" className='rtr'> Body</th>
            <th scope="col" className='rtr'>View More</th>
          </tr>
        </thead>
        <tbody>
          {
            Data ? filteredArray.map((item) => {
              return <tr key={item.id}>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td >{item.title}</td>
                <td>
                  {
                    Viewmore ? item.body : `${item.body.slice(0, 20)}...`
                  }
                </td>
                <td>
                  <button type="button" className="btn th3 text-white m-2" onClick={handleclick}>View</button>
                </td>
              </tr>

            }) : "NO DATA"
          }
        </tbody>
      </table>


    </div>
  );
}
export default Table;