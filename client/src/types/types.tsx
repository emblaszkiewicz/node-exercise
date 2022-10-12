import React from "react";

export type TPost = {
    postTitle: string;
    postContent: string;
};

export type TChangedPost<T> = {
    data: T[] | undefined;
};

export type TButton = {
    handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children: string;
};