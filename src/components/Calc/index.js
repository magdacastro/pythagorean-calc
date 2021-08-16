import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
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

  function handleSideA(event) {
    setSideA(event.target.value);
  }

  function handleSideB(event) {
    setSideB(event.target.value);
  }

  function hypot() {
    return Math.hypot(parseInt(sideA), parseInt(sideB));
  }

  function cathetus() {
    return Math.sqrt(Math.pow(parseInt(sideB),2) - Math.pow(parseInt(sideA),2));
  }

  function handleClick() {
    const calc = getOption(true).name === "cathetus" ? cathetus() : hypot();
    setResult(calc);
  }

  function handleSelect(event){
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
      <div className="row mt-3">
        <h2 className="text-center text-white">Pythagorean Theorem</h2>
        <p className="text-white">Given a right-angled triangle one can use the following equation to calculate an unknown side of the triangle: c = a + b;
        where A and B are the cathetus, and C is the hypotenuse (the longest side).</p>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-md-8">
              <p className="text-white">Choose one of the options to calculate:</p>
            </div>
            <div className="col-md-4">
              <select className="form-select form-select-sm w-200" onChange={handleSelect} defaultValue={options.find(option => option.selected === true).name}>
                  {
                    options.map((option, index) => {
                      return (<option value={option.name} key={index}>{option.label}</option>) 
                    })
                  }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-floating mb-3">
                <Input id="floatingInput1" label="Adjacent Cathetus" onChange={handleSideA} />
              </div>         
            </div>         
            <div className="col-md-6 mb-3">
              <div className="form-floating mb-3">
                <Input id="floatingInput2" label={choosenLabel()} onChange={handleSideB} />
              </div>     
            </div>
            <div className="col-md-12 mb-3">
              <Button onClick={handleClick} />
            </div>
            <div className="col-md-12 mt-3">
              <label className="text-white">Result:</label>
              <span className="text-white">{result || ""}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <img className="w-100" src={math_bg} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
