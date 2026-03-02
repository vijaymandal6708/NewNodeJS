
function App() {

  return (
    <>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"200px"}}>
        <form action="http://localhost:8000/upload" method="POST" encType="multipart/form-data">
        <input type="file" name="file" required />
        <button type="submit">Upload</button>
      </form>
      </div>
    </>
  )
}

export default App