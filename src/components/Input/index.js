import './Input.css'

const Input = ({label, ...rest}) => {
  return (
    <>
    <input type="text" className="form-control" {...rest} placeholder="Aqui" autoComplete="off"/>
    <label className="text-white">{label}</label>
    </>
  );
};

export default Input;
