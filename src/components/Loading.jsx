"use client"
import { useEffect } from 'react';
import { dotSpinner } from 'ldrs'

const Loading = () => {
    useEffect(() => {

        dotSpinner.register()
    }, []);

    return (
        <div className="loading-animation">
            <l-dot-spinner
                size="80"
                speed="0.9"
                color="#ffd684"
            ></l-dot-spinner>
        </div>
    );
}

export default Loading;
