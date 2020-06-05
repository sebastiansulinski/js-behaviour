const reload = () => {
  window.location.reload();
};

const redirect = response => {
  window.location.href = response.url;
};

const confirmClear = (response, instance) => {
  instance.processing = false;
  instance.inputs = instance.clone(instance.initial);
  instance.addNotification({
    type: 'success',
    message: response.message,
  });
};

export { reload, redirect, confirmClear };
