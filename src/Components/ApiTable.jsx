import React, { useEffect, useState } from 'react';

function ApiTable(props) {
  const [apiData, setapiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsperPages, setpostsperPages] = useState(10);
  const [titleperpage, settitleperpage] = useState(10);
  const [TitlePage, setTitlePage] = useState(1);
  const [Viewmore, setviewmore] = useState(false);
  const [Titles, setTitles] = useState([])


  useEffect(() => {
    apifilter()
  }, [])

  const apifilter = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      if (!res.ok) {
        console.log(` Error! Status: ${res.status}`);
      }
      const apidata = await res.json();
      setapiData(apidata)
    } 
    catch (error) {
      console.log(error)
    }
  }


  const TitleApi = async () => {
    try {
      if (searchText == "") {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?title=${searchText}`)
        console.log(response)
        if (!response.ok) {
          console.log(` Error! Status: ${response.status}`);
        }
        const apidatas = await response.json();
        setTitles(apidatas)
      }
      else {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${searchText}`)
        console.log(response)
        if (!response.ok) {
          console.log(` Error! Status: ${response.status}`);
        }
        const apidatas = await response.json();
        setTitles(apidatas)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  }
  const handleclick = (() => {
    setviewmore(!Viewmore)
  })


  // //   chunk data by 10x
  const lastpostindex = currentPage * postsperPages
  const firstpostindex = lastpostindex - postsperPages
  const currentpost = apiData.slice(firstpostindex, lastpostindex)


  // chunk data by 5 for id 
  const lastpostindexs = TitlePage * titleperpage
  const firstpostindexs = lastpostindexs - titleperpage
  const currentTitle = Titles.slice(firstpostindexs, lastpostindexs)


  //  filter of search 
  const filteredArray = currentpost?.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  })

  //filter of search api title
  const filteredArrays = Titles?.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  })


  let pagess = [];
  for (let i = 1; i <= Math.ceil(apiData.length / postsperPages); i++) {
    pagess.push(i)
  }


  // pagination 
  let pages = [];
  for (let i = 1; i <= Math.ceil(Titles.length / titleperpage); i++) {
    pages.push(i)

  }

  const onclicksearch = () => {
    TitleApi()
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
      <h2 className='text-center p-4 t1 fw-bold  '>API's Integration & Pagination Table  </h2>
      <div className=' bv'>
        <input type="text" className='form-label ' placeholder='Search api...' onChange={handleSearch} />
        <button type="button" className="btn-btn bgt text-white fw-bold" onClick={onclicksearch}>Submit</button>
      </div>
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
            }) : "no data"
          }
          {
            currentTitle ? filteredArrays.map((item) => {
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
            }) : "no data"

          }
        </tbody>
      </table>


      <div className='uty'>
        {
          (searchText < 10) ?
            pagess.map((page, index) => {
              return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? 'active text-white fw-bold' : 'pag1 '} >{page} </button>
            })
            :
            pages.map((page, index) => {
              return <button key={index} onClick={() => setTitlePage(page)} className={page == TitlePage ? 'active text-white fw-bold' : 'pag1 '} >{page}</button>
            })

        }
        <div className='d-flex '>
          {/* <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={prevclick}>PREV</button>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={firstclick}>FIRST</button>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={lastclick}>LAST</button>
        <button type="button" className="btn-btn bt2 text-white fw-bold" onClick={nextclick}>NEXT</button> */}
        </div>
      </div>

    </div>
  );
}


export default ApiTable;