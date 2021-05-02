$(document).ready(function () {
  console.log('Hello World');

  /** --------- ATUALIZAR LEVEL DE CAMPO RANGE SKILL LEVEL ---------- */
  $('section#add_skill').on('input', 'input#level', function (e) {
    $('section#add_skill span#percent').text(`${e.target.value}%`);
  });

  /** --------- EDITAR REGISTRO ---------- */
  $('#editar_registro #pessoa').change(function (e) {
    $.get(`api/banco?pessoa_id=${e.target.value}`, data => {
      const bancos = JSON.parse(data);
      $('#editar_registro #banco').attr('disabled', false);
      $('#editar_registro #banco').html(
        '<option value="">Selecione um Banco</option>'
      );
      console.log(bancos);
      bancos.forEach(banco => {
        $('#editar_registro #banco').append(
          `<option value="${banco.pk}">${banco.fields.apelido}</option>`
        );
      });
    });
  });

  /** --------- EXCLUIR REGISTRO ---------- */
  $('button.excluir_registro').click(function (e) {
    if (confirm('Tem certeza que deseja excluir esse registro?')) {
      const id = $(this).data('id');
      $.ajax({
        url: `/api/registro/${id}`,
        type: 'DELETE',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
        success: function () {
          window.location.reload();
        },
      });
    }
  });
});
