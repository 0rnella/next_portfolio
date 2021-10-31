import ornellember from 'ornellember';

export default function DateRead() {
    const currentDate = ornellember();

  return (
      <p>
          Today is {currentDate.day} {currentDate.month}, {currentDate.year} in Ornellember time format.
      </p>
  );
}
