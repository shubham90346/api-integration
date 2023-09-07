import React, { useEffect, useState } from 'react';

function ApiTable(props) {
    const [apiData, setapiData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsperPages, setpostsperPages] = useState(10);
    const [titleperpage, settitleperpage] = useState(5);
    const [TitlePage, setTitlePage] = useState(1);
    const [Viewmore, setviewmore] = useState(false);
    const [Titles, setTitles]= useState([])


    // const apifilter = async () => {
    //     try {
    //         const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
          
    //         if (!res.ok) {
    //             console.log(` Error! Status: ${res.status}`);
    //         }
    //         const apidata = await res.json();
    //         setapiData(apidata)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     apifilter()
    // }, [])

    
    const TitleApi = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?title=${searchText}`)
            
        
            if (!response.ok) {
                console.log(` Error! Status: ${response.status}`);
            }
            const apidatas = await response.json();
             setTitles(apidatas)

        } catch (error) {
            console.log(error)
        }
    }


    TitleApi();
    

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchText(value);
    }

    const handleclick = (() => {
        setviewmore(!Viewmore)
      })


    // //   chunk data by 10x
    // const lastpostindex = currentPage * postsperPages
    // const firstpostindex = lastpostindex - postsperPages
    // const currentpost = apiData.slice(firstpostindex, lastpostindex)
 

    // chunk data by 5 for id 
    const lastpostindexs = TitlePage * titleperpage
    const firstpostindexs = lastpostindexs - titleperpage
    const currentTitle= Titles.slice(firstpostindexs,lastpostindexs) 
    

   
   
    
    //  filter of search 
    // const filteredArray = currentpost?.filter((item) => {
    //     return item.title.toLowerCase().includes(searchText.toLowerCase());
    //   })


       //filter of search api title
    const filteredArrays =  Titles?.filter((item) => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      })



    //   let pages = [];
    //   for (let i = 1; i <= Math.ceil(apiData.length / postsperPages); i++) {
    //     pages.push(i)
    //   }




      // pagination 
          let pages = [];
      for (let i = 1; i <= Math.ceil(Titles.length / titleperpage); i++) {
        pages.push(i)
        
      }





    return (
        <div className='container mt-5 cdcd'>
            <h2 className='text-center p-4 t1 fw-bold  '>API's Pagination Table  </h2>
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

                    {/* {
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
                    }):"no data"
                } */}
                {
                     currentTitle ? filteredArrays.map((item) =>{
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
            {/* {
          pages.map((page, index) => {
            return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? 'active text-white fw-bold' : 'pag1 '} >{page}</button>
          })

        } */}
        {
          pages.map((page, index) => {
            return <button key={index} onClick={() => setTitlePage(page)} className={page == TitlePage ? 'active text-white fw-bold' : 'pag1 '} >{page}</button>
          })

        }

        </div>
    );
}

export default ApiTable;