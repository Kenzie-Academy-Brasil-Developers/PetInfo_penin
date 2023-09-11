export  const  toast = (mensagem, color) => {

    Toastify({
        text: mensagem,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: color,
        },
        onClick: function(){}
      }).showToast();
}