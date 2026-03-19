import {BrowserRouter, Route, Routes} from "react-router-dom";
import Insert from "./components/Insert";
import Display from "./components/Display";
import Edit from "./components/Edit";
import Search from "./components/Search";
import Layout from "./components/Layout";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout/>}>
             <Route index element={<Insert />}></Route>
             <Route path="/insert" element={<Insert />}></Route>
             <Route path="/display" element={<Display />}></Route>
             <Route path="/edit" element={<Edit />}></Route>
             <Route path="/search" element={<Search />}></Route>
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
