import React, { FC } from "react";
import { TChangedPost, TPost } from '../../../types/types';
import { handleUpperCase } from '../../../services/services';

const ChangedPost: FC<TChangedPost<TPost>> = ({data}):JSX.Element => {

    return (
        <>
            <h2>ChangedPost</h2>
            {data?.map((post: TPost) =>
                <section key={post.postTitle}>
                    <article>Post title: {handleUpperCase(post.postTitle)}</article>
                    <article>Post content: {handleUpperCase(post.postContent)}</article>
                </section>
            )}
        </>
    )
}

export default ChangedPost;