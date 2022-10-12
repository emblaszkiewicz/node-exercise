import React, { FC, useState } from "react";
import Button from './components/common/Button/Button';
import ChangedPost from './components/views/ChangedPost/ChangedPost';
import { TPost } from '../../src/types/types';

const App: FC = (): JSX.Element => {

    const [data, setData] = useState<TPost[] | []>();

    const handleClick = (): void => {
        const url = 'http://localhost:8000/api/posts/';
        const id = prompt('Enter post id');
        fetch(`${url}${id}`)
            .then((res: Response) => res.json())
            .then((res) => {
                if(!res.length) {
                    setData([res])
                } else setData(res);
            });
    };

  return (
      <>
          <h1>Posts</h1>
          <Button handleClick={handleClick}>Click me!</Button>
          {data?.map((post) =>
              <section key={post.postTitle}>
                  <article>Post title: {post.postTitle}</article>
                  <article>Post content: {post.postContent}</article>
              </section>
          )}
          <ChangedPost data={data} />
      </>
  )
}

export default App;
