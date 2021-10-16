import { convertDateToOrnellember } from '../utils/getDate';

export default function DateRead() {
    const currentDate = convertDateToOrnellember(new Date());

  return (
      <p>
          Today is {currentDate.day} {currentDate.month}, {currentDate.year} in Ornellember time format.
      </p>
  );
}
