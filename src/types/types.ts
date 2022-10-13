import { Types } from 'mongoose';

export type TPost = {
    postTitle: string;
    postContent: string;
};

export type TUser = {
    _id: Types.ObjectId;
    email: string;
    password: string;
    token: string;
};

export type JwtPayload = {
    id?: string;
}

export type TBlackList = {
    token: string;
    expireAt: Date;
};

export type TObject = Record<string, any>