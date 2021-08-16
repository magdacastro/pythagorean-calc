import './Button.css';

const Button = (props) => {
  return (
    <button {...props} className="btn btn-calc">
      Calculate
    </button>
  );
};

export default Button;