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

async function embraceWithLoadingAndResolve(
    resolve: (value: unknown) => void,
    callback: () => Promise<any>, 
    timeToWait: number
) {
    let start = new Date().getTime();
    let end = 0;
    try {
        await callback();
        end =  new Date().getTime();
    } catch(_){}

    const diff = end - start;
    const maxTimeToWait = diff > timeToWait ? 0 : Math.abs(diff - timeToWait);
    setTimeout(() => {
        resolve(0);
    }, maxTimeToWait);
}

async function embraceWithLoadingThen(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    callback: () => Promise<any>, 
    timeToWait: number,
    then: () => void
) {
    setLoading(true);
    let start = new Date().getTime();
    let end = 0;
    try {
        await callback();
        end =  new Date().getTime();
    } catch(_){
        end =  new Date().getTime();
    }

    const diff = end - start;
    const maxTimeToWait = diff > timeToWait ? 0 : Math.abs(diff - timeToWait);
    setTimeout(() => {
        setLoading(false);
        then();
    }, maxTimeToWait);
}

export {
    embraceWithLoading,
    embraceWithLoadingAndResolve,
    embraceWithLoadingThen
}