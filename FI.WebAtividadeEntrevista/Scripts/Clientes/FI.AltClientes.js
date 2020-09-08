
$(document).ready(function () {
    $('.cpf').mask('000.000.000-00', { reverse: true });

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "CPF": $(this).find("#CPF").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
        });
    });

    loadModalBeneficiarios();

})

function incluirBeneficiario() {
    var nome = $('#NomeBeneficiario').val();
    var cpf = $('#CPFBeneficiario').val();
    var data = { nome: nome, cpf: cpf };

    $.ajax({
        type: "POST",
        url: urlIncluirBenef,
        data: data,
        success: function () {
            $('#NomeBeneficiario').val('');
            $('#CPFBeneficiario').val('');

            if (document.getElementById("gridBeneficiarios"))
                $('#gridBeneficiarios').jtable('load');
        },
        error: function (r) {
            if (r.status == 400)
                ModalDialog("Ocorreu um erro", r.responseJSON);
            else if (r.status == 500)
                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
        }
    });
}

function AlterarBeneficiario() {
    var nome = $('#NomeBeneficiarioAlt').val();
    var cpf = $('#CPFBeneficiarioAlt').val();
    var idBeneficiario = $('#IdBeneficiarioAltHidden').val();
    var data = { nome: nome, cpf: cpf, id: idBeneficiario };

    $.ajax({
        type: "PUT",
        url: urlAlterarBenef,
        data: data,
        success: function () {
            $('#NomeBeneficiarioAlt').val('');
            $('#CPFBeneficiarioAlt').val('');
            $('#IdBeneficiarioAltHidden').val('');
            $('#AlterarBeneficiarioModal').modal('toggle');

            if (document.getElementById("gridBeneficiarios"))
                $('#gridBeneficiarios').jtable('load');
        },
        error: function (r) {
            if (r.status == 400)
                ModalDialog("Ocorreu um erro", r.responseJSON);
            else if (r.status == 500)
                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
        }
    });
}

function showModalAlterarBeneficiario(id, cpf, nome) {

    $('#NomeBeneficiarioAlt').val(nome);
    $('#CPFBeneficiarioAlt').val(cpf);
    $('#IdBeneficiarioAltHidden').val(id);

    $('#AlterarBeneficiarioModal').modal('show');
}

function excluirBeneficiario(id) {
    var confirma = confirm('Deseja mesmo excluir o beneficiário?');
    if (confirma)
        $.ajax({
            type: "DELETE",
            url: urlExcluirBenef,
            data: { id: id },
            success: function () {
                if (document.getElementById("gridBeneficiarios"))
                    $('#gridBeneficiarios').jtable('load');
            },
            error: function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            }
        });
}

function loadModalBeneficiarios() {
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            defaultSorting: 'CPF ASC', //Set default sorting
            actions: {
                listAction: urlBenefList,
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '35%'
                },
                Nome: {
                    title: 'Nome',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="showModalAlterarBeneficiario(' + data.record.Id + ',\'' + data.record.CPF + '\',\'' + data.record.Nome + '\')\" class="btn btn-primary btn-sm">Alterar</button>';
                    },
                    width: '15%'
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="excluirBeneficiario(' + data.record.Id + ')" class="btn btn-primary btn-sm">Excluir</button>';
                    }
                }
            }
        });

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
