import  { useState ,useCallback,useEffect ,useRef} from 'react'

function App() {
  const [len,setLen]=useState(8)
  const [chr,setChr]=useState(false)
  const [num,setNum]=useState(false)
  const [pass,setPass]=useState("")
  const reference = useRef(()=>{copytoclip()},[pass])
  const [colr,setColr]=useState("orange")
  const chng=()=>{
    setColr("grey")
  }
  const passwordgen =useCallback(()=>{
    let password = "";
    let str="ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num){
      str+="0123456789"
    }
    if(chr)str+=" !#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
    for(let i=1;i<=len;i++){
      let c=Math.floor(Math.random() * str.length + 1)
      password+=str.charAt(c)
    }
    setPass(password)
  },[len,chr,num,setPass])

  
  const copytoclip=useCallback(()=>{
    reference.current?.select()
    navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(()=>{passwordgen();},[len,chr,num,passwordgen])
  return (
    <>
    <h1 className=' text-center text-white text-4xl w-full px-2 my-1'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-red-700 bg-slate-600 '>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text"
              className='w-full  mx-auto shadow-md rounded-lg'
              value={pass}
              placeholder=' Password'
              readOnly
              ref={reference}
            />
            <button onClick={()=>{copytoclip(); chng();}}  style={{backgroundColor: colr}} className='w-14 text-white mx-auto shadow-md rounded-sm '>copy</button>
          </div>
         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input type="range"
              min={8}
              max={50}
              value={len}
              className='cursor-pointer'
              onChange={(e)=>{setLen(e.target.value)}}
              />
            <label >  lenght:{len}</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked={num}
                id='Number'
                onChange={()=>{setNum((prev)=>!prev)
                }}
                />
              <label htmlFor="Number for Input">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked={chr}
                id='Characters'
                onChange={()=>{setChr((prev)=>!prev)
                }}
                />
              <label htmlFor="Character for Input">Character</label>
            </div>
         </div>
      </div>
    </>
  )
}

export default App
