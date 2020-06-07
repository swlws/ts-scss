import { dateFormat } from './tool'

let bar = false;
if (process.env.VUE_APP_ENABLE_DEBUG === "true") {
    bar = true;
} else if (process.env.VUE_APP_ENABLE_DEBUG === "false") {
    bar = false;
}

const log = (context: string, content: any) => {
    if (!bar) return;

    let date = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    console.log(`${date} [context: ${context}] \n\t ${content}`);
}

const error = (context: string, content: any) => {
    if (!bar) return;

    let date = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    console.error(`${date} [context: ${context}] \n\t ${content}`);
}

export default {
    log, error
}