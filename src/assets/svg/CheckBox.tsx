import { Palette } from 'styles/globals';

const CheckBox = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5 12C23.5 16.4244 22.7281 19.2496 20.9889 20.9889C19.2496 22.7281 16.4244 23.5 12 23.5C7.57557 23.5 4.75039 22.7281 3.01113 20.9889C1.27187 19.2496 0.5 16.4244 0.5 12C0.5 7.57557 1.27187 4.75039 3.01113 3.01113C4.75039 1.27187 7.57557 0.5 12 0.5C16.4244 0.5 19.2496 1.27187 20.9889 3.01113C22.7281 4.75039 23.5 7.57557 23.5 12Z"
        stroke={Palette.NEUTRAL_N30}
      />
    </svg>
  );
};

export default CheckBox;
