function embraceWithLoading(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    callback: () => void, 
    timeToWait: number
) {
    setLoading(true);
    try {
        callback();
    } catch(_){}
    setTimeout(() => {setLoading(false);}, timeToWait);
}

export {
    embraceWithLoading
}