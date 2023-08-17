export function Env() {
    const machineType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
        'Mobile' :
        'Desktop'
    if (machineType === 'Mobile') {
        return true
    } else {
        return false;
    }
}
