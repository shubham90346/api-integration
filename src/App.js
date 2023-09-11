

import FileUploader from './Components/Fileuploader';
import Imageuploader from './Components/Imageuploader';
import ApiTable from './Components/ApiTable';
// import Table from './Components/Table';


function App() {
  return (
    <div className="App">
      {/* <Table /> */}
      <ApiTable/>
      <br/> <br/> <br/>
      {/* <Imageuploader/> */}
      <FileUploader/>

    </div>
  );
}

export default App;
