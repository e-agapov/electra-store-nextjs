export const imageLoader = ({ src }) => {
  const host = process.env.NEXT_PUBLIC_API_HOST ? process.env.NEXT_PUBLIC_API_HOST : 'http://127.0.0.1:8000';

  return `${host}/storage/${src}`;
};
