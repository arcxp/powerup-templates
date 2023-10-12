import { movieKey } from 'fusion:environment';

const params = [
  {
    name: 'title',
    displayName: 'Movie Title',
    type: 'text',
  },
];

const resolve = (props) => {
  const { title } = props;
  return `http://www.omdbapi.com/?apikey=${movieKey}&t=${title}`;
};

export default {
  resolve,
  params,
};
