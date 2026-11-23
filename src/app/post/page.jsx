import Posts from '@/components/Posts';
import { Suspense } from 'react';

const PostPage = () => {
  const postPromise = fetch('https://jsonplaceholder.typicode.com/posts').then(
    (res) => res.json(),
  );

  return (
    <div>
      <Suspense fallback={<h2 className='text-3xl'>Loading Posts.....</h2>}>
        <Posts postPromise={postPromise} />
      </Suspense>
    </div>
  );
};

export default PostPage;