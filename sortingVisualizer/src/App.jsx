import { useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import './App.css'
import Delay from './functions/Delay';
function App() {
  //defining all the necessry variabls
  let [array,setArray] = useState([9,8,7,6,5]);
  let [posi,setPosi] = useState(0);
  let [posj,setPosj] = useState(0);
  let [swap,setswap] = useState([null,null]);
  

  
  const Selection =async  ()=>{
    //temporary array
    let  temparr = [...array];
    //sorting algorithm
    for(let i = 0;i<temparr.length;i++){
      setArray(temparr);
      setPosi(i*150);
      let imin = i;
      for(let j = i+1;j<temparr.length;j++){
        if(temparr[imin] > temparr[j]){
          imin = j;
        }
        setPosj(j*150);
        await Delay(1000);
      }
      if(imin != i){
        let temp = temparr[imin];
        temparr[imin] = temparr[i];
        temparr[i] = temp;
        setswap([i,imin]);
        await Delay(2000);
        setswap([null,null])
      }
    }
  }

  const bubble =async  ()=>{
    //temporary array
    let  temparr = [...array];
    //sorting algorithm
    for(let i = 0;i<temparr.length-1;i++){
      setArray(temparr);
      setPosi(i*150);
      for(let j = 0;j<temparr.length-i-1;j++){
        setPosj(j*150);
        await Delay(1000);
        if(temparr[j] > temparr[j+1]){
          setswap([j,j+1]);
          let temp = temparr[j];
          temparr[j] = temparr[j+1];
          temparr[j+1] = temp;
          await Delay(2000);
          setswap([null,null]);
          setArray(temparr);
        } 
      }
        
      
    }
  }


  //the array ui elemnents
  const Cases = ()=>{
    
    // the animation
    const down = ()=> keyframes`
    0% {
      transform: translate(0,0);
    }
    25%{
      transform:translate(0,150px);

    }
    75%{
      transform:translate(${150*(swap[1]-swap[0])}px,150px);
    }
    100%{
      transform:translate(${150*(swap[1]-swap[0])}px,0px);
    }
    
  `;
  const up = ()=> keyframes`
  0% {
    transform: translate(0,0);
  }
  25%{
    transform:translate(0,-150px);

  }
  75%{
    transform:translate(${-150*(swap[1]-swap[0])}px,-150px);
  }
  100%{
    transform:translate(${-150*(swap[1]-swap[0])}px,0px);
  }
  `;

  const Item = styled.input`
  position: absolute;
  border: 2px solid #252525;
  width: 10vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  transition: transform 1s;
  left: ${(props) => props.left}px;
  ${(props) =>
    props.downanimation &&
    css`
    animation: ${down} 2s forwards;
    `};
    ${(props) =>
      props.upanimation &&
      css`
        animation: ${up} 2s forwards;
      `};

`;

    return array.map((value,index)=>{
      
     return  <Item
     type='number'
     
      left={index*150} downanimation = {swap[0] == index} upanimation={swap[1] == index} key={index} 
     value={swap[0] == index ? array[swap[1]]: swap[1] == index ? array[swap[0]]:value}
     onChange={(e)=>{
      let tempval = [...array];
      tempval[index] = parseInt(e.target.value)
      setArray(tempval);
     }}
     />
    })
  }
   
  return <><div className='relative w-[60vw] mx-auto mt-[200px]'>
    <Cases/>
    <div className={`w-[10vw] h-[10vw] border-2 border-red-400 absolute top-0  transition duration-300`}
    style={{ transform: `translateX(${posi}px)` }}>

    </div>
    <div className={`w-[10vw] h-[10vw] border-2 border-green-400 absolute top-0  transition duration-300`}
    style={{ transform: `translateX(${posj}px) `}}>
</div>
  </div>
  <button onClick={()=>Selection()} className='border'>sort</button>
  <button onClick={()=>bubble()} className='border'>bubble</button>



  </>


}
export default App;