import reduceRight from 'lodash/reduceRight';

export default function mapRight(collection, iteratee) {
  return reduceRight(
    collection,
    (acc, ...rest) => {
      acc.push(iteratee(...rest));
      return acc;
    },
    []
  );
}
