import React, {FC} from "react";
import { TButton } from '../../../types/types';

const Button: FC<TButton> = ({handleClick, children }):JSX.Element => {

    return (
        <button onClick={handleClick}>{children}</button>
    )
}

export default Button;