import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../Input';
import Button from '../Button';
import Footer from '../Footer';
import 'react-toastify/dist/ReactToastify.css';
import './Calc.css';
import math_bg from '../../assets/img/math_bg.png';

const Calc = () => {
  const [result, setResult] = useState(0);
  const [sideA, setSideA] = useState(0);
  const [sideB, setSideB] = useState(0);
  const [options, setOptions] = useState([
    {name: 'cathetus', label: 'Opposite Cathetus', selected: false},
    {name: 'hypotenuse', label: 'Hypotenuse', selected: true}
  ]);
  const notify = () => toast.info("Por favor, insira números positivos!");

  function handleSideA(event) {
    setSideA(event.target.value.replace(/\D/g, ''));
  }

  function handleSideB(event) {
    setSideB(event.target.value.replace(/\D/g, ''));
  }

  function hypot() {
    return Math.hypot(parseInt(sideA), parseInt(sideB));
  }

  function cathetus() {
    return Math.sqrt(Math.pow(parseInt(sideB),2) - Math.pow(parseInt(sideA),2));
  }

  function handleClick() {
    if(parseInt(sideA) === 0 || parseInt(sideB) === 0) {
      return notify();
    }
    const calc = getOption(true).name === "cathetus" ? cathetus() : hypot();
    setResult(calc);
  }

  
  function cleanElements(){
    setSideA(0);
    setSideB(0);
    setResult(0);
  }

  function handleSelect(event){
    cleanElements();
    const choices = options.map(option => {
      option.selected = option.name === event.target.value ? true : false;
      return option;
    });
    setOptions(choices);
  }

  function choosenLabel(){
    return getOption(false).label;
  }

  function getOption(bool){
    return options.find(option => option.selected === bool);
  }

  return (
    <div className="container">
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}/>
      <div className="row mt-5">
        <div className="col-lg-7">
          <div className="row">
            <div className="main-title mb-4">
              <h1>Pythagorean Theorem</h1>
              <p className="text-white">Given a right-angled triangle one can use the following equation to calculate an unknown side of the triangle where A and B are the cathetus, and C is the hypotenuse (the longest side): <b>c² = a² + b²</b></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <p className="text-white">Choose one of the options to calculate:</p>
            </div>
            <div className="col-md-5">
              <select className="form-select form-select-sm w-100" onChange={handleSelect} defaultValue={options.find(option => option.selected === true).name}>
                  {
                    options.map((option, index) => {
                      return (<option value={option.name} key={index}>{option.label}</option>) 
                    })
                  }
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <div className="form-floating mb-3">
                <Input id="floatingInput1" label="Adjacent Cathetus" value={sideA || ""} onChange={handleSideA} />
              </div>         
            </div>         
            <div className="col-md-6 mb-3">
              <div className="form-floating mb-3">
                <Input id="floatingInput2" label={choosenLabel()} value={sideB || ""} onChange={handleSideB} />
              </div>     
            </div>
            <div className="col-md-12 mb-3">
              <Button onClick={handleClick} />
            </div>
            <div className="col-md-12 mb-3">
              <label className="text-white ">{result ? `The answer is: ${result}` : ""}</label>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div>
            <img className="w-100" style={{'marginTop':'20px'}} src={math_bg} alt=""/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calc;
