import { getDate } from '../utils/getDate';

export default function DateRead() {
    const currentDate = getDate();
  return (
      <p>
          Today is {currentDate.day} {currentDate.month}, {currentDate.year} in Ornellember time format.
      </p>
  );
}
