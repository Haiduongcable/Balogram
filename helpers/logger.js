const isDev = __DEV__ === true;

const format = (level, args) => {
    const time = new Date().toISOString();
    return [`[${time}] [${level}]`, ...args];
};

export const log = (...args) => {
    if (!isDev) return;
    // eslint-disable-next-line no-console
    console.log(...format('LOG', args));
};

export const warn = (...args) => {
    if (!isDev) return;
    // eslint-disable-next-line no-console
    console.warn(...format('WARN', args));
};

export const error = (...args) => {
    // eslint-disable-next-line no-console
    console.error(...format('ERROR', args));
};

export default { log, warn, error };
