const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  fetch(`/admin/product/${prodId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then((response) => {
      console.log(`__Debugger__adminJs__deleteProduct__response: `, response);
      // response;
    })
    // .then((data) => console.log('DATA: ', data))
    .catch((error) => console.log('ERROR: ', error));
};
