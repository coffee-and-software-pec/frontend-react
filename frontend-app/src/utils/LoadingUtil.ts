async function embraceWithLoading(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    callback: () => Promise<any>, 
    timeToWait: number
) {
    setLoading(true);
    let start = new Date().getTime();
    let end = 0;
    try {
        await callback();
        end =  new Date().getTime();
    } catch(_){}

    const diff = end - start;
    const maxTimeToWait = diff > timeToWait ? 0 : Math.abs(diff - timeToWait);
    setTimeout(() => {
        setLoading(false);
    }, maxTimeToWait);
}

export {
    embraceWithLoading
}