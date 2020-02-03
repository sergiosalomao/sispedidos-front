import { Notify } from 'quasar';

function notify(msg) {
  Notify.create({
    message: msg,
    color: 'red',
    icon: 'announcement',
  });
}

export function showError(e) {
  if (typeof e === 'string') {
    notify(e);
  } else if (typeof e === 'object') {
    Object.keys(e).forEach((item) => {
      notify(e[item]);
    });
  } else {
    notify('Aconteceu algum erro');
  }
}


export default { showError };
