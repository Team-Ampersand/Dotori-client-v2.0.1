import { Palette } from 'styles/globals';

const MaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="4.50024"
      cy="6.49902"
      r="3.25"
      stroke={Palette.NEUTRAL_N10}
      strokeWidth="1.5"
    />
    <path
      d="M6.96956 2.97063L6.43922 3.50094L7.49985 4.56164L8.03019 4.03132L6.96956 2.97063ZM9.5 1.50098H10.25C10.25 1.08676 9.91421 0.750977 9.5 0.750977V1.50098ZM8.75 3.00098C8.75 3.41519 9.08579 3.75098 9.5 3.75098C9.91421 3.75098 10.25 3.41519 10.25 3.00098H8.75ZM8 0.750977C7.58579 0.750977 7.25 1.08676 7.25 1.50098C7.25 1.91519 7.58579 2.25098 8 2.25098V0.750977ZM8.75 1.50098V3.00098H10.25V1.50098H8.75ZM9.5 0.750977H8V2.25098H9.5V0.750977ZM8.03019 4.03132L10.0303 2.03132L8.96969 0.97063L6.96956 2.97063L8.03019 4.03132Z"
      fill={Palette.NEUTRAL_N10}
    />
  </svg>
);

export default MaleIcon;
