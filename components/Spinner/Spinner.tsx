import { ClipLoader } from 'react-spinners';
import { ISpinnerProps } from './Spinner.types';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner: React.FC<ISpinnerProps> = ({ loading }) => {
  return (
    <ClipLoader
      color={'#000000'}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
