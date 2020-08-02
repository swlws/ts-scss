import { dateFormat } from './tool'

let bar = false;
if (process.env.VUE_APP_ENABLE_DEBUG === "true") {
    bar = true;
} else if (process.env.VUE_APP_ENABLE_DEBUG === "false") {
    bar = false;
}

const log = (type: string, context: string, content: any) => {
    if (!bar) return;
    if (!type) return;

    let date = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    eval(`console.${type}`)(`${date} [context: ${context}] \n ${JSON.stringify(content, null, 4)}`);
}

export default {
    info: log.bind(null, 'info'),
    error: log.bind(null, 'error')
}