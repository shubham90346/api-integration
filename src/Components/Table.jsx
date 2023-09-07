import React, { useEffect, useState } from 'react';


function Table(props) {
  const [Data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Viewmore, setviewmore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsperPages, setpostsperPages] = useState(10);


  useEffect(() => {
    GetallData()
  }, [])

  const GetallData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?')
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



  // const apifilter = async () => {
  //   try {
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?title=${searchText}`)

  //     if (!res.ok) {
  //       console.log(` Error! Status: ${res.status}`);
  //     }
  //     const apidata = await res.json();
  //     // setapiData(apidata) 

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // apifilter()


  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  }

  const handleclick = (() => {
    setviewmore(!Viewmore)
  })

  const lastpostindex = currentPage * postsperPages
  const firstpostindex = lastpostindex - postsperPages
  const currentpost = Data.slice(firstpostindex, lastpostindex)


  const filteredArray = currentpost?.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  })
 

  let pages = [];
  for (let i = 1; i <= Math.ceil(Data.length / postsperPages); i++) {
    pages.push(i)
  }

  const prevclick = (() => {
    setCurrentPage(currentPage - 1)
  })

  const nextclick = (() => {
    setCurrentPage(currentPage + 1)
  })

  const firstclick = (() => {
    setCurrentPage(1)
  })

  const lastclick = (() => {
    setCurrentPage(10)
  })



  return (
    <div className='container mt-5 cdcd'>
      <h2 className='text-center p-4 t1 fw-bold  '>API's Integration Table  </h2>
      <input type="text" className='form-label tb2' placeholder='Search api...' onChange={handleSearch} />
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
            currentpost ? filteredArray.map((item) => {
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
                  <button type="button" className="btn th3 text-white m-2 fw-bold " onClick={handleclick}>View</button>
                </td>
              </tr>

            }) : "NO DATA"
          }

{/* 
          {
            apiData.map((item) => {

              return <tr key={item}></tr>

            })
          } */}

        </tbody>
      </table>

      <div className='uty'>
        {
          pages.map((page, index) => {
            return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? 'active text-white fw-bold' : 'pag1 '} >{page}</button>
          })

        }
      </div>

      <div className='d-flex utf '>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={prevclick}>PREV</button>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={firstclick}>FIRST</button>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={lastclick}>LAST</button>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={nextclick}>NEXT</button>
      </div>

      

    </div>
  );
}
export default Table;