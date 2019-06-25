export function sleep(numberMillis) {
    let now = new Date();
    const exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) {
            return;
        }
    }
}
